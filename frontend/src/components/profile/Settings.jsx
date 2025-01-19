// filename - frontend/src/components/profile/Settings.jsx

import React, { useState, useEffect, useContext, useCallback } from "react";
import toast from "react-hot-toast";

import { Background } from "./Background.jsx";
import { DefaultLabel } from "../Labels.jsx";
import { DefaultInput, NewPasswordField } from "../Fields.jsx";
import { DisabledButton, SubmitButton } from "../Buttons.jsx";
import { OTPPopup, DeleteConfirmation } from "../Popups.jsx";
import { showSpinnerToast } from "../Elements.jsx";

import { endpoints } from "../../ApiEndpoints.js";
import { useRememberMe } from "../../utils/RememberMeContext.js";
import AuthContext from "../../utils/AuthContext.js";

export const Settings = () => {
  const { isRememberMe } = useRememberMe();
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;
  const email = storage.getItem("email");
  const [fullName, setFullName] = useState(storage.getItem("fullName"));
  const [bio, setBio] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") || false
  );
  const [settings, setSettings] = useState({
    accountVisibility: "public",
    activityStatus: true,
    emailNotifications: true,
    pushNotifications: true,
    preferredLanguage: "en",
    timeZone: "GMT",
  });
  const [isVerified, setIsVerified] = useState("false");
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] =
    useState(false);
  const { logout } = useContext(AuthContext);

  const getUserSettings = useCallback(async () => {
    try {
      const response = await fetch(
        `${endpoints.getUserSettings}?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        toast.error("Error fetching user preferences!");
        return;
      }
      const fetchedSettings = (await response.json()).data.settings;
      setIsDarkMode(fetchedSettings.darkMode);
      setSettings({
        accountVisibility: fetchedSettings.accountVisibility ?? "public",
        activityStatus: fetchedSettings.activityStatus ?? true,
        emailNotifications: fetchedSettings.emailNotifications ?? true,
        pushNotifications: fetchedSettings.pushNotifications ?? true,
        preferredLanguage: fetchedSettings.preferredLanguage ?? "en",
        timeZone: fetchedSettings.timeZone ?? "GMT",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [email]);

  const getVerificationStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${endpoints.getVerificationStatus}?email=${encodeURIComponent(
          email
        )}&purpose=account_verification`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        toast.error("Error fetching verification status!");
        return;
      }
      const data = await response.json();
      setIsVerified(data.isVerified);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [email]);

  const getProfile = useCallback(async () => {
    try {
      const response = await fetch(
        `${endpoints.getProfile}?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        toast.error("Error fetching verification status!");
        return;
      }
      const data = await response.json();
      setFullName(data.fullName || "");
      setBio(data.bio || "");
      storage.setItem("fullName", data.fullName);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [email, storage]);

  const handleSendOTP = async (event) => {
    event.preventDefault();
    setShowOTPPopup(true);
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.sendOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          purpose: "account_verification",
        }),
        credentials: "include",
      });
      toast.dismiss(spinnerId);
      if (response.ok) {
        toast.success("OTP Sent");
      } else {
        toast.error("Error sending OTP!");
      }
    } catch (error) {
      toast.dismiss(spinnerId);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateSettings = async (event) => {
    event.preventDefault();
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.updateSettings, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          ...settings,
        }),
        credentials: "include",
      });
      toast.dismiss(spinnerId);
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.dismiss(spinnerId);
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
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.changePassword, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, newPassword: newPassword }),
        credentials: "include",
      });
      toast.dismiss(spinnerId);
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
        logout();
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.dismiss(spinnerId);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(
        `${endpoints.deleteAccount}?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      toast.dismiss(spinnerId);
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
        logout();
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.dismiss(spinnerId);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const handleExportData = async (event) => {
    event.preventDefault();
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.exportData, {
        method: "GET",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      toast.dismiss(spinnerId);
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
      toast.dismiss(spinnerId);
      toast.error("Error exporting data. Please try again.");
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.updateProfile, {
        method: "PATCH",
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          bio: bio,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      toast.dismiss(spinnerId);
      if (response.ok) {
        toast.success("Updated profile successfully.");
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      toast.dismiss(spinnerId);
      toast.error("Something went Wrong!");
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    getVerificationStatus();
  }, [isVerified, getVerificationStatus]);

  useEffect(() => {
    getProfile();
    getUserSettings();
  }, [getProfile, getUserSettings]);

  return (
    <Background>
      <>
        {showOTPPopup && (
          <OTPPopup
            email={email}
            onClose={(value) => setShowOTPPopup(value)}
            onVerified={(value) => setIsVerified(value)}
            purpose="account_verification"
          />
        )}
        {showDeleteConfirmationPopup && (
          <DeleteConfirmation
            type="Account"
            onClose={(value) => setShowDeleteConfirmationPopup(value)}
            onDelete={handleDeleteAccount}
          />
        )}
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
              {isVerified === "true" ? (
                <DisabledButton title="Verified" />
              ) : (
                <SubmitButton title="Verify" />
              )}
            </span>
          </form>
          <form
            onSubmit={handleUpdateProfile}
            className="flex flex-col items-start text-nowrap mb-4"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Profile Settings
            </h2>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="ful name" htmlFor="full-name">
                Full Name
              </DefaultLabel>
              <DefaultInput
                ID="full-name"
                value={fullName}
                onChange={(event) => {
                  const value = event.target.value;
                  setFullName(value);
                  storage.setItem("fullName", value);
                }}
                style={{
                  minWidth: "200px",
                  maxWidth: "500px",
                }}
              />
            </span>
            <span className="flex items-center space-x-3 mb-4">
              <DefaultLabel title="bio" htmlFor="profile-bio">
                Bio
              </DefaultLabel>
              <textarea
                id="bio"
                placeholder="add a bio (max 128 characters)"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                maxLength="128"
                style={{
                  minWidth: "200px",
                  maxWidth: "500px",
                  minHeight: "100px",
                  maxHeight: "100px",
                }}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              ></textarea>
            </span>
            <span>
              <SubmitButton />
            </span>
          </form>
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
          <form onSubmit={handleUpdateSettings} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Preferences
            </h2>
            <label className="flex items-center space-x-3 mb-4">
              <span className="text-gray-900 dark:text-gray-100"></span>
            </label>
            <span className="flex space-x-3 mb-4">
              <DefaultLabel
                title="account visibility"
                htmlFor="account-visibility"
              >
                Account Visibility
              </DefaultLabel>
              <select
                id="account-visibility"
                value={settings.accountVisibility}
                onChange={(event) =>
                  setSettings((prevSettings) => ({
                    darkMode: isDarkMode,
                    ...prevSettings,
                    accountVisibility: event.target.value,
                  }))
                }
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </span>
            <span className="flex space-x-3 mb-4">
              <DefaultLabel title="activity status" htmlFor="activity-status">
                Activity Status
              </DefaultLabel>
              <input
                id="activity-status"
                type="checkbox"
                checked={settings.activityStatus}
                onChange={(event) =>
                  setSettings((prevSettings) => ({
                    darkMode: isDarkMode,
                    ...prevSettings,
                    activityStatus: event.target.checked,
                  }))
                }
                className="toggle-checkbox"
              />
            </span>
            <span className="flex space-x-3 mb-4">
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
                onChange={(event) =>
                  setSettings((prevSettings) => ({
                    darkMode: isDarkMode,
                    ...prevSettings,
                    emailNotifications: event.target.checked,
                  }))
                }
                className="toggle-checkbox"
              />
            </span>
            <span className="flex space-x-3 mb-4">
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
                onChange={(event) =>
                  setSettings((prevSettings) => ({
                    darkMode: isDarkMode,
                    ...prevSettings,
                    pushNotifications: event.target.checked,
                  }))
                }
                className="toggle-checkbox"
              />
            </span>
            <span className="flex space-x-3 mb-4">
              <DefaultLabel
                title="preferred language"
                htmlFor="preferred-language"
              >
                Preferred Language
              </DefaultLabel>
              <select
                id="preferred-language"
                value={settings.preferredLanguage || "en"}
                onChange={(event) =>
                  setSettings((prevSettings) => ({
                    darkMode: isDarkMode,
                    ...prevSettings,
                    preferredLanguage: event.target.value,
                  }))
                }
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </span>
            <span className="flex space-x-3 mb-4">
              <DefaultLabel title="timezone" htmlFor="timezone">
                Timezone
              </DefaultLabel>
              <select
                id="timezone"
                value={settings.timeZone}
                onChange={(event) =>
                  setSettings((prevSettings) => ({
                    darkMode: isDarkMode,
                    ...prevSettings,
                    timeZone: event.target.value,
                  }))
                }
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="GMT">GMT</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
            </span>
            <SubmitButton title="Save Settings" colour="green" />
          </form>
          <span className="flex">
            <form onSubmit={handleExportData} className="">
              <SubmitButton title="Export Data" />
            </form>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setShowDeleteConfirmationPopup(true);
              }}
              className="mb-8"
            >
              <SubmitButton title="Delete Account" colour="red" />
            </form>
          </span>
        </div>
      </>
    </Background>
  );
};
