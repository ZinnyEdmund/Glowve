import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-[#ca9c9c]">Glowve</h3>
          <p className="text-gray-400 mb-4">
            Your destination for quality fashion, beauty, and lifestyle products.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
            <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <p className="text-gray-400 mb-4">Stay connected on social media</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">FB</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">IG</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Glowve. All rights reserved.</p>
      </div>
    </footer>
  );
}
