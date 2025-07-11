// backend/models/categories.model.js

const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true, // e.g., Work, Personal, Custom,  etc
    },
    description: {
      type: String,
      required: false, // Optional
    },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
