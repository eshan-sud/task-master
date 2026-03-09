// frontend/src/components/Notifications/NotificationsCenter.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../../store/slices/notificationsSlice";
import NotificationItem from "./NotificationItem";
import { FiBell, FiCheck, FiTrash2, FiFilter } from "react-icons/fi";

const NotificationsCenter = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications,
  );
  const [filter, setFilter] = useState("all"); // 'all', 'unread', 'read'

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FiBell size={28} className="text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <FiCheck /> Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        <FiFilter className="text-gray-500" />
        <div className="flex gap-2">
          {["all", "unread", "read"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "unread" && unreadCount > 0 && ` (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Notifications List */}
      {loading && notifications.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FiBell
            className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            size={64}
          />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No notifications
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === "unread"
              ? "You're all caught up!"
              : filter === "read"
                ? "No read notifications"
                : "You'll see notifications here"}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsCenter;
