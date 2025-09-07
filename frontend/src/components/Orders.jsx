import { useEffect, useState } from "react";
import { getUserOrders, createOrder } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const handleOrder = async () => {
    const orderData = {
      products: [
        { product: "PRODUCT_ID_1", quantity: 2 },
        { product: "PRODUCT_ID_2", quantity: 1 },
      ],
      totalPrice: 80,
    };
    try {
      const data = await createOrder(orderData);
      console.log("Order created:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      <button onClick={handleOrder}>Place Test Order</button>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total: ${order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}
