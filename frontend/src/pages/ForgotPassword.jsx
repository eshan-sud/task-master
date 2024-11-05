// src/ForgotPassword.jsx

import React, { useState } from "react";
import { EmailField } from "../components/Fields";
import { FormContainer } from "../components/FormContainer";
import { SubmitButton } from "../components/Buttons";

const ForgotPasswordForm = ({ handleResetPassword, email, setEmail }) => {
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleResetPassword}>
      <EmailField
        type="email"
        name="Email"
        email={email}
        setEmail={setEmail}
        autoFocus={true}
      />
      <SubmitButton />
    </form>
  );
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleResetPassword = (event) => {
    event.preventDefault();
    // Handle Reset Password Logic
  };

  return (
    <FormContainer
      form={
        <ForgotPasswordForm
          handleResetPassword={handleResetPassword}
          email={email}
          setEmail={setEmail}
        />
      }
      heading="Forgot Your Password?"
      subHeading="Reset Your Password"
    />
  );
};
