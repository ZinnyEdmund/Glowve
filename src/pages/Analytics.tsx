// import React from 'react'
import { useProducts } from '../context/ProductContext'
import { getTopSellingProducts } from '../utils/AnalyticsHelper'

export default function Analytics(){
  const { products } = useProducts()
  const top = getTopSellingProducts(products)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-600">Top products</p><ul>{top.map(p=> <li key={p.id} className="py-1">{p.name} - {p.sold}</li>)}</ul></div>
      </div>
    </div>
  )
}
