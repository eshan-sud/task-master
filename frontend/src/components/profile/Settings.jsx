// filename - frontend/src/components/profile/Settings.jsx

import React, { useState, useEffect, useContext } from "react";
import { endpoints } from "../../ApiEndpoints.js";
import toast from "react-hot-toast";
import { useRememberMe } from "../../utils/RememberMeContext.js";
import { Background } from "./Background.jsx";
import AuthContext from "../../utils/AuthContext.js";

export const Settings = () => {
  const { isRememberMe } = useRememberMe();
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState(storage.getItem("email"));
  const [newPassword, setNewPassword] = useState("");
  const [settings, setSettings] = useState({
    accountVisibility: "public",
    activityStatus: true,
    emailNotifications: true,
    pushNotifications: true,
    preferredLanguage: "en",
    timeZone: "GMT",
    displayName: storage.getItem("fullName") || "",
    bio: "",
  });
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleSaveSettings = async (email) => {
    try {
      const response = await fetch(endpoints.saveAccountSettings, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          ...settings,
          darkMode: isDarkMode,
        }),
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  const handlePasswordChange = async (email, newPassword) => {
    try {
      const response = await fetch(endpoints.changePassword, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: newPassword }),
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
        logout();
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleDeleteAccount = async (email) => {
    try {
      const response = await fetch(endpoints.deleteAccount, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
        logout();
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleExportData = async (email) => {
    try {
      const response = await fetch(endpoints.exportData, {
        method: "GET",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${storage.getItem("fullName")}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("Data exported successfully.");
      } else {
        toast.error("Failed to export data.");
      }
    } catch (error) {
      toast.error("Error exporting data. Please try again.");
    }
  };

  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Settings
      </h1>
      <div className="profile-details mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Profile Settings
        </h2>
        <span>
          <label
            for="display-name"
            className="text-gray-900 dark:text-gray-100 block mb-4"
          >
            Display Name
          </label>
          <input
            id="display-name"
            type="text"
            value={settings.displayName}
            onChange={(e) =>
              setSettings({ ...settings, displayName: e.target.value })
            }
            style={{
              minWidth: "200px",
              maxWidth: "500px",
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </span>
        <span>
          <label className="block mb-4">
            <span className="text-gray-900 dark:text-gray-100">Bio</span>
          </label>
          <textarea
            placeholder="add a bio"
            value={settings.bio}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 255) {
                setSettings({ ...settings, bio: value });
              }
            }}
            minLength="10"
            maxLength="255"
            style={{
              minWidth: "200px",
              maxWidth: "500px",
              minHeight: "100px",
              maxHeight: "300px",
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          ></textarea>
        </span>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Account Settings
        </h2>
        <label className="flex items-center space-x-3 mb-4">
          <span className="text-gray-900 dark:text-gray-100">
            Change Password
          </span>
        </label>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Preferences
        </h2>
        <label className="flex items-center space-x-3 mb-4">
          <span className="text-gray-900 dark:text-gray-100">
            Account Visibility
          </span>
          <select
            value={settings.accountVisibility}
            onChange={(e) =>
              setSettings({ ...settings, accountVisibility: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
        <span className="flex items-center space-x-3 mb-4">
          <label
            for="activity-status"
            className="text-gray-900 dark:text-gray-100"
          >
            Activity Status
          </label>
          <input
            type="checkbox"
            id="activity-status"
            checked={settings.activityStatus}
            onChange={(e) =>
              setSettings({ ...settings, activityStatus: e.target.checked })
            }
            className="toggle-checkbox"
          />
        </span>
        <span className="flex items-center space-x-3 mb-4">
          <label
            for="activity-status"
            className="text-gray-900 dark:text-gray-100"
          >
            Email Notifications
          </label>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) =>
              setSettings({ ...settings, emailNotifications: e.target.checked })
            }
            className="toggle-checkbox"
          />
        </span>
        <span className="flex items-center space-x-3 mb-4">
          <label
            for="activity-status"
            className="text-gray-900 dark:text-gray-100"
          >
            Push Notifications
          </label>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) =>
              setSettings({ ...settings, pushNotifications: e.target.checked })
            }
            className="toggle-checkbox"
          />
        </span>
        <span className="flex items-center space-x-3 mb-4">
          <label
            for="preferred-language"
            className="text-gray-900 dark:text-gray-100"
          >
            Preferred Language
          </label>
          <select
            id="preferred-language"
            value={settings.preferredLanguage}
            onChange={(e) =>
              setSettings({ ...settings, preferredLanguage: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </span>
        <span className="flex items-center space-x-3 mb-4">
          <label for="timezone" className="text-gray-900 dark:text-gray-100">
            Time Zone
          </label>
          <select
            id="timezone"
            value={settings.timeZone}
            onChange={(e) =>
              setSettings({ ...settings, timeZone: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
          </select>
        </span>
      </div>
      <div className="mb-8">
        <button
          onClick={handleExportData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
        >
          Export Data
        </button>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
      <div className="mb-8">
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save Settings
        </button>
      </div>
    </Background>
  );
};
