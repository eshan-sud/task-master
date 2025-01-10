// filename - backend/controllers/account.controller.js

const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcryptjs");

const {
  sendAccountVerificationEmail,
  sendAccountVerifiedEmail,
} = require("../utils/emailService");

const sendOTPForVerification = async (req, res) => {};

const verifyAccount = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required!");
  }
  try {
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).send("OTP expired or not found");
    }
    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(400).send("Invalid OTP");
    }
    // Mark account as verified
    await User.updateOne({ email }, { verified: true });
    await OTP.deleteOne({ email });
    sendAccountVerifiedEmail(email);
    return res.send("Your account has been verified successfully!");
  } catch (error) {
    console.error("Error verifying account:", error);
    return res.status(500).send("Something went wrong");
  }
};

const updateAccount = async (req, res) => {
  const { email, updateData } = req.body;
  if (!email || !updateData) {
    return res.status(400).send("Email and update data is required");
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error);
    return res.status(500).send("Something went wrong");
  }
};

const deleteAccount = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }
  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).send("Something went wrong");
  }
};

const getSettings = async (req, res) => {
  const { email } = req.body;
};

const updateSettings = async (req, res) => {
  const { email, ...settings } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { settings },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).send("User not found");
    res.status(200).send({ message: "Settings saved successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const exportData = async (req, res) => {
  const { email } = req.body;
};

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).send("Email and New password are required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Internal server error!");
  }
};

module.exports = {
  sendOTPForVerification,
  verifyAccount,
  deleteAccount,
  updateAccount,
  getSettings,
  updateSettings,
  exportData,
  changePassword,
};
