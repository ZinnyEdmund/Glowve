import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed!</h1>
          <p className="text-gray-600 mb-1">
            Thanks for your order — a confirmation has been sent to your email.
          </p>
          {orderNumber && (
            <p className="text-sm text-gray-500 mb-6">
              Order ID: <span className="font-mono font-semibold text-gray-900">{orderNumber}</span>
            </p>
          )}
          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/orders"
              className="w-full bg-black hover:bg-zinc-800 text-white py-2.5 rounded-md font-medium transition"
            >
              View my orders
            </Link>
            <Link
              to="/products"
              className="w-full text-sm text-gray-600 hover:text-gray-900 py-2"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}