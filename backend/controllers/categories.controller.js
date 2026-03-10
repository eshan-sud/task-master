// backend/controllers/categories.controller.js

// const User = require("../models/user.model");
const Category = require("../models/categories.model");

// Default categories for every new user
const defaultCategories = [
  { name: "Work", description: "Tasks related to work" },
  { name: "Personal", description: "Personal tasks" },
  { name: "Custom", description: "Custom category for any task" },
];

const createDefaultCategories = async (user) => {
  try {
    const existingCategories = await Category.find({ userId: user._id });
    if (existingCategories.length === 0) {
      const categoriesPromises = defaultCategories.map((category) => {
        return new Category({
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
    const userId = req.user._id;
    const categories = await Category.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ categories });
  } catch (error) {
    console.error("[handleGetCategories] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateCategory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name & description are required" });
    }
    const newCategory = new Category({
      userId,
      name,
      description,
    });
    await newCategory.save();
    console.log("Category created successfully");
    return res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("[handleCreateCategory] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateCategory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId } = req.params;
    const { name, description } = req.body;
    
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }
    
    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    if (name) category.name = name;
    if (description) category.description = description;
    
    await category.save();
    console.log("Category updated successfully");
    return res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("[handleUpdateCategory] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteCategory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId } = req.params;
    
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }
    
    const category = await Category.findOneAndDelete({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    console.log("Category deleted successfully");
    return res.status(200).json({ message: "Category deleted successfully" });
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
