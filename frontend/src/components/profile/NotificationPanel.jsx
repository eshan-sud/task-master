// src/components/profile/NotificationPanel.jsx

import React from "react";

export const NotificationPanel = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "task",
      title: "Upcoming Task",
      message: "You have a task due tomorrow.",
      date: new Date().toLocaleString(),
    },
    {
      id: 2,
      type: "teams",
      title: "Teams Request",
      message: "You have a new Teams meeting request.",
      date: new Date().toLocaleString(),
    },
    {
      id: 3,
      type: "share",
      title: "Task Shared",
      message: "Someone has shared a task with you.",
      date: new Date().toLocaleString(),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
      <button
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-400"
        onClick={onClose}
      >
        &times;
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Notifications
      </h1>
      {notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="bg-gray-100 dark:bg-gray-700 p-4 border border-gray-300 dark:border-gray-600 rounded-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {notification.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {notification.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No notifications available.
        </p>
      )}
    </div>
  );
};
