// frontend/src/components/Layout.jsx

import { useContext } from "react";
import { Navbar } from "./home/Navbar.jsx";
import { HomeBackground } from "./home/HomeBackground.jsx";
import { Footer } from "./home/Footer.jsx";
import { UserNavbar } from "./profile/UserNavbar.jsx";
import { Sidebar } from "./profile/Sidebar.jsx";
import { WelcomePopup } from "../components/Popups.jsx";

import AuthContext from "../utils/AuthContext.jsx";
import ThemeContext from "../utils/ThemeContext.jsx";

export const Layout = ({ children }) => {
  const { toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthenticated ? (
        <>
          <Navbar ThemeContext={ThemeContext} />
          <div className="flex-grow">{children}</div>
          <Footer ThemeContext={ThemeContext} />
          <HomeBackground ThemeContext={ThemeContext} />
        </>
      ) : (
        <>
          <UserNavbar ThemeContext={ThemeContext} toggleTheme={toggleTheme} />
          <WelcomePopup ThemeContext={ThemeContext} />
          <Sidebar ThemeContext={ThemeContext} />
          <div className="ml-16 mt-16 p-8">{children}</div>
        </>
      )}
    </div>
  );
};
