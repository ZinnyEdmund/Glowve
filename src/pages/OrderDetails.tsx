// src/pages/OrderDetails.tsx

import { Link, useParams, useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { formatCurrency, formatDateTime } from '../utils/formatters'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../utils/constants'

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { getOrderById } = useOrders()

  const order = orderId ? getOrderById(orderId) : null

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">❓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <Link
          to="/orders"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
        >
          ← Back to Orders
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Details</h1>
        <p className="text-gray-600">Order ID: {order.id}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
            
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              <div className="space-y-6">
                {/* Order Placed */}
                <div className="relative flex items-start gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold z-10`}>
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Order Placed</p>
                    <p className="text-sm text-gray-600">{formatDateTime(order.createdAt)}</p>
                  </div>
                </div>

                {/* Processing */}
                <div className="relative flex items-start gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    ['processing', 'shipped', 'delivered'].includes(order.status)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  } font-bold z-10`}>
                    {['processing', 'shipped', 'delivered'].includes(order.status) ? '✓' : '2'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Processing</p>
                    <p className="text-sm text-gray-600">
                      {['processing', 'shipped', 'delivered'].includes(order.status)
                        ? 'Your order is being prepared'
                        : 'Waiting to process'}
                    </p>
                  </div>
                </div>

                {/* Shipped */}
                <div className="relative flex items-start gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    ['shipped', 'delivered'].includes(order.status)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  } font-bold z-10`}>
                    {['shipped', 'delivered'].includes(order.status) ? '✓' : '3'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Shipped</p>
                    <p className="text-sm text-gray-600">
                      {['shipped', 'delivered'].includes(order.status)
                        ? `Tracking: ${order.trackingNumber}`
                        : 'Not yet shipped'}
                    </p>
                  </div>
                </div>

                {/* Delivered */}
                <div className="relative flex items-start gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    order.status === 'delivered'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  } font-bold z-10`}>
                    {order.status === 'delivered' ? '✓' : '4'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Delivered</p>
                    <p className="text-sm text-gray-600">
                      {order.status === 'delivered'
                        ? 'Your order has been delivered'
                        : 'Estimated delivery: 3-5 business days'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status Badge */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Current Status:</p>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-${ORDER_STATUS_COLORS[order.status]}-100 text-${ORDER_STATUS_COLORS[order.status]}-700`}>
                {ORDER_STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
            
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <span className="text-sm text-gray-600">Price: {formatCurrency(item.price)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-bold text-gray-900 mb-2">{order.shippingAddress.fullName}</p>
              <p className="text-gray-700">{order.shippingAddress.address}</p>
              <p className="text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-gray-700">{order.shippingAddress.country}</p>
              <div className="mt-4 pt-4 border-t space-y-1">
                <p className="text-gray-700 flex items-center gap-2">
                  <span>📧</span>
                  {order.shippingAddress.email}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <span>📱</span>
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Payment Status */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Payment Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                order.paymentStatus === 'paid'
                  ? 'bg-green-100 text-green-700'
                  : order.paymentStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {order.paymentStatus.toUpperCase()}
              </span>
              
              {order.transactionId && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600">Transaction ID</p>
                  <p className="text-xs font-mono text-gray-900">{order.transactionId}</p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <p className="font-semibold text-gray-900 capitalize">
                {order.paymentMethod.replace('_', ' ')}
              </p>
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>

            {/* Tracking */}
            {order.trackingNumber && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">Tracking Number</p>
                <p className="font-mono font-bold text-blue-900">{order.trackingNumber}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Track Order
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">
                Download Invoice
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}