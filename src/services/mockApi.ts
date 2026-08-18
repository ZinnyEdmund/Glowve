// src/api/index.ts

import { supabase } from '../lib/supabaseClient'
import type { Product, User, Order } from '../types'

const DB_KEY = 'malli_mock_db_v1'

// DATABASE HELPERS

type UserWithPassword = User & { password: string }

type MockDB = {
  users: Record<string, UserWithPassword>
  orders: Order[]
}

function getDB(): MockDB {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) {
      const initialDB: MockDB = { users: {}, orders: [] }
      localStorage.setItem(DB_KEY, JSON.stringify(initialDB))
      return initialDB
    }
    return JSON.parse(raw)
  } catch (error) {
    console.error('Error reading DB:', error)
    return { users: {}, orders: [] }
  }
}

function saveDB(db: MockDB): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  } catch (error) {
    console.error('Error saving DB:', error)
    throw error
  }
}

// PRODUCT API FUNCTIONS

type ProductRow = {
  id: number
  title: string
  description: string
  price: number
  category: string
  thumbnail: string
  images: string[]
  stock: number
  rating: number
  brand: string | null
  discount_percentage: number | null
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, title, description, price, category, thumbnail, images, stock, rating, brand, discount_percentage')
    .eq('is_active', true)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }

  return (data as ProductRow[]).map((p) => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    category: p.category,
    thumbnail: p.thumbnail,
    images: p.images && p.images.length > 0 ? p.images : [p.thumbnail],
    description: p.description,
    stock: p.stock,
    rating: Number(p.rating),
    brand: p.brand ?? undefined,
    discountPercentage: p.discount_percentage != null ? Number(p.discount_percentage) : undefined,
  }))
}

// NOTE: fetchProductsByCategory / fetchCategories / searchProducts previously
// called dummyjson and were already unused by the frontend (Products.tsx
// filters client-side). Left as-is for now — dead-code cleanup will happen
// alongside the Phase 9 orders rewrite rather than as a separate pass.

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const products = await fetchProducts()
  return products.filter((p) => p.category === category)
}

export async function fetchCategories(): Promise<string[]> {
  const products = await fetchProducts()
  return Array.from(new Set(products.map((p) => p.category)))
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await fetchProducts()
  const q = query.toLowerCase()
  return products.filter(
    (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  )
}

// ORDER FUNCTIONS
// Still backed by localStorage — replaced in Phase 9 with real Supabase
// orders/order_items tables. Left untouched here.

export async function placeOrder(order: Order): Promise<Order> {
  await new Promise(res => setTimeout(res, 300))
  const db = getDB()
  db.orders.push(order)
  saveDB(db)
  return order
}

export async function fetchOrders(): Promise<Order[]> {
  await new Promise(res => setTimeout(res, 200))
  const db = getDB()
  return db.orders
}

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  await new Promise(res => setTimeout(res, 200))
  const db = getDB()
  return db.orders.filter(order => order.userId === userId)
}