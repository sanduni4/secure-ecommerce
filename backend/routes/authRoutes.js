const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// --------------------- AUTH ROUTES ---------------------

// Register - anyone can register
router.post("/register", registerUser);

// Login - anyone can login
router.post("/login", loginUser);

// --------------------- PROTECTED ROUTES ---------------------

// Example: Admin-only route
router.get("/admin/users", protect, authorizeRoles("admin"), async (req, res) => {
  const users = await require("../models/User").find().select("-password");
  res.json(users);
});

// Example: Customer-only route
router.get("/orders", protect, authorizeRoles("customer"), async (req, res) => {
  const orders = await require("../models/Order").find({ userId: req.user._id });
  res.json(orders);
});

module.exports = router;
