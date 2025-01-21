const express = require("express");
const { addTask } = require("../controllers/task/addTask.controller");
const router = express.Router();

router.post("/add-new-task", addTask);

module.exports = router;
