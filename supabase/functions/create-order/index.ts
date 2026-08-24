import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendOrderConfirmationEmail } from '../_shared/resend.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

type CartItemInput = { productId: number; quantity: number }
type ShippingInput = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing authorization header')

    // Identifies WHO is calling — scoped to their JWT, subject to RLS.
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: userErr } = await userClient.auth.getUser()
    if (userErr || !user) throw new Error('Not authenticated')

    // Does the actual trusted writes — bypasses RLS, only reachable from here.
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const items: CartItemInput[] = body.items
    const shipping: ShippingInput = body.shipping
    const paymentMethod: string = body.paymentMethod

    if (!items || items.length === 0) return json({ error: 'Cart is empty' }, 400)

    const productIds = items.map((i) => i.productId)
    const { data: products, error: prodErr } = await admin
      .from('products')
      .select('id, title, thumbnail, price, stock, is_active')
      .in('id', productIds)
    if (prodErr) throw prodErr

    // Validate stock + recompute prices from the DB — never trust the client's cart totals.
    const orderItems = []
    let subtotal = 0

    for (const item of items) {
      const product = products?.find((p) => p.id === item.productId)
      if (!product || !product.is_active) {
        return json({ error: `Product ${item.productId} is no longer available` }, 400)
      }
      if (product.stock < item.quantity) {
        return json(
          {
            error: `Only ${product.stock} left in stock for "${product.title}". Please update your cart.`,
            productId: product.id,
            available: product.stock,
          },
          400
        )
      }
      subtotal += Number(product.price) * item.quantity
      orderItems.push({
        product_id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        quantity: item.quantity,
      })
    }

    const shippingCost = subtotal >= 100 ? 0 : 15
    const tax = Number((subtotal * 0.08).toFixed(2))
    const total = Number((subtotal + shippingCost + tax).toFixed(2))
    const orderNumber =
      'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()

    const { data: addressRow, error: addrErr } = await admin
      .from('addresses')
      .select('id')
      .eq('user_id', user.id)
      .eq('is_default', true)
      .maybeSingle()
    if (addrErr) throw addrErr
    if (!addressRow) return json({ error: 'No shipping address on file' }, 400)

    const { data: order, error: orderErr } = await admin
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        address_id: addressRow.id,
        shipping_full_name: shipping.fullName,
        shipping_email: shipping.email,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state || null,
        shipping_zip_code: shipping.zipCode,
        shipping_country: shipping.country,
        subtotal,
        shipping_cost: shippingCost,
        tax,
        total,
        payment_method: paymentMethod,
        payment_status: 'pending',
      })
      .select()
      .single()
    if (orderErr) throw orderErr

    const { data: insertedItems, error: itemsErr } = await admin
      .from('order_items')
      .insert(orderItems.map((i) => ({ ...i, order_id: order.id })))
      .select()
    if (itemsErr) throw itemsErr

    // Decrement stock now that the order is confirmed.
    for (const item of items) {
      const product = products!.find((p) => p.id === item.productId)!
      await admin
        .from('products')
        .update({ stock: product.stock - item.quantity })
        .eq('id', item.productId)
    }

    // Bank transfer has no separate payment-verification step — the order
    // itself is the confirmation, so the email fires here. Paystack orders
    // are still 'pending' at this point and get their email from
    // verify-payment instead, once payment is actually confirmed.
    if (paymentMethod === 'bank_transfer') {
      await sendOrderConfirmationEmail(order, insertedItems ?? [])
    }

    return json({ order, items: insertedItems }, 200)
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Failed to create order' }, 500)
  }
})