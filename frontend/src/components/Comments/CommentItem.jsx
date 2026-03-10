// frontend/src/components/Comments/CommentItem.jsx

import { formatDistanceToNow } from "date-fns";
import { FiTrash2, FiSmile } from "react-icons/fi";
import { useState, useCallback, useMemo, memo } from "react";
import { sanitizeText } from "../../utils/sanitize";

const CommentItem = memo(({ comment, onDelete, onReaction }) => {
  const [showReactions, setShowReactions] = useState(false);
  const reactions = useMemo(() => ["👍", "❤️", "😊", "🎉", "👏"], []);

  // Extract mentions from content with useMemo
  const renderedContent = useMemo(() => {
    // Sanitize content to remove any HTML/XSS attacks
    const cleanContent = sanitizeText(comment.content);
    const mentionRegex = /@(\w+)/g;
    const parts = cleanContent.split(mentionRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a mention
        return (
          <span
            key={index}
            className="text-blue-600 dark:text-blue-400 font-medium"
          >
            @{part}
          </span>
        );
      }
      return part;
    });
  }, [comment.content]);

  const handleDelete = useCallback(() => {
    onDelete(comment._id);
  }, [onDelete, comment._id]);

  const handleReaction = useCallback(
    (emoji) => {
      onReaction(comment._id, emoji);
    },
    [onReaction, comment._id],
  );

  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {comment.user?.name?.[0]?.toUpperCase() ||
            comment.user?.email?.[0]?.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
              {comment.user?.name || comment.user?.email}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <FiTrash2 size={14} />
          </button>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {renderedContent}
        </p>

        {/* Reactions */}
        <div className="flex items-center gap-2 mt-2">
          {comment.reactions && Object.keys(comment.reactions).length > 0 && (
            <div className="flex gap-1">
              {Object.entries(comment.reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {emoji} {count}
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Add reaction"
            >
              <FiSmile size={14} />
            </button>

            {showReactions && (
              <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 flex gap-1 z-10">
                {reactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      handleReaction(emoji);
                      setShowReactions(false);
                    }}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommentItem;
