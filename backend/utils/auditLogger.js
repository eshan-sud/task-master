// backend/utils/auditLogger.js

const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "..", "logs", "audit.log");

const auditLog = ({
  userId,
  action,
  resourceType,
  resourceId,
  metadata = {},
}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    userId,
    action, // "UPDATE_PROFILE", "DELETE_TASK"
    resourceType, // "USER", "TASK"
    resourceId, // ID of user/task/etc.
    metadata, // { fieldChanged: "email", old: "", new: "" }
  };

  fs.appendFile(logFile, JSON.stringify(entry) + "\n", (err) => {
    if (err) console.error("Audit log error:", err);
  });
};

module.exports = { auditLog };
