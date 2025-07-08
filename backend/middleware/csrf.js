// backend/middleware/csrf.js

const csrf = require("csurf");

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: false, // secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
    sameSite: "Strict",
  },
});

module.exports = csrfProtection;
