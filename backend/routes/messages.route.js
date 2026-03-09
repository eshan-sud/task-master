// backend/routes/messages.route.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  handleGetMessages,
  handleSendMessage,
  handleMarkAsRead,
  handleGetConversations,
  handleDeleteMessage,
} = require("../controllers/messages.controller");

// All routes require authentication
router.use(authenticate);

router.get("/", handleGetMessages);
router.get("/conversations", handleGetConversations);
router.post("/send", handleSendMessage);
router.patch("/:messageId/read", handleMarkAsRead);
router.delete("/:messageId", handleDeleteMessage);

module.exports = router;
