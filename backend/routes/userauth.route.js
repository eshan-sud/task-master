// backend/routes/userauth.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  handleRefreshToken,
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleCheckUserExists,
  handleResetPassword,
  handleSendOTP,
  handleVerifyOTP,
  handleVerificationStatus,
  handleLogoutAllDevices,
  handleListSessions,
} = require("../controllers/userauth.controller");

const router = express.Router();

// Auth
router.post("/login", handleLoginAuth);
router.post("/register", handleRegisterAuth);
router.post("/checkUserExists", handleCheckUserExists);
router.patch("/resetPassword", handleResetPassword);
router.get("/getVerificationStatus", handleVerificationStatus);
router.get("/refreshToken", handleRefreshToken);
// Auth - proteced routes
router.get("/sessions", authenticate, handleListSessions);
router.get("/logout", authenticate, handleLogoutAuth);
router.post("/logout/all", authenticate, handleLogoutAllDevices);
// OTP
router.post("/sendOTP", handleSendOTP);
router.post("/verifyOTP", handleVerifyOTP);

module.exports = router;
