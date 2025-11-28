import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CardContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

const USER_LINKS = [
  { to: "/profile", label: "Profile" },
  { to: "/orders", label: "Orders" },
];

const linkClasses = "hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold transition-colors";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const nav = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    nav("/");
  }, [logout, nav]);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav className="bg-white/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-3xl text-[#755757eb] font-bold gap-2"
          aria-label="Glowve Home"
        >
          Glowve
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">
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
            <Link to="/analytics" className="hover:text-blue-600 text-lg font-semibold transition-colors">
              Analytics
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link 
            to="/cart" 
            className="relative p-2 hover:text-[#785454dd] transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-lg">{user.name}</span>
              <button 
                onClick={handleLogout} 
                className="p-2 hover:text-[#785454d3] transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
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
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FFF8F0] border-t p-4 space-y-2">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded transition-colors"
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          {user && USER_LINKS.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded transition-colors"
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/analytics"
              className="block p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded transition-colors"
              onClick={closeMobile}
            >
              Analytics
            </Link>
          )}
          {user && (
            <button 
              onClick={handleLogout}
              className="w-full text-left p-2 hover:text-[#ca9c9cf2] text-lg text-[#333333] font-semibold rounded transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}