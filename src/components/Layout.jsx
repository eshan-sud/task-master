import React, { useContext, useState } from "react";

import { Navbar } from "./home/Navbar.jsx";
import { HomeBackground } from "./home/HomeBackground.jsx";
import { Footer } from "./home/Footer.jsx";

import { UserNavbar } from "./profile/UserNavbar.jsx";
import { Sidebar } from "./profile/Sidebar.jsx";
import { ProfileBackground } from "./profile/ProfileBackground.jsx";

import { WelcomeMessage } from "./Messages.jsx";

import AuthContext from "../utils/AuthContext.js";

export const Layout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Navbar />
          <div>{children}</div>
          <Footer />
          <HomeBackground />
        </>
      ) : (
        <>
          <UserNavbar />
          <WelcomeMessage />
          <Sidebar />
          <ProfileBackground />
          <div className="ml-16 mt-16 p-8">{children}</div>
        </>
      )}
    </>
  );
};
