import { ArrowRight, Sparkles } from "lucide-react";
import { memo } from "react";
import type { FC } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  badge: string;
  badgeColor: string;
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
  }
];

const NewArrivals: FC = memo(() => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#755757]" size={24} />
            <span className="text-sm font-semibold text-[#755757] uppercase tracking-wider">
              Just Dropped
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">New Arrivals</h2>
          <p className="text-gray-600 text-lg">Discover our latest collection</p>
        </div>

        <a
          href="#products"
          className="group flex items-center gap-2 text-[#755757] font-semibold hover:text-[#5a4242] transition-all"
        >
          View All
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-sm transition-all duration-500"
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <span
                className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
              >
                {product.badge}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-center text-black mb-2 line-clamp-1 text-lg md:text-base">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

NewArrivals.displayName = "NewArrivals";
export default NewArrivals;
