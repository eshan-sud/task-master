// frontend/src/components/Notifications/NotificationItem.jsx

import { formatDistanceToNow } from "date-fns";
import {
  FiCheck,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
  FiUsers,
  FiShare2,
  FiBell,
} from "react-icons/fi";

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "task_assigned":
      case "task_updated":
      case "task_completed":
        return <FiCheckCircle className="text-blue-500" />;
      case "task_reminder":
      case "task_overdue":
        return <FiAlertCircle className="text-yellow-500" />;
      case "comment_added":
      case "mention":
        return <FiMessageSquare className="text-green-500" />;
      case "team_invite":
      case "member_added":
      case "member_removed":
        return <FiUsers className="text-purple-500" />;
      case "task_shared":
      case "permission_granted":
        return <FiShare2 className="text-indigo-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  const getTitle = () => {
    switch (notification.type) {
      case "task_assigned":
        return "Task assigned to you";
      case "task_updated":
        return "Task updated";
      case "task_completed":
        return "Task completed";
      case "task_reminder":
        return "Task reminder";
      case "task_overdue":
        return "Task overdue";
      case "comment_added":
        return "New comment";
      case "mention":
        return "You were mentioned";
      case "team_invite":
        return "Team invitation";
      case "member_added":
        return "Added to team";
      case "member_removed":
        return "Removed from team";
      case "task_shared":
        return "Task shared with you";
      case "permission_granted":
        return "Permission granted";
      default:
        return "Notification";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        notification.read
          ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
      }`}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {getTitle()}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification._id)}
                  className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  title="Mark as read"
                >
                  <FiCheck size={16} />
                </button>
              )}
              <button
                onClick={() => onDelete(notification._id)}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>

          {/* Related Link */}
          {notification.relatedTask && (
            <a
              href={`/tasks/${notification.relatedTask}`}
              className="inline-block mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              View task →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
