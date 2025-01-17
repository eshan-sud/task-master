// filename - backend/middleware/auth.js

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: "Valid token is required!" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or Expired token!" });
  }
};

module.exports = authenticate;
