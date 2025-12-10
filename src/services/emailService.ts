
import type { Order, User } from '../types/index'

// EmailJS Configuration
// const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxxxx'
// const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxx'
// const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xxxxx'

export interface EmailData {
  to: string
  subject: string
  message: string
  orderId?: string
  orderTotal?: number
}

// Send Order Confirmation Email
export async function sendOrderConfirmationEmail(order: Order): Promise<boolean> {
  try {
    const emailData = {
      to_email: order.shippingAddress.email,
      to_name: order.shippingAddress.fullName,
      subject: `Order Confirmation - ${order.id}`,
      order_id: order.id,
      order_total: `$${order.total.toFixed(2)}`,
      order_items: order.items.map(item => 
        `${item.title} x ${item.quantity}`
      ).join(', '),
      tracking_number: order.trackingNumber || 'Will be provided soon'
    }

    // In production, use EmailJS or your email service
    console.log('Sending order confirmation email:', emailData)
    
    // Simulate email sending
    await new Promise(res => setTimeout(res, 1000))
    
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

// Send Welcome Email
export async function sendWelcomeEmail(user: User): Promise<boolean> {
  try {
    const emailData = {
      to_email: user.email,
      to_name: user.name,
      subject: 'Welcome to Our Store!',
      message: `Hi ${user.name}, welcome to our store! We're excited to have you.`
    }

    console.log('Sending welcome email:', emailData)
    await new Promise(res => setTimeout(res, 1000))
    
    return true
  } catch (error) {
    console.error('Welcome email error:', error)
    return false
  }
}

// Send Shipping Update Email
export async function sendShippingUpdateEmail(order: Order): Promise<boolean> {
  try {
    const emailData = {
      to_email: order.shippingAddress.email,
      to_name: order.shippingAddress.fullName,
      subject: `Your Order ${order.id} Has Shipped!`,
      order_id: order.id,
      tracking_number: order.trackingNumber,
      message: `Your order has been shipped and is on its way!`
    }

    console.log('Sending shipping update:', emailData)
    await new Promise(res => setTimeout(res, 1000))
    
    return true
  } catch (error) {
    console.error('Shipping email error:', error)
    return false
  }
}