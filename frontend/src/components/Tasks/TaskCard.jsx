// frontend/src/components/Tasks/TaskCard.jsx
import { useState } from "react";
import {
  FiStar,
  FiArchive,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiClock,
  FiPaperclip,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const TaskCard = ({
  task,
  viewMode = "grid",
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onArchive,
  onUpdate,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    high: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
    medium: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10",
    low: "border-l-green-500 bg-green-50 dark:bg-green-900/10",
  };

  const statusIcons = {
    pending: { icon: FiClock, color: "text-gray-500" },
    "in-progress": { icon: FiEdit2, color: "text-blue-500" },
    completed: { icon: FiCheck, color: "text-green-500" },
  };

  const StatusIcon = statusIcons[task.status]?.icon || FiClock;
  const statusColor = statusIcons[task.status]?.color || "text-gray-500";

  const handlePinToggle = async (e) => {
    e.stopPropagation();
    await onUpdate(task._id, { pinned: !task.pinned });
  };

  const handleStatusToggle = async (e) => {
    e.stopPropagation();
    const nextStatus =
      task.status === "completed"
        ? "pending"
        : task.status === "pending"
          ? "in-progress"
          : "completed";
    await onUpdate(task._id, { status: nextStatus });
  };

  const isDueSoon =
    task.dueDate &&
    new Date(task.dueDate) - new Date() < 86400000 &&
    task.status !== "completed";
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  if (viewMode === "list") {
    return (
      <div
        className={`
          flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4
          ${priorityColors[task.priority] || "border-l-gray-300"}
          ${isSelected ? "ring-2 ring-blue-500" : ""}
          hover:shadow-md transition-all duration-200 cursor-pointer
        `}
        onClick={() => onEdit(task)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect(task._id);
          }}
          className="w-4 h-4 rounded border-gray-300"
        />

        {/* Status Indicator */}
        <button
          onClick={handleStatusToggle}
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${statusColor}`}
        >
          <StatusIcon size={18} />
        </button>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`font-semibold text-gray-900 dark:text-gray-100 ${task.status === "completed" ? "line-through" : ""}`}
            >
              {task.title}
            </h3>
            {task.pinned && (
              <FiStar
                className="text-yellow-500"
                fill="currentColor"
                size={16}
              />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {task.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {task.category && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
              {task.category.name}
            </span>
          )}
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 ${isOverdue ? "text-red-500" : isDueSoon ? "text-yellow-500" : ""}`}
            >
              <FiClock size={14} />
              {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
            </span>
          )}
          {task.attachments?.length > 0 && (
            <span className="flex items-center gap-1">
              <FiPaperclip size={14} /> {task.attachments.length}
            </span>
          )}
          {task.comments?.length > 0 && (
            <span className="flex items-center gap-1">
              <FiMessageSquare size={14} /> {task.comments.length}
            </span>
          )}
          {task.sharedWith?.length > 0 && (
            <span className="flex items-center gap-1">
              <FiUsers size={14} /> {task.sharedWith.length}
            </span>
          )}
        </div>

        {/* Actions */}
        {isHovered && (
          <div className="flex items-center gap-1">
            <button
              onClick={handlePinToggle}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title={task.pinned ? "Unpin" : "Pin"}
            >
              <FiStar
                className={task.pinned ? "text-yellow-500" : "text-gray-500"}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onArchive(task._id);
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
              title="Archive"
            >
              <FiArchive />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task._id);
              }}
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500"
              title="Delete"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Grid view
  return (
    <div
      className={`
        group relative p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4
        ${priorityColors[task.priority] || "border-l-gray-300"}
        ${isSelected ? "ring-2 ring-blue-500" : "shadow-sm hover:shadow-lg"}
        transition-all duration-200 cursor-pointer
      `}
      onClick={() => onEdit(task)}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
          onToggleSelect(task._id);
        }}
        className="absolute top-2 left-2 w-4 h-4 rounded border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Pinned Icon */}
      {task.pinned && (
        <div className="absolute top-2 right-2 text-yellow-500">
          <FiStar fill="currentColor" size={16} />
        </div>
      )}

      {/* Status Badge */}
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusColor} mb-2`}
      >
        <StatusIcon size={12} />
        {task.status}
      </div>

      {/* Task Title */}
      <h3
        className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 pr-8 ${task.status === "completed" ? "line-through" : ""}`}
      >
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Category */}
      {task.category && (
        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded mb-2">
          {task.category.name}
        </span>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div
          className={`flex items-center gap-1 text-xs mb-2 ${isOverdue ? "text-red-500" : isDueSoon ? "text-yellow-500" : "text-gray-500"}`}
        >
          <FiClock size={12} />
          {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
        </div>
      )}

      {/* Footer Metadata */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        {task.attachments?.length > 0 && (
          <span className="flex items-center gap-1">
            <FiPaperclip size={12} /> {task.attachments.length}
          </span>
        )}
        {task.comments?.length > 0 && (
          <span className="flex items-center gap-1">
            <FiMessageSquare size={12} /> {task.comments.length}
          </span>
        )}
        {task.sharedWith?.length > 0 && (
          <span className="flex items-center gap-1">
            <FiUsers size={12} /> {task.sharedWith.length}
          </span>
        )}
      </div>

      {/* Hover Action Buttons */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handlePinToggle}
          className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${task.pinned ? "text-yellow-500" : "text-gray-500"}`}
          title={task.pinned ? "Unpin" : "Pin"}
        >
          <FiStar fill={task.pinned ? "currentColor" : "none"} size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onArchive(task._id);
          }}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Archive"
        >
          <FiArchive size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"
          title="Delete"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
