const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all products (anyone)
router.get("/", getProducts);

// Create a new product (admin only)
router.post("/", protect, admin, createProduct);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product (admin only)
router.put("/:id", protect, admin, updateProduct);

// Delete a product (admin only)
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
