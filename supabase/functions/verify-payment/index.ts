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

    const { reference } = await req.json()
    if (!reference) return json({ error: 'Missing reference' }, 400)

    const { data: payment, error: paymentErr } = await admin
      .from('payments')
      .select('id, order_id, amount, status')
      .eq('provider_reference', reference)
      .maybeSingle()
    if (paymentErr) throw paymentErr
    if (!payment) return json({ error: 'Payment record not found' }, 404)

    const { data: order, error: orderErr } = await admin
      .from('orders')
      .select('id, order_number, user_id, payment_status')
      .eq('id', payment.order_id)
      .single()
    if (orderErr) throw orderErr
    if (order.user_id !== user.id) return json({ error: 'Not authorized to verify this payment' }, 403)

    // Already verified earlier (e.g. user refreshed the callback page) — just report the result again.
    if (order.payment_status === 'paid') {
      return json({ success: true, orderNumber: order.order_number }, 200)
    }

    // The actual trust boundary: ask Paystack directly, never take the
    // frontend's word for whether payment succeeded.
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}` },
    })
    const verifyData = await verifyRes.json()

    const expectedKobo = Math.round(Number(payment.amount) * 100)
    const paystackStatus = verifyData?.data?.status
    const paystackAmount = verifyData?.data?.amount

    const isVerified = verifyRes.ok && paystackStatus === 'success' && paystackAmount === expectedKobo

    await admin
      .from('payments')
      .update({
        status: isVerified ? 'success' : 'failed',
        raw_response: verifyData,
        verified_at: new Date().toISOString(),
      })
      .eq('id', payment.id)

    await admin
      .from('orders')
      .update({
        payment_status: isVerified ? 'paid' : 'failed',
        status: isVerified ? 'processing' : order.payment_status,
        transaction_id: reference,
      })
      .eq('id', order.id)

    if (!isVerified) {
      return json({ success: false, orderNumber: order.order_number, error: 'Payment could not be verified' }, 200)
    }

    const { data: fullOrder } = await admin.from('orders').select('*').eq('id', order.id).single()
    const { data: orderItems } = await admin
      .from('order_items')
      .select('title, quantity, price')
      .eq('order_id', order.id)

    if (fullOrder) {
      await sendOrderConfirmationEmail(fullOrder, orderItems ?? [])
    }

    return json({ success: true, orderNumber: order.order_number }, 200)
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Verification failed' }, 500)
  }
})