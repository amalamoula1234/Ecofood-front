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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData);
    alert("Inscription réussie");
  };

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
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nom
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="nom"
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Prenom */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Prenom
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="prenom"
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Entrez votre email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Telephone */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Telephone
          </label>
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              name="telephone"
              onChange={handleChange}
              placeholder="Entrez votre numéro"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="relative">
            <FaUserTag className="absolute top-3 left-3 text-gray-400" />
            <input
              name="role"
              onChange={handleChange}
              placeholder="client / admin / restaurateur"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              name="mdp"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-orange-500 hover:underline"
          >
            Mot de passe oublié ?
          </Link>

          <Link
            to="/login"
            className="text-gray-600 hover:underline"
          >
            Déjà un compte ?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Créer un compte
        </button>
      </form>
    </div>
  );
}

export default Register;