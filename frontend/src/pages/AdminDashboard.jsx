import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        .dashboard-container {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h2 {
          color: #2c3e50;
        }
        h3 {
          margin-top: 20px;
          color: #34495e;
        }
        .link {
          display: inline-block;
          margin-bottom: 10px;
          text-decoration: none;
          color: white;
          background: #3498db;
          padding: 6px 12px;
          border-radius: 5px;
        }
        .link:hover {
          background: #2980b9;
        }
        .product, .order {
          background: #ecf0f1;
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
        }
      `}</style>

      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>

        <h3>Products</h3>
        <Link to="/admin/products" className="link">
          Manage Products
        </Link>
        {products.map((p) => (
          <p key={p._id} className="product">
            {p.name} - {p.price} LKR
          </p>
        ))}

        <h3>Orders</h3>
        <Link to="/admin/orders" className="link">
          Manage Orders
        </Link>
        {orders.map((o) => (
          <div key={o._id} className="order">
            <p>
              Order by {o.userId?.name} - Status: {o.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
