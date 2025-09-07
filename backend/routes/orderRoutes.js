const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { protect, admin } = require("../middleware/authMiddleware");

// Customer creates order
router.post("/", protect, createOrder);

// Customer views their own orders
router.get("/my", protect, getUserOrders);

// Admin views all orders
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await require("../models/Order").find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
