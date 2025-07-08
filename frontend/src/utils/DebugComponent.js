// frontend/src/utils/DebugComponent.js

import { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useRememberMe } from "./RememberMeContext";

const DebugComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isRememberMe } = useRememberMe();

  useEffect(() => {
    console.log("AuthContext - isAuthenticated:", isAuthenticated);
    console.log("RememberMeContext - isRememberMe:", isRememberMe);
  }, [isAuthenticated, isRememberMe]);

  return null;
};

export default DebugComponent;
