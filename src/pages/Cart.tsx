// src/pages/Cart.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CheckCircle,
  Shield,
  RotateCcw,
  Loader2,
  Package,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../context/CardContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/mockApi";
import type { Order } from "../types/index";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = (subtotal + shipping) * 0.1;
  const total = subtotal + shipping + tax;

  async function handlePlaceOrder() {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setPlacing(true);

    try {
      const order: Order = {
        id: `ORD-${Date.now()}`,
        userId: user.email,
        date: new Date().toLocaleString(),
        items: cart,
        total,
        status: "pending",
        userEmail: "",
        shippingAddress: {
          fullName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: ""
        },
        paymentMethod: "card",
        subtotal: 0,
        shipping: 0,
        tax: 0,
        paymentStatus: "pending",
        createdAt: "",
        updatedAt: ""
      };

      await placeOrder(order);
      setShowSuccess(true);

      // Clear cart and redirect after 2 seconds
      setTimeout(() => {
        clearCart();
        navigate("/orders");
      }, 2000);
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setPlacing(false);
    }
  }

  function handleQuantityChange(id: number, value: string) {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity);
    }
  }

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed!
          </h2>
          <p className="text-gray-600 mb-4">
            Your order has been successfully placed. Redirecting to orders
            page...
          </p>
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // For Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-12 text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Start
            shopping to fill it up!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-700 transition-all hover:scale-105 active:scale-95 font-semibold"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ShoppingCart className="w-10 h-10" />
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
            >
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-24 h-24 flex-0 bg-gray-100 rounded-lg overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
                    {item.title}
                  </h3>
                  {item.brand && (
                    <p className="text-sm text-zinc-900 font-semibold mb-2">
                      {item.brand}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-3">{item.category}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Qty:
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1 font-semibold"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>

                  {/* Stock Warning */}
                  {item.quantity >= item.stock && (
                    <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Maximum stock reached
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mt-3">Subtotal</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            className="w-full py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              <span>Order Summary</span>
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {subtotal < 50 && shipping > 0 && (
                <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-0 mt-0.5" />
                  <span>
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </span>
                </p>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing || !user}
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:scale-105 active:scale-95 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {placing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Placing Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Place Order</span>
                </>
              )}
            </button>

            {!user && (
              <p className="text-xs text-center text-gray-600 mt-3">
                Please{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  login
                </Link>{" "}
                to place an order
              </p>
            )}

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 text-green-600" />
                <span>Free returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
