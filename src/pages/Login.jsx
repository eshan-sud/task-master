import React from 'react';
import '../App.css';
import { Field } from '../components/Fields';
import { Navbar } from '../components/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

export const Login = () => {
  const handleLogin = () => {}
  return (
    <div className="bg-blue-50">
      <Navbar />
      <div className="flex flex-col p-10 h-screen justify-center">
        <div className="text-2xl font-bold mb-2 text-center"> Welcome back! </div>
        <div className="text-sm font-normal mb-4 text-center"> Log in to your account </div>
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
            <Field type='text' name='Email' />
            <Field type='password' name='Password' />
            <div><Link className="text-blue-600/70 text-sm underline" to="/forgotPassword"> Forgot your password? </Link></div>
            <div><input id='login-remember-me' type='checkbox' /><label htmlFor='login-remember-me'> Remember me </label></div>
            <button type="submit" className="w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"> Submit </button>
        </form>
        <div className="text-sm text-center mt-[1.6rem]"> Don't have an account yet? <Link className="text-blue-600 hover:underline" to="/register"> Register for free! </Link></div>
        <div className="text-center"> or </div>
        <div className="flex justify-center">
          {/* <GoogleLogin
            onSuccess={credentialResponse => {console.log(credentialResponse);}}
            onError={() => {console.log('Login Failed');}}
          /> */}
        </div>
      </div>
    </div>
  )
}