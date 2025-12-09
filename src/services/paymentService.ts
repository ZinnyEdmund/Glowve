// import type { Order, ShippingAddress, CartItem } from '../types/index'

// // Paystack Configuration
// const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxx'

// export interface PaymentResponse {
//   success: boolean
//   transactionId?: string
//   reference?: string
//   error?: string
// }

// // Initialize Paystack Payment
// export async function initiatePaystackPayment(
//   email: string,
//   amount: number,
//   orderId: string
// ): Promise<PaymentResponse> {
//   try {
//     // Convert amount to kobo (Paystack uses kobo)
//     const amountInKobo = Math.round(amount * 100)

//     // In production, you'd call Paystack API here
//     // For now, we'll simulate it
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         // Simulate success
//         const reference = `PSTK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//         resolve({
//           success: true,
//           transactionId: reference,
//           reference: reference
//         })
//       }, 1500)
//     })
//   } catch (error) {
//     console.error('Payment error:', error)
//     return {
//       success: false,
//       error: 'Payment failed. Please try again.'
//     }
//   }
// }

// // Verify Paystack Payment
// export async function verifyPaystackPayment(reference: string): Promise<boolean> {
//   try {
//     // In production, verify with Paystack API
//     // For now, simulate verification
//     await new Promise(res => setTimeout(res, 1000))
//     return true
//   } catch (error) {
//     console.error('Verification error:', error)
//     return false
//   }
// }

// // Process Card Payment (Stripe simulation)
// export async function processCardPayment(
//   cardDetails: {
//     number: string
//     expiry: string
//     cvc: string
//     name: string
//   },
//   amount: number
// ): Promise<PaymentResponse> {
//   try {
//     // Simulate card processing
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//         resolve({
//           success: true,
//           transactionId
//         })
//       }, 2000)
//     })
//   } catch (error) {
//     console.error('Card payment error:', error)
//     return {
//       success: false,
//       error: 'Card payment failed. Please check your details.'
//     }
//   }
// }

// // Calculate order totals
// export function calculateOrderTotals(
//   items: CartItem[],
//   shippingCost: number = 15
// ) {
//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   const tax = subtotal * 0.08 // 8% tax
//   const total = subtotal + shippingCost + tax

//   return {
//     subtotal,
//     shipping: shippingCost,
//     tax,
//     total
//   }
// }