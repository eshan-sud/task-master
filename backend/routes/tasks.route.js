// backend/routes/tasks.route.js

const express = require("express");
const authenticate = require("../middleware/auth");
const {
  handleCreateTask,
  handleGetTasks,
  handleUpdateTask,
  handleDeleteTask,
} = require("../controllers/tasks.controller");

const router = express.Router();

// Tasks
router.post("/createTask", authenticate, handleCreateTask);
router.get("/getTasks", authenticate, handleGetTasks);
router.patch("/updateTask", authenticate, handleUpdateTask);
router.delete("/deleteTask", authenticate, handleDeleteTask);

module.exports = router;
