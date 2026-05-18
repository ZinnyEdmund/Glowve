import { Mail } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = () => {
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes("@")) {
      toast.warning("Please enter a valid email address")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      toast.success("You're subscribed — welcome!")
      setEmail("")
      setIsLoading(false)
    }, 500)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        {/* ICON */}
        <div className="w-12 h-12 rounded-2xl bg-[#755757]/10 flex items-center justify-center mx-auto mb-6">
          <Mail size={20} className="text-[#755757]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Stay in the loop
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
          Exclusive deals, new arrivals, and beauty tips — straight to your inbox.
        </p>

        {/* FORM */}
        <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            placeholder="your@email.com"
            disabled={isLoading}
            aria-label="Email address"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#755757]/25 focus:border-[#755757] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="px-6 py-3 bg-[#755757] hover:bg-[#5a4242] text-white text-sm font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? "Subscribing…" : "Subscribe"}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}