import type { CartItem } from '../types/index'

// Paystack Configuration
// const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxx'

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  reference?: string
  error?: string
}

export interface CardDetails {
  number: string
  expiry: string
  cvc: string
  name: string
}

// Initialize Paystack Payment
export async function initiatePaystackPayment(
  email: string,
  amount: number,
  orderId: string
): Promise<PaymentResponse> {
  try {
    // Validate inputs
    if (!email || !amount || !orderId) {
      throw new Error('Missing required payment parameters')
    }

    // Convert amount to kobo (Paystack uses kobo)
    // const amountInKobo = Math.round(amount * 100)

    // In production, you'd call Paystack API here
    // For now, we'll simulate it
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success
        const reference = `PSTK_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
        resolve({
          success: true,
          transactionId: reference,
          reference: reference
        })
      }, 1500)
    })
  } catch (error) {
    console.error('Payment error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed. Please try again.'
    }
  }
}

// Verify Paystack Payment
export async function verifyPaystackPayment(reference: string): Promise<boolean> {
  try {
    if (!reference) {
      throw new Error('Payment reference is required')
    }

    // In production, verify with Paystack API
    // Example: 
    // const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    //   headers: {
    //     Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
    //   }
    // })
    // const data = await response.json()
    // return data.status === true && data.data.status === 'success'

    // For now, simulate verification
    await new Promise(res => setTimeout(res, 1000))
    return true
  } catch (error) {
    console.error('Verification error:', error)
    return false
  }
}

// Process Card Payment (Stripe simulation)
export async function processCardPayment(
  cardDetails: CardDetails,
  total: number
): Promise<PaymentResponse> {
  try {
    // Validate card details
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
      throw new Error('All card details are required')
    }

    // Validate total amount
    if (!total || total <= 0) {
      throw new Error('Invalid payment amount')
    }

    // Basic card number validation (remove spaces, check length)
    const cardNumber = cardDetails.number.replace(/\s/g, '')
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      throw new Error('Invalid card number')
    }

    // In production, you would send the amount to your payment processor
    // Example: Stripe, Flutterwave, etc.
    // const charge = await stripe.charges.create({
    //   amount: Math.round(total * 100), // Convert to cents/kobo
    //   currency: 'ngn',
    //   source: cardToken,
    //   description: 'Order payment'
    // })

    // Simulate card processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
        resolve({
          success: true,
          transactionId,
          reference: transactionId
        })
      }, 2000)
    })
  } catch (error) {
    console.error('Card payment error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Card payment failed. Please check your details.'
    }
  }
}

// Calculate order totals
export function calculateOrderTotals(
  items: CartItem[],
  shippingCost: number = 15
) {
  // Validate items array
  if (!Array.isArray(items) || items.length === 0) {
    return {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0
    }
  }

  const subtotal = items.reduce((sum, item) => {
    // Ensure price and quantity are valid numbers
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + (price * quantity)
  }, 0)

  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shippingCost.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2))
  }
}

// Helper function to format amount for display
export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// Generate unique reference
export function generatePaymentReference(prefix: string = 'PAY'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}