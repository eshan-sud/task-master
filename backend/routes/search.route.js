// backend/routes/search.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  handleUserSearch,
  handleGlobalSearch,
} = require("../controllers/search.controller");

const router = express.Router();

// All search routes require authentication
router.use(authenticate);

// User search (for chat, task sharing, teams, etc.)
router.get("/users", handleUserSearch);

// Global search (tasks, users, etc.)
router.get("/global", handleGlobalSearch);

module.exports = router;
