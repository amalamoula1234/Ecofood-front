import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import api from "../../api/axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/contact", formData);
      Swal.fire({
        icon: 'success',
        title: 'Message Envoyé !',
        text: 'Merci pour votre message. Notre équipe reviendra vers vous très bientôt.',
        confirmButtonColor: '#f97316'
      });
      setFormData({ nom: "", email: "", telephone: "", message: "" });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4 tracking-tight">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            On est là pour répondre à toutes vos questions, suggestions ou commandes spéciales !
          </p>
        </div>

        {/* DEUX FORMULAIRES CÔTE À CÔTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* FORMULAIRE 1 - Message */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 p-8 border border-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-xl"><FaPaperPlane size={20} /></span>
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nom complet *</label>
                  <input
                    required
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    type="text"
                    className="w-full h-12 px-5 text-sm bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Téléphone</label>
                  <input
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    type="tel"
                    className="w-full h-12 px-5 text-sm bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="46 255 143"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email *</label>
                <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full h-12 px-5 text-sm bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                    placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Message *</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-5 text-sm bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none font-medium h-32"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition-all shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* FORMULAIRE 2 - Coordonnées */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 p-8 border border-gray-50 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-100 text-blue-600 rounded-xl"><FaMapMarkerAlt size={20} /></span>
              Nos coordonnées
            </h2>
            <ul className="space-y-8">
              <li className="flex items-start gap-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl"><FaMapMarkerAlt size={18} /></div>
                <div>
                  <strong className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Localisation</strong>
                  <p className="text-gray-700 font-bold">EcoFood Gabès, 6000 Gabès, Tunisie</p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><FaPhoneAlt size={18} /></div>
                <div>
                  <strong className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Téléphone</strong>
                  <a href="tel:+21646255143" className="text-gray-700 font-bold hover:text-orange-600 transition">46 255 143</a>
                </div>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><FaRegEnvelope size={18} /></div>
                <div>
                  <strong className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Email support</strong>
                  <a href="mailto:contact@ecofood.com" className="text-gray-700 font-bold hover:text-orange-600 transition">contact@ecofood.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><FaClock size={18} /></div>
                <div>
                  <strong className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Horaires (Livraison)</strong>
                  <p className="text-gray-700 font-bold">10:00 – 23:00 <span className="text-xs text-gray-400 font-medium">(Minuit pour les commandes)</span></p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* CARTE GRANDE EN BAS */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-8 border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.748492028!2d10.097367!3d33.881667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556f!2sGab%C3%A8s!5e0!3m2!1sfr!2stn!4v1730000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation EcoFood - Gabès"
            className="grayscale contrast-[1.1]"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;
