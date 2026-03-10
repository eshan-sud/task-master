// frontend/src/components/chat/ChatTabsManager.jsx

import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import ChatWindow from "./ChatWindow";
import NewChatPopup from "./NewChatPopup";

export default function ChatTabsManager() {
  const [openChats, setOpenChats] = useState([]);
  const [showNewChatPopup, setShowNewChatPopup] = useState(false);

  const handleSelectUser = (user) => {
    // Check if chat already exists
    const existingChat = openChats.find(
      (chat) => (chat._id || chat.id) === (user._id || user.id),
    );

    if (existingChat) {
      return;
    }

    // Limit to 3 open chats at a time
    if (openChats.length >= 3) {
      // Close the oldest chat
      setOpenChats((prev) => [...prev.slice(1), user]);
    } else {
      setOpenChats((prev) => [...prev, user]);
    }
  };

  const handleCloseChat = (userId) => {
    setOpenChats((prev) =>
      prev.filter((user) => (user._id || user.id) !== userId),
    );
  };

  return (
    <>
      {/* Chat Windows */}
      <div className="fixed bottom-0 right-20 flex items-end gap-2 z-40">
        {openChats.map((user) => (
          <ChatWindow
            key={user._id || user.id}
            user={user}
            onClose={() => handleCloseChat(user._id || user.id)}
          />
        ))}
      </div>

      {/* New Chat Button */}
      <button
        onClick={() => setShowNewChatPopup(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all hover:scale-105"
        title="Start a new chat"
      >
        <FiMessageCircle size={20} />
        <span>New Chat</span>
      </button>

      {/* New Chat Popup */}
      {showNewChatPopup && (
        <NewChatPopup
          onClose={() => setShowNewChatPopup(false)}
          onSelectUser={handleSelectUser}
        />
      )}
    </>
  );
}
