// src/ForgotPassword.jsx

import React, { useState } from "react";
import { EmailField, NewPasswordField } from "../components/Fields";
import { FormContainer } from "../components/FormContainer";
import { SubmitButton } from "../components/Buttons";
import toast from "react-hot-toast";
import { endpoints } from "../ApiEndpoints.js";

const ForgotPasswordForm = ({ email, setEmail, setStep }) => {
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      // Check if the user exists
      const userExistsResponse = await fetch(endpoints.userExists, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const userExistsMessage = await userExistsResponse.json();
      if (!userExistsResponse.ok) {
        toast.error("User Not Verified!");
        return;
      }
      if (!userExistsMessage.exists) {
        toast.error("User Not Found!");
        return;
      }
      const otpResponse = await fetch(endpoints.generateOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!otpResponse.ok) {
        toast.error("Couldn't generate or send OTP to your email!");
        return;
      }

      toast.success("OTP Sent to your Email!");
      setStep(2); // Proceed to OTP Verification
    } catch (error) {
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

const OTPVerificationForm = ({ email, otp, setOtp, setStep }) => {
  const handleOtpVerification = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(endpoints.verifyOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const message = await response.json();

      if (response.ok) {
        toast.success("OTP Verified!");
        setStep(3); // Proceed to Reset Password
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error("Invalid OTP or something went wrong!");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleOtpVerification}
    >
      <label htmlFor="otp" className="text-gray-600">
        Enter the OTP sent to your email:
      </label>
      <input
        type="text"
        id="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="otp-input border-2 rounded-md p-2 outline-none"
        maxLength={6}
        required
      />
      <SubmitButton text="Verify OTP" />
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
  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(endpoints.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const message = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully!");
        setStep(1); // Reset flow
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleResetPassword}>
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
      />
      <SubmitButton text="Reset Password" />
    </form>
  );
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
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
            otp={otp}
            setOtp={setOtp}
            setStep={setStep}
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
          ? "Enter the OTP sent to your email"
          : "Set a new password"
      }
    />
  );
};

// const OTPVerficationForm = () => {
//   // Step 3: Handle Reset Password
//   const handleResetPassword = async (event) => {
//     event.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }
//     try {
//       const response = await fetch(endpoints.resetPassword, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, newPassword }),
//       });
//       const message = await response.json();
//       if (response.ok) {
//         toast.success("Password reset successfully!");
//         setStep(1); // Reset flow
//       } else {
//         toast.error(message.error);
//       }
//     } catch (error) {
//       toast.error("Something went wrong!");
//     }
//   };
//   return (
//     <div class="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4">
//       <div class="flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)] overflow-hidden">
//         <h6 class="text-2xl font-bold">OTP Verification</h6>
//         <div class="my-6 w-full grid grid-flow-col grid-cols-4 items-center justify-center justify-items-center">
//           <input
//             class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//             spellcheck="false"
//             autocomplete="one-time-code"
//             placeholder="○"
//             aria-invalid="false"
//             type="tel"
//             aria-disabled="false"
//             inputmode="numeric"
//             maxlength="1"
//           />
//           <input
//             class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//             spellcheck="false"
//             autocomplete="one-time-code"
//             placeholder="○"
//             aria-invalid="false"
//             type="tel"
//             aria-disabled="false"
//             inputmode="numeric"
//             maxlength="1"
//           />
//           <input
//             class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//             spellcheck="false"
//             autocomplete="one-time-code"
//             placeholder="○"
//             aria-invalid="false"
//             type="tel"
//             aria-disabled="false"
//             inputmode="numeric"
//             maxlength="1"
//           />
//           <input
//             class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//             spellcheck="false"
//             autocomplete="one-time-code"
//             placeholder="○"
//             aria-invalid="false"
//             type="tel"
//             aria-disabled="false"
//             inputmode="numeric"
//             maxlength="1"
//           />
//         </div>
//         <span class="text-zinc-500 text-[12px] text-center">
//           Please enter the 4-digits one time password (OTP) received on the
//           registered email
//         </span>
//         <button
//           type="button"
//           class="mt-[14px] text-base text-white font-medium tracking-wider rounded-md w-full px-4 py-1 transition-colors duration-200 border border-solid border-transparent bg-sky-500 hover:bg-sky-600/80"
//         >
//           Verify
//         </button>
//       </div>
//       <div class="space-y-1 flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)]">
//         <span class="text-sky-600 outline-none border-none font-semibold cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
//           Login with your password
//         </span>
//         <div class="text-sm">
//           New user ?
//           <span class="text-sky-600 outline-none border-none cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
//             Create an account
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
