// backend/controllers/tasks.controller.js

const Task = require("../models/tasks.model");
const fs = require("fs");
const path = require("path");

const mapFilesToMetadata = (files) =>
  files.map((file) => ({
    fileName: file.originalname,
    fileUrl: file.path,
    fileSize: file.size,
  }));

const handleCreateTask = async (req, res) => {
  try {
    const { category, text, description, dueDate, priority, status } = req.body;
    if (!category || !text) {
      return res.status(400).json({ error: "Text & category are required" });
    }
    const associatedFiles = req.files ? mapFilesToMetadata(req.files) : [];
    const newTask = await Task.create({
      userId: req.user._id,
      category,
      text,
      description,
      dueDate,
      priority,
      status,
      associatedFiles,
    });
    return res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    console.error("[handleCreateTask] Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const handleGetTasks = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {
      userId: req.user._id,
      isDeleted: false,
    };
    if (status) filter.status = status;
    if (category) filter.category = category;
    const tasks = await Task.find(filter).sort({ dueDate: 1 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("[handleGetTasks] Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const handleUpdateTask = async (req, res) => {
  try {
    const { taskId, text, description, dueDate, priority, status, category } =
      req.body;
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task || task.isDeleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (req.files?.length) {
      if (task.associatedFiles.length + req.files.length > 5) {
        return res.status(400).json({ error: "Max 5 files allowed per task" });
      }
      const newFiles = mapFilesToMetadata(req.files);
      task.associatedFiles.push(...newFiles);
    }
    task.text = text ?? task.text;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;
    task.category = category ?? task.category;
    await task.save();
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.error("[handleUpdateTask] Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const handleDeleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task moved to recycle bin" });
  } catch (error) {
    console.error("[handleDeleteTask] Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const handleRestoreTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isDeleted: false, deletedAt: null },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task restored", task });
  } catch (error) {
    console.error("[handleRestoreTask]", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetDeletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
      isDeleted: true,
    }).sort({ deletedAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("[handleGetDeletedTasks]", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleCreateTask,
  handleGetTasks,
  handleUpdateTask,
  handleDeleteTask,
  handleRestoreTask,
  handleGetDeletedTasks,
};
