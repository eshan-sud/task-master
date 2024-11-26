// src/Login.jsx

import React, { useState, useContext } from "react";
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
    console.log("Checkbox checked:", event.target.checked);
    setIsRememberMe(event.target.checked);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(logindetails);
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
        // console.log(message.user);
        const storage = isRememberMe
          ? window.localStorage
          : window.sessionStorage;
        storage.setItem("token", message.token);
        storage.setItem(
          "fullName",
          `${message.user.firstName} ${message.user.lastName}`
        );
        storage.setItem("email", message.user.email);

        login();
        toast.success(message.message);
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

export const Login = () => {
  return (
    <FormContainer
      form={<LoginForm />}
      heading="Welcome Back!"
      subHeading="Login your account"
    />
  );
};
