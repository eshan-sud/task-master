// backend/controllers/tasks.controller.js

const Task = require("../models/tasks.model");

const handleCreateTask = async (req, res) => {
  try {
    const { email, category, text } = req.body;

    if (!email || !category || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTask = await Task.create({ email, category, text });
    return res
      .status(201)
      .json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const handleGetTasks = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const tasks = await Task.find({ email });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const handleUpdateTask = async (req, res) => {
  try {
    const { taskId, text, category, completed } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { text, category, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const handleDeleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  handleCreateTask,
  handleGetTasks,
  handleUpdateTask,
  handleDeleteTask,
};
