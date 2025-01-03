// filename - frontend/src/pages/ForgotPassword.jsx

import React, { useRef, useState } from "react";
import { EmailField, NewPasswordField } from "../components/Fields";
import { FormContainer } from "../components/FormContainer";
import { SubmitButton } from "../components/Buttons";
import toast from "react-hot-toast";
import { endpoints } from "../ApiEndpoints.js";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = ({ email, setEmail, setStep }) => {
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      // Check if the user exists
      const checkUserExistsResponse = await fetch(endpoints.checkUserExists, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const checkUserExistsMessage = await checkUserExistsResponse.json();
      if (!checkUserExistsMessage.exists) {
        toast.error("User Not Found!");
        return;
      }
      if (!checkUserExistsResponse.ok) {
        toast.error("User Not Verified!");
        return;
      }
      const otpResponse = await fetch(endpoints.sendOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "PASSWORD RESET VERIFICATION" }),
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
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!Array.isArray(otp)) return; // Ensure otp is an array
    const newOtp = [...otp];
    if (value.length > 1) {
      const pastedOtp = value.slice(0, 4).split("");
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pastedOtp[i] || "";
      }
      setOtp(newOtp);

      const lastFilledIndex = newOtp.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 3 ? lastFilledIndex + 1 : 3;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Array.isArray(otp)) return; // Ensure otp is an array
    const verificationOtp = otp.join("");
    try {
      const response = await fetch(endpoints.verifyOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: verificationOtp }),
      });
      const message = await response.json();

      if (response.ok) {
        toast.success("OTP Verified!");
        localStorage.setItem("resetToken", message.token);
        setStep(3); // Proceed to Reset Password
      } else {
        toast.error(message.error);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Invalid OTP or something went wrong!");
    }
  };

  return (
    <>
      <form
        className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4"
        onSubmit={handleSubmit}
      >
        <div class="flex flex-col items-center justify-center relative p-4 overflow-hidden">
          <div class="my-6 w-full grid grid-flow-col grid-cols-4 items-center justify-center justify-items-center">
            <input
              class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellcheck="false"
              autocomplete="one-time-code"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputmode="numeric"
              maxlength="1"
              autoFocus="true"
            />
            <input
              class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellcheck="false"
              autocomplete="one-time-code"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputmode="numeric"
              maxlength="1"
            />
            <input
              class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellcheck="false"
              autocomplete="one-time-code"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputmode="numeric"
              maxlength="1"
            />
            <input
              class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellcheck="false"
              autocomplete="one-time-code"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputmode="numeric"
              maxlength="1"
            />
          </div>
          <span class="text-zinc-500 text-[12px] text-center">
            Please enter the 4-digits one time password (OTP) received on the
            registered email
          </span>
          <button
            type="button"
            class="mt-[14px] text-base text-white font-medium tracking-wider rounded-md w-full px-4 py-1 transition-colors duration-200 border border-solid border-transparent bg-sky-500 hover:bg-sky-600/80"
          >
            Verify
          </button>
        </div>
      </form>
    </>
  );
};

// const OTPVerificationForm = ({ email, otp, setOtp, setStep }) => {
//   const handleOtpVerification = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(endpoints.verifyOTP, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });
//       const message = await response.json();

//       if (response.ok) {
//         toast.success("OTP Verified!");
//         localStorage.setItem("resetToken", message.token);
//         setStep(3); // Proceed to Reset Password
//       } else {
//         toast.error(message.error);
//         window.location.reload();
//       }
//     } catch (error) {
//       toast.error("Invalid OTP or something went wrong!");
//     }
//   };

//   return (
//     <form
//       className="flex flex-col gap-4 w-full"
//       onSubmit={handleOtpVerification}
//     >
//       <label htmlFor="otp" className="text-gray-600">
//         Enter the OTP sent to your email:
//       </label>
//       <input
//         type="text"
//         id="otp"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="otp-input border-2 rounded-md p-2 outline-none"
//         maxLength={6}
//         required
//         autoFocus={true}
//       />
//       <SubmitButton text="Verify OTP" />
//     </form>
//   );
// };

// const EmailVerificationPage = () => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const { error, isLoading, verifyEmail } = useAuthStore();

//   const handleChange = (index, value) => {
//     const newCode = [...code];

//     // Handle pasted content
//     if (value.length > 1) {
//       const pastedCode = value.slice(0, 6).split("");
//       for (let i = 0; i < 6; i++) {
//         newCode[i] = pastedCode[i] || "";
//       }
//       setCode(newCode);

//       // Focus on the last non-empty input or the first empty one
//       const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
//       const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
//       inputRefs.current[focusIndex].focus();
//     } else {
//       newCode[index] = value;
//       setCode(newCode);

//       // Move focus to the next input field if value is entered
//       if (value && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const verificationCode = code.join("");
//     try {
//       await verifyEmail(verificationCode);
//       navigate("/");
//       toast.success("Email verified successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Auto submit when all fields are filled
//   useEffect(() => {
//     if (code.every((digit) => digit !== "")) {
//       handleSubmit(new Event("submit"));
//     }
//   }, [code]);

//   return (
//     <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
//       >
//         <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
//           Verify Your Email
//         </h2>
//         <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

//         <form onSubmit={handleSubmit} className='space-y-6'>
//           <div className='flex justify-between'>
//             {code.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type='text'
//                 maxLength='6'
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
//               />
//             ))}
//           </div>
//           {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type='submit'
//             disabled={isLoading || code.some((digit) => !digit)}
//             className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
//           >
//             {isLoading ? "Verifying..." : "Verify Email"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// and make sure to use this as the user interface
// <div class="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4">
//   <div class="flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)] overflow-hidden">
//     <h6 class="text-2xl font-bold">OTP Verification</h6>
//     <div class="my-6 w-full grid grid-flow-col grid-cols-4 items-center justify-center justify-items-center">
//       <input
//         class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//         spellcheck="false"
//         autocomplete="one-time-code"
//         placeholder="○"
//         aria-invalid="false"
//         type="tel"
//         aria-disabled="false"
//         inputmode="numeric"
//         maxlength="1"
//       />
//       <input
//         class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//         spellcheck="false"
//         autocomplete="one-time-code"
//         placeholder="○"
//         aria-invalid="false"
//         type="tel"
//         aria-disabled="false"
//         inputmode="numeric"
//         maxlength="1"
//       />
//       <input
//         class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//         spellcheck="false"
//         autocomplete="one-time-code"
//         placeholder="○"
//         aria-invalid="false"
//         type="tel"
//         aria-disabled="false"
//         inputmode="numeric"
//         maxlength="1"
//       />
//       <input
//         class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
//         spellcheck="false"
//         autocomplete="one-time-code"
//         placeholder="○"
//         aria-invalid="false"
//         type="tel"
//         aria-disabled="false"
//         inputmode="numeric"
//         maxlength="1"
//       />
//     </div>
//     <span class="text-zinc-500 text-[12px] text-center">
//       Please enter the 4-digits one time password (OTP) received on the
//       registered email
//     </span>
//     <button
//       type="button"
//       class="mt-[14px] text-base text-white font-medium tracking-wider rounded-md w-full px-4 py-1 transition-colors duration-200 border border-solid border-transparent bg-sky-500 hover:bg-sky-600/80"
//     >
//       Verify
//     </button>
//   </div>
//   <div class="space-y-1 flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)]">
//     <span class="text-sky-600 outline-none border-none font-semibold cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
//       Login with your password
//     </span>
//     <div class="text-sm">
//       New user ?
//       <span class="text-sky-600 outline-none border-none cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
//         Create an account
//       </span>
//     </div>
//   </div>
// </div>

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
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const token = localStorage.getItem("resetToken");
    if (!token) {
      toast.error("Token expired or not found!");
      return;
    }
    try {
      const response = await fetch(endpoints.resetPassword, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const message = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully!");
        navigate("/login");
        localStorage.removeItem("resetToken");
      } else {
        toast.error(message.error);
      }
    } catch (error) {
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
        <div class="space-y-1 flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)]">
          <span class="text-sky-600 outline-none border-none font-semibold cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
            Login with your password
          </span>
          <div class="text-sm">
            New user ?
            <span class="text-sky-600 outline-none border-none cursor-pointer [text-decoration-line:none] hover:underline hover:underline-offset-2">
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
