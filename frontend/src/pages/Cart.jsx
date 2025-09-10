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
      {/* Internal CSS */}
      <style>{`
        .cart-container {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h2, h3 {
          color: #2c3e50;
        }
        .cart-item {
          border: 1px solid #ddd;
          background: #f9f9f9;
          padding: 12px;
          margin: 10px 0;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.05);
        }
        .cart-item p {
          margin: 0;
        }
        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #2980b9;
        }
        .remove-btn {
          background: #e74c3c;
        }
        .remove-btn:hover {
          background: #c0392b;
        }
        .checkout-btn {
          margin-top: 15px;
          background: #27ae60;
          padding: 10px 15px;
          font-size: 16px;
        }
        .checkout-btn:hover {
          background: #1e8449;
        }
      `}</style>

      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 && <p>No items in cart</p>}

        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <p>
              {item.name} - {item.quantity} × {item.price} LKR
            </p>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}

        <h3>Total: {total} LKR</h3>

        {cart.length > 0 && (
          <button className="checkout-btn" onClick={checkout}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
