// backend/routes/categories.route.js

const express = require("express");
const authenticate = require("../middleware/auth");

const {
  handleGetCategories,
  handleCreateCategory,
  handleDeleteCategory,
  handleUpdateCategory,
} = require("../controllers/categories.controller");

const router = express.Router();

// Category Management Routes
router.get("/getCategories", authenticate, handleGetCategories);
router.post("/createCategory", authenticate, handleCreateCategory);
router.patch("/updateCategory/:categoryId", authenticate, handleUpdateCategory);
router.delete(
  "/deleteCategory/:categoryId",
  authenticate,
  handleDeleteCategory,
);

module.exports = router;
