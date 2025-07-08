// frontend/src/pages/Home.jsx

import { Introduction } from "../components/home/Introduction.jsx";
import { Features } from "../components/home/Features.jsx";
import { Pricing } from "../components/home/Pricing.jsx";
import { FAQs } from "../components/home/FAQs.jsx";

// import isAuthenticated from '../utlis/loginAuth.js';

export default function Home() {
  return (
    <>
      <Introduction />
      <Features />
      <Pricing />
      <FAQs />
    </>
  );
}
