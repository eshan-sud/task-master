// filename - backend/server.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const connection = require("./utils/dbConnection.js");
const accountRoute = require("./routes/account.route.js");
const avatarRoute = require("./routes/avatar.route.js");
const tasksRoute = require("./routes/tasks.route.js");
const userauthRoute = require("./routes/userauth.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Create an Express server
const app = express();
const PORT = process.env.PORT || 8023;

// Establish Connection with Database
connection();

// Using Middlewares
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/avatar", avatarRoute);
app.use("/api/v1/tasks", tasksRoute);
app.use("/api/v1/auth", userauthRoute);

// Listening Port

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
