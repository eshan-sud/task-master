// backend/models/otp.model.js

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL (time-to-live) index: 300 seconds = 5 minutes
  },
  purpose: {
    type: String,
    required: true, // Either "password_reset" or "account_verification"
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
