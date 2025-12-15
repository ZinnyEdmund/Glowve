// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// // import OTPInput from '../components/common/OTPInput'
// import Toast from '../components/common/Toast'
// import { sendOTP, verifyOTP, resendOTP } from '../services/smsService'
// import { Smartphone, Lightbulb, ArrowLeft } from 'lucide-react'

// export default function VerifyPhone() {
//   const navigate = useNavigate()
//   const { user } = useAuth()
  
//   const [otp, setOtp] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [resending, setResending] = useState(false)
//   const [timeLeft, setTimeLeft] = useState(60)
//   const [canResend, setCanResend] = useState(false)
//   const [toast, setToast] = useState({ show: false, message: '', type: 'info' as any })

//   useEffect(() => {
//     if (!user?.phone) {
//       navigate('/profile')
//       return
//     }

//     handleSendOTP()
//   }, [])

//   useEffect(() => {
//     if (timeLeft === 0) {
//       setCanResend(true)
//       return
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1)
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [timeLeft])

//   const handleSendOTP = async () => {
//     if (!user?.phone) return

//     try {
//       const result = await sendOTP(user.phone)
//       if (result.success) {
//         showToast('OTP sent successfully!', 'success')
//       } else {
//         showToast(result.error || 'Failed to send OTP', 'error')
//       }
//     } catch {
//       showToast('Failed to send OTP', 'error')
//     }
//   }

//   const handleVerify = async () => {
//     if (!user?.phone || otp.length !== 6) return

//     setLoading(true)
//     try {
//       const verified = await verifyOTP(user.phone, otp)
      
//       if (verified) {
//         const storedUser = localStorage.getItem('malli_user_v1')
//         if (storedUser) {
//           const userData = JSON.parse(storedUser)
//           userData.isPhoneVerified = true
//           localStorage.setItem('malli_user_v1', JSON.stringify(userData))
//         }

//         showToast('Phone verified successfully!', 'success')
//         setTimeout(() => {
//           navigate('/profile')
//         }, 2000)
//       } else {
//         showToast('Invalid OTP. Please try again.', 'error')
//         setOtp('')
//       }
//     } catch {
//       showToast('Verification failed. Please try again.', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleResend = async () => {
//     if (!user?.phone || !canResend) return

//     setResending(true)
//     try {
//       const result = await resendOTP(user.phone)
//       if (result.success) {
//         showToast('New OTP sent!', 'success')
//         setTimeLeft(60)
//         setCanResend(false)
//         setOtp('')
//       } else {
//         showToast(result.error || 'Failed to resend OTP', 'error')
//       }
//     } catch {
//       showToast('Failed to resend OTP', 'error')
//     } finally {
//       setResending(false)
//     }
//   }

//   const showToast = (message: string, type: any) => {
//     setToast({ show: true, message, type })
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center px-4">
//       <Toast
//         message={toast.message}
//         type={toast.type}
//         isVisible={toast.show}
//         onClose={() => setToast({ ...toast, show: false })}
//       />

//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
//             <Smartphone size={40} className="text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Phone</h1>
//           <p className="text-gray-600">We have sent a 6-digit code to</p>
//           <p className="font-bold text-gray-900 mt-1">{user?.phone}</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="mb-8">
//             <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
//               Enter Verification Code
//             </label>
//             <OTPInput
//               value={otp}
//               onChange={setOtp}
//               disabled={loading}
//             />
//           </div>

//           <div className="text-center mb-6">
//             {!canResend ? (
//               <p className="text-sm text-gray-600">
//                 Resend code in <span className="font-bold text-blue-600">{timeLeft}s</span>
//               </p>
//             ) : (
//               <button
//                 onClick={handleResend}
//                 disabled={resending}
//                 className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
//               >
//                 {resending ? 'Sending...' : 'Resend Code'}
//               </button>
//             )}
//           </div>

//           <button
//             onClick={handleVerify}
//             disabled={otp.length !== 6 || loading}
//             className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Verifying...
//               </>
//             ) : (
//               'Verify Phone Number'
//             )}
//           </button>

//           <button
//             onClick={() => navigate('/profile')}
//             className="w-full mt-4 text-gray-600 hover:text-gray-900 font-semibold flex items-center justify-center gap-2"
//           >
//             <ArrowLeft size={18} /> Back to Profile
//           </button>
//         </div>

//         <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
//           <Lightbulb size={18} className="text-yellow-600 mt-0.5" />
//           <p className="text-sm text-yellow-800">
//             Demo Mode: For testing, the OTP logs to the browser console.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
