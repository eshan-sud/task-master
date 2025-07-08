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
  handleVerificationStatus,
  handleLogoutAllDevices,
  handleListSessions,
} = require("../controllers/userauth.controller");

const router = express.Router();

// Auth
router.post("/login", handleLoginAuth);
router.post("/register", handleRegisterAuth);
router.post("/users/check", handleCheckUserExists);
router.patch("/resetPassword", handleResetPassword);
router.get("/refreshToken", handleRefreshToken);
// Auth - proteced routes
router.get("/me/verification-status", authenticate, handleVerificationStatus);
router.get("/sessions", authenticate, handleListSessions);
router.post("/logout", authenticate, handleLogoutAuth);
router.post("/logout/all", authenticate, handleLogoutAllDevices);

module.exports = router;
