// backend/models/activityLog.model.js

const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: [
        "login",
        "logout",
        "register",
        "password_changed",
        "profile_updated",
        "account_deleted",
        "task_created",
        "task_updated",
        "task_deleted",
        "task_shared",
        "task_completed",
        "team_created",
        "team_joined",
        "team_left",
        "member_added",
        "member_removed",
        "role_changed",
        "settings_updated",
      ],
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["user", "task", "team", "category", "comment", "session"],
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
  },
  { timestamps: true },
);

// Indexes
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ resourceType: 1, resourceId: 1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

module.exports = ActivityLog;
