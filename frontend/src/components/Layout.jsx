// filename - frontend/src/components/Layout.jsx

import React, { useContext } from "react";

import { Navbar } from "./home/Navbar.jsx";
import { HomeBackground } from "./home/HomeBackground.jsx";
import { Footer } from "./home/Footer.jsx";

import { UserNavbar } from "./profile/UserNavbar.jsx";
import { Sidebar } from "./profile/Sidebar.jsx";
import { ProfileBackground } from "./profile/ProfileBackground.jsx";

import { WelcomeMessage } from "./Messages.jsx";

import AuthContext from "../utils/AuthContext.js";
import LightModeContext from "../utils/LightModeContext.js";

export const Layout = ({ children }) => {
  const { toggleLightMode } = useContext(LightModeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthenticated ? (
        <>
          <Navbar LightModeContext={LightModeContext} />
          <div className="flex-grow">{children}</div>
          <Footer LightModeContext={LightModeContext} />
          <HomeBackground LightModeContext={LightModeContext} />
        </>
      ) : (
        <>
          <UserNavbar
            LightModeContext={LightModeContext}
            toggleLightMode={toggleLightMode}
          />
          <div className="flex flex-grow">
            <Sidebar LightModeContext={LightModeContext} />
            <div className="ml-16 mt-16 p-8 w-full">{children}</div>
          </div>
          <ProfileBackground LightModeContext={LightModeContext} />
        </>
      )}
    </div>
  );
};

// export const Layout = ({ children }) => {
//   const { toggleLightMode } = useContext(LightModeContext);
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <>
//       {!isAuthenticated ? (
//         <>
//           <Navbar LightModeContext={LightModeContext} />
//           <div>{children}</div>
//           <Footer LightModeContext={LightModeContext} />
//           <HomeBackground LightModeContext={LightModeContext} />
//         </>
//       ) : (
//         <>
//           <UserNavbar
//             LightModeContext={LightModeContext}
//             toggleLightMode={toggleLightMode}
//           />
//           <WelcomeMessage LightModeContext={LightModeContext} />
//           <Sidebar LightModeContext={LightModeContext} />
//           <ProfileBackground LightModeContext={LightModeContext} />
//           <div className="ml-16 mt-16 p-8">{children}</div>
//         </>
//       )}
//     </>
//   );
// };
