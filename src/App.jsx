import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import des composants / pages
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Offre from './components/Offre/Offre';
import OffreDetail from './components/Offre/OffreDetail';
import Success from './components/Offre/Success';
import About from './components/About/About';
import Login from './pages/login';
import Register from "./pages/Register";

{/* dashboard Restaurateur */ }
import DashboardRestaurateur from './restaurateur/DashboardRestaurateur';


{/* dashboard Admin */ }
import DashboardAdmin from './admin/DashboardAdmin';
import GestionUsers from "./admin/GestionUsers";
import Restaurant from './components/Restaurant/restaurant';
import RestaurantDetail from './components/Restaurant/restaurantdetail';

// ✅ Composant séparé pour utiliser useLocation (doit être INSIDE BrowserRouter)
function AppContent() {
  const location = useLocation();

  // ✅ Les routes où Navbar et Footer sont cachés
  const hideLayout =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/restaurateur');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ✅ Navbar cachée pour admin et restaurateur */}
      {!hideLayout && <Navbar />}

      {/* Contenu principal */}
      <main className={`flex-grow ${!hideLayout ? 'pt-16 md:pt-20' : ''}`}>
        <Routes>
          {/* Routes principales */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/offre" element={<Offre />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />


          <Route path="/offre/:id" element={<OffreDetail />} />
          <Route path="/success" element={<Success />} />

          {/* Authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connexion" element={<Login />} />




          {/* dashboard Admin */}
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/user" element={<GestionUsers />} />
          {/* dashboard Restaurateur */}
          <Route path="/restaurateur" element={<DashboardRestaurateur />} />




          {/* Page 404 */}
          <Route path="*" element={
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-6xl md:text-8xl font-bold text-orange-600 mb-6">404</h1>
              <p className="text-2xl md:text-3xl font-semibold text-zinc-800 mb-4">
                Page introuvable
              </p>
              <p className="text-lg text-zinc-600 mb-8 max-w-md">
                La page que vous cherchez n'existe pas.
              </p>
            </div>
          } />
        </Routes>
      </main>

      {/* ✅ Footer caché pour admin et restaurateur */}
      {!hideLayout && <Footer />}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;