// frontend/src/components/common/skeletons/MessageSkeleton.jsx

/**
 * MessageSkeleton Component
 *
 * Animated skeleton loader for chat messages.
 * Displays while message data is being fetched.
 *
 * @param {Object} props
 * @param {boolean} props.isSent - Whether the message is sent (true) or received (false)
 */
export const MessageSkeleton = ({ isSent = false }) => {
  return (
    <div
      className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4 animate-pulse`}
    >
      <div
        className={`flex items-end gap-2 max-w-[70%] ${
          isSent ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar Skeleton */}
        {!isSent && (
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        )}

        {/* Message Bubble Skeleton */}
        <div
          className={`px-4 py-3 rounded-lg space-y-2 ${
            isSent
              ? "bg-blue-100 dark:bg-blue-900/30"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {/* Message Text Lines */}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-36"></div>

          {/* Timestamp */}
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 mt-2"></div>
        </div>

        {/* Avatar Skeleton for sent messages */}
        {isSent && (
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

/**
 * ChatWindowSkeleton Component
 *
 * Renders multiple message skeletons for chat loading state.
 * Alternates between sent and received messages for realistic appearance.
 *
 * @param {Object} props
 * @param {number} props.count - Number of message skeletons to display (default: 8)
 */
export const ChatWindowSkeleton = ({ count = 8 }) => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <MessageSkeleton key={index} isSent={index % 3 === 0} />
      ))}
    </div>
  );
};

/**
 * ConversationItemSkeleton Component
 *
 * Skeleton loader for conversation list items.
 */
export const ConversationItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

      {/* Content Skeleton */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
        </div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
      </div>

      {/* Unread Badge Skeleton */}
      <div className="flex-shrink-0 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
    </div>
  );
};

/**
 * ConversationListSkeleton Component
 *
 * Renders multiple conversation item skeletons.
 *
 * @param {Object} props
 * @param {number} props.count - Number of skeleton items to display (default: 6)
 */
export const ConversationListSkeleton = ({ count = 6 }) => {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }).map((_, index) => (
        <ConversationItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default MessageSkeleton;
