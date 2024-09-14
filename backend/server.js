// filename - server.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const connection = require("./utils/dbConnection.js");
const userauthRoute = require("./routes/userauth.route.js");
const avatarRoute = require("./routes/avatar.route.js");
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
app.use("/api/v1/auth", userauthRoute);
app.use("/api/v1/avatar", avatarRoute);

// Listening Port
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
