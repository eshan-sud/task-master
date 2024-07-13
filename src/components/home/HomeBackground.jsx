import React from "react";

export const HomeBackground = () => {
  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      src="/assets/videos/background.mp4"
      alt="Video not found"
      autoPlay
      muted
      loop
    />
  );
};
