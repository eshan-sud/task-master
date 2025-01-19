// filename - backend/controllers/categories.controller.js

const User = require("../models/user.model");
const Categories = require("../models/categories.model");

// Default categories for every new user
const defaultCategories = [
  { name: "Work", description: "Tasks related to work" },
  { name: "Personal", description: "Personal tasks" },
  { name: "Custom", description: "Custom category for any task" },
];

const createDefaultCategories = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const existingCategories = await Categories.find({ userId: user._id });

    if (existingCategories.length === 0) {
      // No categories exist, insert the default categories
      const categoriesPromises = defaultCategories.map((category) => {
        return new Categories({
          userId: user._id,
          name: category.name,
          description: category.description,
        }).save();
      });

      await Promise.all(categoriesPromises);
      res
        .status(201)
        .json({ message: "User and default categories created successfully!" });
    } else {
      res.status(200).json({ message: "User already has categories." });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error creating user or categories",
      error: err.message,
    });
  }
};

const handleGetCategories = async () => {};

const handleCreateCategory = async (userId, name, description) => {
  try {
    const newCategory = new Categories({
      userId,
      name,
      description,
    });

    await newCategory.save();
    console.log("Category created successfully!");
  } catch (err) {
    console.error("Error creating category:", err.message);
  }
};

module.exports = {
  createDefaultCategories,
  handleGetCategories,
  handleCreateCategory,
};
