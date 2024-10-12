const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
    required: [true, "must provide name"],
    trim: true, // removes the space from starting and ending
    maxLength: [30, "name can not be more than 30 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
