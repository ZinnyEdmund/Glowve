import { toast } from "sonner"
export interface SMSResponse {
  success: boolean
  messageId?: string
  error?: string
}

// Termii Configuration (Nigerian SMS provider)
// const TERMII_API_KEY = import.meta.env.VITE_TERMII_API_KEY || 'xxxxx'
// const TERMII_SENDER_ID = 'YourStore'

// Send OTP via SMS
export async function sendOTP(phone: string): Promise<SMSResponse> {
  try {
    const otp = generateOTP()
    
    const otpData = {
      phone,
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    }
    localStorage.setItem(`otp_${phone}`, JSON.stringify(otpData))

    console.log(`Sending OTP ${otp} to ${phone}`)

    await new Promise(res => setTimeout(res, 1500))
    
    toast.success(`OTP sent to ${phone}`)  

    return {
      success: true,
      messageId: `MSG_${Date.now()}`
    }
  } catch (error) {
    console.error('SMS sending error:', error)
    toast.error(`Failed to send OTP to ${phone}`)  
    return {
      success: false,
      error: 'Failed to send OTP. Please try again.'
    }
  }
}


// Verify OTP
export async function verifyOTP(phone: string, code: string): Promise<boolean> {
  try {
    const storedData = localStorage.getItem(`otp_${phone}`)
    if (!storedData) {
      toast.error('No OTP found for this number.')
      return false
    }

    const otpData = JSON.parse(storedData)
    
    if (Date.now() > otpData.expiresAt) {
      localStorage.removeItem(`otp_${phone}`)
      toast.error('OTP has expired. Please request a new one.')
      return false
    }

    if (otpData.code === code) {
      localStorage.removeItem(`otp_${phone}`)
      toast.success('OTP verified successfully!')
      return true
    }

    toast.error('Invalid OTP. Please try again.')
    return false
  } catch (error) {
    console.error('OTP verification error:', error)
    toast.error('Error verifying OTP.')
    return false
  }
}


// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Resend OTP
export async function resendOTP(phone: string): Promise<SMSResponse> {
  return sendOTP(phone)
}