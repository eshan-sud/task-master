// backend/middleware/auth.js

const User = require("../models/user.model");
const { verifyAccessToken } = require("../utils/auth.utils");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Valid token is required" });
  }
  const decoded = verifyAccessToken(token);
  if (!decoded || !decoded._id) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  try {
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user; // Attach the authenticated user to the request
    next();
  } catch (error) {
    console.error("[authenticate] Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticate;
