// backend/utils/dbConnection.js

const mongoose = require("mongoose");

const connection = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

module.exports = connection;
