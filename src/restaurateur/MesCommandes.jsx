import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || user.role !== "restaurateur") {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/api/commande/liste", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCommandes(res.data))
    .catch(err => console.error(err));

  }, []);

  const updateStatut = async (id, statut) => {
    const token = localStorage.getItem("token");
    await axios.patch(`http://localhost:5000/api/commande/${id}/statut`, { statut }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCommandes(prev =>
      prev.map(cmd => cmd._id === id ? { ...cmd, statut } : cmd)
    );
  };

  const statutColor = (statut) => {
    if (statut === "commandé") return "bg-green-100 text-green-700";
    if (statut === "annulé") return "bg-red-100 text-red-600";
    return "bg-orange-100 text-orange-500";
  };

  const paiementColor = (statut) => {
    if (statut === "payé") return "bg-green-100 text-green-700";
    if (statut === "échoué") return "bg-red-100 text-red-600";
    return "bg-orange-100 text-orange-500";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">Mes Commandes</h1>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="px-4 py-3">Numéro</th>
              <th className="px-4 py-3">Offre</th>
              <th className="px-4 py-3">Total (DT)</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Statut Paiement</th>
              <th className="px-4 py-3">Statut Commande</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {commandes.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  Aucune commande pour le moment.
                </td>
              </tr>
            ) : (
              commandes.map(cmd => (
                <tr key={cmd._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">
                    CMD-{cmd._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {cmd.offre?.nom || cmd.offre?._id?.slice(-6) || "—"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {cmd.total} DT
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(cmd.dateCommande).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${paiementColor(cmd.statutPaiement)}`}>
                      {cmd.statutPaiement}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statutColor(cmd.statut)}`}>
                      {cmd.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {cmd.statut === "en_attente" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatut(cmd._id, "commandé")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => updateStatut(cmd._id, "annulé")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                        >
                          Rejeter
                        </button>
                      </div>
                    ) : cmd.statut === "commandé" ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">✅ Commandé</span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">❌ Annulée</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MesCommandes;

