// backend/middleware/maintenance.js

const path = require("path");

const maintenanceMode = (req, res, next) => {
  if (process.env.MAINTENANCE_MODE === "true") {
    return res
      .status(503)
      .sendFile(path.join(__dirname, "../public/maintenance.html"));
  }
  next();
};

module.exports = maintenanceMode;
