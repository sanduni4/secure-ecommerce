import api from "./axios";

// Create a new order
export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

// Get logged-in user's orders
export const getUserOrders = async () => {
  const { data } = await api.get("/orders/my");
  return data;
};

// Get all orders (admin only)
export const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};
