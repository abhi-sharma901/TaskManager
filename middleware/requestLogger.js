const fs = require("fs");

const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

const requestLogger = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${
    req.originalUrl
  }\n`;
  accessLogStream.write(logMessage);
  next();
};

module.exports = requestLogger;
