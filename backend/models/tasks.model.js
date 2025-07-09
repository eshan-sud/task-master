// backend/models/tasks.model.js

const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    associatedFiles: [
      {
        fileName: String,
        fileUrl: String,
        fileSize: {
          type: Number, // in bytes
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: [
        "Initial",
        "Pending",
        "Started",
        "Completed",
        "Review",
        "On Hold",
        "Blocked",
        "Scheduled",
        "Archived",
        "Deleted",
      ],
      default: "Initial",
    },
    recurrence: {
      type: {
        type: String,
        enum: ["none", "daily", "weekly", "monthly", "quarterly", "yearly"],
        default: "none",
      },
      interval: Number, // Optional custom interval
      endsOn: Date, // Optional end date
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: Date,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
    dependsOn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
