import { useEffect, useState } from "react";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the logged-in customer
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        .orders-container {
          max-width: 800px;
          margin: 40px auto;
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        .order-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          background-color: #fafafa;
          transition: box-shadow 0.2s ease-in-out;
        }
        .order-card:hover {
          box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
        }
        .order-card p {
          margin: 6px 0;
        }
        .order-card b {
          color: #34495e;
        }
        ul {
          padding-left: 20px;
          margin: 8px 0;
        }
        li {
          margin-bottom: 4px;
        }
        .empty-msg {
          text-align: center;
          margin-top: 20px;
          color: #777;
        }
      `}</style>

      <div className="orders-container">
        <h2>My Orders</h2>
        {orders.length === 0 && <p className="empty-msg">You have not placed any orders yet.</p>}

        {orders.map((o) => (
          <div key={o._id} className="order-card">
            <p>
              <b>Order ID:</b> {o._id}
            </p>
            <p>
              <b>Status:</b> {o.status}
            </p>
            <p>
              <b>Items:</b>
            </p>
            <ul>
              {o.products.map((item) => (
                <li key={item.productId._id}>
                  {item.productId.name} × {item.quantity} ({item.productId.price} LKR each)
                </li>
              ))}
            </ul>
            <p>
              <b>Total Price:</b> {o.totalPrice} LKR
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
