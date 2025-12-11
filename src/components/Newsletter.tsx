import { Gift } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.warning("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail("");
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative border border-white/50 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-[#755757] to-[#5a4442] text-white mb-4">
            <Gift size={28} />
          </div>
          
          <h2 className="text-4xl md:text-4xl font-bold text-black">
            Stay in the Loop
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals, and beauty tips delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your email address"
              disabled={isLoading}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#755757] focus:border-transparent bg-white shadow-sm text-black placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Email address"
            />
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="bg-linear-to-r from-[#755757] to-[#5a4242] text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}