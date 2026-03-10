// frontend/src/utils/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRememberMe } from "./RememberMeContext";
import { endpoints } from "../ApiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isRememberMe } = useRememberMe();
  const csrfToken = useSelector((state) => state.csrf.token);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = isRememberMe
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");

      if (!storedToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Wait for CSRF token to be available before validating
      if (!csrfToken) {
        // Keep loading state until CSRF token is ready
        return;
      }

      // Validate token by attempting to refresh it
      try {
        const response = await fetch(endpoints.refreshToken, {
          method: "GET",
          headers: {
            ...(csrfToken && { "X-CSRF-Token": csrfToken }),
          },
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear it
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [isRememberMe, csrfToken]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
