// src/components/Navbar.tsx

import { useState, useCallback } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, User, Package, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CardContext"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = useCallback(() => {
    logout()
    nav("/")
  }, [logout, nav])

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center text-2xl text-[#755757] font-bold transition-all duration-300 hover:scale-110 hover:text-[#ca9c9cf2]"
          aria-label="Glowve Home"
        >
          <span className="relative">
            Glowve
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ca9c9cf2] transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="relative text-base text-[#333333] font-medium transition-all duration-300 hover:text-[#ca9c9cf2] group"
            >
              {link.label}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ca9c9cf2] transition-all duration-300 ${
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link 
              to="/analytics" 
              className="relative text-base text-[#333333] font-medium transition-all duration-300 hover:text-[#ca9c9cf2] group"
            >
              Analytics
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ca9c9cf2] transition-all duration-300 ${
                  isActive('/analytics') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <Link
            to="/cart"
            className="relative p-2 hover:text-[#785454] transition-all duration-300 hover:scale-110 group"
          >
            <ShoppingCart size={22} className="transition-transform duration-300 group-hover:rotate-12" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* USER DROPDOWN */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setDropdownOpen(p => !p)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <User size={18} className="text-gray-700" />
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 animate-slideDown origin-top">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-sm transition-all duration-200 hover:pl-5"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} className="text-gray-600" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-sm transition-all duration-200 hover:pl-5"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Package size={16} className="text-gray-600" />
                    <span>Orders</span>
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm transition-all duration-200 hover:pl-5 text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-black hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Login
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 transition-all duration-300 hover:scale-110 hover:bg-white/20 rounded-lg"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={22} className="transition-transform duration-300 rotate-90" />
            ) : (
              <Menu size={22} className="transition-transform duration-300" />
            )}
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
                className={`block px-3 py-2.5 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-all duration-200 hover:pl-5 ${
                  isActive(link.to) ? 'bg-gray-100 border-l-4 border-[#ca9c9cf2]' : ''
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                to="/analytics"
                className={`block px-3 py-2.5 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-all duration-200 hover:pl-5 ${
                  isActive('/analytics') ? 'bg-gray-100 border-l-4 border-[#ca9c9cf2]' : ''
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Analytics
              </Link>
            )}

            {user ? (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-all duration-200 hover:pl-5"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-all duration-200 hover:pl-5"
                  onClick={() => setMobileOpen(false)}
                >
                  <Package size={18} />
                  <span>Orders</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 text-red-600 font-medium rounded-md transition-all duration-200 hover:pl-5"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2.5 bg-black text-white text-center rounded-md font-medium transition-all duration-300 hover:bg-zinc-700 hover:scale-105"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  )
}