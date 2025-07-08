// frontend/src/utils/EmailValidator.js

import { useState, useEffect } from "react";

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const EmailValidator = ({ children, setEmail, email }) => {
  const [isvalid, setIsvalid] = useState(true);
  const [isempty, setIsempty] = useState(true);

  useEffect(() => {
    if (email === "") {
      setIsempty(true);
      setIsvalid(true);
      return;
    }
    setIsempty(false);
    setIsvalid(isValidEmail(email));
  }, [email]);

  const clonedChild = React.cloneElement(children, {
    value: email,
    onChange: (event) => setEmail(event.target.value),
    isvalid: isvalid.toString(),
    isempty: isempty.toString(),
    className: `${children.props.className || ""}`,
  });

  return (
    <div>
      {clonedChild}
      {!isempty && !isvalid && (
        <span className="text-red-500 text-sm">Invalid email address</span>
      )}
    </div>
  );
};
