import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authservices";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserTag,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    telephone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // nfas5ou error ki y3amer champ
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "Veuillez remplir ce champ";
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // ❌ ma yet3adach

    try {
      await registerUser(formData);
      alert("Inscription réussie");
    } catch (error) {
      alert("Erreur lors de l'inscription");
    }
  };

  const inputStyle = (field) =>
    `w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition
     ${
       errors[field]
         ? "border-orange-500 focus:ring-2 focus:ring-orange-500"
         : "focus:ring-2 focus:ring-orange-400"
     }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Inscription
        </h2>

        {/* Nom */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nom
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className={inputStyle("nom")}
            />
          </div>
          {errors.nom && (
            <p className="text-orange-500 text-xs mt-1">{errors.nom}</p>
          )}
        </div>

        {/* Prenom */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Prenom
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              className={inputStyle("prenom")}
            />
          </div>
          {errors.prenom && (
            <p className="text-orange-500 text-xs mt-1">{errors.prenom}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              className={inputStyle("email")}
            />
          </div>
          {errors.email && (
            <p className="text-orange-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Telephone */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Telephone
          </label>
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Entrez votre numéro"
              className={inputStyle("telephone")}
            />
          </div>
          {errors.telephone && (
            <p className="text-orange-500 text-xs mt-1">{errors.telephone}</p>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="relative">
            <FaUserTag className="absolute top-3 left-3 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none appearance-none bg-white ${
                errors.role
                  ? "border-orange-500 focus:ring-2 focus:ring-orange-500"
                  : "focus:ring-2 focus:ring-orange-400"
              }`}
            >
              <option value="">-- Sélectionner un rôle --</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
              <option value="restaurateur">Restaurateur</option>
            </select>
          </div>
          {errors.role && (
            <p className="text-orange-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="mdp"
              type={showPassword ? "text" : "password"}
              value={formData.mdp}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              className={inputStyle("mdp")}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.mdp && (
            <p className="text-orange-500 text-xs mt-1">{errors.mdp}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Créer un compte
        </button>

        <p className="text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;