// frontend/src/utils/ThemeContext.jsx

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // Initialize theme from localStorage, default to true (dark mode)
  const [isTheme, setIsTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  // Persist theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isTheme));
  }, [isTheme]);

  const toggleTheme = () => {
    setIsTheme((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
