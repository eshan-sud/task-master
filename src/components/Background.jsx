import React from "react";

export const Background = () => {
  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      src="/assets/videos/background.mp4"
      alt="video not found"
      autoPlay
      muted
      loop
    />
  );
};
