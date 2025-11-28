import { ArrowRight, Sparkles } from "lucide-react";
import { memo } from "react";
import type { FC } from "react";

const PromoBanner: FC = memo(() => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="relative bg-linear-to-br from-[#755757] via-[#5a4242] to-[#755757] rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDh2OGgtOHptMCAwaC04djhIOHYtOGg4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="grid lg:grid-cols-2 gap-8 items-center relative">
          <div className="p-8 lg:p-16 text-white space-y-6">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-5 py-2 rounded-full border border-white/30">
              <Sparkles size={16} />
              Limited Time Offer
            </span>

            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Summer
              <br />
              <span className="bg-linear-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Collection
              </span>
            </h2>

            <p className="text-white/90 text-lg lg:text-xl max-w-md leading-relaxed">
              Get up to 40% off on selected items. Elevate your style with our curated summer essentials.
            </p>

            <a
              href="#sale"
              className="inline-flex items-center gap-3 bg-white text-[#755757] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-xl group"
            >
              Shop Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative h-full min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
            <div className="relative text-center text-white space-y-4 p-8">
              <div className="inline-block">
                <p className="text-8xl lg:text-9xl font-black bg-linear-to-br from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  40%
                </p>
                <p className="text-3xl lg:text-4xl font-bold -mt-4">OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

PromoBanner.displayName = "PromoBanner";
export default PromoBanner;
