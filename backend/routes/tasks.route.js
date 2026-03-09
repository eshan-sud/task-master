// backend/routes/tasks.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const upload = require("../middleware/multer");
const {
  handleCreateTask,
  handleGetTasks,
  handleUpdateTask,
  handleDeleteTask,
  handleRestoreTask,
  handleGetDeletedTasks,
  handleAddSubtask,
  handleGetSubtasks,
  handleSearchTasks,
  handleArchiveTask,
  handleUnarchiveTask,
  handleGetArchivedTasks,
  handleBulkUpdateTasks,
  handleBulkDeleteTasks,
  handleCreateRecurringTask,
  handleGetTaskStats,
} = require("../controllers/tasks.controller");

const router = express.Router();

// Basic CRUD
router.post(
  "/create",
  authenticate,
  upload.array("files", 5),
  handleCreateTask,
);
router.get("/list", authenticate, handleGetTasks);
router.patch(
  "/update",
  authenticate,
  upload.array("files", 5),
  handleUpdateTask,
);
router.delete("/delete", authenticate, handleDeleteTask);

// Subtasks
router.post("/subtask", authenticate, handleAddSubtask);
router.get("/subtasks/:taskId", authenticate, handleGetSubtasks);

// Recycle bin
router.patch("/restore", authenticate, handleRestoreTask);
router.get("/recycle-bin", authenticate, handleGetDeletedTasks);

// Search & Stats
router.get("/search", authenticate, handleSearchTasks);
router.get("/stats", authenticate, handleGetTaskStats);

// Archive
router.patch("/:taskId/archive", authenticate, handleArchiveTask);
router.patch("/:taskId/unarchive", authenticate, handleUnarchiveTask);
router.get("/archived", authenticate, handleGetArchivedTasks);

// Bulk operations
router.patch("/bulk/update", authenticate, handleBulkUpdateTasks);
router.delete("/bulk/delete", authenticate, handleBulkDeleteTasks);

// Recurring tasks
router.post(
  "/recurring",
  authenticate,
  upload.array("files", 5),
  handleCreateRecurringTask,
);

module.exports = router;
