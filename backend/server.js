// filename - backend/server.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const connection = require("./utils/dbConnection.js");
const accountRoute = require("./routes/account.route.js");
const categoriesRoute = require("./routes/categories.route.js");
const avatarRoute = require("./routes/avatar.route.js");
const tasksRoute = require("./routes/tasks.route.js");
const userauthRoute = require("./routes/userauth.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimiter = require("./utils/rateLimiter.js");
const speedLimiter = require("./utils/slowDown.js");

// Create an Express server
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 8023;

// Establish Connection with Database
connection();

// Using Middlewares
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api", rateLimiter);
app.use("/api", speedLimiter);
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/avatar", avatarRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/tasks", tasksRoute);
// app.use("/api/v1/teams", teamsRoute);
// app.use("/api/v1/_", _Route);
app.use("/api/v1/auth", userauthRoute);

// Listening Port

app.listen(BACKEND_PORT, () => {
  console.log(`Server is listening on PORT: ${BACKEND_PORT}`);
});
