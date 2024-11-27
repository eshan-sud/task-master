// filename - frontend/src/App.js

import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { Profile } from "./pages/Profile.jsx";

// import { Loader } from "./components/Loader.jsx";
import { Layout } from "./components/Layout.jsx";
import { Dashboard } from "./components/profile/Dashboard.jsx";
import { Analytics } from "./components/profile/Analytics.jsx";
import { Archive } from "./components/profile/Archive.jsx";
import { Teams } from "./components/profile/Teams.jsx";
import { Settings } from "./components/profile/Settings.jsx";

import AuthContext from "./utils/AuthContext.js";
import LightModeContext from "./utils/LightModeContext.js";

// Debug Component
import DebugComponent from "./utils/DebugComponent";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const { isLightMode } = useContext(LightModeContext);

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
          <Routes>
            {isAuthenticated ? (
              <>
                <Route
                  exact="true"
                  path="/profile"
                  element={<Profile isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/dashboard"
                  element={<Dashboard isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/analytics"
                  element={<Analytics isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/archive"
                  element={<Archive isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/teams"
                  element={<Teams isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/settings"
                  element={<Settings isLightMode={isLightMode} />}
                />
                <Route
                  exact
                  path="*"
                  element={<Navigate to="/profile" replace />}
                />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route
                  exact="true"
                  path="/home"
                  element={<Home isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/about-us"
                  element={<AboutUs isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/contact"
                  element={<Contact isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/login"
                  element={<Login isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/register"
                  element={<Register isLightMode={isLightMode} />}
                />
                <Route
                  exact="true"
                  path="/forgotPassword"
                  element={<ForgotPassword isLightMode={isLightMode} />}
                />
                <Route
                  exact
                  path="*"
                  element={<Navigate to="/home" replace />}
                />
              </>
            )}
          </Routes>
        </Layout>
      </BrowserRouter>
      {/* <DebugComponent /> */}
    </>
  );
}

export default App;
