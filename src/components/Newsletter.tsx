import { Mail, Users, CheckCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type SubscribeState = "idle" | "loading" | "success"

/**
 * Newsletter
 *
 * Fixes vs. previous version:
 * - Background changed from bg-gray-50 → bg-white to break the consecutive
 *   gray-50 section run (NewArrivals is also bg-gray-50)
 * - In-component success state so user gets feedback even if toast is missed
 * - Subscriber count social proof signal
 * - Consistent rounded-full icon (was rounded-2xl — mismatched with avatar pattern)
 */
export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<SubscribeState>("idle")

  const handleSubscribe = () => {
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes("@")) {
      toast.warning("Please enter a valid email address")
      return
    }
    setState("loading")
    setTimeout(() => {
      setState("success")
      setEmail("")
      toast.success("You're subscribed — welcome!")
    }, 600)
  }

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        {/* ICON */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(117,87,87,0.10)" }}
        >
          <Mail size={20} className="text-[#755757]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Stay in the loop
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-4 max-w-sm mx-auto leading-relaxed">
          Exclusive deals, new arrivals, and beauty tips — straight to your inbox.
        </p>

        {/* Social proof trust signal */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Users size={13} className="text-gray-400" />
          <span className="text-xs text-gray-400">
            Join <span className="font-semibold text-gray-600">14,000+</span> subscribers
          </span>
        </div>

        {/* SUCCESS STATE */}
        {state === "success" ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={22} className="text-emerald-500" />
            </div>
            <p className="text-sm font-semibold text-gray-900">You're subscribed!</p>
            <p className="text-xs text-gray-400">
              Check your inbox for a welcome email from Glowve.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-1 text-xs text-[#755757] hover:underline"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          /* FORM */
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubscribe()}
              placeholder="your@email.com"
              disabled={state === "loading"}
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#755757] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                // focus:ring-2 with arbitrary color not valid in Tailwind v3 arbitrary — use box-shadow
                ["--tw-ring-color" as string]: "rgba(117,87,87,0.25)",
              }}
            />
            <button
              onClick={handleSubscribe}
              disabled={state === "loading"}
              className="px-6 py-3 bg-[#755757] hover:bg-[#5a4242] text-white text-sm font-semibold rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {state === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Subscribing…
                </span>
              ) : "Subscribe"}
            </button>
          </div>
        )}

        {state !== "success" && (
          <p className="text-xs text-gray-400 mt-4">No spam, ever. Unsubscribe anytime.</p>
        )}
      </div>
    </section>
  )
}