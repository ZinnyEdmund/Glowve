import { ArrowRight, Sparkles } from "lucide-react"
import { memo } from "react"
import type { FC } from "react"
import { Link } from "react-router-dom"
import CountdownTimer from "./CountdownTimer"

// Sale deadline — 48 h from a fixed reference date.
// In production, pull this from your CMS or feature-flag system.
const SALE_DEADLINE = (() => {
  const d = new Date()
  d.setHours(d.getHours() + 48)
  return d
})()

const PromoBanner: FC = memo(() => (
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="relative bg-[#755757] rounded-3xl overflow-hidden">

        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative grid lg:grid-cols-5 items-stretch">

          {/* LEFT — TEXT */}
          <div className="lg:col-span-3 px-8 py-12 sm:px-12 lg:px-16 lg:py-16 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
              <Sparkles size={11} />
              Limited Time Offer
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.04] mb-4">
              Summer<br />
              <span className="text-white/45 font-black">Collection</span>
            </h2>
            <p className="text-white/65 text-base lg:text-lg max-w-sm leading-relaxed mb-8">
              Get up to 40% off on selected items. Elevate your style with our
              curated summer essentials.
            </p>

            {/* COUNTDOWN — gives the "Limited Time" claim teeth */}
            <div className="mb-8">
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-3">
                Offer ends in
              </p>
              <CountdownTimer deadline={SALE_DEADLINE} />
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 bg-white text-[#755757] px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors duration-200 group shadow-lg w-fit"
            >
              Shop Now
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* RIGHT — DISCOUNT CALLOUT */}
          {/* On mobile this sits below the text but stays proportional.
              On desktop it's a side column with a left border. */}
          <div className="lg:col-span-2 flex items-center justify-center px-8 py-10 lg:py-16 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
            <div className="text-center">
              {/* Big number — fixed to not overflow on small screens */}
              <p
                className="font-black text-white leading-none tabular-nums"
                style={{ fontSize: "clamp(72px, 16vw, 140px)" }}
              >
                40
              </p>
              <div className="flex items-center justify-center gap-2 -mt-2">
                <span className="text-3xl font-black text-white/50">%</span>
                <span className="text-3xl font-black text-white">OFF</span>
              </div>
              <p className="text-white/40 text-xs mt-4 max-w-[160px] mx-auto leading-relaxed uppercase tracking-wider">
                On selected items
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