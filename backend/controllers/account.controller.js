// filename - backend/controllers/account.controller.js

const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcryptjs");

const {
  sendAccountDeletionEmail,
  sendPasswordChangedEmail,
} = require("../utils/emailService");

const handleGetBio = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Email is required!");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res.status(200).json({ bio: user.bio });
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
};

const handleChangePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).send("Email and New password are required!");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    sendPasswordChangedEmail(email);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
};

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

const handleUpdateProfile = async (req, res) => {
  const { email, firstName, lastName, bio } = req.body;
  if (!email || !userName || !bio) {
    return res
      .status(400)
      .send("Email, updated user name and updated bio are required!");
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstName: firstName, lastName: lastName, bio: bio },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }
    return res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong!");
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

module.exports = {
  handleGetBio,
  handleChangePassword,
  handleDeleteAccount,
  handleUpdateProfile,
  getSettings,
  updateSettings,
  exportData,
};
