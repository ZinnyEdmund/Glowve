// src/pages/Cart.tsx (Updated with Lucide Icons)

import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CardContext'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatters'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../utils/constants'
import { ShoppingCart, PartyPopper, Lock, ShieldCheck } from 'lucide-react'

export default function Cart() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()

  const subtotal = cartTotal
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shipping = isFreeShipping ? 0 : SHIPPING_COST
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/checkout')
    } else {
      navigate('/checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              Clear Cart
            </button>
          </div>

          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex gap-6">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                      {item.brand && (
                        <p className="text-sm text-blue-600 font-semibold">{item.brand}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition"
                      >
                        −
                      </button>
                      <span className="font-bold text-lg min-w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                      <span className="text-sm text-gray-600 ml-2">
                        {item.stock} in stock
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cart.length} items)</span>
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

              {!isFreeShipping && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-900">
                      Free Shipping Progress
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-700">
                    Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
                  </p>
                </div>
              )}

              {isFreeShipping && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <PartyPopper className="text-green-600 w-5 h-5" />
                  <p className="text-sm font-semibold text-green-700">
                    You qualified for free shipping!
                  </p>
                </div>
              )}

              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-lg mb-3 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Free Returns within 30 days</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Fast Shipping (3-5 days)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-600">Check out our recommended products based on your cart</p>
          <Link
            to="/products"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Browse Products →
          </Link>
        </div>
      </div>
    </div>
  )
}
