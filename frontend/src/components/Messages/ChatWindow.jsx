// frontend/src/components/Messages/ChatWindow.jsx

import { useSelector } from "react-redux";
import { useState, useEffect, useMemo, useRef, useCallback, useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { FiSend } from "react-icons/fi";
import socketService from "../../services/socket.service";
import AuthContext from "../../utils/AuthContext";
import { sanitizeHTML } from "../../utils/sanitize";

const ChatWindow = ({ conversationId, onSendMessage }) => {
  const { byConversationId } = useSelector((state) => state.messages);
  const { isAuthenticated } = useContext(AuthContext);
  const messageItems = byConversationId[conversationId]?.items;
  const messages = useMemo(() => messageItems ?? [], [messageItems]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for typing events
  useEffect(() => {
    if (!isAuthenticated || !conversationId) return;

    const handleTypingStart = ({ username }) => {
      setTypingUsers((prev) => new Set([...prev, username]));
    };

    const handleTypingStop = ({ username }) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(username);
        return newSet;
      });
    };

    socketService.on("typing:start", handleTypingStart);
    socketService.on("typing:stop", handleTypingStop);

    // Join conversation room
    socketService.emit("join:chat", { chatId: conversationId });

    return () => {
      socketService.off("typing:start", handleTypingStart);
      socketService.off("typing:stop", handleTypingStop);
      socketService.emit("leave:chat", { chatId: conversationId });
    };
  }, [conversationId, isAuthenticated]);

  // Handle typing indicator
  const handleTypingStart = useCallback(() => {
    if (!isTyping) {
      socketService.emit("typing:start", { conversationId });
      setIsTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketService.emit("typing:stop", { conversationId });
      setIsTyping(false);
    }, 3000);
  }, [conversationId, isTyping]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
    handleTypingStart();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socketService.emit("typing:stop", { conversationId });
    setIsTyping(false);

    onSendMessage(newMessage);
    setNewMessage("");
  };

  const currentUserId = "current-user"; // Get from auth context

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => {
            const isOwn = message.sender?._id === currentUserId;
            return (
              <div
                key={message._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    isOwn
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {!isOwn && (
                    <p className="text-xs font-medium mb-1 opacity-70">
                      {message.sender?.name || message.sender?.email}
                    </p>
                  )}
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(message.content),
                    }}
                  />
                  <p
                    className={`text-xs mt-1 ${isOwn ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No messages yet. Start the conversation!
          </div>
        )}

        {/* Typing indicator */}
        {typingUsers.size > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex gap-1">
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </div>
            <span>
              {Array.from(typingUsers).join(", ")}{" "}
              {typingUsers.size > 1 ? "are" : "is"} typing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <FiSend /> Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
