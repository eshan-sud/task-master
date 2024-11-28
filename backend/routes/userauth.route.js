// filename - backend/routes/userauth.route.js

const express = require("express");
// const authenticate = require("../middleware/auth");
const {
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleUserExists,
  handleSendOTP,
  handleVerifyOTP,
  handleResetPassword,
} = require("../controllers/userauth.controller");

const router = express.Router();

// Auth
router.post("/login", handleLoginAuth);
router.get("/logout", handleLogoutAuth);
router.post("/register", handleRegisterAuth);
router.post("/userExists", handleUserExists);
router.post("/sendOTP", handleSendOTP);
router.post("/verifyOTP", handleVerifyOTP);
router.put("/resetPassword", handleResetPassword);

module.exports = router;
