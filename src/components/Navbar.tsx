import { useState, useCallback, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, User, Package, LogOut, ChevronDown } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CardContext"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const location = useLocation()
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
  }, [location.pathname])

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-bold text-[#755757] tracking-tight hover:opacity-75 transition-opacity duration-200"
            aria-label="Glowve Home"
          >
            Glowve
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "text-[#755757] bg-[#755757]/8"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                to="/analytics"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/analytics")
                    ? "text-[#755757] bg-[#755757]/8"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Analytics
              </Link>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-1">

            {/* CART */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              aria-label={`Cart${cartCount > 0 ? ` — ${cartCount} items` : ""}`}
            >
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#755757] text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-1 leading-none">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* USER DROPDOWN */}
            {user ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7 h-7 rounded-full bg-[#755757]/12 flex items-center justify-center text-[#755757] font-semibold text-xs shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown
                    size={13}
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50">
                    <div className="px-3 py-2.5 border-b border-gray-100 mb-1">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={14} className="text-gray-400" />
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Package size={14} className="text-gray-400" />
                      My Orders
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 bg-[#755757] text-white text-sm font-medium rounded-lg hover:bg-[#5a4242] transition-colors duration-200"
              >
                Sign in
              </Link>
            )}

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-[#755757]/8 text-[#755757]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                to="/analytics"
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/analytics")
                    ? "bg-[#755757]/8 text-[#755757]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                Analytics
              </Link>
            )}

            {user ? (
              <>
                <div className="border-t border-gray-100 my-2 mt-3!" />
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-[#755757]/12 flex items-center justify-center text-[#755757] font-semibold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">View account</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <User size={15} className="text-gray-400" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </>
            ) : (
              <div className="pt-2 pb-1 border-t border-gray-100 mt-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-[#755757] text-white text-sm font-semibold rounded-lg hover:bg-[#5a4242] transition-colors"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}