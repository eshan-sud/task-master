// frontend/src/components/profile/Logout.jsx

import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ConfirmationPopup } from "../../components/Popups.jsx";
import AuthContext from "../../utils/AuthContext";
import { useRememberMe } from "../../utils/RememberMeContext.js";
import { endpoints } from "../../ApiEndpoints";

const Logout = ({ toggleLogoutModal }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isRememberMe } = useRememberMe();
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      // FOR FUTURE UPDATE : Make it so the login tracks the sessions & hence users can logout from all devices all at once
      const response = await fetch(endpoints.logoutAuth, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
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
      toast.error("Something went wrong");
    }
  };
  return (
    <ConfirmationPopup
      heading="Logout"
      message="Are you sure you want to logout?"
      onClose={toggleLogoutModal}
      onNo={toggleLogoutModal}
      onYes={handleLogout}
    />
  );
};

export default Logout;
