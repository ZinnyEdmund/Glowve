import type { CartItem } from '../../types'
import { formatCurrency } from '../../utils/formatters'
import {  FREE_SHIPPING_THRESHOLD } from '../../utils/constants'

type Props = {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export default function OrderSummary({ items, subtotal, shipping, tax, total }: Props) {
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          {isFreeShipping ? (
            <span className="font-semibold text-green-600">FREE</span>
          ) : (
            <span className="font-semibold">{formatCurrency(shipping)}</span>
          )}
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Tax (8%)</span>
          <span className="font-semibold">{formatCurrency(tax)}</span>
        </div>

        {isFreeShipping && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-600">🎉</span>
            <p className="text-sm text-green-700 font-semibold">
              You qualified for free shipping!
            </p>
          </div>
        )}

        {!isFreeShipping && subtotal > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-blue-600">💡</span>
            <p className="text-sm text-blue-700">
              Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
            </p>
          </div>
        )}

        <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-green-600">🔒</span>
          <span className="font-semibold">Secure Checkout</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  )
}