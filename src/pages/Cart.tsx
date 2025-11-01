import { useCart } from "../context/CardContext"; // ← ADD THIS
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../api/mockApi";
import type { Order } from "../types";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart(); // ← ADD THIS
  const { user } = useAuth();

  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = (subtotal + shipping) * 0.1;
  const total = subtotal + shipping + tax;

  async function handlePlaceOrder() {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const order: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: cart,
      total,
      shippingInfo: { name: user.name, email: user.email },
      status: "Completed",
      paymentMethod: "Card (Demo)",
    };

    try {
      await placeOrder(order);
      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      alert("Failed to place order");
      console.error(error);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">
          Add items from the products page to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex gap-4">
            <div className="text-4xl">{item.image}</div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow max-w-md">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

