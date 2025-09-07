const Order = require('../models/Order');

// Create order
exports.createOrder = async (req, res) => {
  const { products, totalPrice } = req.body;
  const order = new Order({ user: req.user.id, products, totalPrice });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product', 'name price');
  res.json(orders);
};
