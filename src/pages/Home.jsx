import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar.jsx';
import video from "../assets/videos/Home-Page-Background.mp4"
import { Features } from '../components/Features.jsx';
import { Pricing } from '../components/Pricing.jsx';
import { FAQs } from '../components/FAQs.jsx';
import { Footer } from '../components/Footer.jsx';


const Home = () => {

    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     const handleLoad = () => {setIsLoading(false);};
    //     window.addEventListener('load', handleLoad);
    //     return () => {window.removeEventListener('load', handleLoad);};
    // }, []);
    // if (isLoading) return <Loader />

    return (
        <>
            <Navbar />
            <div className="w-full h-screen fixed top-0 left-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
                    <div className="flex flex-col justify-center items-center bg-white/50 p-10 rounded-full backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Give Yourself the Power of Task Management</h3>
                        <h2 className="text-3xl font-bold text-black mb-4">Save Time & Be Efficient</h2>
                        <h6 className="text-md font-bold text-gray-700 mb-4">The all-in-one solution to transform yourself</h6>
                    </div>
                </div>
                <video className="absolute top-0 left-0 w-full h-full object-cover" src={video} autoPlay muted loop />
            </div>
            <Features />
            <Pricing />
            <FAQs />
            <Footer />
        </>
    );
};

export { Home };