import { ArrowRight, Sparkles } from "lucide-react"
import { memo } from "react"
import type { FC } from "react"
import { Link } from "react-router-dom"

const PromoBanner: FC = memo(() => (
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="relative bg-[#755757] rounded-3xl overflow-hidden">

        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative grid lg:grid-cols-5 items-center">

          {/* LEFT — TEXT */}
          <div className="lg:col-span-3 px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={11} />
              Limited Time Offer
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-4">
              Summer<br />
              <span className="text-white/50 font-black">Collection</span>
            </h2>
            <p className="text-white/70 text-base lg:text-lg max-w-md leading-relaxed mb-8">
              Get up to 40% off on selected items. Elevate your style with our curated summer essentials.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 bg-white text-[#755757] px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all duration-200 group shadow-lg"
            >
              Shop Now
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* RIGHT — DISCOUNT CALLOUT */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center px-8 py-12 lg:py-16 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
            <div className="text-center">
              <p className="text-[90px] sm:text-[110px] lg:text-[130px] font-black text-white leading-none tabular-nums">
                40
              </p>
              <div className="flex items-center justify-center gap-2 -mt-3">
                <span className="text-4xl font-black text-white/60">%</span>
                <span className="text-4xl font-black text-white">OFF</span>
              </div>
              <p className="text-white/50 text-sm mt-4 max-w-[180px] mx-auto leading-relaxed">
                On selected items this season
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
))

PromoBanner.displayName = "PromoBanner"
export default PromoBanner