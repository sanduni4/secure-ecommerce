import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    try {
      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      await api.post("/orders", { products, totalPrice: total });
      alert("✅ Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      alert("❌ Failed to place order. Please login.");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>No items in cart</p>}
      {cart.map((item) => (
        <div key={item._id}>
          <p>
            {item.name} - {item.quantity} × {item.price} LKR
          </p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: {total} LKR</h3>
      {cart.length > 0 && <button onClick={checkout}>Checkout</button>}
    </div>
  );
}

export default Cart;
