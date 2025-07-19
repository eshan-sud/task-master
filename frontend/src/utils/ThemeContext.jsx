// frontend/src/utils/ThemeContext.jsx

import { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isTheme, setIsTheme] = useState(true);

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
