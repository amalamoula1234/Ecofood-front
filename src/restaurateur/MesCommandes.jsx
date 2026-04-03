// src/pages/MesCommandes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineClipboardList } from "react-icons/hi";


export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 fetch commandes
  const fetchCommandes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/commande/liste");
      setCommandes(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // ➤ Update statut
  const handleStatut = async (id, newStatut) => {
    try {
      await axios.patch(`http://localhost:5000/api/commande/${id}/statut`, {
        statut: newStatut
      });
      fetchCommandes(); // refresh
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  if (loading) return <div className="p-4 text-gray-600">Chargement des commandes...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <HiOutlineClipboardList className="text-orange-500 text-2xl mr-2 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-orange-600">
          Liste des Commandes
        </h1>
      </div>

      {commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">CMD</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Offre</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Client</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Restaurant</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prix</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Statut</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Statut Paiement</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commandes.map((cmd) => (
                <tr key={cmd._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{cmd._id.slice(-6)}</td>
                  <td className="px-4 py-2 text-sm">{cmd.offre?.nom || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">{cmd.client?.nom || "Invité"}</td>
                  <td className="px-4 py-2 text-sm">{cmd.restaurant ? cmd.restaurant.slice(0, 6) : "N/A"}</td>                  <td className="px-4 py-2 text-sm font-semibold">{cmd.offre?.prix ? `${cmd.offre.prix} TD` : "N/A"}</td> {/* Prix */}
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-medium 
                      ${cmd.statut === "commandé" ? "bg-green-500" : cmd.statut === "annulé" ? "bg-red-500" : "bg-yellow-500"}`}>
                      {cmd.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-medium 
                      ${cmd.statutPaiement === "payé" ? "bg-green-600" : cmd.statutPaiement === "échoué" ? "bg-red-600" : "bg-yellow-500"}`}>
                      {cmd.statutPaiement}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">{new Date(cmd.dateCommande).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    {/* Buttons Actions */}
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-400 text-xs"
                      onClick={() => handleStatut(cmd._id, "commandé")}
                      disabled={cmd.statut === "commandé"}
                    >
                      Accepter
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => handleStatut(cmd._id, "annulé")}
                      disabled={cmd.statut === "annulé"}
                    >
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}