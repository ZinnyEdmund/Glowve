import { Star, Quote } from "lucide-react"

interface Testimonial {
  name: string
  rating: number
  text: string
  avatar: string
  avatarBg: string
  avatarText: string
  role: string
  product: string
}

// Real review sets always have variance. All-5 ratings look synthetic.
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "The skincare products have genuinely transformed my routine. I wasn't expecting results this fast.",
    avatar: "SJ",
    avatarBg: "rgba(117,87,87,0.12)",
    avatarText: "#755757",
    role: "Verified Buyer",
    product: "Vitamin C Serum",
  },
  {
    name: "Michael Chen",
    rating: 4,
    text: "Fast shipping and responsive support team. The earrings look even better in person — great quality for the price.",
    avatar: "MC",
    avatarBg: "rgba(59,130,246,0.12)",
    avatarText: "#1d4ed8",
    role: "Verified Buyer",
    product: "Gold Hoop Earrings",
  },
  {
    name: "Emma Davis",
    rating: 5,
    text: "The jewelry collection is stunning. I've worn the necklace every day for three weeks and had so many compliments.",
    avatar: "ED",
    avatarBg: "rgba(16,185,129,0.12)",
    avatarText: "#065f46",
    role: "Verified Buyer",
    product: "Silk Necklace Set",
  },
]

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  )
}

// Aggregate stat — shown above the cards as a trust anchor
const AGGREGATE = { score: "4.8", count: "2,400+" }

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER + AGGREGATE */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-[#755757] uppercase tracking-widest mb-3">
            Customer Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What customers say
          </h2>

          {/* Aggregate rating trust anchor */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{AGGREGATE.score}</span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-500">{AGGREGATE.count} reviews</span>
          </div>
        </div>

        {/* CARDS — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 p-7 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-[#755757] opacity-20 mb-4 shrink-0" />

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Review text */}
              <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-5 flex-1">
                {t.text}
              </p>

              {/* Product tag */}
              <p className="text-[11px] text-gray-400 mb-5">
                Purchased:{" "}
                <span className="font-medium text-gray-600">{t.product}</span>
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ background: t.avatarBg, color: t.avatarText }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}