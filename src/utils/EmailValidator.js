// src/utils/EmailValidator.js

import React, { useState, useEffect } from "react";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const EmailValidator = ({ children }) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // console.log(email);
    if (email === "") {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    setIsValid(isValidEmail(email));
  }, [email]);

  const clonedChild = React.cloneElement(children, {
    value: email,
    onChange: (event) => setEmail(event.target.value),
    className: `${children.props.className} ${
      isEmpty
        ? "focus:border-[#4A9DEC] focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)]"
        : isValid
        ? "border-green-500 focus:border-[#22c55e] focus:shadow-[0px_0px_0px_7px_rgba(34,197,94,0.2)]"
        : "border-red-500 focus:border-[#ef4444] focus:shadow-[0px_0px_0px_7px_rgba(239,68,68,0.2)]"
    }`,
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
