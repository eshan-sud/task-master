import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../ApiEndpoints";

import AuthContext from "../../utils/AuthContext";
import { YesNoMessage } from "../Messages";

const Logout = ({ toggleLogoutModal }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(endpoints.logoutAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const message = await response.json();

      if (response.ok) {
        console.log(message.user);
        window.localStorage.clear();
        logout(); // Update the authentication state
        toast.success(message.message);
        navigate("/", { replace: true }); // Redirection to Home
      } else {
        toast.error(message.error); // Error Handling
      }
    } catch (error) {
      console.error("Error:", error);
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
