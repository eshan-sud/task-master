// filename - frontend/src/components/profile/Settings.jsx

import React, { useState, useEffect } from "react";
import { endpoints } from "../../ApiEndpoints.js";
import toast from "react-hot-toast";
import { useRememberMe } from "../../utils/RememberMeContext.js";
import { Background } from "./Background.jsx";

export const Settings = () => {
  const { isRememberMe, setIsRememberMe } = useRememberMe();
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleVerification = async () => {
    if (!isVerified) {
      const storage = isRememberMe
        ? window.localStorage
        : window.sessionStorage;
      const response = await fetch(endpoints.verifyAccount, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: storage.getItem("email") }),
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
        setIsVerified(true);
        toast.success(message.message);
      } else {
        toast.error(message.error);
      }
    }
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    // Logic to update email (send API request)
    console.log("Updated Email:", email);
    setEmail("");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Logic to update password (send API request)
    console.log("Updated Password:", password);
    setPassword("");
  };

  const handleSaveSettings = async () => {
    const storage = isRememberMe ? window.localStorage : window.sessionStorage;
    const userSettings = {
      email: storage.getItem("email"),
      darkMode: isDarkMode,
      rememberMe: isRememberMe,
    };

    const response = await fetch(endpoints.saveAccountSettings, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSettings),
      credentials: "include",
    });
    const message = await response.json();
    if (response.ok) {
      toast.success(message.message);
    } else {
      toast.error(message.error);
    }
  };

  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Settings
      </h1>

      <div className="profile-details mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Profile Settings
        </h1>
        <p className="text-lg text-gray-900 dark:text-gray-100">
          <strong>Name:</strong> John Doe
        </p>
        <p className="text-lg text-gray-900 dark:text-gray-100">
          <strong>Email:</strong> user@example.com
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Account Verification
        </h2>
        <button
          disabled={isVerified}
          onClick={handleVerification}
          className={`px-4 py-2 text-white rounded-md ${
            isVerified
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isVerified ? "Verified ✅" : "Verify Account"}
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Update Email
        </h2>
        <form onSubmit={handleEmailChange}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter new email"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Email
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Update Password
        </h2>
        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter new password"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Password
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Save settings
        </h2>
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </Background>
  );
};
