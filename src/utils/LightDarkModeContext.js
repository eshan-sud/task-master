import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const LightDarkModeContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const LightDarkModeContext = () => {
  return <div>LightDarkModeContext</div>;
};
