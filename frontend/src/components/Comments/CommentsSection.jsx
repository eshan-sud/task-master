// frontend/src/components/Comments/CommentsSection.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  createComment,
  deleteComment,
  addReaction,
} from "../../store/slices/commentsSlice";
import CommentItem from "./CommentItem";
import { FiMessageSquare, FiSend } from "react-icons/fi";

const CommentsSection = ({ taskId }) => {
  const dispatch = useDispatch();
  const { byTaskId, loading, error } = useSelector((state) => state.comments);
  const comments = byTaskId[taskId] || [];
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(fetchComments(taskId));
  }, [dispatch, taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await dispatch(
      createComment({
        taskId,
        content: newComment,
      }),
    );

    setNewComment("");
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Delete this comment?")) {
      dispatch(deleteComment({ taskId, commentId }));
    }
  };

  const handleReaction = (commentId, emoji) => {
    dispatch(addReaction({ taskId, commentId, emoji }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FiMessageSquare className="text-gray-500" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onDelete={handleDelete}
              onReaction={handleReaction}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment... (use @ to mention)"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiSend />
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CommentsSection;
