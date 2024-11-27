// filename - frontend/src/components/Loader.jsx

import React from "react";

export const Loader = (props) => {
  return (
    <div className="w-full h-screen bg-black {/*Light Dark Mode*/} flex justify-center items-center">
      {[0, 0.3, 0.6, 0.9, 1.2].map((delay, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center w-5 h-5 border-2 border-customColor rounded-full mx-2 bg-transparent animate-circle-keys"
          style={{ animationDelay: `${delay}s` }}
        >
          <div
            className="absolute w-4 h-4 bg-customColor rounded-full animate-dot-keys"
            style={{ animationDelay: `${delay}s` }}
          ></div>
          <div
            className="absolute w-5 h-5 rounded-full animate-outline-keys"
            style={{ animationDelay: `${delay + 0.9}s` }}
          ></div>
        </div>
      ))}
    </div>
  );
};
