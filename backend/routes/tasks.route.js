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
  checkAndUpdateParentStatus,
} = require("../controllers/tasks.controller");

const router = express.Router();

// Tasks
router.post(
  "/create",
  authenticate,
  upload.array("files", 5),
  handleCreateTask
);
router.get("/list", authenticate, handleGetTasks);
router.patch(
  "/update",
  authenticate,
  upload.array("files", 5),
  handleUpdateTask
);
router.post("/subtask", authenticate, handleAddSubtask);
router.get("/subtasks/:taskId", authenticate, handleGetSubtasks);
router.delete("/delete", authenticate, handleDeleteTask);
router.patch("/restore", authenticate, handleRestoreTask);
router.get("/recycle-bin", authenticate, handleGetDeletedTasks);

module.exports = router;
