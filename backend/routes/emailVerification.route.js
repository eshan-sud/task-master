// filename - backend/routes/emailVerification.route.js

const express = require("express");
const {
  sendVerificationEmail,
  verifyAccount,
} = require("../controllers/emailVerification.controller");

const router = express.Router();

router.post("/send-verification", sendVerificationEmail);
router.get("/verify-account", verifyAccount);

module.exports = router;
