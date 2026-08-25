import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCart } from '../context/CardContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { getDefaultAddress, saveDefaultAddress } from '../services/addressService'
import { createOrder } from '../services/orderService'
import { initiatePaystackPayment, calculateOrderTotals } from '../services/paymentService'
import ShippingForm from '../components/checkout/ShippingForm'
import PaymentForm from '../components/checkout/PaymentForm'
import OrderSummary from '../components/checkout/OrderSummary'
import Loader from '../components/common/Loader'
import type { ShippingAddress, PaymentMethod } from '../types/index'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../utils/constants'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const { refetch } = useOrders()

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [defaultAddress, setDefaultAddress] = useState<ShippingAddress | null>(null)
  const [addressLoading, setAddressLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!user) return
    let active = true

    getDefaultAddress(user.id, user.email)
      .then(address => {
        if (active) setDefaultAddress(address)
      })
      .catch(err => {
        console.error('Error loading default address:', err)
      })
      .finally(() => {
        if (active) setAddressLoading(false)
      })

    return () => { active = false }
  }, [user])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (cart.length === 0) {
      navigate('/cart')
    }
  }, [user, cart.length, navigate])

  if (!user || cart.length === 0) {
    return null
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST
  const { tax, total } = calculateOrderTotals(cart, shippingCost)

  const handleShippingSubmit = async (data: ShippingAddress) => {
    setShippingAddress(data)

    try {
      await saveDefaultAddress(user.id, data)
    } catch (err) {
      console.error('Failed to save address:', err)
    }

    setStep('payment')
  }

  const handlePaymentSubmit = async (method: PaymentMethod) => {
    if (!shippingAddress) return

    setProcessing(true)

    try {
      // Step 1: create the order — server validates stock and computes the
      // real totals. Payment status starts as 'pending' regardless of method.
      const order = await createOrder({
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
        shipping: shippingAddress,
        paymentMethod: method,
      })

      clearCart()
      await refetch()

      if (method === 'bank_transfer') {
        // No payment gateway involved — order is recorded and stays pending
        // until manually confirmed.
        navigate(`/payment-success?order=${order.orderNumber}`)
        return
      }

      // Step 2: start the Paystack transaction for the order we just created.
      const result = await initiatePaystackPayment(order.id)

      if (!result.success || !result.authorizationUrl) {
        toast.error(result.error || 'Could not start payment')
        navigate('/payment-failed')
        return
      }

      // Step 3: hand off to Paystack's hosted page. Paystack will redirect
      // back to /payment-callback once the customer finishes there.
      window.location.href = result.authorizationUrl
    } catch (error) {
      console.error('Checkout error:', error)
      const message = error instanceof Error ? error.message : 'Something went wrong placing your order'
      toast.error(message)
      navigate('/cart')
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
              addressLoading ? (
                <Loader />
              ) : (
                <ShippingForm
                  initialData={{
                    fullName: defaultAddress?.fullName || user.name,
                    email: user.email,
                    phone: defaultAddress?.phone || user.phone || '',
                    address: defaultAddress?.address || '',
                    city: defaultAddress?.city || '',
                    state: defaultAddress?.state || '',
                    zipCode: defaultAddress?.zipCode || '',
                    country: defaultAddress?.country || 'Nigeria'
                  }}
                  onSubmit={handleShippingSubmit}
                />
              )
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