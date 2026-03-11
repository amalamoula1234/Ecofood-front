import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          🎉 Paiement réussi !
        </h1>

        <p className="text-gray-600 mb-6">
          Merci pour votre commande. Votre paiement a été effectué avec succès.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
        >
          Retour à l'accueil
        </button>

      </div>
    </div>
  );
};

export default Success;