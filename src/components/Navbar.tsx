import { useState, useCallback, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, User, Package, LogOut, ChevronDown } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CardContext"
import { useScrolled } from "../components/common/useScrolled"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
]

// Tailwind v3 does not support /8 or /12 with arbitrary colors.
// Use inline style for these fills.
const BRAND_FILL_08 = "rgba(117,87,87,0.08)"
const BRAND_FILL_12 = "rgba(117,87,87,0.12)"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const location = useLocation()
  const scrolled = useScrolled(8)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = useCallback(() => {
    logout()
    setDropdownOpen(false)
    setMobileOpen(false)
    nav("/")
  }, [logout, nav])

  const isActive = (path: string) => location.pathname === path

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`bg-white sticky top-0 z-40 transition-shadow duration-300 ${
        scrolled
          ? "border-b border-gray-200 shadow-[0_1px_16px_rgba(0,0,0,0.06)]"
          : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-bold text-[#755757] tracking-tight hover:opacity-70 transition-opacity duration-200"
            aria-label="Glowve — Go to homepage"
          >
            Glowve
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={isActive(link.to) ? { background: BRAND_FILL_08 } : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to)
                    ? "text-[#755757]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                to="/analytics"
                style={isActive("/analytics") ? { background: BRAND_FILL_08 } : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive("/analytics")
                    ? "text-[#755757]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Analytics
              </Link>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-0.5">

            {/* CART */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              aria-label={
                cartCount > 0
                  ? `Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`
                  : "Cart — empty"
              }
            >
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#755757] text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-1 leading-none tabular-nums">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* USER DROPDOWN */}
            {user ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-controls="user-dropdown"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#755757] font-semibold text-xs shrink-0"
                    style={{ background: BRAND_FILL_12 }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate hidden lg:block">{user.name}</span>
                  <ChevronDown
                    size={13}
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* DROPDOWN — CSS transition for smooth entry */}
                <div
                  id="user-dropdown"
                  role="menu"
                  aria-label="User menu"
                  className={`absolute right-0 mt-1.5 w-56 bg-white rounded-xl border border-gray-100 shadow-lg shadow-black/[.06] py-1.5 z-50 origin-top-right transition-all duration-150 ${
                    dropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {/* Identity header */}
                  <div className="px-3 py-2.5 border-b border-gray-100 mb-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5 font-medium">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  </div>

                  <Link
                    to="/profile"
                    role="menuitem"
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={14} className="text-gray-400 shrink-0" />
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    role="menuitem"
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Package size={14} className="text-gray-400 shrink-0" />
                    My Orders
                  </Link>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} className="shrink-0" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center ml-1 px-4 py-2 bg-[#755757] text-white text-sm font-semibold rounded-lg hover:bg-[#5a4242] transition-colors duration-200"
              >
                Sign in
              </Link>
            )}

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ml-0.5"
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-3 pb-4 space-y-0.5">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={isActive(link.to) ? { background: BRAND_FILL_08 } : undefined}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-[#755757]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link
              to="/analytics"
              style={isActive("/analytics") ? { background: BRAND_FILL_08 } : undefined}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/analytics")
                  ? "text-[#755757]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Analytics
            </Link>
          )}

          {user ? (
            <div className="border-t border-gray-100 !mt-3 pt-3 space-y-0.5">
              {/* Mobile identity */}
              <div className="flex items-center gap-3 px-3 py-2 mb-1">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#755757] font-bold text-sm shrink-0"
                  style={{ background: BRAND_FILL_12 }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Manage account</p>
                </div>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <User size={15} className="text-gray-400 shrink-0" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} className="shrink-0" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="!mt-3 pt-3 border-t border-gray-100">
              <Link
                to="/login"
                className="flex items-center justify-center w-full px-4 py-2.5 bg-[#755757] text-white text-sm font-semibold rounded-lg hover:bg-[#5a4242] transition-colors"
              >
                Sign in to your account
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}