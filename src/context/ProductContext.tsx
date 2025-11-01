import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '../types'
import { fetchProducts } from '../api/mockApi'

type ProductContextType = {
  products: Product[]
  loading: boolean
  error: string | null  // For error messages
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)  // Error handling

  useEffect(() => {
    fetchProducts()
      .then(p => {
        setProducts(p)
        setError(null)  //  Clear error on success
        setLoading(false)
      })
      .catch(err => {  //  Catch errors
        const message = err?.message || 'Failed to load products'
        setError(message)
        setLoading(false)
        console.error('Product fetch error:', err)
      })
  }, [])

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be inside ProductProvider')
  return ctx
}
