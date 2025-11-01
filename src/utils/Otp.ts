let generatedOTP: string = ''

export function generateOTP(): string {
  // Generate 6-digit OTP
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString()
  return generatedOTP
}

export async function sendOTP(phone: string, otp: string) {
  // In real app: Use Twilio, AWS SNS, or Vonage
  // For MVP: Just log and return
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📱 SMS SENT TO ${phone}: Your OTP is ${otp}`)
      // Store in session for demo
      sessionStorage.setItem('demo_otp', otp)
      
      resolve({
        success: true,
        message: `OTP sent to ${phone}. Check console or use: ${otp}`
      })
    }, 600)
  })
}

export function verifyOTP(enteredOTP: string): boolean {
  // Check if entered OTP matches generated OTP
  return enteredOTP === generatedOTP || enteredOTP === sessionStorage.getItem('demo_otp')
}