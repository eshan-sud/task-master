// frontend/src/utils/Providers.jsx

import { AuthProvider } from "./AuthContext";
import { RememberMeProvider } from "./RememberMeContext";
import { ThemeContextProvider } from "./ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Providers = ({ children }) => {
  return (
    <ThemeContextProvider>
      <RememberMeProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId={googleClientId}>
            {children}
          </GoogleOAuthProvider>
        </AuthProvider>
      </RememberMeProvider>
    </ThemeContextProvider>
  );
};
