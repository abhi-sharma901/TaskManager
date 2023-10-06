const express = require('express');
const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const registerUser  = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        //const token = await user.generateAuthToken(); 
        res.status(201).json({ user, message: "User Created Successfully" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

    // Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.json({ user, token, message: "User LoggedIn Successfully"});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Login failed' });
    }
};  

module.exports={
    registerUser,
    loginUser
};
//   // Route for user profile (requires authentication)
// router.get('/profile', authMiddleware, async (req, res) => {
//     res.json(req.user);
// });  
  // Route for user logout (requires authentication)