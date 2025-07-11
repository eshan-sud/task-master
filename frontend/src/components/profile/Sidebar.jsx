// frontend/src/components/profile/Sidebar.jsx

import { useEffect, useRef, useState } from "react";
import {
  FiX,
  FiMenu,
  FiUser,
  FiGrid,
  FiBarChart2,
  FiArchive,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { SidebarItem } from "../Link";
import Logout from "./Logout";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const closeSidebar = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", closeSidebar);
    } else {
      document.removeEventListener("click", closeSidebar);
    }

    return () => {
      document.removeEventListener("click", closeSidebar);
    };
  }, [isOpen]);

  return (
    <div>
      <div
        className={`shadow-right-md fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
        ref={sidebarRef}
      >
        <div className="flex flex-col justify-between bg-white h-full p-4">
          <div className="flex gap-2">
            <button
              ref={buttonRef}
              onClick={toggleSidebar}
              className="text-2xl focus:outline-none z-40"
            >
              <div className="hover:bg-gray-200 rounded-lg px-1 py-2 w-full flex">
                {isOpen ? <FiX /> : <FiMenu />}
              </div>
            </button>
            {isOpen && (
              <span className="text-2xl text-center font-bold text-nowrap">
                TASK MASTER
              </span>
            )}
          </div>
          <ul className="flex flex-col align-middle space-y-4 overflow-hidden">
            <SidebarItem to="/profile" name="Profile" icon={<FiUser />} />
            <SidebarItem to="/dashboard" name="Dashboard" icon={<FiGrid />} />
            <SidebarItem
              to="/analytics"
              name="Analytics"
              icon={<FiBarChart2 />}
            />
            <SidebarItem to="/archive" name="Archive" icon={<FiArchive />} />
            <SidebarItem to="/teams" name="Teams" icon={<FiUsers />} />
            <SidebarItem to="/settings" name="Settings" icon={<FiSettings />} />
          </ul>
          <ul className="overflow-hidden">
            <li className="flex items-center">
              <button
                title="Logout"
                type="button"
                onClick={toggleLogoutModal}
                className="flex items-center hover:bg-gray-200 rounded-lg px-1 py-2 w-full"
              >
                <FiLogOut className="text-2xl text-red-600" />
                {isOpen && (
                  <span className="ml-2 text-xl text-red-600">Logout</span>
                )}
              </button>
            </li>
          </ul>
        </div>
        {showLogoutModal && <Logout toggleLogoutModal={toggleLogoutModal} />}
      </div>
      <style jsx="true">
        {`
          .shadow-right-md {
            box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.1); /* Adjust values as needed */
          }
        `}
      </style>
    </div>
  );
};
