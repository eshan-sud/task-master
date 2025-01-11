// filename - backend/routes/userauth.route.js

const express = require("express");
// const authenticate = require("../middleware/auth");
const {
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleCheckUserExists,
  handleResetPassword,
  handleSendOTP,
  handleVerifyOTP,
  handleVerificationStatus,
} = require("../controllers/userauth.controller");

const router = express.Router();

// Auth
router.post("/login", handleLoginAuth);
router.get("/logout", handleLogoutAuth);
router.post("/register", handleRegisterAuth);
router.post("/checkUserExists", handleCheckUserExists);
router.patch("/resetPassword", handleResetPassword);
router.get("/getVerificationStatus", handleVerificationStatus);
// OTP
router.post("/sendOTP", handleSendOTP);
router.post("/verifyOTP", handleVerifyOTP);

module.exports = router;
