// filename - backend/routes/account.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  verifyAccount,
  deleteAccount,
  updateAccount,
} = require("../controllers/account.controller");

const router = express.Router();

// Email Verification
router.get("/verifyAccount", verifyAccount);
router.delete("/deleteAccount", authenticate, deleteAccount);
router.patch("/updateAccount", authenticate, updateAccount);

module.exports = router;
