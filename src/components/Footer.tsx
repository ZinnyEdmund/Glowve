import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const QUICK_LINKS = [
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
]

const SERVICE_LINKS = [
  { to: "/shipping", label: "Shipping Info" },
  { to: "/returns", label: "Returns" },
  { to: "/faq", label: "FAQ" },
]

const SOCIAL = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

/**
 * FooterNewsletter
 *
 * Fixes vs. previous version:
 * - → HTML entity replaced with a proper Send icon (was not accessible)
 * - Invalid Tailwind v3 opacity values (white/5, white/6, white/8, white/12)
 *   replaced with rgba() inline styles
 */
function FooterNewsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    const trimmed = email.trim()
    if (!trimmed.includes("@")) {
      toast.warning("Enter a valid email")
      return
    }
    toast.success("Subscribed!")
    setEmail("")
  }

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        placeholder="Email address"
        aria-label="Newsletter email"
        className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg text-white placeholder:text-gray-500 focus:outline-none transition-colors"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "rgba(202,156,156,0.5)")}
        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
      />
      <button
        onClick={handleSubmit}
        aria-label="Subscribe to newsletter"
        className="px-3 py-2 text-white rounded-lg transition-colors duration-200 shrink-0 flex items-center justify-center"
        style={{ background: "#755757" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#ca9c9c")}
        onMouseLeave={e => (e.currentTarget.style.background = "#755757")}
      >
        <Send size={14} />
      </button>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN GRID
            Previous: col-span-2 lg:col-span-1 on brand column caused an awkward
            2-col layout at mobile/tablet where the brand took full width and pushed
            the other 3 columns into a cramped pair.

            Fixed: all 4 columns are equal-weight single columns on mobile (stacked),
            become 2-col at sm, then 4-col at lg.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-block text-xl font-bold text-[#ca9c9c] tracking-tight hover:opacity-80 transition-opacity"
            >
              Glowve
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-[220px]">
              Your destination for quality fashion, beauty, and lifestyle products.
            </p>

            {/* SOCIAL ICONS — all opacity values replaced with rgba() */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Get updates on new arrivals and exclusive offers.
            </p>
            <FooterNewsletter />
          </div>

        </div>

        {/* BOTTOM BAR — border-white/6 is invalid in Tailwind v3, replaced with rgba() */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Glowve. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}