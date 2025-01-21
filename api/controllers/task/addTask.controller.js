const User = require("../../models/userModel.js");
const Task = require("../../models/taskModel.js");
const addTask = async (req, res) => {
  try {
    // const createdBy = await User.findById(req.user.email);
    const newTask = await Task.create({
      ...req.body,
      //   createdBy: createdBy,
    });
    res.status(201).json({ message: "Task added successfully", data: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports = { addTask };
