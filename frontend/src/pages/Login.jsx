// frontend/src/pages/Login.jsx

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../utils/AuthContext.js";
import { useRememberMe } from "../utils/RememberMeContext.js";
import { GoogleLogin } from "@react-oauth/google";
import "../App.css";

import { endpoints } from "../ApiEndpoints.js";

import { Field, EmailField } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { FormContainer } from "../components/FormContainer";

// Add this on 3-4 failed login attempts - maybe put the no. of failed attempts in cache storage or session storage?
// import ReCAPTCHA from "react-google-recaptcha";
// import GOOGLE_RECAPTCHA_SITE_KEY from process.env.GOOGLE_RECAPTCHA_SITE_KEY;
// <span>
//   <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
// </span>;

const checkVerification = (email) => {};

const LoginForm = () => {
  const Navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { isRememberMe, setIsRememberMe } = useRememberMe();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logindetails = {
    email,
    password,
  };
  const handleRememberMeChange = (event) => {
    // console.log("Checkbox checked:", event.target.checked);
    setIsRememberMe(event.target.checked);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(endpoints.loginAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindetails),
        credentials: "include",
      });
      const message = await response.json();
      if (response.ok) {
        const storage = isRememberMe
          ? window.localStorage
          : window.sessionStorage;
        storage.setItem("token", message.token);
        storage.setItem("fullName", `${message.firstName} ${message.lastName}`);
        storage.setItem("email", message.email);
        login();
        toast.success(message.message);
        checkVerification(email);
        Navigate("/", { replace: true });
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
        <EmailField
          type="email"
          name="Email"
          email={email}
          setEmail={setEmail}
          autoFocus={true}
        />
        <Field
          type="password"
          name="Password"
          value={password}
          setValue={setPassword}
        />
        <Link
          className="text-blue-600/70 text-sm underline"
          to="/forgotPassword"
        >
          Forgot your password?
        </Link>
        <div className="flex items-center">
          <input
            id="login-remember-me"
            type="checkbox"
            className="mr-2"
            checked={isRememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="login-remember-me"> Remember me </label>
        </div>
        <SubmitButton />
      </form>
      <span className="text-lg font-semibold text-center mt-[1.6rem]">
        Don't have an account yet?
        <Link className="text-blue-600 hover:underline ml-2" to="/register">
          Register for free!
        </Link>
        <div> OR </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Google Login Failed!");
            }}
          />
        </div>
      </span>
    </>
  );
};

export default function Login() {
  return (
    <FormContainer
      form={<LoginForm />}
      heading="Welcome Back!"
      subHeading="Login your account"
    />
  );
}
