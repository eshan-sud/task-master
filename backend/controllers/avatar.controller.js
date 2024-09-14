// filename - controllers/avatar.controller.js

const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");

const handleUploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.avatar = req.file.filename;
    await user.save();

    res
      .status(200)
      .json({ message: "Avatar uploaded successfully", avatar: user.avatar });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleRemoveAvatar = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User ID not provided" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.avatar) {
      return res.status(404).json({ error: "Avatar not found" });
    }
    const avatarPath = path.resolve(`uploads/${user.avatar}`);
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }
    user.avatar = undefined;
    await user.save();
    res.status(200).json({ message: "Avatar removed successfully" });
  } catch (error) {
    console.error("Error removing avatar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleUploadAvatar,
  handleRemoveAvatar,
};
