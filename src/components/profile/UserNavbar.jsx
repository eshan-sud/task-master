import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { SearchField } from "../Fields.jsx";
import { NotificationButton, LightDarkModeButton } from "../Buttons.jsx";
import { AvatarPopup } from "./AvatarPopup.jsx";
import { endpoints } from "../../ApiEndpoints";

import { CiUser } from "react-icons/ci";

export const UserNavbar = () => {
  const userName = useState(window.localStorage.getItem("fullName"));
  const [userAvatar, setUserAvatar] = useState(null);
  const [showAvatarPanel, setShowAvatarPanel] = useState(false);
  const avatarRef = useRef(null);

  const fetchUserAvatar = async () => {
    try {
      const response = await fetch(endpoints.getUserAvatar, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const avatarUrl = URL.createObjectURL(await response.blob());
        setUserAvatar(avatarUrl);
      } else {
        console.error("Failed to fetch user avatar:", response.statusText);
        setUserAvatar(null);
      }
    } catch (error) {
      console.error("Error fetching user avatar:", error);
      setUserAvatar(null);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const response = await fetch(endpoints.removeAvatar, {
        method: "DELETE",
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
    } catch (error) {
      console.error("Error removing avatar:", error);
      toast.error("An error occurred while removing the avatar.");
    }
  };

  const handleClickOutside = (event) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target)) {
      setShowAvatarPanel(false);
    }
  };

  useEffect(() => {
    fetchUserAvatar();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between w-[calc(100vw-64px)] h-16 bg-white fixed top-0 left-16 z-40 px-4 shadow-md">
      <div className="flex justify-center w-[100%]">
        <SearchField />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-full border-r-2 m-2"></div>
        <NotificationButton />
        <LightDarkModeButton />
        <div className="h-full border-r-2 m-2"></div>
        <div className="flex items-center space-x-4 mr-6" ref={avatarRef}>
          <span className="text-gray-700 text-nowrap"> Hi, {userName} </span>
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
