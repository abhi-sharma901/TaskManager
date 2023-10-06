const cron = require("node-cron");
const Task = require("../models/Task");
const sendEmail = require("./send_email"); // Import the sendEmail function
const { model } = require("mongoose");

// Schedule a job to check for due dates every day at midnight
const scheduleTask = async () => {
  cron.schedule("0 0 * * *", async () => {
    const endOfYesterday = new Date();
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    try {
      const tasks = await Task.find({
        dueDate: {
          $gte: endOfYesterday,
          $lte: endOfToday,
        },
        status: "in progress",
      });

      tasks.forEach((task) => {
        sendEmail(
          task.owner.email,
          "Task Due Soon",
          `Task "${task.title}" is due soon.`
        );
      });
    } catch (error) {
      console.error(`Error checking tasks: ${error.message}`);
    }
  });
};

module.exports = {
  scheduleTask,
};
