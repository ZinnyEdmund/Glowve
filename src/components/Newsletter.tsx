import { Gift } from "lucide-react";
import { memo } from "react";
import type { FC } from "react";

const Newsletter: FC = memo(() => {
  const handleSubscribe = () => {
    alert("Thank you for subscribing! 🎉");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3NTU3NTciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2aDh2OGgtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-[#755757] to-[#5a4442] text-white mb-4">
              <Gift size={28} />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Stay in the Loop</h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and beauty tips delivered to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#755757] focus:border-transparent bg-white shadow-sm text-gray-900 placeholder:text-gray-400"
              />

              <button
                onClick={handleSubscribe}
                className="bg-linear-to-r from-[#755757] to-[#5a4242] text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

            <p className="text-sm text-gray-500">🔒 We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

Newsletter.displayName = "Newsletter";
export default Newsletter;
