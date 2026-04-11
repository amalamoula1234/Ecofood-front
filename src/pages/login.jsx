import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../services/authservices";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation(); // récupérer page précédente

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!email) newErrors.email = "Veuillez remplir ce champ";
    if (!mdp) newErrors.mdp = "Veuillez remplir ce champ";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await loginUser({ email, mdp });
      const { token, user } = res.data;

      // stocker token et info utilisateur
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: 'success',
        title: 'Heureux de vous revoir !',
        text: `Bienvenue ${user.nom}`,
        timer: 1500,
        showConfirmButton: false
      });

      // ✅ redirection intelligente
      const from = location.state?.from; // page protégée
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      // sinon redirection selon role
      if (user.role === "admin") navigate("/admin");
      if (user.role === "client") navigate("/restaurant");
      if (user.role === "restaurateur") navigate("/restaurateur");
      
    } catch (err) {
      setErrors({
        email: "L'authentification a échoué. Vérifier votre adresse email et votre mot de passe.",
      });
    }
  };

  const inputStyle = (field) =>
    `w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition
     ${errors[field]
      ? "border-orange-500 focus:ring-2 focus:ring-orange-500"
      : "focus:ring-2 focus:ring-orange-400"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Connexion
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
              placeholder="Entrez votre email"
              className={inputStyle("email")}
            />
          </div>
          {errors.email && <p className="text-orange-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Mot de passe</label>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={mdp}
              onChange={(e) => { setMdp(e.target.value); setErrors({ ...errors, mdp: "" }); }}
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
          {errors.mdp && <p className="text-orange-500 text-xs mt-1">{errors.mdp}</p>}
        </div>

        {/* Mot de passe oublié */}
        <div className="text-right text-sm mb-2">
          <Link to="/forgot-password" className="text-orange-500 hover:underline">Mot de passe oublié ?</Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="text-orange-500 font-semibold hover:underline">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;