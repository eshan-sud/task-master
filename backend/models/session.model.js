// backend/models/session.model.js

const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  refreshToken: { type: String, required: true },
  deviceInfo: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, index: { expires: "7d" } },
});

module.exports = mongoose.model("Session", sessionSchema);
