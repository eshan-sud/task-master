// frontend/src/components/chat/ChatDock.jsx

import {
  FiMessageSquare,
  FiChevronUp,
  FiEdit2,
  FiMoreHorizontal,
  FiX,
} from "react-icons/fi";

export default function ChatDock({
  openChats,
  onOpenNewChat,
  onOpenChat,
  onCloseChat,
}) {
  return (
    <div className="fixed bottom-0 right-0 z-5 flex items-end bg-blue-100 shadow-md rounded-tl-lg rounded-tr-lg">
      {/* Active Chats */}
      {openChats.map((user) => (
        <div
          key={user.id}
          className="flex items-center bg-blue-300 text-white rounded-t-lg px-2 py-1 shadow-md hover:bg-blue-400 transition"
        >
          {/* Avatar Circle */}
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden mr-2">
            {/* If you have image, replace text with <img src={user.avatar} /> */}
            <div className="w-full h-full flex items-center justify-center text-blue-700 font-bold">
              {user.name[0]}
            </div>
          </div>

          {/* Name */}
          <span
            onClick={() => onOpenChat(user.id)}
            className="cursor-pointer text-sm font-semibold pr-2"
          >
            {user.name}
          </span>

          {/* Close Chat Tab */}
          <button
            onClick={() => onCloseChat(user.id)}
            className="ml-auto hover:text-red-500"
          >
            <FiX size={14} />
          </button>
        </div>
      ))}

      {/* Final Messaging Tab */}
      <div className="flex items-center bg-blue-500 text-white rounded-t-lg px-3 py-2 shadow-md space-x-2">
        <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center font-bold text-white">
          D
        </div>
        <span className="text-sm font-semibold">Messaging</span>

        {/* Notification Badge */}
        <div className="bg-red-600 text-white rounded-full text-xs px-2 py-0.5 font-bold">
          4
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-1 ml-2">
          <FiMoreHorizontal className="hover:text-gray-200 cursor-pointer" />
          <FiEdit2 className="hover:text-gray-200 cursor-pointer" />
          <FiChevronUp
            className="hover:text-gray-200 cursor-pointer"
            onClick={onOpenNewChat}
          />
        </div>
      </div>
    </div>
  );
}
