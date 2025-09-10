import { useState, useEffect } from "react";
import api from "../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders
  useEffect(() => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await api.put(`/orders/${id}`, { status: newStatus });
      setOrders(orders.map((o) => (o._id === id ? res.data : o)));
      alert("✅ Status updated!");
    } catch (err) {
      alert("❌ Failed to update order status");
    }
  };

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        .orders-container {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h2 {
          color: #2c3e50;
          margin-bottom: 15px;
        }
        .order-card {
          border: 1px solid #ddd;
          background: #f9f9f9;
          padding: 15px;
          margin: 12px 0;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.05);
        }
        .order-card p {
          margin: 6px 0;
        }
        select {
          margin-top: 10px;
          padding: 6px;
          border-radius: 5px;
          border: 1px solid #bbb;
          cursor: pointer;
        }
        select:focus {
          outline: none;
          border-color: #3498db;
        }
      `}</style>

      <div className="orders-container">
        <h2>Admin – Manage Orders</h2>
        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map((o) => (
          <div key={o._id} className="order-card">
            <p>
              <b>Order ID:</b> {o._id}
            </p>
            <p>
              <b>Customer:</b> {o.user?.name} ({o.user?.email})
            </p>
            <p>
              <b>Items:</b>{" "}
              {o.items.map((item, idx) => (
                <span key={idx}>
                  {item.product?.name} x {item.quantity},{" "}
                </span>
              ))}
            </p>
            <p>
              <b>Total:</b> {o.totalPrice} LKR
            </p>
            <p>
              <b>Status:</b> {o.status}
            </p>

            {/* Dropdown to change status */}
            <select
              value={o.status}
              onChange={(e) => updateStatus(o._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
