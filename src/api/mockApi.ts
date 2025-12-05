// src/api/index.ts (or api.ts)

import type { Product, User, Order } from '../types'

const API_BASE = 'https://dummyjson.com'

// PRODUCT API FUNCTIONS

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products?limit=100`)
    if (!response.ok) throw new Error('Failed to fetch products')
    
    const data = await response.json()
    
    // Transform to match our Product type
    return data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      category: p.category,
      thumbnail: p.thumbnail,
      images: p.images || [p.thumbnail],
      description: p.description,
      stock: p.stock,
      rating: p.rating || 0,
      brand: p.brand,
      discountPercentage: p.discountPercentage
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products/category/${category}`)
    if (!response.ok) throw new Error('Failed to fetch products')
    
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/products/categories`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products/search?q=${query}`)
    if (!response.ok) throw new Error('Failed to search products')
    
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

// ============================================
// AUTH FUNCTIONS (Mock - Keep your existing logic)
// ============================================

type UserWithPassword = User & { password: string }

const mockUsers: Record<string, UserWithPassword> = {
  'demo@example.com': { 
    email: 'demo@example.com', 
    name: 'Admin Demo', 
    role: 'admin',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'San Francisco',
    zipCode: '94105',
    password: 'Demo123!' 
  },
  'john@example.com': { 
    email: 'john@example.com', 
    name: 'John Doe', 
    role: 'user',
    phone: '(555) 987-6543',
    address: '456 Oak Ave',
    city: 'New York',
    zipCode: '10001',
    password: 'John123!' 
  }
}

export async function login(email: string, password: string): Promise<User> {
  await new Promise(res => setTimeout(res, 300))
  
  const user = mockUsers[email]
  if (!user) throw new Error('User not found')
  if (user.password !== password) throw new Error('Invalid password')
  
  const { password: _, ...userData } = user
  return userData
}

export async function register(user: UserWithPassword): Promise<User> {
  await new Promise(res => setTimeout(res, 300))
  
  if (mockUsers[user.email]) throw new Error('Email already registered')
  
  mockUsers[user.email] = user
  const { password: _, ...userData } = user
  return userData
}

// ============================================
// ORDER FUNCTIONS (Mock)
// ============================================

const mockOrders: Order[] = []

export async function placeOrder(order: Order): Promise<Order> {
  await new Promise(res => setTimeout(res, 300))
  mockOrders.push(order)
  return order
}

export async function fetchOrders(): Promise<Order[]> {
  await new Promise(res => setTimeout(res, 200))
  return mockOrders
}