// filename - backend/routes/account.route.js

const express = require("express");
const { verifyAccount } = require("../controllers/account.controller");

const router = express.Router();

// Email Verification
router.get("/verifyAccount", verifyAccount);
// router.delete("/delete", authenticate, deleteAccount);
// router.put("/update", authenticate, updateAccount);

module.exports = router;
