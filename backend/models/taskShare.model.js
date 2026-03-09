// backend/models/taskShare.model.js

const mongoose = require("mongoose");

const taskShareSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
      required: true,
    },
    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
      },
    },
    permissions: {
      canView: {
        type: Boolean,
        default: true,
      },
      canEdit: {
        type: Boolean,
        default: false,
      },
      canDelete: {
        type: Boolean,
        default: false,
      },
      canShare: {
        type: Boolean,
        default: false,
      },
    },
    expiresAt: {
      type: Date,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    revokedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Indexes
taskShareSchema.index({ taskId: 1 });
taskShareSchema.index({ "sharedWith.userId": 1 });
taskShareSchema.index({ "sharedWith.teamId": 1 });
taskShareSchema.index({ sharedBy: 1 });

// Ensure either userId or teamId is set, not both
taskShareSchema.pre("save", function (next) {
  if (
    (this.sharedWith.userId && this.sharedWith.teamId) ||
    (!this.sharedWith.userId && !this.sharedWith.teamId)
  ) {
    next(
      new Error("Task must be shared with either a user or a team, not both"),
    );
  }
  next();
});

const TaskShare = mongoose.model("TaskShare", taskShareSchema);

module.exports = TaskShare;
