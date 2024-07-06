import React from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Background } from "../components/Background.jsx";
import { Footer } from "../components/Footer.jsx";

export const Layout = ({ children }) => {
  return (
    <>
      <Background />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};
