// filename - backend/models/categories.model.js

const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: { type: String, required: true },
  category: { type: String, required: true }, // Eg, Work, Personal, Custom,  etc
});

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
