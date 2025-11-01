import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CardContext";
// import glowvee from '../assets/glowvee.png'

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart(); // Get real cart count
  const nav = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <nav className="bg-white/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-3xl text-[#755757eb] font-bold gap-2"
        >
          Glowve
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            to="/"
            className="hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-[#c99696eb] text-lg text-[#333333] font-semibold"
          >
            Products
          </Link>
          {user && (
            <Link
              to="/profile"
              className="hover:text-[#c99696eb] text-lg text-[#333333] font-semibold"
            >
              Profile
            </Link>
          )}
          {user && (
            <Link
              to="/orders"
              className="hover:text-[#c99696eb] text-lg text-[#333333] font-semibold"
            >
              Orders
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/analytics" className="hover:text-blue-600">
              Analytics
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 hover:text-[#785454dd]">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-lg">{user.name}</span>
              <button onClick={handleLogout} className="p-2 hover:text-[#785454d3]">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FFF8F0] border-t p-4 space-y-2">
          <Link to="/" className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded">
            Home
          </Link>
          <Link to="/products" className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded">
            Products
          </Link>
          {user && (
            <Link to="/profile" className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded">
              Profile
            </Link>
          )}
          {user && (
            <Link to="/orders" className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded">
              Orders
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/analytics"
              className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded"
            >
              Analytics
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
