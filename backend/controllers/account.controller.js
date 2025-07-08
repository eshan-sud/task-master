// filename - backend/controllers/account.controller.js

const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcrypt");

const {
  sendAccountDeletionEmail,
  sendPasswordChangedEmail,
} = require("../utils/emailService");

const handleGetProfile = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Email is required!");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res
      .status(200)
      .json({ fullName: user.firstName + " " + user.lastName, bio: user.bio });
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
  const { email, fullName, bio } = req.body;
  if (!email || !fullName) {
    return res
      .status(400)
      .send("Email and updated user name are required, (bio is optional)!");
  }
  try {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, bio },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found!");
    }
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong!");
  }
};

const handleGetUserSettings = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  try {
    const userSettings = await User.findOne({ email }, "settings");
    if (!userSettings) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ data: userSettings });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

const handleUpdateSettings = async (req, res) => {
  const { email, darkMode, ...settings } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }
  try {
    const updatedData = { darkMode, ...settings };
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { settings: updatedData } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) return res.status(404).send("User not found!");
    res.status(200).send({ message: "Settings saved successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error!",
      });
    }
    res.status(500).send("Internal server error!");
  }
};

const exportData = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  try {
    const userSettings = await User.findOne({ email }, "settings");
    if (!userSettings) {
      return res.status(404).json({ message: "User not found!" });
    }
    // FIND OTHER DATA & SEND IT IN A PDF
    // res.status(200).json({ settings: userSettings });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = {
  handleGetProfile,
  handleChangePassword,
  handleDeleteAccount,
  handleUpdateProfile,
  handleGetUserSettings,
  handleUpdateSettings,
  exportData,
};
