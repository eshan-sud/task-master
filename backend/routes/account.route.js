// filename - backend/routes/account.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  verifyAccount,
  deleteAccount,
  updateAccount,
  updateSettings,
  exportData,
  changePassword,
} = require("../controllers/account.controller");

const router = express.Router();

// Email Verification
router.get("/verifyAccount", verifyAccount);
router.delete("/deleteAccount", authenticate, deleteAccount);
router.patch("/updateAccount", authenticate, updateAccount);
router.patch("/updateSettings", authenticate, updateSettings);
router.post("/exportData", authenticate, exportData);
router.patch("/changePassword", authenticate, changePassword);

module.exports = router;
