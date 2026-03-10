// frontend/src/components/common/Avatar.jsx

import { useState } from "react";
import { FiUser } from "react-icons/fi";

/**
 * Reusable avatar component with fallback initials
 */
export const Avatar = ({
  src,
  alt,
  name,
  size = "md",
  status,
  className = "",
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5 border",
    sm: "w-2 h-2 border",
    md: "w-2.5 h-2.5 border-2",
    lg: "w-3 h-3 border-2",
    xl: "w-3.5 h-3.5 border-2",
    "2xl": "w-4 h-4 border-2",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500",
  ];

  const getColorFromName = (name) => {
    if (!name) return bgColors[0];
    const index = name.charCodeAt(0) % bgColors.length;
    return bgColors[index];
  };

  return (
    <div
      className={`relative inline-block ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      <div
        className={`
          ${sizes[size]}
          rounded-full
          flex items-center justify-center
          overflow-hidden
          ${!src || imageError ? getColorFromName(name || alt) : "bg-gray-200 dark:bg-gray-700"}
          font-semibold
          text-white
          transition-transform
          ${onClick ? "hover:scale-105" : ""}
        `}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : name ? (
          getInitials(name)
        ) : (
          <FiUser className="w-1/2 h-1/2 text-white" />
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            ${statusSizes[size]}
            ${statusColors[status] || statusColors.offline}
            rounded-full
            border-white dark:border-gray-800
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

/**
 * Avatar group component for displaying multiple avatars
 */
export const AvatarGroup = ({
  avatars,
  max = 3,
  size = "md",
  className = "",
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  const sizes = {
    xs: "w-6 h-6 text-xs -ml-1",
    sm: "w-8 h-8 text-sm -ml-2",
    md: "w-10 h-10 text-base -ml-2",
    lg: "w-12 h-12 text-lg -ml-3",
    xl: "w-16 h-16 text-xl -ml-4",
  };

  return (
    <div className={`flex items-center ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`${index > 0 ? sizes[size] : ""} ring-2 ring-white dark:ring-gray-800`}
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar {...avatar} size={size} className={index > 0 ? "ml-0" : ""} />
        </div>
      ))}

      {remaining > 0 && (
        <div
          className={`
            ${sizes[size]}
            rounded-full
            flex items-center justify-center
            bg-gray-200 dark:bg-gray-700
            text-gray-700 dark:text-gray-300
            font-semibold
            ring-2 ring-white dark:ring-gray-800
          `}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;
