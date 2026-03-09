// backend/middleware/socket.auth.js

const User = require("../models/user.model");
const { verifyAccessToken } = require("../utils/auth.utils");

/**
 * Socket.io middleware for JWT authentication
 * Extracts token from handshake auth or query and validates it
 */
const socketAuthMiddleware = async (socket, next) => {
  try {
    // Extract token from auth header or query parameter
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token ||
      socket.handshake.headers?.cookie?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return next(new Error("Authentication token required"));
    }

    // Verify token
    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded._id) {
      return next(new Error("Invalid or expired token"));
    }

    // Fetch user from database
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return next(new Error("User not found"));
    }

    // Attach user to socket
    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    console.error("[Socket Auth] Error:", error.message);
    next(new Error("Authentication failed"));
  }
};

module.exports = socketAuthMiddleware;
