// frontend/src/components/profile/UserNavbar.jsx

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { useRememberMe } from "../../utils/RememberMeContext.jsx";

import { SearchField } from "../Fields.jsx";
import { NotificationPanel } from "./NotificationPanel.jsx";
import { NotificationButton, LightDarkModeButton } from "../Buttons.jsx";
import { AvatarPopup } from "../Popups.jsx";

import { endpoints } from "../../ApiEndpoints.jsx";

export const UserNavbar = () => {
  const { isRememberMe } = useRememberMe();
  const csrfToken = useSelector((state) => state.csrf.token);
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;
  const [userName] = useState(storage.getItem("fullName"));
  const [userAvatar, setUserAvatar] = useState(null);
  const [showAvatarPanel, setShowAvatarPanel] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const avatarRef = useRef(null);
  const notificationRef = useRef(null);

  const fetchUserAvatar = useCallback(async () => {
    try {
      const response = await fetch(endpoints.getUserAvatar, {
        method: "GET",
        headers: {
          ...(csrfToken && { "X-CSRF-Token": csrfToken }),
        },
        credentials: "include",
      });

      if (response.ok) {
        const avatarUrl = URL.createObjectURL(await response.blob());
        setUserAvatar(avatarUrl);
      } else {
        // Set default avatar or null
        setUserAvatar(null);
      }
    } catch {
      // Set default avatar on error instead of showing error
      setUserAvatar(null);
    }
  }, [csrfToken]);

  const handleRemoveAvatar = async () => {
    try {
      const response = await fetch(endpoints.removeAvatar, {
        method: "DELETE",
        headers: {
          ...(csrfToken && { "X-CSRF-Token": csrfToken }),
        },
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Avatar removed successfully.");
        setUserAvatar(null);
        setShowAvatarPanel(false);
      } else {
        const data = await response.json();
        toast.error(data.error);
      }
    } catch {
      toast.error("An error occurred while removing the avatar");
    }
  };

  const handleClickOutside = (event) => {
    if (
      avatarRef.current &&
      !avatarRef.current.contains(event.target) &&
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowAvatarPanel(false);
      setNotificationPanelOpen(false);
    }
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(!isNotificationPanelOpen);
  };

  useEffect(() => {
    if (csrfToken) {
      fetchUserAvatar();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [csrfToken, fetchUserAvatar]);

  return (
    <div className="flex justify-between w-[calc(100vw-64px)] h-16 bg-white dark:bg-gray-800 fixed top-0 left-16 z-40 px-4 shadow-md transition-colors duration-300">
      <div className="flex justify-center w-[100%]">
        <SearchField />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-full border-r-2 border-gray-200 dark:border-gray-700 m-2"></div>
        <div ref={notificationRef}>
          <NotificationButton
            toggleNotificationPanel={toggleNotificationPanel}
          />
          <NotificationPanel
            isOpen={isNotificationPanelOpen}
            onClose={() => setNotificationPanelOpen(false)}
          />
        </div>
        <LightDarkModeButton />
        <div className="h-full border-r-2 border-gray-200 dark:border-gray-700 m-2"></div>
        <div className="flex items-center space-x-4 mr-6" ref={avatarRef}>
          <span className="text-gray-700 dark:text-gray-200 text-nowrap">
            {" "}
            Hi, {userName}{" "}
          </span>
          <div className="relative w-10 h-10">
            {userAvatar ? (
              <img
                onClick={() => setShowAvatarPanel(!showAvatarPanel)}
                src={userAvatar}
                alt="User Avatar"
                className="absolute inset-0 w-full h-full border-black border-2 rounded-full cursor-pointer"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <CiUser
                onClick={() => setShowAvatarPanel(!showAvatarPanel)}
                className="absolute inset-0 w-full h-full p-1 border-black border-2 rounded-full cursor-pointer"
              />
            )}
          </div>
          {showAvatarPanel && (
            <AvatarPopup
              onClose={() => setShowAvatarPanel(false)}
              avatarUrl={userAvatar}
              handleRemoveAvatar={handleRemoveAvatar}
              fetchUserAvatar={fetchUserAvatar}
            />
          )}
        </div>
      </div>
    </div>
  );
};
