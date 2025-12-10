export type Product = {
  id: number
  title: string
  price: number
  category: string
  thumbnail: string
  images: string[]
  description: string
  stock: number
  rating: number
  brand?: string
  discountPercentage?: number
}

export type CartItem = Product & { quantity: number }

export type User = {
  email: string
  name: string
  role: 'admin' | 'user'
  phone?: string
  address?: string
  city?: string
  zipCode?: string
  country?: string
  isPhoneVerified?: boolean
}

export type ShippingAddress = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export type PaymentMethod = 'card' | 'bank_transfer' | 'paystack' | 'stripe'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type Order = {
  id: string
  userId: string
  date: string
  userEmail: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  paymentStatus: 'pending' | 'paid' | 'failed'
  transactionId?: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
}

export type AnalyticsData = {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  revenueByDay: { date: string; revenue: number }[]
  topProducts: { product: string; sales: number; revenue: number }[]
  ordersByStatus: { status: string; count: number }[]
  customerGrowth: { date: string; customers: number }[]
}

export type OTPVerification = {
  phone: string
  code: string
  expiresAt: number
}