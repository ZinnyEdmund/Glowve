// src/components/Navbar.tsx

import { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CardContext"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
]

const USER_LINKS = [
  { to: "/profile", label: "Profile" },
  { to: "/orders", label: "Orders" },
]

const linkClasses = "hover:text-[#ca9c9cf2] text-base text-[#333333] font-medium transition-colors"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = useCallback(() => {
    logout()
    nav("/")
  }, [logout, nav])

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl text-[#755757] font-bold"
          aria-label="Glowve Home"
        >
          Glowve
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </Link>
          ))}
          {user && USER_LINKS.map(link => (
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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link 
            to="/cart" 
            className="relative p-2 hover:text-[#785454] transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-gray-700">{user.name}</span>
              <button 
                onClick={handleLogout} 
                className="p-2 hover:text-[#785454] transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-black hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="block px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}
            {user && USER_LINKS.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="block px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                to="/analytics"
                className="block px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
                onClick={closeMobile}
              >
                Analytics
              </Link>
            )}
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 bg-black text-white text-center rounded-md font-medium"
                onClick={closeMobile}
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