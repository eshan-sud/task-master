// filename - routes/userauth.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleGetUser,
  handleGenerateOTP,
  handleVerifyOTP,
} = require("../controllers/userauth.controller");

const router = express.Router();

// Auth
router.post("/login", handleLoginAuth);
router.get("/logout", handleLogoutAuth);
router.post("/register", handleRegisterAuth);
router.get("/getUser", authenticate, handleGetUser);
router.post("/generateOTP", authenticate, handleGenerateOTP);
router.get("/verifyOTP", authenticate, handleVerifyOTP);

// Tasks
// router.get("/getTasks", authenticate, handleGetTasks);

module.exports = router;
