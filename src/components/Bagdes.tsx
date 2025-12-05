import { Truck, Shield, Headphones, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { memo } from "react";
import type { FC } from "react";

interface Badge {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BADGES: Badge[] = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", description: "100% protected checkout" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated customer service" },
  { icon: Gift, title: "Gift Cards", description: "Perfect for any occasion" }
];

const TrustBadges: FC = memo(() => (
  <section className="py-16">
    <div className="inset-0 opacity-60" />
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {BADGES.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className="group relative bg-white/70 backdrop-blur-sm border border-white/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#755757]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-linear-to-br from-[#755757] to-[#5a4242] text-white mb-4 group-hover:scale-110 transition-transform">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-black mb-1 text-sm md:text-2xl">{title}</h3>
              <p className="text-xs md:text-lg text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

TrustBadges.displayName = "TrustBadges";
export default TrustBadges;
