// backend/server.js

require("dotenv").config();
const express = require("express");
const path = require("path");

const connection = require("./utils/dbConnection.js");

// Middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const csrfProtection = require("./middleware/csrf.js");
const maintenanceMode = require("./middleware/maintenance.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const speedLimiter = require("./middleware/slowDown.js");

// Routes
const accountRoute = require("./routes/account.route.js");
const categoriesRoute = require("./routes/categories.route.js");
const avatarRoute = require("./routes/avatar.route.js");
const tasksRoute = require("./routes/tasks.route.js");
const userauthRoute = require("./routes/userauth.route.js");

// Create an Express server
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 8023;

// Establish Connection with Database
connection();

// Using Middlewares
app.use(helmet()); // for XSS protection headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"], // no inline scripts
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(maintenanceMode);

// Using Routes
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.use("/api", rateLimiter);
app.use("/api", speedLimiter);
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/avatar", avatarRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/tasks", tasksRoute);
// app.use("/api/v1/teams", teamsRoute);
// app.use("/api/v1/_", _Route);
app.use("/api/v1/auth", userauthRoute);
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next(err);
});
app.use((req, res, next) => {
  // For 404 errors
  res.status(404).json({ message: "API route not found" });
});

// Listening Port
app.listen(BACKEND_PORT, () => {
  console.log(`Server is listening on PORT: ${BACKEND_PORT}`);
});
