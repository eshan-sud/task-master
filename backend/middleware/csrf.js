// backend/middleware/csrf.js

const csrf = require("csurf");

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set to true in production with HTTPS
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // lax for development
  },
});

// Conditional CSRF middleware
const conditionalCSRF = (req, res, next) => {
  // For /csrf-token endpoint, always run CSRF to generate the token
  // but don't validate (first request won't have a valid token)
  if (req.path === "/csrf-token") {
    // Run the CSRF middleware to set up cookies and req.csrfToken()
    return csrfProtection(req, res, (err) => {
      // Ignore validation errors for this endpoint
      if (err && err.code === "EBADCSRFTOKEN") {
        return next();
      }
      // Pass through other errors
      if (err) {
        return next(err);
      }
      return next();
    });
  }

  // Skip CSRF entirely for refresh token endpoint
  // Use originalUrl to check the full path including route prefixes
  if (
    req.originalUrl === "/api/v1/auth/refreshToken" ||
    req.path === "/refreshToken"
  ) {
    return next();
  }

  // Apply full CSRF protection for all other routes
  return csrfProtection(req, res, next);
};

module.exports = conditionalCSRF;
