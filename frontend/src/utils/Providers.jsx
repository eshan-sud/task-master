// frontend/src/utils/Providers.jsx

import { Provider } from 'react-redux';
import { store } from '../store';
import { AuthProvider } from "./AuthContext";
import { RememberMeProvider } from "./RememberMeContext";
import { ThemeContextProvider } from "./ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "../components/common/ErrorBoundary";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Providers = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeContextProvider>
          <RememberMeProvider>
            <AuthProvider>
              <GoogleOAuthProvider clientId={googleClientId}>
                {children}
              </GoogleOAuthProvider>
            </AuthProvider>
          </RememberMeProvider>
        </ThemeContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};
