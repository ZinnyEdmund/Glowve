import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CardContext'
import ProductCard from '../components/ProductCard'
import Loader from '../components/common/Loader'

export default function Products() {
  const { products, loading } = useProducts()
  const { addToCart, cart } = useCart()  // ← ADD THIS
  const [selected, setSelected] = useState('All')

  if (loading) return <Loader />

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = selected === 'All' ? products : products.filter(p => p.category === selected)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-3 py-1 rounded whitespace-nowrap transition ${
              selected === c ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => addToCart(p)}  // ← USE GLOBAL CART
          />
        ))}
      </div>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <div className="mt-8 bg-blue-50 p-4 rounded">
          <p className="font-bold">
            🛒 Cart: {cartCount} items | Total: ${cartTotal.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}