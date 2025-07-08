// backend/controllers/categories.controller.js

// const User = require("../models/user.model");
const Categories = require("../models/categories.model");

// Default categories for every new user
const defaultCategories = [
  { name: "Work", description: "Tasks related to work" },
  { name: "Personal", description: "Personal tasks" },
  { name: "Custom", description: "Custom category for any task" },
];

const createDefaultCategories = async (user) => {
  try {
    const existingCategories = await Categories.find({ userId: user._id });
    if (existingCategories.length === 0) {
      const categoriesPromises = defaultCategories.map((category) => {
        return new Categories({
          userId: user._id,
          name: category.name,
          description: category.description,
        }).save();
      });
      await Promise.all(categoriesPromises);
      console.log("Default categories added successfully");
    } else {
      console.log("User already has the default categories");
    }
  } catch (error) {
    console.error("[createDefaultCategories] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetCategories = async (req, res) => {
  try {
  } catch (error) {
    console.error("[handleGetCategories] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateCategory = async (req, res) => {
  try {
    const { userId, name, description } = req.body();
    if (!userId || !name || !description) {
      return res
        .status(404)
        .json({ error: "UserId, name, & description are required" });
    }
    const newCategory = new Categories({
      userId,
      name,
      description,
    });
    await newCategory.save();
    console.log("Category created successfully");
  } catch (error) {
    console.error("[handleCreateCategory] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.error("[handleUpdateCategory] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteCategory = async (req, res) => {
  try {
  } catch (error) {
    console.error("[handleDeleteCategory] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createDefaultCategories,
  handleGetCategories,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
