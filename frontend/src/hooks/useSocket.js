// frontend/src/hooks/useSocket.js

import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import socketService from "../services/socket.service";
import AuthContext from "../utils/AuthContext";

// Redux actions
import {
  taskAdded,
  taskUpdated,
  taskRemoved,
  taskArchived,
} from "../store/slices/tasksSlice";
import {
  teamAdded,
  teamUpdated,
  teamRemoved,
  memberAdded,
  memberRemoved,
  memberRoleUpdated,
} from "../store/slices/teamsSlice";
import {
  commentAdded,
  commentUpdated,
  commentDeleted,
} from "../store/slices/commentsSlice";
import {
  messageReceived,
  messageSent,
  messageRead,
} from "../store/slices/messagesSlice";
import {
  notificationReceived,
  notificationRead,
} from "../store/slices/notificationsSlice";
import { userOnline, userOffline } from "../store/slices/presenceSlice";

/**
 * Custom hook to manage Socket.io connection and event listeners
 * Automatically connects when authenticated and cleans up on unmount
 */
export const useSocket = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      socketService.disconnect();
      return;
    }

    // Connect to Socket.io server
    const socket = socketService.connect();

    // Task events
    socket.on("task:created", (task) => {
      console.log("Socket: Task created", task);
      dispatch(taskAdded(task));
    });

    socket.on("task:updated", (task) => {
      console.log("Socket: Task updated", task);
      dispatch(taskUpdated(task));
    });

    socket.on("task:deleted", ({ taskId }) => {
      console.log("Socket: Task deleted", taskId);
      dispatch(taskRemoved(taskId));
    });

    socket.on("task:archived", ({ taskId }) => {
      console.log("Socket: Task archived", taskId);
      dispatch(taskArchived(taskId));
    });

    // Team events
    socket.on("team:created", (team) => {
      console.log("Socket: Team created", team);
      dispatch(teamAdded(team));
    });

    socket.on("team:updated", (team) => {
      console.log("Socket: Team updated", team);
      dispatch(teamUpdated(team));
    });

    socket.on("team:deleted", ({ teamId }) => {
      console.log("Socket: Team deleted", teamId);
      dispatch(teamRemoved(teamId));
    });

    socket.on("team:member_added", ({ teamId, member }) => {
      console.log("Socket: Team member added", teamId, member);
      dispatch(memberAdded({ teamId, member }));
    });

    socket.on("team:member_removed", ({ teamId, userId }) => {
      console.log("Socket: Team member removed", teamId, userId);
      dispatch(memberRemoved({ teamId, userId }));
    });

    socket.on("team:member_role_updated", ({ teamId, userId, role }) => {
      console.log("Socket: Team member role updated", teamId, userId, role);
      dispatch(memberRoleUpdated({ teamId, userId, role }));
    });

    // Comment events
    socket.on("comment:added", ({ taskId, comment }) => {
      console.log("Socket: Comment added", taskId, comment);
      dispatch(commentAdded({ taskId, comment }));
    });

    socket.on("comment:updated", ({ taskId, comment }) => {
      console.log("Socket: Comment updated", taskId, comment);
      dispatch(commentUpdated({ taskId, comment }));
    });

    socket.on("comment:deleted", ({ taskId, commentId }) => {
      console.log("Socket: Comment deleted", taskId, commentId);
      dispatch(commentDeleted({ taskId, commentId }));
    });

    // Message events
    socket.on("message:received", (message) => {
      console.log("Socket: Message received", message);
      dispatch(messageReceived(message));
    });

    socket.on("message:sent", (message) => {
      console.log("Socket: Message sent", message);
      dispatch(messageSent(message));
    });

    socket.on("message:read", ({ messageId, conversationId }) => {
      console.log("Socket: Message read", messageId, conversationId);
      dispatch(messageRead({ messageId, conversationId }));
    });

    // Notification events
    socket.on("notification:new", (notification) => {
      console.log("Socket: New notification", notification);
      dispatch(notificationReceived(notification));
    });

    socket.on("notification:read", ({ notificationId }) => {
      console.log("Socket: Notification read", notificationId);
      dispatch(notificationRead(notificationId));
    });

    // User presence events
    socket.on("user:online", ({ userId, username }) => {
      console.log("Socket: User online", userId, username);
      dispatch(userOnline({ userId, username }));
    });

    socket.on("user:offline", ({ userId, username }) => {
      console.log("Socket: User offline", userId, username);
      dispatch(userOffline({ userId, username }));
    });

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Socket.io connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket.io disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Cleanup function
    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
      socket.off("task:archived");
      socket.off("team:created");
      socket.off("team:updated");
      socket.off("team:deleted");
      socket.off("team:member_added");
      socket.off("team:member_removed");
      socket.off("team:member_role_updated");
      socket.off("comment:added");
      socket.off("comment:updated");
      socket.off("comment:deleted");
      socket.off("message:received");
      socket.off("message:sent");
      socket.off("message:read");
      socket.off("notification:new");
      socket.off("notification:read");
      socket.off("user:online");
      socket.off("user:offline");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");

      socketService.disconnect();
    };
  }, [isAuthenticated, dispatch]);

  return socketService;
};

export default useSocket;
