// frontend/src/services/socket.service.js

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect(token) {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token: token || this.getToken(),
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
      this.connected = true;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      this.connected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected. Cannot emit:", event);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getToken() {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    return rememberMe
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
  }

  // Task-specific events
  joinTaskRoom(taskId) {
    this.emit("join:task", { taskId });
  }

  leaveTaskRoom(taskId) {
    this.emit("leave:task", { taskId });
  }

  // Chat-specific events
  joinChatRoom(chatId) {
    this.emit("join:chat", { chatId });
  }

  leaveChatRoom(chatId) {
    this.emit("leave:chat", { chatId });
  }

  sendMessage(chatId, message) {
    this.emit("chat:message", { chatId, message });
  }

  // Notification events
  subscribeToNotifications() {
    this.emit("subscribe:notifications");
  }
}

export const socketService = new SocketService();
export default socketService;
