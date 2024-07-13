import React, { useState } from "react";
import { Field, EmailField, GenderInput } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { Link, Navigate } from "react-router-dom";
import { EmailValidator } from "../utils/EmailValidator.js";
import { FormContainer } from "../components/FormContainer";
import { endpoints } from "../ApiEndpoints.js";
import toast from "react-hot-toast";

const RegisterForm = () => {
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
    console.log(registerDetails);
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
      console.log(message);
      if (response.ok) {
        toast.success("message.message");
        Navigate("/login", { replace: true }); // Redirection to Login Page
      } else {
        toast.error(message.error); // Error Handling
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleRegister}>
        <span className="flex gap-4">
          <Field
            type="text"
            name="First Name"
            className="flex-1"
            value={firstName}
            setValue={setFirstName}
          />
          <Field
            type="text"
            name="Last Name"
            className="flex-1"
            value={lastName}
            setValue={setLastName}
          />
        </span>
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
