import { supabase } from '../lib/supabaseClient'
import type { Product } from '../types'

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