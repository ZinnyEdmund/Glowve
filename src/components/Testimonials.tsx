import { Star, Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely love the quality! The skincare products have transformed my routine completely.",
    avatar: "SJ",
    role: "Verified Buyer",
  },
  {
    name: "Michael Chen",
    rating: 5,
    text: "Fast shipping and excellent customer service. Will definitely shop again — couldn't be happier.",
    avatar: "MC",
    role: "Verified Buyer",
  },
  {
    name: "Emma Davis",
    rating: 5,
    text: "The jewelry collection is stunning. Perfect for everyday wear and special occasions alike.",
    avatar: "ED",
    role: "Verified Buyer",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-[#755757] uppercase tracking-widest mb-3">
            Social Proof
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What customers say
          </h2>
          <p className="text-gray-500 text-sm mt-2">Real reviews from real people</p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl border border-gray-100 p-7 hover:border-gray-200 hover:shadow-md transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={22} className="text-[#755757]/20 mb-4" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#755757]/10 flex items-center justify-center text-[#755757] font-bold text-xs shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{testimonial.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}