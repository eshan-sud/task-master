// src/components/home/Navbar.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CiHome } from "react-icons/ci";
import { BsQuestion } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";

import { LoginButton, RegisterButton } from "../Buttons";
import { MenuItem } from "../Link";

export const Navbar = ({ LightModeContext }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`bg-white/75 fixed top-0 z-40 p-4 w-full shadow-2xl border-solid border-b-[1px] border-black flex align-middle justify-between transition-transform duration-300 ${
          showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <Link to="/" className="tracking-wider text-2xl font-mono">
          Task Master
          <hr className="border-solid border-slate-950" />
        </Link>

        <ul className="list-none flex justify-center items-center text-lg absolute left-1/2 transform -translate-x-1/2 z-40">
          <MenuItem to="/home" name="Home" icon={<CiHome />} />
          <MenuItem to="/about-us" name="About us" icon={<BsQuestion />} />
          <MenuItem to="/contact" name="Contact" icon={<CiPhone />} />
        </ul>
        <div>
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </>
  );
};
