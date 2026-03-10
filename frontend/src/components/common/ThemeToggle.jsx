// frontend/src/components/common/ThemeToggle.jsx

import { useContext } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import ThemeContext from "../../utils/ThemeContext.jsx";

/**
 * ThemeToggle Component
 * 
 * A modern, accessible theme toggle button that switches between light and dark modes.
 * Features:
 * - Smooth icon transitions
 * - Tooltip on hover
 * - Keyboard accessible
 * - Persists preference to localStorage (via ThemeContext)
 * - Works with Tailwind's dark mode
 * 
 * Usage:
 * <ThemeToggle />
 * 
 * Can be used in navigation, settings, or anywhere a theme toggle is needed.
 */
export const ThemeToggle = () => {
  const { isTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      aria-label={isTheme ? "Switch to light mode" : "Switch to dark mode"}
      title={isTheme ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6">
        {/* Dark Mode Icon (visible in dark mode) */}
        <MdDarkMode
          className={`absolute inset-0 w-6 h-6 text-yellow-400 transition-all duration-300 ${
            isTheme
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-180 scale-0"
          }`}
        />
        
        {/* Light Mode Icon (visible in light mode) */}
        <MdLightMode
          className={`absolute inset-0 w-6 h-6 text-gray-800 transition-all duration-300 ${
            !isTheme
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-180 scale-0"
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isTheme ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
