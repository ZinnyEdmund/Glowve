// Shared across Edge Functions — sends the order confirmation email via Resend.
// Never throws: an email failure should never break the order/payment flow,
// so any error here is logged and swallowed.

type OrderItemForEmail = { title: string; quantity: number; price: number }
type OrderForEmail = {
  order_number: string
  shipping_email: string
  shipping_full_name: string
  total: number
  subtotal: number
  shipping_cost: number
  tax: number
}

export async function sendOrderConfirmationEmail(
  order: OrderForEmail,
  items: OrderItemForEmail[]
): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const fromAddress = Deno.env.get('RESEND_FROM_EMAIL') ?? 'Glowve <onboarding@resend.dev>'

  if (!apiKey) {
    console.error('RESEND_API_KEY not set — skipping order confirmation email')
    return
  }

  const itemsHtml = items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;">${i.title} × ${i.quantity}</td><td style="padding:8px 0; text-align:right;">$${(
          i.price * i.quantity
        ).toFixed(2)}</td></tr>`
    )
    .join('')

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color:#222;">
      <h2 style="color:#755757;">Thanks for your order, ${order.shipping_full_name}!</h2>
      <p>Your order <strong>${order.order_number}</strong> has been confirmed.</p>
      <table style="width:100%; border-collapse:collapse; margin:20px 0;">
        ${itemsHtml}
      </table>
      <table style="width:100%; font-size:14px; color:#444;">
        <tr><td>Subtotal</td><td style="text-align:right;">$${order.subtotal.toFixed(2)}</td></tr>
        <tr><td>Shipping</td><td style="text-align:right;">$${order.shipping_cost.toFixed(2)}</td></tr>
        <tr><td>Tax</td><td style="text-align:right;">$${order.tax.toFixed(2)}</td></tr>
        <tr style="font-weight:bold; font-size:16px;">
          <td style="padding-top:8px;">Total</td>
          <td style="text-align:right; padding-top:8px;">$${order.total.toFixed(2)}</td>
        </tr>
      </table>
      <p style="color:#888; font-size:12px;">We'll email you again once your order ships.</p>
    </div>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: order.shipping_email,
        subject: `Order Confirmation - ${order.order_number}`,
        html,
      }),
    })
    if (!res.ok) {
      console.error('Resend error:', await res.text())
    }
  } catch (err) {
    console.error('Failed to send confirmation email:', err)
  }
}