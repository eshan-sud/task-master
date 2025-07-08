// backend/utils/slowDown.js

const slowDown = require("express-slow-down");

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests without delay
  delayMs: () => 500, // Delay each request by 500ms after limit
});

module.exports = speedLimiter;
