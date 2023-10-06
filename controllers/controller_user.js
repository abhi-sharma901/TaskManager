const express = require("express");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ user, message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.json({ user, token, message: "User LoggedIn Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Login failed" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
