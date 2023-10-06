const express = require("express");
const Task = require("../models/Task");
const {
  createTask,
  getTask,
  getTaskById,
  updateTask,
  deleteTaskById,
} = require("../controllers/controller_task");
const router = express.Router();
const auth = require("../middleware/authentication");

router.get("/test", auth, (req, res) => {
  res.json({
    message: "Task routes are working fine",
    user: req.user,
  });
});

router.post("/create", auth, createTask);

router.get("/get", auth, getTask);

router.get("/getbyid/:id", auth, getTaskById);

router.patch("/updatetask/:id", auth, updateTask);

router.delete("/deletetask/:id", auth, deleteTaskById);

module.exports = router;
