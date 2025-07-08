// frontend/src/utils/RememberMeContext.js

import { createContext, useContext, useState, useEffect } from "react";

const RememberMeContext = createContext();

export const RememberMeProvider = ({ children }) => {
  const [isRememberMe, setIsRememberMe] = useState(
    localStorage.getItem("isRememberMe") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isRememberMe", isRememberMe);
    setIsRememberMe(isRememberMe);
  }, [isRememberMe]);

  return (
    <RememberMeContext.Provider value={{ isRememberMe, setIsRememberMe }}>
      {children}
    </RememberMeContext.Provider>
  );
};

export const useRememberMe = () => useContext(RememberMeContext);

export default RememberMeContext;
