// backend/controllers/comments.controller.js

const Comment = require("../models/comment.model");
const Tasks = require("../models/tasks.model");
const { emitTaskUpdate } = require("../utils/socket.handlers");
const { createNotification } = require("./notifications.controller");

/**
 * Get all comments for a task
 */
const handleGetComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    // Verify user has access to task
    const task = await Tasks.findOne({
      _id: taskId,
      $or: [{ userId }, { sharedWith: userId }],
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const comments = await Comment.find({
      taskId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate("userId", "fullName email")
      .populate("mentions", "fullName email")
      .populate("parentComment");

    res.status(200).json({ comments });
  } catch (error) {
    console.error("[handleGetComments] Error:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

/**
 * Create a new comment
 */
const handleCreateComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text, mentions, parentComment } = req.body;
    const userId = req.user._id;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Comment text is required" });
    }

    // Verify user has access to task
    const task = await Tasks.findOne({
      _id: taskId,
      $or: [{ userId }, { sharedWith: userId }],
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const comment = new Comment({
      taskId,
      userId,
      text: text.trim(),
      mentions: mentions || [],
      parentComment: parentComment || null,
    });

    await comment.save();
    await comment.populate("userId", "fullName email");
    await comment.populate("mentions", "fullName email");

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTaskUpdate(io, taskId, "comment:new", comment);
    }

    // Send notifications to mentioned users
    if (mentions && mentions.length > 0 && io) {
      for (const mentionedUserId of mentions) {
        if (mentionedUserId.toString() !== userId.toString()) {
          await createNotification(io, {
            userId: mentionedUserId,
            type: "task_mention",
            title: "You were mentioned in a comment",
            message: `${req.user.fullName} mentioned you in a comment`,
            relatedTask: taskId,
            triggeredBy: userId,
          });
        }
      }
    }

    // Notify task owner if different from commenter
    if (task.userId.toString() !== userId.toString() && io) {
      await createNotification(io, {
        userId: task.userId,
        type: "task_comment",
        title: "New comment on your task",
        message: `${req.user.fullName} commented on "${task.title}"`,
        relatedTask: taskId,
        triggeredBy: userId,
      });
    }

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.error("[handleCreateComment] Error:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

/**
 * Update a comment
 */
const handleUpdateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findOne({
      _id: commentId,
      userId,
      isDeleted: false,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (text) {
      comment.text = text.trim();
      comment.isEdited = true;
      comment.editedAt = new Date();
    }

    await comment.save();
    await comment.populate("userId", "fullName email");

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTaskUpdate(io, comment.taskId, "comment:updated", comment);
    }

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.error("[handleUpdateComment] Error:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

/**
 * Delete a comment
 */
const handleDeleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findOne({
      _id: commentId,
      userId,
      isDeleted: false,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.isDeleted = true;
    comment.deletedAt = new Date();
    await comment.save();

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTaskUpdate(io, comment.taskId, "comment:deleted", {
        commentId,
      });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("[handleDeleteComment] Error:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

/**
 * Add reaction to comment
 */
const handleAddReaction = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id;

    if (!emoji) {
      return res.status(400).json({ error: "Emoji is required" });
    }

    const comment = await Comment.findOne({
      _id: commentId,
      isDeleted: false,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if user already reacted with this emoji
    const existingReaction = comment.reactions.find(
      (r) => r.userId.toString() === userId.toString() && r.emoji === emoji,
    );

    if (existingReaction) {
      return res
        .status(400)
        .json({ error: "You already reacted with this emoji" });
    }

    comment.reactions.push({
      userId,
      emoji,
    });

    await comment.save();

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTaskUpdate(io, comment.taskId, "comment:reactionAdded", {
        commentId,
        userId,
        emoji,
      });
    }

    res.status(200).json({
      message: "Reaction added successfully",
      comment,
    });
  } catch (error) {
    console.error("[handleAddReaction] Error:", error);
    res.status(500).json({ error: "Failed to add reaction" });
  }
};

/**
 * Remove reaction from comment
 */
const handleRemoveReaction = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findOne({
      _id: commentId,
      isDeleted: false,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.reactions = comment.reactions.filter(
      (r) => !(r.userId.toString() === userId.toString() && r.emoji === emoji),
    );

    await comment.save();

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTaskUpdate(io, comment.taskId, "comment:reactionRemoved", {
        commentId,
        userId,
        emoji,
      });
    }

    res.status(200).json({ message: "Reaction removed successfully" });
  } catch (error) {
    console.error("[handleRemoveReaction] Error:", error);
    res.status(500).json({ error: "Failed to remove reaction" });
  }
};

module.exports = {
  handleGetComments,
  handleCreateComment,
  handleUpdateComment,
  handleDeleteComment,
  handleAddReaction,
  handleRemoveReaction,
};
