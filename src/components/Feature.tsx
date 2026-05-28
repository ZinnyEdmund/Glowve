import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import bag from "/bag.jpg"
import blush from "/blush.jpg"
import necklace1 from "/necklace1.jpg"
import myskincare from "/myskincare.jpg"

const FEATURES = [
  { pic: bag, name: "Fashion", count: "120+ styles", to: "/products?category=fashion" },
  { pic: blush, name: "Beauty", count: "80+ products", to: "/products?category=beauty" },
  { pic: necklace1, name: "Jewelry", count: "60+ pieces", to: "/products?category=jewelry" },
  { pic: myskincare, name: "Skincare", count: "40+ essentials", to: "/products?category=skincare" },
]

/**
 * Feature — Category grid
 *
 * Improvements vs. previous:
 * - Added item count per category so users have context before clicking
 * - Grid is now 2 col mobile → 4 col lg, but also 2 col sm with wider gap
 *   (true 3-col state isn't needed here since 4 items naturally fit 2/4)
 * - Gradient intensifies on hover for a more intentional overlay response
 */
export default function Feature() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-semibold text-[#755757] uppercase tracking-widest mb-2">
              Browse by
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Categories</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#755757] hover:text-[#5a4242] transition-colors group"
          >
            All products
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {FEATURES.map(item => (
            <Link
              key={item.name}
              to={item.to}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] block"
              aria-label={`Browse ${item.name} — ${item.count}`}
            >
              {/* IMAGE */}
              <img
                src={item.pic}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* GRADIENT OVERLAY — intensifies on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent group-hover:from-black/75 transition-all duration-300" />

              {/* LABEL */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {/* Item count — visible at rest, slightly dimmed */}
                <p className="text-white/55 text-[11px] uppercase tracking-wider font-medium mb-1 group-hover:text-white/80 transition-colors duration-200">
                  {item.count}
                </p>
                <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                <span className="inline-flex items-center gap-1 text-white/60 text-xs mt-2 group-hover:text-white group-hover:gap-1.5 transition-all duration-200">
                  Shop now
                  <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#755757]"
          >
            View all products
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}