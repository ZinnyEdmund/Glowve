import { useState, useMemo } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CardContext'
import ProductCard from '../components/ProductCard'
import Loader from '../components/common/Loader'
import { Search, X } from 'lucide-react';

export default function Products() {
  const { products, loading, error } = useProducts()
  const { addToCart, cartCount, cartTotal } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)))
    return ['all', ...cats.sort()]
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
    }

    return filtered
  }, [products, selectedCategory, searchQuery, sortBy])

  if (loading) return <Loader />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Products</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-linear-to-r from-[#5a4545] to-[#806161]  text-white px-6 py-2 rounded-lg hover:bg-[#806161] transition"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Products</h1>
        <p className="text-gray-600">Discover our collection of quality products</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              <Search />
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
               <X />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-linear-to-r from-[#755757] to-[#5a4242] hover:shadow-xl text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-xl hover:scale-105'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="w-48">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as unknown as typeof sortBy)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 justify-center flex text-black">
            <span className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto">
                <Search />
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Floating Cart Summary */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 g-linear-to-r from-[#755757] to-[#5a4242] text-white p-4 rounded-2xl animate-bounce z-50">
          <div className="flex items-center gap-3">
            <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              {cartCount}
            </div>
            <div>
              <p className="font-semibold">Cart Total</p>
              <p className="text-xl font-bold">${cartTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}