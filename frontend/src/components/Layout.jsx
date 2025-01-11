// filename - frontend/src/components/Layout.jsx

import React, { useContext } from "react";
import { Navbar } from "./home/Navbar.jsx";
import { HomeBackground } from "./home/HomeBackground.jsx";
import { Footer } from "./home/Footer.jsx";
import { UserNavbar } from "./profile/UserNavbar.jsx";
import { Sidebar } from "./profile/Sidebar.jsx";
import { WelcomePopup } from "../components/Popups.jsx";

import AuthContext from "../utils/AuthContext.js";
import LightModeContext from "../utils/LightModeContext.js";

export const Layout = ({ children }) => {
  const { toggleLightMode } = useContext(LightModeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Navbar LightModeContext={LightModeContext} />
          <div>{children}</div>
          <Footer LightModeContext={LightModeContext} />
          <HomeBackground LightModeContext={LightModeContext} />
        </>
      ) : (
        <>
          <UserNavbar
            LightModeContext={LightModeContext}
            toggleLightMode={toggleLightMode}
          />
          <WelcomePopup LightModeContext={LightModeContext} />
          <Sidebar LightModeContext={LightModeContext} />
          <div className="ml-16 mt-16 p-8">{children}</div>
        </>
      )}
    </>
  );
};
