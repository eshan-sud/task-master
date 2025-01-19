// filename - backend/routes/avatar.route.js

const express = require("express");
const authenticate = require("../middleware/auth");

const {
  handleGetCategories,
  handleCreateCategory,
} = require("../controllers/categories.controller");

const router = express.Router();

// Email Verification
router.get("/getProfile", authenticate, handleGetProfile);
