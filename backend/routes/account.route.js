// filename - backend/routes/account.route.js

const express = require("express");
const { verifyAccount } = require("../controllers/account.controller");

const router = express.Router();

// Email Verification
// router.post("/send-verification", sendVerificationEmail);
router.get("/verify-account", verifyAccount);

module.exports = router;
