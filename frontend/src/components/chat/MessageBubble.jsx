// frontend/src/components/chat/MessageBubble.jsx

import { formatDistanceToNow } from "date-fns";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

export default function MessageBubble({ text, mine, timestamp, isRead }) {
  const formattedTime = timestamp
    ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    : "";

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-lg px-3 py-2 ${
          mine
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="text-sm break-words">{text}</p>
        <div
          className={`flex items-center gap-1 mt-1 text-xs ${
            mine ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <span>{formattedTime}</span>
          {mine && (
            <span className="ml-1">
              {isRead ? <FiCheckCircle size={12} /> : <FiCheck size={12} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
