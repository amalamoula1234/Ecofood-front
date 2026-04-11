import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";



const OffreDetail = () => {
   const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // pour revenir après login
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const token = localStorage.getItem("token");
    if (!token) {
      // redirect vers login + after login redirect
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    api
      .get(`/offre/${id}`)
      .then((res) => {
        setOffre(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erreur:", err);
        setLoading(false);
      });
  }, [id, navigate, location.pathname]);
    // ✅ HNEH DAKHEL COMPONENT
const handleCheckout = async () => {
  if (!offre) return;

  try {
    const token = localStorage.getItem("token");
    // 🔥 1. CRÉER la commande
    const cmdRes = await api.post("/commande", {
      offreId: offre._id,
      total: offre.prix,
    });

    if (cmdRes.status !== 201) {
      throw new Error("Erreur commande");
    }

    console.log("✅ Commande créée");

    // 🔥 2. CRÉER la session Stripe
    const stripeRes = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offre }),
    });

    if (!stripeRes.ok) {
      const stripeErr = await stripeRes.json();
      throw new Error("Erreur Stripe: " + stripeErr.error);
    }

    const data = await stripeRes.json();

    // 🔥 3. REDIRECT vers Stripe
    if (data.url) {
      window.location.href = data.url;
    }

  } catch (error) {
    console.error("❌ Erreur checkout:", error.message);
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: error.message,
    });
  }
};


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!offre)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-xl">Offre introuvable</p>
        <button
          onClick={() => navigate("/offre")}
          className="text-orange-500 font-bold underline"
        >
          Retour aux offres
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* BOUTON RETOUR */}
        <button
          onClick={() => navigate("/offre")}
          className="flex items-center gap-2 text-orange-500 font-bold mb-8 hover:gap-3 transition-all"
        >
          ← Retour aux offres
        </button>

        {/* CARD DETAIL */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* IMAGE */}
          {offre.image ? (
            <img
              src={`http://localhost:5000/uploads/${offre.image}`}
              alt={offre.nom}
              className="w-full h-72 object-cover"
            />
            
          ) : (
            <div className="w-full h-72 bg-orange-100 flex items-center justify-center">
              <span className="text-orange-300 text-8xl">🍽️</span>
            </div>
          )}

          <div className="p-8">
            {/* CATEGORIE */}
            <span className="inline-block bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {offre.categorie}
            </span>

            {/* NOM */}
            <h1 className="text-4xl font-extrabold text-zinc-800 mb-4">
              {offre.nom}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              {offre.description}
            </p>

            {/* DIVIDER */}
            <hr className="border-gray-100 mb-6" />

            {/* INFOS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* PRIX */}
              <div className="bg-orange-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase mb-1">
                  Prix
                </p>
                {offre.prixAncien && (
                  <p className="line-through text-zinc-700 font-bold text-lg">
                    {offre.prixAncien} DT
                  </p>
                )}
                <p className="text-orange-500 font-extrabold text-3xl">
                  {offre.prix} <span className="text-lg">DT</span>
                </p>
              </div>

              {/* STATUT */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 font-semibold uppercase mb-1">
                  Statut
                </p>
                {offre.disponibilite ? (
                  <p className="text-green-500 font-bold text-lg">✅ Disponible</p>
                ) : (
                  <p className="text-red-400 font-bold text-lg">❌ Indisponible</p>
                )}
              </div>

              {/* DUREE */}
              {offre.dureeHeures && (
                <div className="bg-gray-50 rounded-2xl p-4 col-span-1 sm:col-span-2">
                  <p className="text-xs text-gray-400 font-semibold uppercase mb-1">
                    Durée de l'offre
                  </p>
                  <p className="text-zinc-700 font-bold text-lg">
                    ⏱️ {offre.dureeHeures}H
                  </p>
                </div>
              )}
            </div>

            {/* BOUTON COMMANDER */}
            <button 
            onClick={handleCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-4 rounded-2xl text-lg transition-all duration-200 shadow-md hover:shadow-orange-300">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffreDetail;