import React from "react";
import "../App.css";
import { Field, EmailField } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { EmailValidator } from "../utils/EmailValidator.js";
import { FormContainer } from "../components/FormContainer";

const handleLogin = (event) => {
  event.preventDefault();
  // Handle Login Logic
};

const LoginForm = ({ handleLogin }) => {
  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
        <EmailValidator>
          <EmailField type="text" name="Email" autofocus={true} />
        </EmailValidator>
        <Field type="password" name="Password" />
        <Link
          className="text-blue-600/70 text-sm underline"
          to="/forgotPassword"
        >
          Forgot your password?
        </Link>
        <div className="flex items-center">
          <input id="login-remember-me" type="checkbox" className="mr-2" />
          <label htmlFor="login-remember-me"> Remember me </label>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export const Login = () => {
  return (
    <>
      <FormContainer
        form={<LoginForm handleLogin={handleLogin} />}
        heading="Welcome Back!"
        subHeading="Login your account"
      />
      <span className="text-lg font-semibold text-center mt-[1.6rem]">
        Don't have an account yet?
        <Link className="text-blue-600 hover:underline ml-2" to="/register">
          Register for free!
        </Link>
        <div>OR</div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </span>
    </>
  );
};

//   return (
//     <>
//       <div className="flex items-center justify-center bg-black/10">
//         <div className="flex flex-col p-10 m-[90px] justify-center items-center bg-white/30 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-[15px] border border-white w-full max-w-md">
//           <span className="text-2xl font-bold mb-2 text-center">
//             Welcome Back!
//           </span>
//           <span className="text-sm font-normal mb-4 text-center">
//             Login your account
//           </span>
//           <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
//             <EmailValidator>
//               <Field type="text" name="Email" />
//             </EmailValidator>
//             <Field type="password" name="Password" />
//             <Link
//               className="text-blue-600/70 text-sm underline"
//               to="/forgotPassword"
//             >
//               Forgot your password?
//             </Link>
//             <div className="flex items-center">
//               <input id="login-remember-me" type="checkbox" className="mr-2" />
//               <label htmlFor="login-remember-me"> Remember me </label>
//             </div>
//             <SubmitButton />
//           </form>
//           <span className="text-lg font-semibold text-center mt-[1.6rem]">
//             Don't have an account yet?
//             <Link className="text-blue-600 hover:underline ml-2" to="/register">
//               Register for free!
//             </Link>
//             <div>OR</div>
//             <div className="flex justify-center">
//               <GoogleLogin
//                 onSuccess={(credentialResponse) => {
//                   console.log(credentialResponse);
//                 }}
//                 onError={() => {
//                   console.log("Login Failed");
//                 }}
//               />
//             </div>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };
