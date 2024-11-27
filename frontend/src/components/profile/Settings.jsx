// filename - frontend/src/components/profile/Settings.jsx

import React, { useState, useEffect } from "react";

export const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Settings
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Appearance
        </h2>
        <label className="flex items-center space-x-3">
          <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            className="toggle-checkbox"
          />
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Notifications
        </h2>
        <label className="flex items-center space-x-3">
          <span className="text-gray-900 dark:text-gray-100">
            Enable Notifications
          </span>
          <input type="checkbox" className="toggle-checkbox" />
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Language
        </h2>
        <select className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <option value="en"> English </option>
        </select>
      </div>
    </div>
  );
};
