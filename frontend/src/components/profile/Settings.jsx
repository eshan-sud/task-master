// filename - frontend/src/components/profile/Settings.jsx

import React, { useState, useEffect, useContext } from "react";
import { endpoints } from "../../ApiEndpoints.js";
import toast from "react-hot-toast";
import { useRememberMe } from "../../utils/RememberMeContext.js";
import { Background } from "./Background.jsx";
import AuthContext from "../../utils/AuthContext.js";
import { DefaultLabel } from "../Labels.jsx";
import { NewPasswordField } from "../Fields.jsx";
import { DisabledButton, SubmitButton } from "../Buttons.jsx";
import { OTPPopup } from "./OTPPopup.jsx";

const Verified = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", color: "gray" }}>
      <span>Verified</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="green"
        style={{
          width: "16px",
          height: "16px",
          marginLeft: "4px",
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
};

export const Settings = () => {
  const { isRememberMe } = useRememberMe();
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState(storage.getItem("email"));
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
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
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleSendOTP = async (event) => {
    event.preventDefault();
    setShowOTPPopup(true);
    try {
      const response = await fetch(endpoints.sendOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({ email, purpose: "account_verification" }),
          credentials: "include",
        },
      });
      const result = await response.json();
      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(endpoints.verifyAccount, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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
      console.log(error);
      toast.error("Failed to Verify Account. Please try again.");
    }
  };

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

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!newPassword) {
      toast.error("Passwords not given!");
      return;
    }
    if (newPassword !== newConfirmedPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(endpoints.changePassword, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, newPassword: newPassword }),
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
      console.log(error);
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
      <>
        {showOTPPopup ? (
          <OTPPopup
            email={email}
            onClose={setShowOTPPopup(false)}
            // onVerified={setIsVerified(true)}
          />
        ) : null}
        <div className="min-h-screen p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <form
            onSubmit={handleSendOTP}
            className="flex items-center space-x-3 mb-4"
          >
            <DefaultLabel
              title="account verification"
              htmlFor="account-verification"
            >
              Account Verification
            </DefaultLabel>
            <span>
              {isVerified ? (
                <DisabledButton title="Verified" />
              ) : (
                <SubmitButton title="Verify" />
              )}
            </span>
          </form>
          <span className="profile-details mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Profile Settings
            </h2>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="display name" htmlFor="display-name">
                Display Name
              </DefaultLabel>
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
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-[#F3F3F3] dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="bio" htmlFor="profile-bio">
                Bio
              </DefaultLabel>
              <textarea
                id="bio"
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
          </span>
          <form onSubmit={handleChangePassword} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Account Settings
            </h2>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="change password" htmlFor="change-password">
                Change Password
              </DefaultLabel>
              <div className="flex items-center space-x-3 mb-4">
                <NewPasswordField
                  id="change-password"
                  type="password"
                  name="New Password"
                  value={newPassword}
                  onChange={setNewPassword}
                  autoFocus={false}
                />
                <NewPasswordField
                  type="password"
                  name="New Confirmed Password"
                  value={newConfirmedPassword}
                  onChange={setNewConfirmedPassword}
                  autoFocus={false}
                />
                <span className="items-center">
                  <SubmitButton />
                </span>
              </div>
            </span>
          </form>
          <span className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Preferences
            </h2>
            <label className="flex items-center space-x-3 mb-4">
              <span className="text-gray-900 dark:text-gray-100"></span>
            </label>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel
                title="account visibility"
                htmlFor="account-visibility"
              >
                Account Visibility
              </DefaultLabel>
              <select
                id="account-visibility"
                value={settings.accountVisibility}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    accountVisibility: e.target.value,
                  })
                }
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="activity status" htmlFor="activity-status">
                Activity Status
              </DefaultLabel>
              <input
                id="activity-status"
                type="checkbox"
                checked={settings.activityStatus}
                onChange={(e) =>
                  setSettings({ ...settings, activityStatus: e.target.checked })
                }
                className="toggle-checkbox"
              />
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel
                title="email notifications"
                htmlFor="email-notifications"
              >
                Email Notifications
              </DefaultLabel>
              <input
                id="email-notifications"
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailNotifications: e.target.checked,
                  })
                }
                className="toggle-checkbox"
              />
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel
                title="push notifications"
                htmlFor="push-notifications"
              >
                Push Notifications
              </DefaultLabel>
              <input
                id="push-notifications"
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    pushNotifications: e.target.checked,
                  })
                }
                className="toggle-checkbox"
              />
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel
                title="preferred language"
                htmlFor="preferred-language"
              >
                Preferred Language
              </DefaultLabel>
              <select
                id="preferred-language"
                value={settings.preferredLanguage}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferredLanguage: e.target.value,
                  })
                }
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="timezone" htmlFor="timezone">
                Timezone
              </DefaultLabel>
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
          </span>
          <span className="mb-8">
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
          </span>
          <span className="mb-8">
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Settings
            </button>
          </span>
        </div>
      </>
    </Background>
  );
};
