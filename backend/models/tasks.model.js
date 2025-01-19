// filename - backend/models/tasks.model.js

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
    completed: {
      type: Boolean,
      default: false,
    },
    associatedFile: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
