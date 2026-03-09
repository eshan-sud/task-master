// backend/routes/taskShare.route.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  handleShareTask,
  handleGetTaskShares,
  handleGetSharedWithMe,
  handleUpdateSharePermissions,
  handleRevokeShare,
  handleCheckPermissions,
} = require("../controllers/taskShare.controller");

// All routes require authentication
router.use(authenticate);

// Share task
router.post("/:taskId/share", handleShareTask);
router.get("/:taskId/shares", handleGetTaskShares);
router.get("/:taskId/permissions", handleCheckPermissions);

// Manage shares
router.get("/shared-with-me", handleGetSharedWithMe);
router.patch("/:shareId/permissions", handleUpdateSharePermissions);
router.delete("/:shareId/revoke", handleRevokeShare);

module.exports = router;
