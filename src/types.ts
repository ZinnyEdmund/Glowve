export type User = {
  email: string
  name: string
  role: 'admin' | 'user'
  phone?: string
  address?: string
  city?: string
  zipCode?: string
}

export type Product = {
  id: number
  name: string
  price: number
  category: string
  image?: string
  description?: string
  stock: number
  sold?: number  
}

export type CartItem = Product & { quantity: number }

export type Order = {
  id: string
  date: string
  items: CartItem[]
  total: number
  shippingInfo: Partial<User>
  status: string
  paymentMethod: string
}
