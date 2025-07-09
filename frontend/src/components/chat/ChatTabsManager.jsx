// frontend/src/components/chat/ChatTabsManager.jsx

import { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatDock from "./ChatDock";

export default function ChatTabsManager() {
  const [openChats, setOpenChats] = useState([]);

  const handleNewChat = () => {
    const fakeUser = { id: Date.now(), name: `User${openChats.length + 1}` };
    setOpenChats((prev) => [...prev, fakeUser]);
  };

  const handleCloseChat = (userId) => {
    setOpenChats((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 flex z-40">
        {openChats.map((user) => (
          <ChatWindow
            key={user.id}
            user={user}
            onClose={() => handleCloseChat(user.id)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 right-10 items-center z-30 flex gap-5">
        {openChats.map((user) => (
          <button
            key={user.id}
            className="bg-gray-200 transition hover:bg-gray-300 text-lg text-white w-60 h-9 rounded-t-lg"
            onClick={() => {}}
          >
            {user.name}
          </button>
        ))}
        <button
          onClick={handleNewChat}
          className="bg-blue-700 text-lg hover:bg-blue-800 text-white transition w-60 h-9 rounded-t-lg"
        >
          Chat
        </button>
      </div>
    </>
  );
}
