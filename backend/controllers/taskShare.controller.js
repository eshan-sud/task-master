// backend/controllers/taskShare.controller.js

const TaskShare = require("../models/taskShare.model");
const Tasks = require("../models/tasks.model");
const User = require("../models/user.model");
const Teams = require("../models/teams.model");
const { createNotification } = require("./notifications.controller");

/**
 * Share a task with user or team
 */
const handleShareTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { shareWithUserId, shareWithTeamId, permissions, expiresAt } =
      req.body;
    const userId = req.user._id;

    // Verify task ownership
    const task = await Tasks.findOne({ _id: taskId, userId });
    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found or you don't own it" });
    }

    if (!shareWithUserId && !shareWithTeamId) {
      return res
        .status(400)
        .json({ error: "shareWithUserId or shareWithTeamId is required" });
    }

    // Verify user or team exists
    if (shareWithUserId) {
      const user = await User.findById(shareWithUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    if (shareWithTeamId) {
      const team = await Teams.findById(shareWithTeamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
    }

    // Check if already shared
    const existingShare = await TaskShare.findOne({
      taskId,
      "sharedWith.userId": shareWithUserId,
      "sharedWith.teamId": shareWithTeamId,
      isRevoked: false,
    });

    if (existingShare) {
      return res
        .status(400)
        .json({ error: "Task is already shared with this user/team" });
    }

    const taskShare = new TaskShare({
      taskId,
      sharedBy: userId,
      sharedWith: {
        userId: shareWithUserId || null,
        teamId: shareWithTeamId || null,
      },
      permissions: permissions || {
        canView: true,
        canEdit: false,
        canDelete: false,
        canShare: false,
      },
      expiresAt: expiresAt || null,
    });

    await taskShare.save();

    // Create notification
    const io = req.app.get("io");
    if (shareWithUserId && io) {
      await createNotification(io, {
        userId: shareWithUserId,
        type: "task_shared",
        title: "Task shared with you",
        message: `${req.user.fullName} shared a task "${task.title}" with you`,
        relatedTask: taskId,
        triggeredBy: userId,
      });
    }

    res.status(201).json({
      message: "Task shared successfully",
      taskShare,
    });
  } catch (error) {
    console.error("[handleShareTask] Error:", error);
    res.status(500).json({ error: "Failed to share task" });
  }
};

/**
 * Get all shares for a task (owner only)
 */
const handleGetTaskShares = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    // Verify task ownership
    const task = await Tasks.findOne({ _id: taskId, userId });
    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found or you don't own it" });
    }

    const shares = await TaskShare.find({ taskId, isRevoked: false })
      .populate("sharedWith.userId", "fullName email")
      .populate("sharedWith.teamId", "name")
      .populate("sharedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ shares });
  } catch (error) {
    console.error("[handleGetTaskShares] Error:", error);
    res.status(500).json({ error: "Failed to fetch task shares" });
  }
};

/**
 * Get all tasks shared with current user
 */
const handleGetSharedWithMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const shares = await TaskShare.find({
      "sharedWith.userId": userId,
      isRevoked: false,
    })
      .populate("taskId")
      .populate("sharedBy", "fullName email")
      .sort({ createdAt: -1 });

    // Filter out expired shares
    const validShares = shares.filter((share) => {
      if (share.expiresAt && new Date(share.expiresAt) < new Date()) {
        return false;
      }
      return true;
    });

    res.status(200).json({ shares: validShares });
  } catch (error) {
    console.error("[handleGetSharedWithMe] Error:", error);
    res.status(500).json({ error: "Failed to fetch shared tasks" });
  }
};

/**
 * Update share permissions
 */
const handleUpdateSharePermissions = async (req, res) => {
  try {
    const { shareId } = req.params;
    const { permissions } = req.body;
    const userId = req.user._id;

    const share = await TaskShare.findById(shareId);
    if (!share) {
      return res.status(404).json({ error: "Share not found" });
    }

    // Verify task ownership
    const task = await Tasks.findOne({ _id: share.taskId, userId });
    if (!task) {
      return res
        .status(403)
        .json({ error: "Only task owner can update permissions" });
    }

    if (permissions) {
      share.permissions = { ...share.permissions, ...permissions };
    }

    await share.save();

    res.status(200).json({
      message: "Permissions updated successfully",
      share,
    });
  } catch (error) {
    console.error("[handleUpdateSharePermissions] Error:", error);
    res.status(500).json({ error: "Failed to update permissions" });
  }
};

/**
 * Revoke task share
 */
const handleRevokeShare = async (req, res) => {
  try {
    const { shareId } = req.params;
    const userId = req.user._id;

    const share = await TaskShare.findById(shareId);
    if (!share) {
      return res.status(404).json({ error: "Share not found" });
    }

    // Verify task ownership
    const task = await Tasks.findOne({ _id: share.taskId, userId });
    if (!task) {
      return res
        .status(403)
        .json({ error: "Only task owner can revoke shares" });
    }

    share.isRevoked = true;
    share.revokedAt = new Date();
    await share.save();

    res.status(200).json({ message: "Share revoked successfully" });
  } catch (error) {
    console.error("[handleRevokeShare] Error:", error);
    res.status(500).json({ error: "Failed to revoke share" });
  }
};

/**
 * Check user permissions for a task
 */
const handleCheckPermissions = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    // Check if user owns the task
    const ownedTask = await Tasks.findOne({ _id: taskId, userId });
    if (ownedTask) {
      return res.status(200).json({
        permissions: {
          canView: true,
          canEdit: true,
          canDelete: true,
          canShare: true,
          isOwner: true,
        },
      });
    }

    // Check if task is shared with user
    const share = await TaskShare.findOne({
      taskId,
      "sharedWith.userId": userId,
      isRevoked: false,
    });

    if (!share) {
      return res.status(403).json({
        permissions: {
          canView: false,
          canEdit: false,
          canDelete: false,
          canShare: false,
          isOwner: false,
        },
      });
    }

    // Check if share is expired
    if (share.expiresAt && new Date(share.expiresAt) < new Date()) {
      return res.status(403).json({
        permissions: {
          canView: false,
          canEdit: false,
          canDelete: false,
          canShare: false,
          isOwner: false,
        },
      });
    }

    res.status(200).json({
      permissions: {
        ...share.permissions,
        isOwner: false,
      },
    });
  } catch (error) {
    console.error("[handleCheckPermissions] Error:", error);
    res.status(500).json({ error: "Failed to check permissions" });
  }
};

module.exports = {
  handleShareTask,
  handleGetTaskShares,
  handleGetSharedWithMe,
  handleUpdateSharePermissions,
  handleRevokeShare,
  handleCheckPermissions,
};
