// backend/routes/comments.route.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  handleGetComments,
  handleCreateComment,
  handleUpdateComment,
  handleDeleteComment,
  handleAddReaction,
  handleRemoveReaction,
} = require("../controllers/comments.controller");

// All routes require authentication
router.use(authenticate);

// Comments for a task
router.get("/task/:taskId", handleGetComments);
router.post("/task/:taskId", handleCreateComment);
router.patch("/:commentId", handleUpdateComment);
router.delete("/:commentId", handleDeleteComment);

// Reactions
router.post("/:commentId/reaction", handleAddReaction);
router.delete("/:commentId/reaction", handleRemoveReaction);

module.exports = router;
