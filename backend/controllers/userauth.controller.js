// backend/controllers/userauth.controller.js

require("dotenv").config();
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const Session = require("../models/session.model");
const OTP = require("../models/otp.model");

// const { createDefaultCategories } = require("./account.controller.js");
const {
  sendOtpVerificationEmail,
  sendAccountVerifiedEmail,
} = require("../utils/emailService");

const {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  generateAccessToken,
  generateRefreshToken,
  verifyCaptcha,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/auth.utils");

const {
  encryptOTP,
  generateOTP,
  compareOTP,
} = require("../utils/otp.utils.js");

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.userId) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }
    const session = await Session.findOne({
      userId: decoded.userId,
      refreshToken,
    });
    if (!session) {
      return res.status(403).json({ error: "Session not found or expired" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user._id);
    session.refreshToken = newRefreshToken;
    session.createdAt = new Date();
    session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await session.save();
    res.cookie("token", newAccessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);
    return res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.error("[handleRefreshToken] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleLoginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.headers["user-agent"] || "unknown device";
    const ipAddress = req.ip;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ error: "Email & password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);
    const existingSession = await Session.findOne({
      userId: user._id,
      deviceInfo: userAgent,
    });
    if (existingSession) {
      // If session with same device already exists
      existingSession.refreshToken = refreshToken;
      existingSession.createdAt = new Date();
      existingSession.expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      );
      await existingSession.save();
    } else {
      // LRU eviction if over 5 devices
      const sessions = await Session.find({ userId: user._id }).sort({
        createdAt: 1,
      });
      if (sessions.length >= 5) {
        await Session.findByIdAndDelete(sessions[0]._id);
      }
      await Session.create({
        userId: user._id,
        refreshToken,
        deviceInfo: userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    res.cookie("token", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("[handleLoginAuth] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleRegisterAuth = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, captchaToken } =
      req.body;
    // if (!captchaToken || !verifyCaptcha(captchaToken)) {
    //   return res.status(400).json({ error: "Invalid CAPTCHA" });
    // }
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
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });
    // await createDefaultCategories(newUser);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("[handleRegisterAuth] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleLogoutAuth = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await Session.findOneAndDelete({ refreshToken });
    }
    res.clearCookie("token", accessTokenCookieOptions);
    res.clearCookie("refreshToken", refreshTokenCookieOptions);
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error("[handleLogoutAuth] Error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleCheckUserExists = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ exists: false });
    }
    return res.json({ exists: true });
  } catch (error) {
    console.error("[handleCheckUserExists] Error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { email, newPassword, token } = req.body;
    if (!email || !newPassword || !token) {
      return res.status(400).json({
        error: "Email, New Password, and token are required",
      });
    }
    const decoded = verifyAccessToken(token);
    if (!decoded || decoded.email !== email) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("[handleResetPassword] Error", error);
    return res.status(500).json({ error: "Error resetting password" });
  }
};

const handleSendOTP = async (req, res) => {
  try {
    const { email, purpose } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    // Remove any existing OTPs for this email - for the purpose of OTP verification ONLY
    await OTP.deleteMany({ email });
    const otp = generateOTP();
    const encryptedOTP = encryptOTP(otp);
    const otpRecord = await OTP.create({
      email,
      otp: encryptedOTP,
      createdAt: Date.now(),
      purpose: purpose, // Either "password_reset" or "account_verification"
    });
    if (!otpRecord) {
      return res.status(500).json({ error: "Failed to store OTP in database" });
    }
    // console.log(`New OTP stored successfully for ${email}`);
    if (!(await sendOtpVerificationEmail(otp, email, purpose))) {
      return res.status(500).json({ error: "Failed to send OTP email" });
    }
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("[handleSendOTP] Error", error);
    return res.status(500).json({ error: "Error generating OTP" });
  }
};

const handleVerifyOTP = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;
    if (!email || !otp || !purpose) {
      return res
        .status(400)
        .json({ error: "Email, OTP, and purpose are required" });
    }
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(404).json({ error: "OTP not found" });
    }
    const isMatch = compareOTP(otp, otpRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    await OTP.deleteOne({ email }); // Remove OTP after successful verification
    if (purpose === "account_verification") {
      // Update the user's verification status
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const emailSent = await sendAccountVerifiedEmail(email);
      if (!emailSent) {
        return res
          .status(500)
          .json({ error: "Failed to send account verifid email" });
      }
      return res.status(200).json({
        isVerified: user.isVerified,
        message: "Account verified email sent to user",
      });
    } else if (purpose === "password_reset") {
      // Generate a temporary token for password reset
      const token = generateAccessToken({ email });
      return res.status(200).json({
        message: "OTP verified successfully. Proceed with password reset.",
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid purpose" });
    }
  } catch (error) {
    console.error("[handleVerifyOTP] Error", error);
    return res.status(500).json({ error: "Error verifying OTP" });
  }
};

const handleVerificationStatus = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ isVerified: user.isVerified });
  } catch (error) {
    console.error("[handleVerificationStatus] Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const handleLogoutAllDevices = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: "No refresh token provided" });
    }
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.userId) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }
    // Delete all sessions for the user
    await Session.deleteMany({ userId: decoded.userId });
    res.clearCookie("token", accessTokenCookieOptions);
    res.clearCookie("refreshToken", refreshTokenCookieOptions);
    return res
      .status(200)
      .json({ message: "Logged out from all devices successfully" });
  } catch (error) {
    console.error("[handleLogoutAllDevices] Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleListSessions = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.userId) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }
    const sessions = await Session.find({ userId: decoded.userId })
      .sort({ createdAt: -1 }) // newest first
      .select("-refreshToken"); // don't return token to client
    return res.status(200).json({
      sessions: sessions.map((s) => ({
        sessionId: s._id,
        deviceInfo: s.deviceInfo || "Unknown Device",
        ipAddress: s.ipAddress || "Unknown IP",
        createdAt: s.createdAt,
        expiresAt: s.expiresAt,
        isCurrentSession: s.refreshToken === refreshToken,
      })),
    });
  } catch (error) {
    console.error("[handleListSessions] Error:", error);
    return res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

module.exports = {
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
};
