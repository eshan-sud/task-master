// backend/server.js

require("dotenv").config();
const path = require("path");
const connection = require("./utils/dbConnection.js");

// Middlewares
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
// const csrfProtection = require("./middleware/csrf.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const speedLimiter = require("./middleware/slowDown.js");
const compression = require("compression");
const cors = require("cors");
const maintenanceMode = require("./middleware/maintenance.js");

// Routes
const accountRoute = require("./routes/account.route.js");
const categoriesRoute = require("./routes/categories.route.js");
const avatarRoute = require("./routes/avatar.route.js");
const tasksRoute = require("./routes/tasks.route.js");
// const teamsRoute = require("./routes/teams.route.js");
const userauthRoute = require("./routes/userauth.route.js");
const otpRoute = require("./routes/otp.route.js");

// Create an Express server
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 8023;

// Establish Connection with Database
connection();

// Read the certificate & key files
// const options = {
//   cert: fs.readFileSync("path/to/certificate.crt"),
//   key: fs.readFileSync("path/to/private.key"),
// };

// Using Middlewares
// app.set("trust proxy", 1); // When Nginx or Vercel deployment
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
app.use(express.urlencoded({ extended: false })); // NEW MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
// app.use(csrfProtection);
app.use(rateLimiter);
app.use(speedLimiter);
app.use(compression());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(maintenanceMode);

// Using Routes
// Redirect http to https server
// app.use((req, res, next) => {
//   if (req.protocol === 'http') {
//     return res.redirect(301, 'https://' + req.headers.host + req.url);
//   }
//   next();
// });

app.get("/csrf-token", (req, res) => {
  return res.json({ csrfToken: req.csrfToken() });
});

app.use("/api/v1/account", accountRoute);
app.use("/api/v1/avatar", avatarRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/tasks", tasksRoute);
// app.use("/api/v1/teams", teamsRoute);
// app.use("/api/v1/_", _Route);
app.use("/api/v1/auth", userauthRoute);
app.use("/api/v1/otp", otpRoute);
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next(err);
});
app.use((req, res, next) => {
  // For 404 errors
  return res.status(404).json({ message: "API route not found" });
});

// Listening Port
app.listen(BACKEND_PORT, () => {
  console.log(`Server is listening on PORT: ${BACKEND_PORT}`);
  console.log(`Server : https://localhost:${BACKEND_PORT}`);
});

// Start HTTPS server
// https.createServer(options, app).listen(443, () => {
//   console.log('HTTPS server running on https://localhost:443');
// });
