// src/utils/AuthContext.js

import React, { createContext, useEffect, useState } from "react";
import { useRememberMe } from "./RememberMeContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isRememberMe } = useRememberMe();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = isRememberMe
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isRememberMe]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (isRememberMe) localStorage.clear();
    else sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
