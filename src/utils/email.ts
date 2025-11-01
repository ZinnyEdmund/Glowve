import emailjs from '@emailjs/browser'

// Initialize with your EmailJS credentials
emailjs.init('YOUR_PUBLIC_KEY') // Get from EmailJS dashboard

export async function sendOrderConfirmationEmail(
  customerEmail: string,
  orderData: {
    orderId: string
    items: Array<{ name: string; quantity: number; price: number }>
    total: number
    shippingInfo: { fullName: string; address: string }
  }
) {
  try {
    const itemsList = orderData.items
      .map(item => `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')

    const emailContent = {
      to_email: customerEmail,
      customer_name: orderData.shippingInfo.fullName,
      order_id: orderData.orderId,
      items_list: itemsList,
      total_amount: orderData.total.toFixed(2),
      shipping_address: orderData.shippingInfo.address,
      order_date: new Date().toLocaleDateString()
    }

    // Send using EmailJS template
    await emailjs.send(
      'YOUR_SERVICE_ID',    // Get from EmailJS dashboard
      'YOUR_TEMPLATE_ID',   // Create a template in EmailJS
      emailContent
    )

    return {
      success: true,
      message: `Order confirmation sent to ${customerEmail}`
    }
  } catch (error: any) {
    console.error('Email error:', error)
    throw new Error('Failed to send email: ' + error.message)
  }
}