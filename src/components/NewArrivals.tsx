import { ArrowRight, Sparkles } from "lucide-react"
import { memo } from "react"
import type { FC } from "react"
import { Link } from "react-router-dom"

interface Product {
  id: number
  name: string
  image: string
  badge: string
  badgeColor: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silk Blend Scarf",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    badge: "New",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    badge: "Trending",
    badgeColor: "bg-rose-500",
  },
  {
    id: 3,
    name: "Gold Hoop Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    badge: "New",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Organic Face Cream",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    badge: "Hot",
    badgeColor: "bg-orange-500",
  },
]

const NewArrivals: FC = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={13} className="text-[#755757]" />
            <span className="text-[11px] font-semibold text-[#755757] uppercase tracking-widest">
              Just Dropped
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">New Arrivals</h2>
          <p className="text-gray-500 text-sm mt-1">Discover our latest collection</p>
        </div>
        <Link
          to="/products"
          className="group flex items-center gap-1.5 text-sm font-medium text-[#755757] hover:text-[#5a4242] transition-colors shrink-0"
        >
          View all
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PRODUCTS.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 block"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden aspect-square bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <span
                className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm`}
              >
                {product.badge}
              </span>
            </div>

            {/* INFO */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1 mb-2.5">
                {product.name}
              </h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#755757] group-hover:gap-1.5 transition-all duration-200">
                View product
                <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
))

NewArrivals.displayName = "NewArrivals"
export default NewArrivals