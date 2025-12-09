// export interface SMSResponse {
//   success: boolean
//   messageId?: string
//   error?: string
// }

// // Termii Configuration (Nigerian SMS provider)
// const TERMII_API_KEY = import.meta.env.VITE_TERMII_API_KEY || 'xxxxx'
// const TERMII_SENDER_ID = 'YourStore'

// // Send OTP via SMS
// export async function sendOTP(phone: string): Promise<SMSResponse> {
//   try {
//     const otp = generateOTP()
    
//     // Store OTP in localStorage for verification (in production, use backend)
//     const otpData = {
//       phone,
//       code: otp,
//       expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
//     }
//     localStorage.setItem(`otp_${phone}`, JSON.stringify(otpData))

//     // In production, call Termii API
//     console.log(`Sending OTP ${otp} to ${phone}`)
    
//     // Simulate SMS sending
//     await new Promise(res => setTimeout(res, 1500))
    
//     return {
//       success: true,
//       messageId: `MSG_${Date.now()}`
//     }
//   } catch (error) {
//     console.error('SMS sending error:', error)
//     return {
//       success: false,
//       error: 'Failed to send OTP. Please try again.'
//     }
//   }
// }

// // Verify OTP
// export async function verifyOTP(phone: string, code: string): Promise<boolean> {
//   try {
//     const storedData = localStorage.getItem(`otp_${phone}`)
//     if (!storedData) return false

//     const otpData = JSON.parse(storedData)
    
//     // Check if OTP is expired
//     if (Date.now() > otpData.expiresAt) {
//       localStorage.removeItem(`otp_${phone}`)
//       return false
//     }

//     // Verify code
//     if (otpData.code === code) {
//       localStorage.removeItem(`otp_${phone}`)
//       return true
//     }

//     return false
//   } catch (error) {
//     console.error('OTP verification error:', error)
//     return false
//   }
// }

// // Generate 6-digit OTP
// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }

// // Resend OTP
// export async function resendOTP(phone: string): Promise<SMSResponse> {
//   return sendOTP(phone)
// }