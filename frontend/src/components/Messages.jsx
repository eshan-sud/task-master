// src/components/Messages.jsx

import React, { useEffect, useState } from "react";
import { useRememberMe } from "../utils/RememberMeContext.js";

import { CloseButton } from "./Buttons";

export const MessageContainer = ({ children, onClose }) => {
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

export const WelcomeMessage = () => {
  const { isRememberMe } = useRememberMe();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storage = isRememberMe ? localStorage : sessionStorage;
    const hasSeenWelcomeMessage = storage.getItem("hasSeenWelcomeMessage");
    if (!hasSeenWelcomeMessage) {
      setVisible(true);
      storage.setItem("hasSeenWelcomeMessage", "true");
    }
  }, [isRememberMe]);

  const hideMessage = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <MessageContainer onClose={hideMessage}>
          <h1 className="text-4xl font-bold mb-4 text-black">
            Welcome to Task Master
          </h1>
          <button
            onClick={hideMessage}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
          >
            Close
          </button>
        </MessageContainer>
      )}
    </>
  );
};

export const YesNoMessage = ({ heading, message, onClose, onNo, onYes }) => {
  return (
    <MessageContainer onClose={onClose}>
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
    </MessageContainer>
  );
};
