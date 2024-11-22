// filename - controllers/userauth.controller.js

const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const OTP = require("../models/user.OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { sendOTPEmail } = require("../utils/emailService");
const { setUser, getUser } = require("../utils/auth.utils");

const handleLoginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ error: "All fields are required" });
    }
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
  try {
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

const handleGetUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleGenerateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOTP = await bcrypt.hash(otp.toString(), 10);
    await OTP.create({ email, otp: hashedOTP, createdAt: Date.now() });
    // await sendOTPEmail(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error generating OTP" });
  }
};

const handleVerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(404).json({ error: "OTP not found" });
    }
    const isMatch = await bcrypt.compare(otp.toString(), otpRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    await OTP.deleteOne({ email });
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error verifying OTP" });
  }
};

module.exports = {
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleGetUserAvatar,
  handleGetUser,
  handleGenerateOTP,
  handleVerifyOTP,
};
