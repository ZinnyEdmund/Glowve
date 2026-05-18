import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"
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

function FooterNewsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!email.includes("@")) return
    toast.success("Subscribed!")
    setEmail("")
  }

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Email address"
        aria-label="Newsletter email"
        className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ca9c9c]/50 transition-colors"
      />
      <button
        onClick={handleSubmit}
        className="px-3 py-2 bg-[#755757] hover:bg-[#ca9c9c] text-white text-sm font-medium rounded-lg transition-colors duration-200 shrink-0"
        aria-label="Subscribe"
      >
        →
      </button>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12">

          {/* BRAND */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block text-xl font-bold text-[#ca9c9c] tracking-tight hover:opacity-80 transition-opacity"
            >
              Glowve
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-[220px]">
              Your destination for quality fashion, beauty, and lifestyle products.
            </p>
            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/12 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
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

        {/* BOTTOM BAR */}
        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Glowve. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}