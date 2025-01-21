const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: "books",
    },
    status: {
      type: String,
      required: true,
      default: "todo",
      enum: ["todo", "inProgress", "done", "canceled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
