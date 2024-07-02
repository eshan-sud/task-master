import { Toaster } from 'react-hot-toast';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Contact } from './pages/Contact.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';

function App() {
  return (
    <div className="bg-blue-50">
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />

            {/* <Route exact path="/account" element={<Account />} /> */}
            {/* <Route exact path="/notes" element={<Notes />} /> */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;