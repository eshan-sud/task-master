// frontend/src/utils/LightModeContext.js

import { createContext, useState } from "react";

const LightModeContext = createContext();

export const LightModeContextProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleLightMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  return (
    <LightModeContext.Provider value={{ isLightMode, toggleLightMode }}>
      {children}
    </LightModeContext.Provider>
  );
};

export default LightModeContext;
