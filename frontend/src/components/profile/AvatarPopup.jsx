// filename - frontend/src/components/profile/AvatarProfile.jsx

import React, { useState } from "react";
import toast from "react-hot-toast";
import { endpoints } from "../../ApiEndpoints";
import { CiUser } from "react-icons/ci";

import { MessageContainer } from "../Messages";
import { CloseButton } from "../Buttons";

export const AvatarPopup = ({
  onClose,
  avatarUrl,
  handleRemoveAvatar,
  fetchUserAvatar,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit p-10 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
        <CloseButton onClose={onClose} />
        <div className="flex flex-col justify-around align-middle">
          <div className="flex justify-around align-middle w-[100%] mb-5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-[200px] h-[200px] aspect-square border-black border-2 rounded-full"
              />
            ) : (
              <CiUser
                size={200}
                className="aspect-square border-black border-2 rounded-full"
              />
            )}
          </div>
          <div className="flex justify-center align-middle gap-3">
            <button
              className="w-full px-4 py-4 bg-red-500 text-white rounded-md"
              onClick={handleRemoveAvatar}
            >
              Remove Avatar
            </button>
            <button
              className="w-full px-4 py-4 bg-blue-500 text-white rounded-md"
              onClick={togglePopup}
            >
              Change Avatar
            </button>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <ChangeAvatar
          togglePopup={togglePopup}
          fetchUserAvatar={fetchUserAvatar}
        />
      )}
    </>
  );
};

const ChangeAvatar = ({ togglePopup, fetchUserAvatar }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(endpoints.uploadAvatar, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const message = await response.json();
        toast.success(message.message);
        fetchUserAvatar();
        togglePopup();
      } else {
        const message = await response.json();
        toast.error(message.error);
      }
    } catch (error) {
      toast.error("An error occurred while uploading the image.");
    }
  };

  return (
    <MessageContainer onClose={togglePopup}>
      <CloseButton onClose={togglePopup} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <p className="mt-4"> Are you sure you want to change your avatar? </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded-md"
          onClick={togglePopup}
        >
          No
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleUpload}
        >
          Yes
        </button>
      </div>
    </MessageContainer>
  );
};
