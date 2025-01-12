// filename - backend/routes/account.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  handleGetProfile,
  handleChangePassword,
  handleDeleteAccount,
  handleUpdateProfile,
  updateSettings,
  exportData,
} = require("../controllers/account.controller");

const router = express.Router();

// Email Verification
router.get("/getProfile", authenticate, handleGetProfile);
router.patch("/changePassword", authenticate, handleChangePassword);
router.delete("/deleteAccount", authenticate, handleDeleteAccount);
router.patch("/updateProfile", authenticate, handleUpdateProfile);
router.patch("/updateSettings", authenticate, updateSettings);
router.post("/exportData", authenticate, exportData);

module.exports = router;
