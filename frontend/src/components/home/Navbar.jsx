// frontend/src/components/home/Navbar.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CiHome } from "react-icons/ci";
import { BsQuestion } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";

import { LoginButton, RegisterButton } from "../Buttons";
import { MenuItem } from "../Link";

export const Navbar = () => {
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
        className={`fixed top-0 z-40 p-4 w-full shadow-2xl border-b flex items-center justify-between transition-transform duration-300 bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 backdrop-blur-md ${
          showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <Link
          to="/"
          className="tracking-wider text-2xl font-mono text-gray-900 dark:text-gray-100"
        >
          Task Master
          <hr className="border-solid border-slate-900 dark:border-slate-200" />
        </Link>

        <ul className="list-none flex justify-center items-center text-lg absolute left-1/2 transform -translate-x-1/2 z-40 text-gray-800 dark:text-gray-100">
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
