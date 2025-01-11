// filename - frontend/src/components/Elements.jsx

import React, { useContext } from "react";
import toast from "react-hot-toast";

// import LightModeContext from "../utils/LightModeContext.js";

export const Spinner = () => {
  return (
    <div className="relative w-6 h-6">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 w-[1.5px] h-[6px] bg-gray-500 rounded-full"
          style={{
            transform: `rotate(${index * 30}deg) translate(-50%, -120%)`,
            transformOrigin: "center bottom",
            animation: "fade 1s infinite linear",
            animationDelay: `${index * 0.083}s`,
          }}
        ></div>
      ))}
      <style>
        {`
          @keyframes fade {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export const showSpinnerToast = () => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } bg-white shadow-lg rounded-md px-2 py-4 flex justify-center items-center`}
      style={{
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  ));
};
