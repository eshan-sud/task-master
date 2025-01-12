// filename - backend/controllers/account.controller.js

const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcryptjs");

const { sendAccountDeletionEmail } = require("../utils/emailService");

const handleDeleteAccount = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    await sendAccountDeletionEmail(email);
    return res.status(200).json({ message: "Account successfully deleted" });
  } catch (error) {
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
  handleDeleteAccount,
  updateAccount,
  getSettings,
  updateSettings,
  exportData,
  changePassword,
};
