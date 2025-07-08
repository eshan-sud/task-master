// frontend/src/pages/ForgotPassword.jsx

import { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { EmailField, NewPasswordField } from "../components/Fields";
import { FormContainer } from "../components/FormContainer";
import { SubmitButton } from "../components/Buttons";
import { showSpinnerToast } from "../components/Elements.jsx";
import { OTPVerificationForm } from "../components/Popups.jsx";

import { endpoints } from "../ApiEndpoints.js";

const ForgotPasswordForm = ({ email, setEmail, setStep }) => {
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.checkUserExists, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const message = await response.json();
      if (!message.exists) {
        toast.dismiss(spinnerId);
        toast.error("User Not Found");
        return;
      }
      if (!response.ok) {
        toast.dismiss(spinnerId);
        toast.error("User Not Verified");
        return;
      }
      const otpResponse = await fetch(endpoints.sendOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "password_reset" }),
      });
      toast.dismiss(spinnerId);
      if (!otpResponse.ok) {
        toast.error("Couldn't generate or send OTP to your email");
        return;
      }
      toast.success("OTP Sent to your Email");
      setStep(2); // Proceed to OTP Verification
    } catch (error) {
      toast.dismiss(spinnerId);
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleForgotPassword}
    >
      <EmailField
        type="email"
        name="Email"
        email={email}
        setEmail={setEmail}
        autoFocus={true}
      />
      <SubmitButton text="Send OTP" />
    </form>
  );
};

const ResetPasswordForm = ({
  email,
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
  setStep,
}) => {
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      toast.error("Token expired or not found");
      setStep(2); // Redirect back to OTP verification step
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const spinnerId = showSpinnerToast();
    try {
      const response = await fetch(endpoints.resetPassword, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, token: resetToken }),
      });
      const message = await response.json();
      toast.dismiss(spinnerId);
      if (response.ok) {
        toast.success("Password reset successfully");
        localStorage.removeItem("resetToken");
        navigate("/login");
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.dismiss(spinnerId);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleResetPassword}
      >
        <NewPasswordField
          type="password"
          name="New Password"
          value={newPassword}
          onChange={setNewPassword}
          autoFocus={true}
        />
        <NewPasswordField
          type="password"
          name="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoFocus={false}
        />
        <SubmitButton text="Reset Password" />
        <div className="space-y-1 flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)]">
          <span className="text-sky-600 outline-none border-none font-semibold cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
            Login with your password
          </span>
          <div className="text-sm text-center">
            New user?
            <span className="text-sky-600 outline-none border-none cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
              Create an account
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP Verification, 3: Reset Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <FormContainer
      form={
        step === 1 ? (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            setStep={setStep}
          />
        ) : step === 2 ? (
          <OTPVerificationForm
            email={email}
            onVerified={setStep}
            purpose="password_reset"
          />
        ) : (
          <ResetPasswordForm
            email={email}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            setNewPassword={setNewPassword}
            setConfirmPassword={setConfirmPassword}
            setStep={setStep}
          />
        )
      }
      heading={
        step === 1
          ? "Forgot Your Password?"
          : step === 2
          ? "Verify OTP"
          : "Reset Your Password"
      }
      subHeading={
        step === 1
          ? "Enter your registered email"
          : step === 2
          ? "Enter the 6-digit one-time-password (OTP) sent to your registered email address"
          : "Set a new password"
      }
    />
  );
}
