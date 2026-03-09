// backend/models/notification.model.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_shared",
        "task_due_soon",
        "task_overdue",
        "task_completed",
        "task_updated",
        "task_comment",
        "task_mention",
        "team_invite",
        "team_removed",
        "profile_update",
        "password_changed",
        "system",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    relatedTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
    },
    relatedTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actionUrl: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Indexes
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
