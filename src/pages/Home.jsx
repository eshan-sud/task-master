import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { Introduction } from '../components/Introduction.jsx';
import { Features } from '../components/Features.jsx';
import { Pricing } from '../components/Pricing.jsx';
import { FAQs } from '../components/FAQs.jsx';
import { Footer } from '../components/Footer.jsx';
import { Background } from '../components/Background.jsx';

// import isAuthenticated from '../utlis/loginAuth.js';

const Home = () => {

    return (
        <>
            <Navbar />
            <Introduction />
            <Features />
            <Pricing />
            <FAQs />
            <Footer />
            <Background />
        </>
    );
};

export { Home };