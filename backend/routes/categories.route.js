// filename - backend/routes/avatar.route.js

const express = require("express");
const authenticate = require("../middleware/auth");

const {
  handleGetCategories,
  handleCreateCategory,
  handleDeleteCategory,
} = require("../controllers/categories.controller");

const router = express.Router();

// Email Verification
router.get("/getProfile", authenticate, handleGetCategories);
router.post("/createCategory", authenticate, handleCreateCategory);
router.post("/deleteCategory", authenticate, handleDeleteCategory);

module.exports = router;