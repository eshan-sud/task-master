import React from "react";
import { Field, EmailField, GenderInput } from "../components/Fields";
import { SubmitButton } from "../components/Buttons";
import { Link } from "react-router-dom";
import { EmailValidator } from "../utils/EmailValidator.js";
import { FormContainer } from "../components/FormContainer";

const RegisterForm = (handleRegister) => {
  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleRegister}>
        <span className="flex gap-4">
          <Field type="text" name="First Name" className="flex-1" />
          <Field type="text" name="Last Name" className="flex-1" />
        </span>
        <EmailValidator>
          <EmailField type="text" name="Email" />
        </EmailValidator>
        <Field type="password" name="Password" />
        <GenderInput />
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
  const handleRegister = () => {};
  return (
    <FormContainer
      form={<RegisterForm handleRegister={handleRegister} />}
      heading="Register For Free!"
      subHeading="Create your account"
    />
  );
};
//   return (
//     <>
//       <div className="flex items-center justify-center bg-black/10">
//         <div className="flex flex-col p-10 m-[90px] justify-center items-center bg-white/30 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-[15px] border border-white w-full max-w-md">
//           <span className="text-2xl font-bold mb-2 text-center">
//             Register For Free!
//           </span>
//           <span className="text-sm font-normal mb-4 text-center">
//             Create your account
//           </span>
//           <form
//             className="flex flex-col gap-4 w-full"
//             onSubmit={handleRegister}
//           >
//             <span className="flex gap-4">
//               <Field type="text" name="First Name" className="flex-1" />
//               <Field type="text" name="Last Name" className="flex-1" />
//             </span>
//             <EmailValidator>
//               <Field type="text" name="Email" />
//             </EmailValidator>
//             <Field type="password" name="Password" />
//             <GenderInput />
//             <SubmitButton />
//           </form>
//           <span className="text-lg font-semibold text-center mt-[1.6rem]">
//             Already have an account?
//             <Link className="text-blue-600 hover:underline ml-2" to="/login">
//               Login now!
//             </Link>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };
