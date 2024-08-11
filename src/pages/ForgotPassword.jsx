// src/ForgotPassword.jsx

import React from "react";
import { EmailField } from "../components/Fields";
import { FormContainer } from "../components/FormContainer";
import { SubmitButton } from "../components/Buttons";
import { EmailValidator } from "../utils/EmailValidator.js";

const ForgotPasswordForm = ({ handleResetPassword }) => {
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleResetPassword}>
      <EmailValidator>
        <EmailField type="text" name="Email" />
      </EmailValidator>
      <SubmitButton />
    </form>
  );
};

export const ForgotPassword = () => {
  const handleResetPassword = (event) => {
    event.preventDefault();
    // Handle Reset Password Logic
  };

  return (
    <FormContainer
      form={<ForgotPasswordForm handleResetPassword={handleResetPassword} />}
      heading="Forgot Your Password?"
      subHeading="Reset Your Password"
    />
  );
};
