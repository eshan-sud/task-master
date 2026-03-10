// frontend/src/components/profile/NotificationPanel.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiCheck } from "react-icons/fi";
import { fetchNotifications, markAsRead } from "../../store/slices/notificationsSlice.js";

export const NotificationPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative mt-16 mr-4 max-w-md w-full sm:w-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Notifications
        </h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Loading notifications...
          </p>
        )}

        {error && !loading && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {!loading && items.length === 0 && !error && (
          <p className="text-gray-500 dark:text-gray-400">
            No notifications available.
          </p>
        )}

        {!loading && items.length > 0 && (
          <ul className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {items.map((notification) => (
              <li
                key={notification._id}
                className={`p-4 border rounded-md ${
                  notification.isRead
                    ? "bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700"
                    : "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {notification.title || notification.type}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {notification.message}
                    </p>
                    {notification.createdAt && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    {!notification.isRead && (
                      <button
                        onClick={() => dispatch(markAsRead(notification._id))}
                        className="p-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                        title="Mark as read"
                      >
                        <FiCheck size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
