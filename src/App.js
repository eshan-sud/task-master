import { Toaster } from "react-hot-toast";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";

import { Loader } from "./components/Loader.jsx";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [isLoading]);
  if (isLoading) return <Loader />;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about-us" element={<AboutUs />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />

            {/* <Route exact path="/account" element={<Account />} /> */}
            {/* <Route exact path="/notes" element={<Notes />} /> */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
            <Route exact path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
