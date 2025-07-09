// frontend/src/utils/Providers.jsx

import { AuthProvider } from "./AuthContext";
import { RememberMeProvider } from "./RememberMeContext";
import { LightModeContextProvider } from "./LightModeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Providers = ({ children }) => {
  return (
    <LightModeContextProvider>
      <RememberMeProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId={googleClientId}>
            {children}
          </GoogleOAuthProvider>
        </AuthProvider>
      </RememberMeProvider>
    </LightModeContextProvider>
  );
};
