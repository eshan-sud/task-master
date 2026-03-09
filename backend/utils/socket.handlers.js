// backend/utils/socket.handlers.js

/**
 * Socket.io event handlers for real-time features
 */

const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const Message = require("../models/message.model");
const Comment = require("../models/comment.model");

/**
 * Initialize Socket.io event handlers
 * @param {Object} io - Socket.io server instance
 */
const initializeSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log(`[Socket] User connected: ${userId}`);

    // Join user's personal room for notifications
    socket.join(`user:${userId}`);

    // ===== PRESENCE & STATUS =====
    socket.on("user:online", async () => {
      try {
        await User.findByIdAndUpdate(userId, {
          isOnline: true,
          lastSeen: new Date(),
        });
        io.emit("user:status", { userId, isOnline: true });
      } catch (error) {
        console.error("[Socket] user:online error:", error);
      }
    });

    // ===== TASK ROOM MANAGEMENT =====
    socket.on("task:join", (taskId) => {
      socket.join(`task:${taskId}`);
      console.log(`[Socket] User ${userId} joined task room: ${taskId}`);
    });

    socket.on("task:leave", (taskId) => {
      socket.leave(`task:${taskId}`);
      console.log(`[Socket] User ${userId} left task room: ${taskId}`);
    });

    // Task real-time updates (emitted from controllers)
    // Listeners are in frontend via socketService

    // ===== TYPING INDICATORS =====
    socket.on("typing:start", ({ taskId, chatId }) => {
      const roomId = taskId ? `task:${taskId}` : `chat:${chatId}`;
      socket.to(roomId).emit("typing:user", {
        userId,
        userName: socket.user.fullName,
        isTyping: true,
      });
    });

    socket.on("typing:stop", ({ taskId, chatId }) => {
      const roomId = taskId ? `task:${taskId}` : `chat:${chatId}`;
      socket.to(roomId).emit("typing:user", {
        userId,
        userName: socket.user.fullName,
        isTyping: false,
      });
    });

    // ===== CHAT MESSAGES =====
    socket.on("message:send", async (data) => {
      try {
        const { receiverId, teamId, text, replyTo } = data;

        const message = new Message({
          senderId: userId,
          receiverId,
          teamId,
          text,
          replyTo,
        });

        await message.save();
        await message.populate("senderId", "fullName email");

        // Emit to receiver or team
        if (receiverId) {
          io.to(`user:${receiverId}`).emit("message:new", message);
        } else if (teamId) {
          io.to(`team:${teamId}`).emit("message:new", message);
        }

        // Confirm to sender
        socket.emit("message:sent", { tempId: data.tempId, message });
      } catch (error) {
        console.error("[Socket] message:send error:", error);
        socket.emit("message:error", { error: error.message });
      }
    });

    socket.on("message:read", async (messageId) => {
      try {
        const message = await Message.findByIdAndUpdate(
          messageId,
          { isRead: true, readAt: new Date() },
          { new: true },
        );

        if (message) {
          io.to(`user:${message.senderId}`).emit("message:read", {
            messageId,
            readAt: message.readAt,
          });
        }
      } catch (error) {
        console.error("[Socket] message:read error:", error);
      }
    });

    // ===== TEAM ROOMS =====
    socket.on("team:join", (teamId) => {
      socket.join(`team:${teamId}`);
      console.log(`[Socket] User ${userId} joined team room: ${teamId}`);
    });

    socket.on("team:leave", (teamId) => {
      socket.leave(`team:${teamId}`);
      console.log(`[Socket] User ${userId} left team room: ${teamId}`);
    });

    // ===== NOTIFICATIONS =====
    socket.on("notification:markRead", async (notificationId) => {
      try {
        await Notification.findByIdAndUpdate(notificationId, {
          isRead: true,
          readAt: new Date(),
        });
        socket.emit("notification:updated", { notificationId, isRead: true });
      } catch (error) {
        console.error("[Socket] notification:markRead error:", error);
      }
    });

    // ===== COMMENTS =====
    socket.on("comment:add", async (data) => {
      try {
        const { taskId, text, mentions, parentComment } = data;

        const comment = new Comment({
          taskId,
          userId,
          text,
          mentions,
          parentComment,
        });

        await comment.save();
        await comment.populate("userId", "fullName email");

        // Emit to task room
        io.to(`task:${taskId}`).emit("comment:new", comment);

        // Send notifications to mentioned users
        if (mentions && mentions.length > 0) {
          mentions.forEach((mentionedUserId) => {
            io.to(`user:${mentionedUserId}`).emit("notification:new", {
              type: "task_mention",
              taskId,
              commentId: comment._id,
            });
          });
        }
      } catch (error) {
        console.error("[Socket] comment:add error:", error);
        socket.emit("comment:error", { error: error.message });
      }
    });

    // ===== DISCONNECT =====
    socket.on("disconnect", async () => {
      console.log(`[Socket] User disconnected: ${userId}`);
      try {
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date(),
        });
        io.emit("user:status", { userId, isOnline: false });
      } catch (error) {
        console.error("[Socket] disconnect error:", error);
      }
    });
  });

  return io;
};

/**
 * Emit task update to all users in task room
 */
const emitTaskUpdate = (io, taskId, event, data) => {
  io.to(`task:${taskId}`).emit(event, data);
};

/**
 * Emit notification to specific user
 */
const emitNotification = (io, userId, notification) => {
  io.to(`user:${userId}`).emit("notification:new", notification);
};

/**
 * Emit team update to all team members
 */
const emitTeamUpdate = (io, teamId, event, data) => {
  io.to(`team:${teamId}`).emit(event, data);
};

module.exports = {
  initializeSocketHandlers,
  emitTaskUpdate,
  emitNotification,
  emitTeamUpdate,
};
