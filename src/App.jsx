// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import des composants / pages
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Menu from './components/Menu/menu';
import About from './components/About/About';
import Login from './pages/login';
import Register from "./pages/register"
import ForgotPassword from "./pages/ForgotPassword"

function App() {
  return (
    <BrowserRouter>
      {/* Structure globale avec flex pour que le footer reste en bas */}
      <div className="min-h-screen flex flex-col bg-gray-50">

        {/* Navbar fixe en haut */}
        <Navbar />

        {/* Contenu principal qui grandit pour pousser le footer */}
        <main className="flex-grow pt-16 md:pt-20">
          <Routes>
            {/* Routes principales */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> {/* redirection facultative */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/about" element={<About />} />

            {/* Authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* dashboard restaurateur */}

            {/* Page 404 - bonne pratique */}
            <Route path="*" element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-6xl md:text-8xl font-bold text-orange-600 mb-6"></h1>
                <p className="text-2xl md:text-3xl font-semibold text-zinc-800 mb-4">
                </p>
                <p className="text-lg text-zinc-600 mb-8 max-w-md">
                </p>

              </div>
            } />
          </Routes>
        </main>

        {/* Footer en bas */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App