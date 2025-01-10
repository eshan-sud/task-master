// filename - frontend/src/components/profile/OTPPopup.jsx

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { MessageContainer } from "../Messages";
import { SubmitButton } from "../Buttons";
import { endpoints } from "../../ApiEndpoints.js";
import { showSpinnerToast } from "../Elements.jsx";

export const OTPPopup = ({ email, onClose, onVerified }) => {
  return (
    <>
      <MessageContainer onClose={onClose}>
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="mb-4 text-gray-700">
          A 6-digit OTP has been sent to your email: <strong>{email}</strong>.
        </p>
        <OTPVerificationForm email={email} onVerified={onVerified} />
      </MessageContainer>
    </>
  );
};

const OTPVerificationForm = ({ email, onVerified }) => {
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
        onVerified(true);
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
