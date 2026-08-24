import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyPayment } from '../services/paymentService'
import { Loader2 } from 'lucide-react'

export default function PaymentCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('Confirming your payment...')

  useEffect(() => {
    const reference = searchParams.get('reference') || searchParams.get('trxref')

    if (!reference) {
      navigate('/payment-failed')
      return
    }

    let active = true

    verifyPayment(reference).then((result) => {
      if (!active) return
      if (result.success && result.orderNumber) {
        navigate(`/payment-success?order=${result.orderNumber}`)
      } else {
        setMessage(result.error || 'Payment could not be confirmed')
        setTimeout(() => {
          if (active) navigate('/payment-failed')
        }, 1500)
      }
    })

    return () => { active = false }
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <Loader2 className="w-10 h-10 mx-auto mb-4 text-[#755757] animate-spin" />
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}