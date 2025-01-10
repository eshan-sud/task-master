// filename - frontend/src/pages/ForgotPassword.jsx

import React, { useRef, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { EmailField, NewPasswordField } from "../components/Fields";
import { FormContainer } from "../components/FormContainer";
import { SubmitButton } from "../components/Buttons";
import { showSpinnerToast } from "../components/Elements.jsx";

import { endpoints } from "../ApiEndpoints.js";

const ForgotPasswordForm = ({ email, setEmail, setStep }) => {
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const spinnerId = showSpinnerToast(); // Show spinner toast
    try {
      // Check if the user exists
      const checkUserExistsResponse = await fetch(endpoints.checkUserExists, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const checkUserExistsMessage = await checkUserExistsResponse.json();
      if (!checkUserExistsMessage.exists) {
        toast.dismiss(spinnerId); // Dismiss spinner toast
        toast.error("User Not Found!");
        return;
      }
      if (!checkUserExistsResponse.ok) {
        toast.dismiss(spinnerId); // Dismiss spinner toast
        toast.error("User Not Verified!");
        return;
      }
      const otpResponse = await fetch(endpoints.sendOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "password_reset" }),
      });
      toast.dismiss(spinnerId); // Dismiss spinner toast
      if (!otpResponse.ok) {
        toast.error("Couldn't generate or send OTP to your email!");
        return;
      }

      toast.success("OTP Sent to your Email!");
      setStep(2); // Proceed to OTP Verification
    } catch (error) {
      toast.dismiss(spinnerId); // Dismiss spinner toast
      toast.error("Something Went Wrong!");
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

export const OTPVerificationForm = ({ email, setStep }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow numeric characters only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only the last digit
    setOtp(newOtp);
    // Move focus to the next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("text").slice(0, 6); // Take only the first 6 digits
    if (!/^\d+$/.test(pastedValue)) return; // Ensure only numeric values
    const newOtp = [...otp];
    pastedValue.split("").forEach((digit, i) => {
      if (i < 6) {
        newOtp[i] = digit;
      }
    });
    setOtp(newOtp);
    // Focus the last filled input field or the last input field
    const focusIndex = Math.min(pastedValue.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear the current input if not empty
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move focus to the previous input if empty
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!Array.isArray(otp)) return; // Ensure otp is an array
    const spinnerId = showSpinnerToast(); // Show spinner toast
    try {
      const response = await fetch(endpoints.verifyOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join("") }),
      });
      const message = await response.json();
      toast.dismiss(spinnerId); // Dismiss spinner toast
      if (response.ok) {
        toast.success("OTP Verified!");
        localStorage.setItem("resetToken", message.token);
        setStep(3); // Proceed to Reset Password
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.dismiss(spinnerId); // Dismiss spinner toast
      toast.error("Invalid OTP or something went wrong!");
    }
  };

  return (
    <form
      className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4"
      onSubmit={handleVerifyOTP}
    >
      <div className="flex flex-col items-center justify-center relative p-4 overflow-hidden">
        <div className="my-6 w-full grid grid-flow-col grid-cols-6 items-center justify-center justify-items-center gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength="1"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={(e) => handlePaste(e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus={index === 0}
            />
          ))}
        </div>
        <SubmitButton title="Verify" />
      </div>
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
      toast.error("Token expired or not found!");
      setStep(2); // Redirect back to OTP verification step
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const spinnerId = showSpinnerToast(); // Show spinner toast
    try {
      const response = await fetch(endpoints.resetPassword, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, token: resetToken }),
      });
      const message = await response.json();
      toast.dismiss(spinnerId); // Dismiss spinner toast
      if (response.ok) {
        toast.success("Password reset successfully!");
        localStorage.removeItem("resetToken");
        navigate("/login");
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.dismiss(spinnerId); // Dismiss spinner toast
      toast.error("Something went wrong!");
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

export const ForgotPassword = () => {
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
          <OTPVerificationForm email={email} setStep={setStep} />
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
};
