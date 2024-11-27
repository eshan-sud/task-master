// filename - frontend/src/components/profile/Logout.jsx

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import { useRememberMe } from "../../utils/RememberMeContext.js";

import { endpoints } from "../../ApiEndpoints";

import { YesNoMessage } from "../Messages";

const Logout = ({ toggleLogoutModal }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isRememberMe } = useRememberMe();
  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(endpoints.logoutAuth, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
        // console.log(message.user);
        const storage = isRememberMe
          ? window.localStorage
          : window.sessionStorage;
        storage.clear();
        logout();
        toast.success(message.message);
        navigate("/", { replace: true });
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <YesNoMessage
      heading="Logout"
      message="Are you sure you want to logout?"
      onClose={toggleLogoutModal}
      onNo={toggleLogoutModal}
      onYes={handleLogout}
    />
  );
};

export default Logout;
