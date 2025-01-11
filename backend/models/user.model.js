// filename - backend/models/user.model.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String, default: null, maxlength: 255 },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    isVerified: { type: String, default: false },
    settings: {
      darkMode: { type: Boolean, default: false },
      accountVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
      activityStatus: { type: Boolean, default: true },
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      preferredLanguage: { type: String, default: "en" },
      timeZone: { type: String, default: "GMT" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
