// filename - backend/models/tasks.model.js

const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    category: { type: String, required: true }, // Eg, Work, Personal, etc
    text: { type: String, required: true },
    // associatedFile: {type: path}, // If any attached files with it, give a choice of uploading cloud or keep on device
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
