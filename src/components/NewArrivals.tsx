import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { memo } from "react";
import type { FC } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge: string;
  badgeColor: string;
  rating: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silk Blend Scarf",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    badge: "New",
    badgeColor: "bg-emerald-500",
    rating: 4.8
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    price: 32.5,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    badge: "Trending",
    badgeColor: "bg-rose-500",
    rating: 4.9
  },
  {
    id: 3,
    name: "Gold Hoop Earrings",
    price: 68.0,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    badge: "New",
    badgeColor: "bg-emerald-500",
    rating: 5.0
  },
  {
    id: 4,
    name: "Organic Face Cream",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    rating: 4.7
  }
];

const NewArrivals: FC = memo(() => (
  <section className="py-20 bg-linear-to-b from-white via-[#FFF8F0]/30 to-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#755757]" size={24} />
            <span className="text-sm font-semibold text-[#755757] uppercase tracking-wider">
              Just Dropped
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">New Arrivals</h2>
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
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <span
                className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}
              >
                {product.badge}
              </span>

              <button
                className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg"
                aria-label="Add to wishlist"
              >
                <Heart size={18} className="hover:fill-red-500 hover:text-red-500 transition-colors" />
              </button>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 text-sm md:text-base">{product.name}</h3>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold bg-linear-to-r from-[#755757] to-[#5a4242] bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-700">{product.rating}</span>
                </div>
              </div>

              <button className="w-full bg-linear-to-r from-[#755757] to-[#5a4242] text-white py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

NewArrivals.displayName = "NewArrivals";
export default NewArrivals;
