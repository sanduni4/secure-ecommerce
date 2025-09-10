const express = require("express");
const router = express.Router();

// Import controllers
const productController = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// ✅ Ensure controller functions exist
const getProducts = productController.getProducts;
const getProductById = productController.getProductById;
const createProduct = productController.createProduct;
const updateProduct = productController.updateProduct;
const deleteProduct = productController.deleteProduct;

// Routes

// Get all products (public)
router.get("/", (req, res, next) => {
  if (!getProducts) return res.status(500).json({ error: "getProducts handler missing" });
  return getProducts(req, res, next);
});

// Get single product by ID (public)
router.get("/:id", (req, res, next) => {
  if (!getProductById) return res.status(500).json({ error: "getProductById handler missing" });
  return getProductById(req, res, next);
});

// Create a new product (admin only)
router.post("/", protect, admin, (req, res, next) => {
  if (!createProduct) return res.status(500).json({ error: "createProduct handler missing" });
  return createProduct(req, res, next);
});

// Update a product (admin only)
router.put("/:id", protect, admin, (req, res, next) => {
  if (!updateProduct) return res.status(500).json({ error: "updateProduct handler missing" });
  return updateProduct(req, res, next);
});

// Delete a product (admin only)
router.delete("/:id", protect, admin, (req, res, next) => {
  if (!deleteProduct) return res.status(500).json({ error: "deleteProduct handler missing" });
  return deleteProduct(req, res, next);
});

module.exports = router;
