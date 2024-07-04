import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { Features } from '../components/Features.jsx';
import { Pricing } from '../components/Pricing.jsx';
import { FAQs } from '../components/FAQs.jsx';
import { Footer } from '../components/Footer.jsx';
import { Background } from '../components/Background.jsx';


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
            <Background />
            <Features />
            <Pricing />
            <FAQs />
            <Footer />
        </>
    );
};

export { Home };