import { supabase } from '../lib/supabaseClient'
import type { CartItem } from '../types/index'

export interface InitiatePaymentResponse {
  success: boolean
  authorizationUrl?: string
  reference?: string
  error?: string
}

// Starts a Paystack transaction for an existing (pending) order and returns
// the URL to redirect the browser to. The actual charge happens on
// Paystack's own page — this app never touches card details.
export async function initiatePaystackPayment(orderId: string): Promise<InitiatePaymentResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('initiate-payment', {
      body: { orderId },
    })
    if (error) throw error
    if (data?.error) throw new Error(data.error)
    return { success: true, authorizationUrl: data.authorizationUrl, reference: data.reference }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start payment. Please try again.',
    }
  }
}

export interface VerifyPaymentResponse {
  success: boolean
  orderNumber?: string
  error?: string
}

// Called after Paystack redirects back — asks the server to confirm with
// Paystack directly whether the payment actually succeeded.
export async function verifyPayment(reference: string): Promise<VerifyPaymentResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('verify-payment', {
      body: { reference },
    })
    if (error) throw error
    if (data?.error && !('success' in data)) throw new Error(data.error)
    return { success: !!data.success, orderNumber: data.orderNumber, error: data.error }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Could not verify payment.',
    }
  }
}

// Calculate order totals (still used for the pre-order display estimate in
// the cart/checkout UI — the authoritative totals are recomputed server-side
// in the create-order Edge Function).
export function calculateOrderTotals(items: CartItem[], shippingCost: number = 15) {
  if (!Array.isArray(items) || items.length === 0) {
    return { subtotal: 0, shipping: 0, tax: 0, total: 0 }
  }

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + price * quantity
  }, 0)

  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shippingCost.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}