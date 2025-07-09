// frontend/src/utils/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import { useRememberMe } from "./RememberMeContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isRememberMe } = useRememberMe();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = isRememberMe
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");

    setIsAuthenticated(!!storedToken);
  }, [isRememberMe]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
