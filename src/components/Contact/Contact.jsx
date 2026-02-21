import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            On est là pour répondre à toutes vos questions, suggestions ou commandes spéciales !
          </p>
        </div>

        {/* DEUX FORMULAIRES CÔTE À CÔTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* FORMULAIRE 1 - Message */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📩 Envoyez-nous un message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
                    placeholder="46 255 143"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:brightness-105 transition shadow-md">
                Envoyer le message
              </button>
            </form>
          </div>

          {/* FORMULAIRE 2 - Coordonnées */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📍 Nos coordonnées
            </h2>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-600 text-lg mt-1 shrink-0" />
                <div className="text-sm">
                  <strong className="block mb-1">Adresse</strong>
                  EcoFood Gabès<br />
                  6000 Gabès, Tunisie
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-600 text-lg shrink-0" />
                <div className="text-sm">
                  <strong className="block mb-1">Téléphone</strong>
                  <a href="tel:+21646255143" className="hover:text-orange-600 transition">
                    46 255 143
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaRegEnvelope className="text-orange-600 text-lg shrink-0" />
                <div className="text-sm">
                  <strong className="block mb-1">Email</strong>
                  <a href="mailto:contact@ecofood.com" className="hover:text-orange-600 transition">
                    contact@ecofood.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-orange-600 text-lg mt-1 shrink-0" />
                <div className="text-sm">
                  <strong className="block mb-1">Horaires d'ouverture</strong>
                  Lundi – Dimanche : 10:00 – 23:00
                  <span className="block text-xs text-gray-500 mt-1">
                    (Livraison jusqu'à minuit)
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* CARTE GRANDE EN BAS */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.748492028!2d10.097367!3d33.881667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556f!2sGab%C3%A8s!5e0!3m2!1sfr!2stn!4v1730000000000"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation EcoFood - Gabès"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;

