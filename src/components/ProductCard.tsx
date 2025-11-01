import type { Product } from '../types'

export default function ProductCard({product, onAdd}:{product:Product,onAdd?: (p:Product)=>void}){
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition">
      <div className="text-5xl text-center mb-3">{product.image}</div>
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <div className="mt-auto flex items-center justify-between mb-2">
        <span className="text-lg font-semibold text-blue-600">${product.price.toFixed(2)}</span>
        {onAdd && (
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500">{product.stock} in stock</p>
    </div>
  )
}