import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing authorization header')

    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: userErr } = await userClient.auth.getUser()
    if (userErr || !user) throw new Error('Not authenticated')

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const { orderId } = await req.json()
    if (!orderId) return json({ error: 'Missing orderId' }, 400)

    // Look up the order and confirm it actually belongs to this user and
    // hasn't already been paid — prevents re-paying or paying for someone else's order.
    const { data: order, error: orderErr } = await admin
      .from('orders')
      .select('id, order_number, user_id, total, shipping_email, payment_status')
      .eq('id', orderId)
      .maybeSingle()
    if (orderErr) throw orderErr
    if (!order || order.user_id !== user.id) return json({ error: 'Order not found' }, 404)
    if (order.payment_status === 'paid') return json({ error: 'This order has already been paid' }, 400)

    const amountInKobo = Math.round(Number(order.total) * 100)
    const reference = `PSTK_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    const siteUrl = Deno.env.get('SITE_URL') ?? 'http://localhost:5173'

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: order.shipping_email,
        amount: amountInKobo,
        reference,
        callback_url: `${siteUrl}/payment-callback`,
        metadata: { order_id: order.id, order_number: order.order_number },
      }),
    })

    const paystackData = await paystackRes.json()
    if (!paystackRes.ok || !paystackData.status) {
      return json({ error: paystackData.message || 'Failed to start payment with Paystack' }, 502)
    }

    // Record the attempt so verify-payment has something to check against.
    const { error: paymentErr } = await admin.from('payments').insert({
      order_id: order.id,
      provider: 'paystack',
      provider_reference: reference,
      amount: order.total,
      status: 'initiated',
    })
    if (paymentErr) throw paymentErr

    return json({ authorizationUrl: paystackData.data.authorization_url, reference }, 200)
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Failed to initiate payment' }, 500)
  }
})