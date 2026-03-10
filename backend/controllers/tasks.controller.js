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
    const { category, title, description, dueDate, priority, status, pinned } =
      req.body;
    if (!category || !title) {
      return res.status(400).json({ error: "Title & category are required" });
    }
    const associatedFiles = req.files ? mapFilesToMetadata(req.files) : [];
    const newTask = await Task.create({
      userId: req.user._id,
      category,
      title,
      description,
      dueDate,
      priority,
      status,
      pinned: pinned ?? false,
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
    const tasks = await Task.find(filter)
      .populate("category", "name")
      .sort({ dueDate: 1 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("[handleGetTasks] Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const handleUpdateTask = async (req, res) => {
  try {
    const {
      taskId,
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      pinned,
    } = req.body;
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
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;
    task.category = category ?? task.category;
    if (typeof pinned === "boolean") {
      task.pinned = pinned;
    }
    await task.save();
    await checkAndUpdateParentStatus(taskId);
    return res.status(200).json({ message: "Task updated", task });
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
      { new: true },
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
      { new: true },
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

const handleAddSubtask = async (req, res) => {
  try {
    const { parentTaskId, title, description, dueDate, priority, status } =
      req.body;
    if (!parentTaskId || !title) {
      return res.status(400).json({ error: "Parent ID and title required" });
    }
    const parent = await Task.findOne({
      _id: parentTaskId,
      userId: req.user._id,
    });
    if (!parent || parent.isDeleted) {
      return res.status(404).json({ error: "Parent task not found" });
    }
    const subtask = await Task.create({
      userId: req.user._id,
      title,
      description,
      dueDate,
      priority,
      status,
      category: parent.category, // Inherit from parent
    });
    parent.subtasks.push(subtask._id);
    await parent.save();
    return res.status(201).json({ message: "Subtask created", subtask });
  } catch (error) {
    console.error("[handleAddSubtask]", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const handleGetSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const parent = await Task.findOne({
      _id: taskId,
      userId: req.user._id,
    }).populate("subtasks");
    if (!parent || parent.isDeleted) {
      return res.status(404).json({ error: "Parent task not found" });
    }
    res.status(200).json(parent.subtasks);
  } catch (error) {
    console.error("[handleGetSubtasks]", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const checkAndUpdateParentStatus = async (taskId) => {
  const parent = await Task.findOne({ subtasks: taskId });
  if (!parent) return;
  const subtasks = await Task.find({
    _id: { $in: parent.subtasks },
    isDeleted: false,
  });
  const allCompleted = subtasks.every((t) => t.status === "completed");
  if (allCompleted && parent.status !== "completed") {
    parent.status = "completed";
    await parent.save();
  }
};

/**
 * Search tasks with full-text search
 */
const handleSearchTasks = async (req, res) => {
  try {
    const { query, status, category, priority, fromDate, toDate } = req.query;

    const filter = {
      userId: req.user._id,
      isDeleted: false,
    };

    // Text search
    if (query) {
      filter.$or = [
        { text: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    // Filters
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    // Date range
    if (fromDate || toDate) {
      filter.dueDate = {};
      if (fromDate) filter.dueDate.$gte = new Date(fromDate);
      if (toDate) filter.dueDate.$lte = new Date(toDate);
    }

    const tasks = await Task.find(filter)
      .populate("category", "name")
      .populate("subtasks")
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks, count: tasks.length });
  } catch (error) {
    console.error("[handleSearchTasks] Error", error);
    res.status(500).json({ error: "Failed to search tasks" });
  }
};

/**
 * Archive a task
 */
const handleArchiveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isArchived: true },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task archived successfully", task });
  } catch (error) {
    console.error("[handleArchiveTask] Error", error);
    res.status(500).json({ error: "Failed to archive task" });
  }
};

/**
 * Unarchive a task
 */
const handleUnarchiveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { isArchived: false },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task unarchived successfully", task });
  } catch (error) {
    console.error("[handleUnarchiveTask] Error", error);
    res.status(500).json({ error: "Failed to unarchive task" });
  }
};

/**
 * Get archived tasks
 */
const handleGetArchivedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
      isArchived: true,
      isDeleted: false,
    })
      .populate("category", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("[handleGetArchivedTasks] Error", error);
    res.status(500).json({ error: "Failed to fetch archived tasks" });
  }
};

/**
 * Bulk update tasks
 */
const handleBulkUpdateTasks = async (req, res) => {
  try {
    const { taskIds, updates } = req.body;

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ error: "taskIds array is required" });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "updates object is required" });
    }

    // Only allow certain fields to be bulk updated
    const allowedFields = ["status", "priority", "category", "isArchived"];
    const filteredUpdates = {};

    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const result = await Task.updateMany(
      {
        _id: { $in: taskIds },
        userId: req.user._id,
        isDeleted: false,
      },
      { $set: filteredUpdates },
    );

    res.status(200).json({
      message: "Tasks updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("[handleBulkUpdateTasks] Error", error);
    res.status(500).json({ error: "Failed to bulk update tasks" });
  }
};

/**
 * Bulk delete tasks
 */
const handleBulkDeleteTasks = async (req, res) => {
  try {
    const { taskIds } = req.body;

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ error: "taskIds array is required" });
    }

    const result = await Task.updateMany(
      {
        _id: { $in: taskIds },
        userId: req.user._id,
      },
      {
        $set: { isDeleted: true, deletedAt: new Date() },
      },
    );

    res.status(200).json({
      message: "Tasks deleted successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("[handleBulkDeleteTasks] Error", error);
    res.status(500).json({ error: "Failed to bulk delete tasks" });
  }
};

/**
 * Create recurring task
 */
const handleCreateRecurringTask = async (req, res) => {
  try {
    const {
      category,
      text,
      description,
      dueDate,
      priority,
      status,
      recurrence,
    } = req.body;

    if (!category || !text) {
      return res.status(400).json({ error: "Text & category are required" });
    }

    if (!recurrence || !recurrence.type || recurrence.type === "none") {
      return res
        .status(400)
        .json({ error: "Recurrence configuration is required" });
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
      recurrence: {
        type: recurrence.type,
        interval: recurrence.interval || 1,
        endsOn: recurrence.endsOn || null,
      },
    });

    res.status(201).json({
      message: "Recurring task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("[handleCreateRecurringTask] Error", error);
    res.status(500).json({ error: "Failed to create recurring task" });
  }
};

/**
 * Get task statistics
 */
const handleGetTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { userId, isDeleted: false } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { userId, isDeleted: false } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Task.countDocuments({ userId, isDeleted: false });
    const overdue = await Task.countDocuments({
      userId,
      isDeleted: false,
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" },
    });

    res.status(200).json({
      total,
      overdue,
      byStatus: stats,
      byPriority: priorityStats,
    });
  } catch (error) {
    console.error("[handleGetTaskStats] Error", error);
    res.status(500).json({ error: "Failed to get task statistics" });
  }
};

/**
 * Reorder tasks - Update task order/position
 */
const handleReorderTasks = async (req, res) => {
  try {
    const { taskIds } = req.body;

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ error: "taskIds array is required" });
    }

    // Verify all tasks belong to the user
    const tasks = await Task.find({
      _id: { $in: taskIds },
      userId: req.user._id,
      isDeleted: false,
    });

    if (tasks.length !== taskIds.length) {
      return res.status(404).json({ error: "Some tasks not found" });
    }

    // Update order field for each task
    const bulkOps = taskIds.map((taskId, index) => ({
      updateOne: {
        filter: { _id: taskId, userId: req.user._id },
        update: { $set: { order: index } },
      },
    }));

    await Task.bulkWrite(bulkOps);

    res.status(200).json({
      message: "Tasks reordered successfully",
      updatedCount: taskIds.length,
    });
  } catch (error) {
    console.error("[handleReorderTasks] Error", error);
    res.status(500).json({ error: "Failed to reorder tasks" });
  }
};

module.exports = {
  handleCreateTask,
  handleGetTasks,
  handleUpdateTask,
  handleDeleteTask,
  handleRestoreTask,
  handleGetDeletedTasks,
  handleAddSubtask,
  handleGetSubtasks,
  checkAndUpdateParentStatus,
  handleSearchTasks,
  handleArchiveTask,
  handleUnarchiveTask,
  handleGetArchivedTasks,
  handleBulkUpdateTasks,
  handleBulkDeleteTasks,
  handleCreateRecurringTask,
  handleGetTaskStats,
  handleReorderTasks,
};
