// src/components/Navbar.tsx

import { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CardContext"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
]

const linkClasses =
  "hover:text-[#ca9c9cf2] text-base text-[#333333] font-medium transition-colors duration-300"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = useCallback(() => {
    logout()
    nav("/")
  }, [logout, nav])

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center text-2xl text-[#755757] font-bold transition-transform duration-300 hover:scale-105"
          aria-label="Glowve Home"
        >
          Glowve
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link to="/analytics" className={linkClasses}>
              Analytics
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <Link
            to="/search"
            className="p-2 hover:text-[#785454] transition-colors duration-300"
            aria-label="Search"
          >
            <Search size={20} />
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="relative p-2 hover:text-[#785454] transition-colors duration-300"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 p-3 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* USER DROPDOWN */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setDropdownOpen(p => !p)}
                className="flex items-center gap-2 p-2 hover:text-[#785454] transition-colors duration-300"
              >
                <span className="text-sm text-gray-700">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 animate-fadeIn">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-black hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-colors duration-300"
            >
              Login
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 transition-transform duration-300 hover:scale-110"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slideDown">
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 bg-black text-white text-center rounded-md font-medium transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
