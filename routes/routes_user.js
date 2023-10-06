const express = require("express");
const { registerUser, loginUser } = require("../controllers/controller_user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User routes are working fine");
});

// Register a new user
router.post("/signup", registerUser);

// Log in a user
router.post("/login", loginUser);

module.exports = router;
