import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import Swal from "sweetalert2";

export default function GestionCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FETCH ALL COMMANDES (Admin version)
  const fetchCommandes = async () => {
    try {
      const res = await api.get("/commande/liste");
      setCommandes(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();

    // 🔥 AUTO REFRESH
    const interval = setInterval(fetchCommandes, 5000);
    return () => clearInterval(interval);
  }, []);

  // ➤ UPDATE STATUT
  const handleStatut = async (id, newStatut) => {
    try {
      await api.patch(`/commande/${id}/statut`, {
        statut: newStatut,
      });
      fetchCommandes();
      Swal.fire({
        icon: 'success',
        title: 'Statut mis à jour',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de modifier le statut',
      });
    }
  };

  if (loading) return <div className="p-4 text-gray-600">Chargement des commandes...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <HiOutlineClipboardList className="text-orange-500 text-2xl" />
                 <h1 className="text-xl font-bold text-gray-800">Gestion Globale des Commandes</h1>
            </div>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {commandes.length} Total
            </span>
      </div>

      {commandes.length === 0 ? (
        <div className="p-20 text-center">
            <p className="text-gray-400">Aucune commande enregistrée dans le système</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-400 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Offre</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Restau</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Paiement</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {commandes.map((cmd) => (
                <tr key={cmd._id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400 text-xs">#{cmd._id.slice(-6)}</td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{cmd.offre?.nom || "N/A"}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-gray-700 font-medium">{cmd.client?.nom || "Invité"}</div>
                    <div className="text-gray-400 text-xs italic">{cmd.client?.email || ""}</div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {cmd.restaurant?.nom || "Non spécifié"}
                  </td>

                  <td className="px-6 py-4 font-bold text-gray-700">
                    {cmd.offre?.prix ? `${cmd.offre.prix} DT` : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${cmd.statut === "commandé" ? "bg-green-100 text-green-600" : 
                          cmd.statut === "annulé" ? "bg-red-100 text-red-600" : 
                          "bg-yellow-100 text-yellow-600"}`}>
                      {cmd.statut}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${cmd.statutPaiement === "payé" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                      {cmd.statutPaiement}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                        <button
                          title="Confirmer"
                          className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition-colors shadow-sm"
                          onClick={() => handleStatut(cmd._id, "commandé")}
                        >
                          <FaCheck size={12} />
                        </button>

                        <button
                          title="Annuler"
                          className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors shadow-sm"
                          onClick={() => handleStatut(cmd._id, "annulé")}
                        >
                          <FaTimes size={12} />
                        </button>
                    </div>
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
