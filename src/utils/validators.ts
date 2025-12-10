export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone: string): boolean {
  // Basic phone validation (10-15 digits)
  const re = /^\+?[\d\s\-()]{10,15}$/
  return re.test(phone)
}

export function validateZipCode(zipCode: string): boolean {
  // Basic zip code validation
  const re = /^[0-9]{5,6}$/
  return re.test(zipCode)
}

export function validateOTP(otp: string): boolean {
  // 6-digit OTP
  const re = /^[0-9]{6}$/
  return re.test(otp)
}