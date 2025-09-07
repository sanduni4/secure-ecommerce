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
      <h2>Admin Dashboard</h2>
      <h3>Products</h3>
       <Link to="/admin/products">Manage Products</Link><br/>
      {products.map((p) => (
        <p key={p._id}>{p.name} - {p.price} LKR</p>
      ))}

      <h3>Orders</h3>
      <Link to="/admin/orders">Manage Orders</Link>
      {orders.map((o) => (
        <div key={o._id}>
          <p>Order by {o.userId?.name} - Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
