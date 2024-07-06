import React from "react";

export const CircularLabel = ({ title, htmlFor, children }) => {
  return (
    <label
      title={title}
      htmlFor={htmlFor}
      className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer peer-checked:ring-2 peer-checked:ring-blue-400"
    >
      {children}
    </label>
  );
};

export const Labels = () => {
  return <></>;
};
