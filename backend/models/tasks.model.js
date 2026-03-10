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
    title: {
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
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
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
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    pinned: {
      type: Boolean,
      default: false,
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
