const express = require("express");
const Task = require("../models/Task");

const auth = require("../middleware/authentication");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id, // Associate task with the authenticated user
    });
    await task.save();
    res.status(201).json({ status: "success", task });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

//Get tasks
const getTask = async (req, res) => {
  try {
    const task = await Task.find({
      owner: req.user._id,
    });
    res.status(200).json({ status: "task fetched", task, count: task.length });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const taskid = req.params.id;
    console.log(taskid, req.user._id);
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ status: "task fetched", task });
  } catch (err) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

const updateTask = async (req, res) => {
  const taskid = req.params.id;
  const updates = Object.keys(req.body);
  // {
  //     title: "title"
  //     description : "new description",
  //     status: "new status",
  //     dueDate: date,
  //     owner : "asfasfasfasfasf"
  // }
  const allowedUpdates = ["description", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Updates" });
  }

  try {
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.json({
      message: "Task Updated Successfully",
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  createTask,
  getTask,
  getTaskById,
};
