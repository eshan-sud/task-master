// backend/controllers/search.controller.js

const User = require("../models/user.model");
const Task = require("../models/tasks.model");

/**
 * Search for users by name, email, or username
 */
const handleUserSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const currentUserId = req.user._id;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Search for users (exclude current user and password field)
    const users = await User.find(
      {
        _id: { $ne: currentUserId },
        $or: [
          { fullName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } },
        ],
      },
      "fullName email username createdAt",
    )
      .limit(20)
      .sort({ fullName: 1 });

    return res.status(200).json({ users, count: users.length });
  } catch (error) {
    console.error("[handleUserSearch] Error", error);
    return res.status(500).json({ error: "Failed to search users" });
  }
};

/**
 * Global search across tasks, users, categories, etc.
 */
const handleGlobalSearch = async (req, res) => {
  try {
    const { query, type } = req.query;
    const userId = req.user._id;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = {
      tasks: [],
      users: [],
      // Can add more types later: teams, categories, etc.
    };

    // Search tasks
    if (!type || type === "tasks") {
      results.tasks = await Task.find({
        userId,
        isDeleted: false,
        $or: [
          { text: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      })
        .populate("category", "name")
        .limit(10)
        .sort({ createdAt: -1 });
    }

    // Search users
    if (!type || type === "users") {
      results.users = await User.find(
        {
          _id: { $ne: userId },
          $or: [
            { fullName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { username: { $regex: query, $options: "i" } },
          ],
        },
        "fullName email username",
      )
        .limit(10)
        .sort({ fullName: 1 });
    }

    return res.status(200).json({
      results,
      count: {
        tasks: results.tasks.length,
        users: results.users.length,
      },
    });
  } catch (error) {
    console.error("[handleGlobalSearch] Error", error);
    return res.status(500).json({ error: "Failed to perform global search" });
  }
};

module.exports = {
  handleUserSearch,
  handleGlobalSearch,
};
