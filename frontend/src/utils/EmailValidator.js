// src/utils/EmailValidator.js

import React, { useState, useEffect } from "react";

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const EmailValidator = ({ children, setEmail, email }) => {
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (email === "") {
      setIsEmpty(true);
      setIsValid(true);
      return;
    }
    setIsEmpty(false);
    setIsValid(isValidEmail(email));
  }, [email]);

  const clonedChild = React.cloneElement(children, {
    value: email,
    onChange: (event) => setEmail(event.target.value),
    isValid,
    isEmpty,
    className: `${children.props.className || ""}`,
  });

  return (
    <div>
      {clonedChild}
      {!isEmpty && !isValid && (
        <span className="text-red-500 text-sm">Invalid email address</span>
      )}
    </div>
  );
};
