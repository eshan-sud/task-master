// src/utils/RememberMeContext.js

import React, { createContext, useContext, useState } from "react";

const RememberMeContext = createContext();

export const RememberMeProvider = ({ children }) => {
  const [isRememberMe, setIsRememberMe] = useState(false);
  return (
    <RememberMeContext.Provider value={{ isRememberMe, setIsRememberMe }}>
      {children}
    </RememberMeContext.Provider>
  );
};

export const useRememberMe = () => useContext(RememberMeContext);

export default RememberMeContext;
