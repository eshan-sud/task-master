// filename - controllers/userauth.controller.js

const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const { setUser, getUser } = require("../utils/auth.utils");

const handleLoginAuth = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = setUser(user);

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error occurred during Login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleRegisterAuth = async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !gender ||
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    gender.trim() === ""
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exists" });
    }
    await User.create({ firstName, lastName, email, password, gender });
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error occurred during Registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleLogoutAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ error: "No Token Found" });
    }
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error("Error occurred during Logout:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetUserAvatar = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User ID not provided" });
    }
    const user = await User.findById(req.user._id);
    if (!user || !user.avatar) {
      return res.status(404).json({ error: "Avatar not found" });
    }
    const avatarPath = path.resolve(`uploads/${user.avatar}`);
    if (!fs.existsSync(avatarPath)) {
      return res.status(404).json({ error: "Avatar file does not exist" });
    }
    const extname = path.extname(user.avatar).toLowerCase();
    let contentType = "application/octet-stream";
    switch (extname) {
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
    }
    res.setHeader("Content-Type", contentType);
    res.sendFile(avatarPath);
  } catch (error) {
    console.error("Error retrieving avatar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleGetUserAvatar,
};
