// frontend/src/components/chat/MessageInput.jsx

import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex border-t px-2 py-1 bg-white">
      <input
        className="flex-1 outline-none px-2"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="text-blue-600 font-bold">
        Send
      </button>
    </form>
  );
}
