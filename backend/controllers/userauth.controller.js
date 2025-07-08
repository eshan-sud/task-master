// filename - backend/controllers/userauth.controller.js

require("dotenv").config();
const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createDefaultCategories } = require("./account.controller.js");

const {
  sendOtpVerificationEmail,
  sendAccountVerifiedEmail,
} = require("../utils/emailService");

const {
  setUser,
  // getUser,
  verifyCaptcha,
  // verifyUser,
} = require("../utils/auth.utils");

const {
  encryptOTP,
  generateOTP,
  compareOTP,
} = require("../utils/otp.utils.js");

const JWT_SECRET = process.env.JWT_SECRET;

const handleRefreshToken = async (req, res) => {};

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
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = setUser(user);
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.status(200).json({
      message: "Login successful",
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error occurred during Login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleRegisterAuth = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, captchaToken } =
      req.body;
    if (!captchaToken || !verifyCaptcha(captchaToken)) {
      return res.status(400).json({ error: "Invalid CAPTCHA" });
    }
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
      return res.status(400).json({ error: "All fields are required!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });
    await createDefaultCategories(newUser);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    return res.status(500).json({ error: "Internal server error!" });
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
    console.error(error);
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
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      if (decoded.email !== email) {
        return res.status(400).json({ error: "Invalid Token" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ message: "Password reset successfully!" });
    });
  } catch (error) {
    console.error("Error resetting password:", error);
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
    const otpRecord = OTP.create({
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
    console.error("Error generating OTP:", error);
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
        return res.status(404).json({ error: "User not found!" });
      }
      if (!(await sendAccountVerifiedEmail(email))) {
        return res
          .status(500)
          .json({ error: "Failed to send account verifid email!" });
      }
      return res.status(200).json({
        isVerified: user.isVerified,
        message: "Account verified email sent to user!",
      });
    } else if (purpose === "password_reset") {
      // Generate a temporary token for password reset
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      return res.status(200).json({
        message: "OTP verified successfully. Proceed with password reset.",
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid purpose" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error verifying OTP" });
  }
};

const handleVerificationStatus = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res.status(200).json({ isVerified: user.isVerified });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
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
};
