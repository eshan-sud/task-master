// backend/routes/otp.route.js

const express = require("express");

const router = express.Router();

const {
  handleSendOTP,
  handleVerifyOTP,
} = require("../controllers/otp.controller");

// OTP
router.post("/sendOTP", handleSendOTP);
router.post("/verifyOTP", handleVerifyOTP);

module.exports = router;
