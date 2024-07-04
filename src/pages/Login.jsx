import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import '../App.css';
import { Field } from '../components/Fields';
import { Navbar } from '../components/Navbar';

export const Login = () => {
  const handleLogin = () => {}
  return (
    <>
      <Navbar />
      <div class="flex flex-col p-4 text-black">
        <div class="text-2xl font-bold mb-2 text-[#4b0e0e] text-center"> Welcome back<span class="text-[#ff4747]">!</span></div>
        <div class="text-sm font-normal mb-4 text-center text-[#4b0e0e]"> Log in to your account </div>
        <form class="flex flex-col gap-3" onSubmit={handleLogin}>
            <Field type='text' name='Email' />
            <Field type='password' name='Password' />
            <div><a class="text-sm text-[#ff4747]" href="/forgot"> Forgot your password? </a></div>
            <div><input id='login-remember-me' type='checkbox' /><label htmlFor='login-remember-me'> Remember me </label></div>
            <button type="submit" class="bg-[#ff4747] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"> Submit </button>
        </form>
      <div class="text-sm text-center mt-[1.6rem]">Don't have an account yet? <a class="text-sm text-[#ff4747]" href="/register"> Register for free! </a></div>
      
      {
      /* <GoogleLogin
            onSuccess={credentialResponse => {console.log(credentialResponse);}}
            onError={() => {console.log('Login Failed');}}
          /> */
      }
    </div>
    </>
  )
}