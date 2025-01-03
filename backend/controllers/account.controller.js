// filename - backend/controllers/account.controller.js

const OTP = require("../models/otp.model");
const User = require("../models/user.model");
const {
  sendAccountVerificationEmail,
  sendAccountVerifiedEmail,
} = require("../utils/emailService");

const verifyAccount = async (req, res) => {
  const { otp, email } = req.query;
  if (!otp || !email) {
    return res.status(400).send("Invalid OTP or email");
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
    await sendAccountVerificationEmail(otp, email);
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
  const { email } = req.body;
};

module.exports = {
  verifyAccount,
  deleteAccount,
  updateAccount,
  getSettings,
  updateSettings,
};
