import { Truck, Shield, Headphones, Gift } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { memo } from "react"
import type { FC } from "react"

interface Badge {
  icon: LucideIcon
  title: string
  description: string
}

const BADGES: Badge[] = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", description: "100% protected checkout" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated customer service" },
  { icon: Gift, title: "Gift Cards", description: "Perfect for any occasion" },
]

const TrustBadges: FC = memo(() => (
  <section className="border-y border-gray-100 py-2">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Strip: side-by-side on all sizes, stacked icon+text on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
        {BADGES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-center gap-3 px-6 py-5 group hover:bg-gray-50 transition-colors duration-200 first:pl-0 last:pr-0"
          >
            <div className="shrink-0 w-9 h-9 rounded-xl bg-[#755757]/10 flex items-center justify-center text-[#755757] group-hover:bg-[#755757] group-hover:text-white transition-all duration-250">
              <Icon size={17} strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm leading-tight">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-tight">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
))

TrustBadges.displayName = "TrustBadges"
export default TrustBadges