// frontend/src/pages/Register.jsx

import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { endpoints } from "../ApiEndpoints.js";

import { Field, EmailField, GenderInput } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { FormContainer } from "../components/FormContainer";
import { showSpinnerToast } from "../components/Elements.jsx";

const RegisterForm = () => {
  const siteKey = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const registerDetails = {
    firstName,
    lastName,
    email,
    password,
    gender,
    captchaToken,
  };

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const spinnerId = showSpinnerToast();
    try {
      if (!captchaToken) {
        toast.error("CAPTCHA is Required");
        return;
      }
      if (!firstName || !lastName || !email || !password || !gender) {
        toast.error("All fields are required");
        return;
      }
      const response = await fetch(endpoints.registerAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
        credentials: "include",
      });
      toast.dismiss(spinnerId);
      const message = await response.json();
      if (response.ok) {
        toast.success(message.message);
        navigate("/login", { replace: true });
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
      <form className="flex flex-col gap-4 w-full" onSubmit={handleRegister}>
        <span className="flex gap-4">
          <Field
            type="text"
            name="First Name"
            value={firstName}
            setValue={setFirstName}
            autoFocus={true}
            allowSpecialChars={false}
          />
          <Field
            type="text"
            name="Last Name"
            value={lastName}
            setValue={setLastName}
            allowSpecialChars={false}
          />
        </span>
        <EmailField
          type="email"
          name="Email"
          email={email}
          setEmail={setEmail}
          autoFocus={false}
        />
        <Field
          type="password"
          name="Password"
          value={password}
          setValue={setPassword}
        />
        <GenderInput gender={gender} setGender={setGender} />
        <span className="flex justify-center items-center py-2">
          <ReCAPTCHA
            className="w-full max-w-xs"
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />
        </span>
        <SubmitButton />
      </form>
      <span className="text-lg font-semibold text-center mt-[1.6rem]">
        Already have an account?
        <Link className="text-blue-600 hover:underline ml-2" to="/login">
          Login now!
        </Link>
      </span>
    </>
  );
};

export default function Register() {
  return (
    <FormContainer
      form={<RegisterForm />}
      heading="Register For Free"
      subHeading="Create your account"
    />
  );
}
