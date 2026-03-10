// frontend/src/components/profile/Logout.jsx

import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ConfirmationPopup } from "../../components/Popups.jsx";
import AuthContext from "../../utils/AuthContext";
import { useRememberMe } from "../../utils/RememberMeContext.jsx";
import apiService from "../../services/api.service.js";

const Logout = ({ toggleLogoutModal }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isRememberMe } = useRememberMe();
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await apiService.post("/auth/logout", {});
      const storage = isRememberMe
        ? window.localStorage
        : window.sessionStorage;
      storage.clear();
      logout();
      toast.success(response.data?.message || "Logged out successfully");
      navigate("/", { replace: true });
    } catch {
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
