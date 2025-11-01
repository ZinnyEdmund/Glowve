export async function processPayment(amount: number, cardDetails: {
  cardNumber: string
  expiryDate: string
  cvc: string
}) {
  // Simulate Stripe/Paystack payment processing
  // In real app: call actual payment API
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo: Accept cards starting with 4242 (Stripe test card)
      if (cardDetails.cardNumber.startsWith('4242')) {
        resolve({
          success: true,
          transactionId: `TXN-${Date.now()}`,
          message: 'Payment successful'
        })
      } else if (cardDetails.cardNumber.startsWith('5555')) {
        // Mastercard test
        resolve({
          success: true,
          transactionId: `TXN-${Date.now()}`,
          message: 'Payment successful'
        })
      } else {
        reject(new Error('Invalid test card'))
      }
    }, 1500) // Simulate network delay
  })
}