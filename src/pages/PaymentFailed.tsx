import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment failed</h1>
          <p className="text-gray-600 mb-6">
            Something went wrong processing your payment. Your cart has been kept as-is —
            you can try again.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/checkout"
              className="w-full bg-black hover:bg-zinc-800 text-white py-2.5 rounded-md font-medium transition"
            >
              Try again
            </Link>
            <Link
              to="/cart"
              className="w-full text-sm text-gray-600 hover:text-gray-900 py-2"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}