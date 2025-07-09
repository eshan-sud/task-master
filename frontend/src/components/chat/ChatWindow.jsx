// frontend/src/components/chat/ChatWindow.jsx

import { useState } from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ user, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hey there!" },
  ]);

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender: "me", text }]);
  };

  return (
    <div className="fixed bottom-4 right-[100px] w-72 bg-white border shadow-lg rounded-xl flex flex-col overflow-hidden z-50">
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
        <span>{user.name}</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-gray-50 max-h-60">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            mine={msg.sender === "me"}
          />
        ))}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
