// frontend/src/components/Messages/ConversationList.jsx

import { formatDistanceToNow } from "date-fns";

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
}) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.length > 0 ? (
        conversations.map((conversation) => {
          const otherParticipant = conversation.participants?.[0]; // Simplified
          const lastMessage = conversation.lastMessage;
          const isSelected = selectedConversation === conversation._id;

          return (
            <div
              key={conversation._id}
              onClick={() => onSelectConversation(conversation._id)}
              className={`p-4 cursor-pointer transition-colors ${
                isSelected
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {otherParticipant?.name?.[0]?.toUpperCase() ||
                      otherParticipant?.email?.[0]?.toUpperCase() ||
                      "?"}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {otherParticipant?.name ||
                        otherParticipant?.email ||
                        "Unknown"}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {formatDistanceToNow(new Date(lastMessage.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    )}
                  </div>

                  {lastMessage && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {lastMessage.content}
                    </p>
                  )}

                  {conversation.unreadCount > 0 && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No conversations yet
        </div>
      )}
    </div>
  );
};

export default ConversationList;
