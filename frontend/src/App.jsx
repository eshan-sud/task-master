// frontend/src/App.jsx

import { useContext, useEffect, lazy, Suspense, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

// Lazy-loaded page components for code splitting
const Home = lazy(() => import("./pages/Home.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Dashboard = lazy(() => import("./components/profile/Dashboard.jsx"));
const Analytics = lazy(() => import("./components/profile/Analytics.jsx"));
const Archive = lazy(() => import("./components/profile/Archive.jsx"));
const Teams = lazy(() => import("./components/profile/Teams.jsx"));
const Settings = lazy(() => import("./components/profile/Settings.jsx"));

// Eagerly loaded components (Layout, contexts, etc.)
import { Layout } from "./components/Layout.jsx";
import { PageLoader } from "./components/common/PageLoader.jsx";

import AuthContext from "./utils/AuthContext.jsx";
import ThemeContext from "./utils/ThemeContext.jsx";

// Socket.io real-time connection
import { useSocket } from "./hooks/useSocket.js";

// API service and Redux actions
import apiService from "./services/api.service.js";
import { setToken, setLoading, setError } from "./store/slices/csrfSlice.js";

// Debug Component
// import DebugComponent from "./utils/DebugComponent";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const { isTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const csrfInitialized = useRef(false);

  // Initialize Socket.io connection when authenticated
  useSocket();

  // Fetch CSRF token on app initialization (once)
  useEffect(() => {
    if (csrfInitialized.current) return;
    csrfInitialized.current = true;

    const initCSRF = async () => {
      dispatch(setLoading(true));
      try {
        const token = await apiService.fetchCSRFToken();
        if (token) {
          dispatch(setToken(token));
        } else {
          const errorMsg = "Failed to fetch CSRF token";
          dispatch(setError(errorMsg));
          toast.error(errorMsg + ". Please refresh the page.");
        }
      } catch (error) {
        console.error("CSRF initialization error:", error);
        const errorMsg = error.message || "Failed to initialize security token";
        dispatch(setError(errorMsg));

        if (error.message?.includes("429")) {
          toast.error(
            "Too many requests. Please wait a moment and refresh the page.",
            {
              duration: 5000,
            },
          );
        } else if (error.message?.includes("Failed to fetch")) {
          toast.error(
            "Cannot connect to server. Please check your connection.",
            {
              duration: 5000,
            },
          );
        } else {
          toast.error(
            "Security initialization failed. Please refresh the page.",
            {
              duration: 5000,
            },
          );
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    initCSRF();
  }, [dispatch]);

  // Apply dark mode class to html element
  useEffect(() => {
    // Add smooth transition for theme changes
    document.documentElement.style.transition =
      "background-color 0.3s ease, color 0.3s ease";

    if (isTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isTheme]);

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const handleLoad = () => {
  //     setIsLoading(false);
  //   };
  //   window.addEventListener("load", handleLoad);
  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //   };
  // }, [isLoading]);
  // if (isLoading) return <Loader />;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route
                    // exact="true"
                    path="/profile"
                    element={<Profile isTheme={isTheme} />}
                  />
                  <Route
                    // exact="true"
                    path="/dashboard"
                    element={<Dashboard isTheme={isTheme} />}
                  />
                  <Route
                    // exact="true"
                    path="/analytics"
                    element={<Analytics isTheme={isTheme} />}
                  />
                  <Route
                    // exact="true"
                    path="/archive"
                    element={<Archive isTheme={isTheme} />}
                  />
                  <Route
                    // exact="true"
                    path="/teams"
                    element={<Teams isTheme={isTheme} />}
                  />
                  <Route
                    // exact="true"
                    path="/settings"
                    element={<Settings isTheme={isTheme} />}
                  />
                  <Route
                    // exact="true"
                    path="*"
                    element={<Navigate to="/profile" replace />}
                  />
                </>
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home isTheme={isTheme} />} />
                  <Route
                    path="/about-us"
                    element={<AboutUs isTheme={isTheme} />}
                  />
                  <Route
                    path="/contact"
                    element={<Contact isTheme={isTheme} />}
                  />
                  <Route path="/login" element={<Login isTheme={isTheme} />} />
                  <Route
                    path="/register"
                    element={<Register isTheme={isTheme} />}
                  />
                  <Route
                    path="/forgotPassword"
                    element={<ForgotPassword isTheme={isTheme} />}
                  />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </>
              )}
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
      {/* <DebugComponent /> */}
    </>
  );
}

export default App;
