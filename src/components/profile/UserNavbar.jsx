import React from "react";

import { SearchField } from "../Fields.jsx";

export const UserNavbar = () => {
  const userName = "user";
  const userAvatar = "https://via.placeholder.com/40"; // Placeholder avatar URL

  const handleAvatar = () => {};

  return (
    <div className="w-full h-16 bg-white fixed top-0 left-16 z-40 flex items-center px-4 shadow-md">
      <div className="">
        <SearchField />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Hi, {userName}</span>
        <img
          onClick={handleAvatar}
          src={userAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};
