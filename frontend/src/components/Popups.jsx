// filename - frontend/src/components/Popup.jsx

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRememberMe } from "../utils/RememberMeContext.js";
import { endpoints } from "../ApiEndpoints.js";
import { CiUser } from "react-icons/ci";

import { SubmitButton, CloseButton } from "./Buttons.jsx";
import { showSpinnerToast } from "./Elements.jsx";

const PopupContainer = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative z-50 bg-white p-6 rounded-lg shadow-lg w-fit">
        {children}
      </div>
    </div>
  );
};

export const WelcomePopup = () => {
  const { isRememberMe } = useRememberMe();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storage = isRememberMe ? localStorage : sessionStorage;
    const hasSeenWelcomePopup = storage.getItem("hasSeenWelcomePopup");
    if (!hasSeenWelcomePopup) {
      setVisible(true);
      storage.setItem("hasSeenWelcomePopup", "true");
    }
  }, [isRememberMe]);

  const hideMessage = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <PopupContainer onClose={hideMessage}>
          <h1 className="text-4xl font-bold mb-4 text-black">
            Welcome to Task Master
          </h1>
          <button
            onClick={hideMessage}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
          >
            Close
          </button>
        </PopupContainer>
      )}
    </>
  );
};

export const ConfirmationPopup = ({
  heading,
  message,
  onClose,
  onNo,
  onYes,
}) => {
  return (
    <PopupContainer onClose={onClose}>
      <CloseButton onClose={onClose} />
      <h2 className="text-2xl font-bold mb-4"> {heading} </h2>
      <p className="mb-4"> {message} </p>
      <div className="flex justify-between w-full">
        <button
          onClick={onNo}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6"
        >
          No
        </button>
        <button
          onClick={onYes}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
        >
          Yes
        </button>
      </div>
    </PopupContainer>
  );
};

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
          <div className="flex justify-center align-middle gap-3 text-nowrap">
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
        <PopupContainer onClose={togglePopup}>
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
        </PopupContainer>
      )}
    </>
  );
};

export const OTPPopup = ({ email, onClose, onVerified, purpose }) => {
  return (
    <>
      <PopupContainer onClose={onClose}>
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="mb-4 text-gray-700">
          A 6-digit OTP has been sent to your email: <strong>{email}</strong>.
        </p>
        <OTPVerificationForm
          email={email}
          onVerified={(value) => {
            onVerified(value);
            toast.success("Account verified successfully");
            onClose(!value);
          }}
          purpose={purpose}
        />
      </PopupContainer>
    </>
  );
};

export const OTPVerificationForm = ({ email, onVerified, purpose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow numeric characters only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only the last digit
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("text").slice(0, 6); // Take only the first 6 digits
    if (!/^\d+$/.test(pastedValue)) return; // Ensure only numeric values
    const newOtp = [...otp];
    pastedValue.split("").forEach((digit, i) => {
      if (i < 6) {
        newOtp[i] = digit;
      }
    });
    setOtp(newOtp);
    const focusIndex = Math.min(pastedValue.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear the current input if not empty
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    if (!Array.isArray(otp)) return; // Ensure otp is an array
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.verifyOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          otp: otp.join(""),
          purpose: purpose,
        }),
      });
      const message = await response.json();
      toast.dismiss(spinnerId);
      if (response.ok) {
        toast.success("OTP Verified!");
        if (purpose === "password_reset") {
          localStorage.setItem("resetToken", message.token);
        }
        onVerified(true);
      } else {
        toast.error("Invalid OTP!");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(spinnerId);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4"
      onSubmit={handleVerifyOTP}
    >
      <div className="flex flex-col items-center justify-center relative p-4 overflow-hidden">
        <div className="my-6 w-full grid grid-flow-col grid-cols-6 items-center justify-center justify-items-center gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength="1"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={(e) => handlePaste(e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus={index === 0}
            />
          ))}
        </div>
        <SubmitButton title="Verify" />
      </div>
    </form>
  );
};

export const DeleteConfirmation = ({ type, onClose, onDelete }) => {
  const handleConfirmDelete = () => {
    if (onDelete) onDelete();
    if (onClose) onClose(false);
  };

  const handleCancelDelete = () => {
    if (onClose) onClose(false);
  };

  return (
    <PopupContainer onClose={() => onClose(false)}>
      <ConfirmationPopup
        heading={`Delete ${type}?`}
        message={`Are you sure you want to delete this ${type}? This action cannot be undone.`}
        onClose={handleCancelDelete}
        onNo={handleCancelDelete}
        onYes={handleConfirmDelete}
      />
    </PopupContainer>
  );
};
