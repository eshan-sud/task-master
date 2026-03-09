// backend/controllers/messages.controller.js

const Message = require("../models/message.model");
const User = require("../models/user.model");
const Teams = require("../models/teams.model");

/**
 * Get messages for a conversation (direct or team)
 */
const handleGetMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { receiverId, teamId, page = 1, limit = 50 } = req.query;

    let query = {};

    if (receiverId) {
      // Direct message conversation
      query = {
        $or: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      };
    } else if (teamId) {
      // Team conversation
      query = { teamId };

      // Verify user is team member
      const team = await Teams.findOne({
        _id: teamId,
        "members.userId": userId,
      });
      if (!team) {
        return res
          .status(403)
          .json({ error: "You are not a member of this team" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "receiverId or teamId is required" });
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate("senderId", "fullName email")
      .populate("receiverId", "fullName email")
      .populate("replyTo");

    const total = await Message.countDocuments(query);

    res.status(200).json({
      messages: messages.reverse(), // Oldest first for chat display
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("[handleGetMessages] Error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

/**
 * Send a message (REST endpoint, real-time handled by Socket.io)
 */
const handleSendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { receiverId, teamId, text, replyTo } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Message text is required" });
    }

    if (!receiverId && !teamId) {
      return res
        .status(400)
        .json({ error: "receiverId or teamId is required" });
    }

    // Verify receiver exists if direct message
    if (receiverId) {
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({ error: "Receiver not found" });
      }
    }

    // Verify team membership if team message
    if (teamId) {
      const team = await Teams.findOne({
        _id: teamId,
        "members.userId": userId,
      });
      if (!team) {
        return res
          .status(403)
          .json({ error: "You are not a member of this team" });
      }
    }

    const message = new Message({
      senderId: userId,
      receiverId: receiverId || null,
      teamId: teamId || null,
      text: text.trim(),
      replyTo: replyTo || null,
    });

    await message.save();
    await message.populate("senderId", "fullName email");
    await message.populate("receiverId", "fullName email");

    // Real-time emission handled by Socket.io
    const io = req.app.get("io");
    if (io) {
      if (receiverId) {
        io.to(`user:${receiverId}`).emit("message:new", message);
      } else if (teamId) {
        io.to(`team:${teamId}`).emit("message:new", message);
      }
    }

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("[handleSendMessage] Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

/**
 * Mark message as read
 */
const handleMarkAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findOne({
      _id: messageId,
      receiverId: userId,
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.isRead = true;
    message.readAt = new Date();
    await message.save();

    // Notify sender
    const io = req.app.get("io");
    if (io) {
      io.to(`user:${message.senderId}`).emit("message:read", {
        messageId,
        readAt: message.readAt,
      });
    }

    res.status(200).json({ message: "Message marked as read" });
  } catch (error) {
    console.error("[handleMarkAsRead] Error:", error);
    res.status(500).json({ error: "Failed to mark message as read" });
  }
};

/**
 * Get all conversations for current user
 */
const handleGetConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all unique users the current user has messaged with
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
          teamId: null, // Only direct messages
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$senderId", userId] }, "$receiverId", "$senderId"],
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiverId", userId] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          userId: "$_id",
          userName: "$user.fullName",
          userEmail: "$user.email",
          lastMessage: 1,
          unreadCount: 1,
        },
      },
      {
        $sort: { "lastMessage.createdAt": -1 },
      },
    ]);

    res.status(200).json({ conversations });
  } catch (error) {
    console.error("[handleGetConversations] Error:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

/**
 * Delete message
 */
const handleDeleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findOne({
      _id: messageId,
      senderId: userId,
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    await message.save();

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      if (message.receiverId) {
        io.to(`user:${message.receiverId}`).emit("message:deleted", {
          messageId,
        });
      } else if (message.teamId) {
        io.to(`team:${message.teamId}`).emit("message:deleted", {
          messageId,
        });
      }
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("[handleDeleteMessage] Error:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};

module.exports = {
  handleGetMessages,
  handleSendMessage,
  handleMarkAsRead,
  handleGetConversations,
  handleDeleteMessage,
};
