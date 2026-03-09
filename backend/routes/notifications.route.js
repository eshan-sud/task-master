// backend/routes/notifications.route.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  handleGetNotifications,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteNotification,
  handleGetUnreadCount,
} = require("../controllers/notifications.controller");

// All routes require authentication
router.use(authenticate);

router.get("/", handleGetNotifications);
router.get("/unread-count", handleGetUnreadCount);
router.patch("/:notificationId/read", handleMarkAsRead);
router.patch("/mark-all-read", handleMarkAllAsRead);
router.delete("/:notificationId", handleDeleteNotification);

module.exports = router;
