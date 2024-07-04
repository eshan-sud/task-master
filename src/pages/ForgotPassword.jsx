import React from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { Field } from '../components/Fields.jsx';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
    const handleResetPassword = () => {}
    return (
        <>
            <Navbar />
            <div className="flex flex-col p-10 mt-[60px] h-screen justify-center">
                <div className="text-2xl font-bold mb-2 text-center"> Forgot Your Pssword? </div>
                <div className="text-sm font-normal mb-4 text-center"> Reset Your Password: </div>
                <form className="flex flex-col gap-3" onSubmit={handleResetPassword}>
                    <Field type='text' name='Email' />
                    <div><Link className="text-sm hover:underline" to="/forgotPassword"> Forgot your password? </Link></div>
                    <div><input id='login-remember-me' type='checkbox' /><label htmlFor='login-remember-me'> Remember me </label></div>
                    <button type="submit" className="w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"> Submit </button>
                </form>
            </div>
        </>
    )
}
