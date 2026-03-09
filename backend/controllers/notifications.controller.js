// backend/controllers/notifications.controller.js

const Notification = require("../models/notification.model");
const { emitNotification } = require("../utils/socket.handlers");

/**
 * Get all notifications for current user
 */
const handleGetNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    const query = { userId };
    if (unreadOnly === "true") {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate("relatedTask", "title")
      .populate("relatedTeam", "name")
      .populate("triggeredBy", "fullName email");

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({
      userId,
      isRead: false,
    });

    res.status(200).json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
      unreadCount,
    });
  } catch (error) {
    console.error("[handleGetNotifications] Error:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

/**
 * Mark notification as read
 */
const handleMarkAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOne({
      _id: notificationId,
      userId,
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("[handleMarkAsRead] Error:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

/**
 * Mark all notifications as read
 */
const handleMarkAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true, readAt: new Date() },
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("[handleMarkAllAsRead] Error:", error);
    res.status(500).json({ error: "Failed to mark all as read" });
  }
};

/**
 * Delete notification
 */
const handleDeleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      userId,
    });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.error("[handleDeleteNotification] Error:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
};

/**
 * Get unread count
 */
const handleGetUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const unreadCount = await Notification.countDocuments({
      userId,
      isRead: false,
    });

    res.status(200).json({ unreadCount });
  } catch (error) {
    console.error("[handleGetUnreadCount] Error:", error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
};

/**
 * Create notification (utility function for controllers)
 */
const createNotification = async (io, data) => {
  try {
    const notification = new Notification(data);
    await notification.save();
    await notification.populate("triggeredBy", "fullName email");

    // Emit real-time notification if io is available
    if (io) {
      emitNotification(io, data.userId, notification);
    }

    return notification;
  } catch (error) {
    console.error("[createNotification] Error:", error);
    throw error;
  }
};

module.exports = {
  handleGetNotifications,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteNotification,
  handleGetUnreadCount,
  createNotification,
};
