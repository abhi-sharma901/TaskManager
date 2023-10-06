const express = require("express");
const mongoose = require("mongoose");
const routes_user = require("./routes/routes_user");
const routes_task = require("./routes/routes_task");
const requestLogger = require("./middleware/requestLogger");
const { scheduleTask } = require("./backgroundTask/dueDateScheduler");

const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from a .env file

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(requestLogger); // Request logging middleware

app.use("/users", routes_user);
app.use("/tasks", routes_task);

//Sending email For due date task Schedule
scheduleTask();

// MongoDB Connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Task manager API is Working",
  });
});
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
