import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import bag from "/bag.jpg"
import blush from "/blush.jpg"
import necklace1 from "/necklace1.jpg"
import myskincare from "/myskincare.jpg"

const FEATURES = [
  { pic: bag, name: "Fashion", to: "/products?category=fashion" },
  { pic: blush, name: "Beauty", to: "/products?category=beauty" },
  { pic: necklace1, name: "Jewelry", to: "/products?category=jewelry" },
  { pic: myskincare, name: "Skincare", to: "/products?category=skincare" },
]

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
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {FEATURES.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-3/4 block"
            >
              <img
                src={item.pic}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

              {/* Category label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                <span className="inline-flex items-center gap-1 text-white/70 text-xs mt-1.5 group-hover:text-white transition-colors duration-200">
                  Shop now
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
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