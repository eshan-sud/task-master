// frontend/src/components/chat/ChatWindow.jsx

import { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiMinus } from "react-icons/fi";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import {
  fetchMessages,
  sendMessage,
  addTempMessage,
} from "../../store/slices/messagesSlice.js";
import toast from "react-hot-toast";

export default function ChatWindow({ user, onClose, onMinimize }) {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  const conversationId = user._id || user.id;
  const conversation = useSelector(
    (state) => state.messages.byConversationId[conversationId],
  );
  const messageItems = conversation?.items;
  const messages = useMemo(() => messageItems ?? [], [messageItems]);
  const loading = conversation?.loading || false;

  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Fetch messages when chat window opens
    if (conversationId) {
      dispatch(fetchMessages({ receiverId: conversationId }));
    }
  }, [dispatch, conversationId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Optimistic update
    const tempMessage = {
      _id: `temp-${Date.now()}`,
      tempId: `temp-${Date.now()}`,
      text,
      senderId: currentUserId,
      receiverId: conversationId,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    dispatch(addTempMessage({ conversationId, message: tempMessage }));

    try {
      await dispatch(
        sendMessage({
          receiverId: conversationId,
          text,
        }),
      ).unwrap();
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) onMinimize();
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-t-lg flex flex-col overflow-hidden mr-2">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold">
              {(user.fullName ||
                user.name ||
                user.email ||
                "U")[0].toUpperCase()}
            </span>
          </div>
          <span className="font-medium truncate">
            {user.fullName || user.name || user.email || "User"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMinimize}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            <FiMinus size={18} />
          </button>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            title="Close"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area - Hidden when minimized */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-900 h-96">
            {loading && messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading messages...
                  </p>
                </div>
              </div>
            ) : messages.length > 0 ? (
              <>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    text={msg.text}
                    mine={msg.senderId === currentUserId}
                    timestamp={msg.createdAt}
                    isRead={msg.isRead}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}
          </div>

          <MessageInput onSend={handleSend} />
        </>
      )}
    </div>
  );
}
