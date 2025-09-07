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
      <h2>My Orders</h2>
      {orders.length === 0 && <p>You have not placed any orders yet.</p>}

      {orders.map((o) => (
        <div
          key={o._id}
          style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}
        >
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
  );
}

export default Orders;
