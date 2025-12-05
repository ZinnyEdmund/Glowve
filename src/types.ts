// src/types/index.ts

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
}

export type Order = {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'shipped' | 'delivered'
  date: string
}