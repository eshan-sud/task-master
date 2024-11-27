// filename - frontend/src/pages/Register.jsx

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { endpoints } from "../ApiEndpoints.js";

import { Field, EmailField, GenderInput } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { FormContainer } from "../components/FormContainer";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const registerDetails = {
    firstName,
    lastName,
    email,
    password,
    gender,
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // console.log(registerDetails);
    try {
      const response = await fetch(endpoints.registerAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
        credentials: "include",
      });

      const message = await response.json();
      // console.log(message);
      if (response.ok) {
        toast.success(message.message);
        navigate("/login", { replace: true });
      } else {
        toast.error(message.error);
      }
    } catch (error) {
      toast.error(error);
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
          autoFocus={true}
        />
        <Field
          type="password"
          name="Password"
          value={password}
          setValue={setPassword}
        />
        <GenderInput gender={gender} setGender={setGender} />
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

export const Register = () => {
  return (
    <FormContainer
      form={<RegisterForm />}
      heading="Register For Free!"
      subHeading="Create your account"
    />
  );
};
