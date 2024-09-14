// filename - routes/userauth.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  handleLoginAuth,
  handleRegisterAuth,
  handleLogoutAuth,
  handleGetUserAvatar,
} = require("../controllers/userauth.controller");

const router = express.Router();

router.post("/login", handleLoginAuth);
router.post("/register", handleRegisterAuth);
router.post("/logout", handleLogoutAuth);
router.get("/getUserAvatar", authenticate, handleGetUserAvatar);

module.exports = router;
