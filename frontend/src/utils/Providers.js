// frontend/src/utils/Providers.js

import React from "react";
import { AuthProvider } from "./AuthContext";
import { RememberMeProvider } from "./RememberMeContext";
import { LightModeContextProvider } from "./LightModeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Providers = ({ children }) => {
  return (
    <LightModeContextProvider>
      <RememberMeProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
            {children}
          </GoogleOAuthProvider>
        </AuthProvider>
      </RememberMeProvider>
    </LightModeContextProvider>
  );
};
