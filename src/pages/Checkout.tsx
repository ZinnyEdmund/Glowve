import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CardContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import ShippingForm from '../components/checkout/ShippingForm'
import PaymentForm from '../components/checkout/PaymentForm'
import OrderSummary from '../components/checkout/OrderSummary'
import type { ShippingAddress, PaymentMethod } from '../types/index'
import { calculateOrderTotals } from '../services/paymentService'
import { initiatePaystackPayment, processCardPayment } from '../services/paymentService'
import { sendOrderConfirmationEmail } from '../services/emailService'
import { generateOrderId, generateTrackingNumber } from '../utils/formatters'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../utils/constants'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [processing, setProcessing] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST
  const { tax, total } = calculateOrderTotals(cart, shippingCost)

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingAddress(data)
    setStep('payment')
  }

  const handlePaymentSubmit = async (method: PaymentMethod, cardDetails?: { cardNumber: string; expiryDate: string; cvv: string; cardholderName: string }) => {
    if (!shippingAddress) return

    setProcessing(true)

    try {
      let paymentResult
      const orderId = generateOrderId()

      // Process payment based on method
      if (method === 'paystack') {
        paymentResult = await initiatePaystackPayment(user.email, total, orderId)
      } else if (method === 'card') {
        if (!cardDetails) throw new Error('Card details are required')
        paymentResult = await processCardPayment(
          {
            number: cardDetails.cardNumber,
            expiry: cardDetails.expiryDate,
            cvc: cardDetails.cvv,
            name: cardDetails.cardholderName
          },
          total
        )
      } else {
        // Bank transfer - no immediate payment
        paymentResult = { success: true, transactionId: `BANK_${Date.now()}` }
      }

      if (paymentResult.success) {
        // Create order
        const order = {
          id: orderId,
          userId: user.email,
          userEmail: user.email,
          items: cart,
          shippingAddress,
          paymentMethod: method,
          subtotal,
          shipping: shippingCost,
          tax,
          total,
          status: 'pending' as const,
          paymentStatus: method === 'bank_transfer' ? 'pending' as const : 'paid' as const,
          transactionId: paymentResult.transactionId,
          trackingNumber: generateTrackingNumber(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          date: new Date().toISOString()
        }

        // Save order
        addOrder(order)

        // Send confirmation email
        await sendOrderConfirmationEmail(order)

        // Clear cart
        clearCart()

        // Redirect to success page
        navigate(`/payment-success?order=${orderId}`)
      } else {
        navigate('/payment-failed')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      navigate('/payment-failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className={step === 'shipping' ? 'text-green-600 font-semibold' : ''}>
            1. Shipping
          </span>
          <span>→</span>
          <span className={step === 'payment' ? 'text-green-600 font-semibold' : ''}>
            2. Payment
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left - Forms */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {step === 'shipping' && (
              <ShippingForm
                initialData={{
                  fullName: user.name,
                  email: user.email,
                  phone: user.phone,
                  address: user.address,
                  city: user.city,
                  zipCode: user.zipCode
                }}
                onSubmit={handleShippingSubmit}
              />
            )}

            {step === 'payment' && (
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep('shipping')}
                processing={processing}
              />
            )}
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={cart}
            subtotal={subtotal}
            shipping={shippingCost}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}