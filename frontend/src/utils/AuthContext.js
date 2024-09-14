// src/utils/AuthContext.js

import React, { createContext, useEffect, useState } from "react";
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

// import React, { createContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children, isRememberMe }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const storedToken =
//       localStorage.getItem("token") || sessionStorage.getItem("token");

//     if (storedToken) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [isRememberMe]);

//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.clear();
//     sessionStorage.clear();
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
