import React from 'react'
import { Navbar } from '../components/Navbar'
import { MiniField, Field, GenderInput } from '../components/Fields'
import { Link } from 'react-router-dom'

export const Register = () => {

  const handleRegister = () => {}

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col p-10 h-full justify-center items-center">
        <div className="text-2xl font-bold mb-2 text-center mt-[60px]"> Register </div>
        <div className="text-sm font-normal mb-4 text-center"> Create your account </div>
        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleRegister}>
          <MiniField type="text" name="First Name" />
          <MiniField type="text" name="Last Name" />
          <Field type="text" name="Email" />
          <Field type="password" name="Password" />
          <GenderInput />
          <button type="submit" className="w-full px-6 py-3 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"> Submit </button>
        </form>
        <div className="text-sm text-center mt-4"> Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Login now!</Link> </div>
      </div>
    </div>
  );
};