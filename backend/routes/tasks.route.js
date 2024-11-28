// filename - backend/routes/userauth.route.js

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
router.post("/createTask", authenticate, handleCreateTask); // Create
router.get("/getTasks", authenticate, handleGetTasks); // Read
router.put("/updateTask", authenticate, handleUpdateTask); // Update
router.delete("/deleteTask", authenticate, handleDeleteTask); // Delete

module.exports = router;
