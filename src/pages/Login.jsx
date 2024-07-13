import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Field, EmailField } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { EmailValidator } from "../utils/EmailValidator.js";
import { FormContainer } from "../components/FormContainer";

import { endpoints } from "../ApiEndpoints.js";

import toast from "react-hot-toast";
import AuthContext from "../utils/AuthContext.js";

const LoginForm = () => {
  const Navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState("");
  const logindetails = {
    email,
    password,
  };

  // If login-remember-me is checked => localStorage ; else => sessionStorage

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(logindetails);
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
        console.log(message.user);
        window.localStorage.setItem("token", message.token);
        window.localStorage.setItem(
          "fullName",
          `${message.user.firstName} ${message.user.lastName}`
        );
        login(); // Update the authentication state
        toast.success(message.message);
        Navigate("/", { replace: true }); // Redirection to Home
      } else {
        toast.error(message.error); // Error Handling
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
        <EmailValidator>
          <EmailField
            type="email"
            name="Email"
            email={email}
            setEmail={setEmail}
          />
        </EmailValidator>
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
            value={isRememberMe}
            onChange={() => {
              setIsRememberMe(!isRememberMe);
            }}
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

export const Login = () => {
  return (
    <FormContainer
      form={<LoginForm />}
      heading="Welcome Back!"
      subHeading="Login your account"
    />
  );
};
