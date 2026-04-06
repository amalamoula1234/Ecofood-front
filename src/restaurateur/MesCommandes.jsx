import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FETCH COMMANDES
  const fetchCommandes = async () => {
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

    // 🔥 AUTO REFRESH (important)
    const interval = setInterval(fetchCommandes, 3000);

    return () => clearInterval(interval);
  }, []);

  // ➤ UPDATE STATUT
  const handleStatut = async (id, newStatut) => {
    try {
      await axios.patch(`http://localhost:5000/api/commande/${id}/statut`, {
        statut: newStatut,
      });
      fetchCommandes();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  if (loading)
    return <div className="p-4 text-gray-600">Chargement...</div>;
  if (error)
    return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <HiOutlineClipboardList className="text-orange-500 text-2xl mr-2 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-orange-600">
          Liste des Commandes
        </h1>
      </div>

      {commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">CMD</th>
                <th className="px-4 py-2">Offre</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Restaurant</th>
                <th className="px-4 py-2">Prix</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Paiement</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {commandes.map((cmd) => (
                <tr key={cmd._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{cmd._id.slice(-6)}</td>

                  <td className="px-4 py-2">
                    {cmd.offre?.nom || "N/A"}
                  </td>

                  <td className="px-4 py-2">
                    {cmd.client?.nom || cmd.client?.email || "Invité"}
                  </td>

                  <td className="px-4 py-2">
                    {cmd.restaurant || "N/A"}
                  </td>

                  <td className="px-4 py-2 font-semibold">
                    {cmd.offre?.prix
                      ? `${cmd.offre.prix} TD`
                      : "N/A"}
                  </td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-white rounded text-xs ${cmd.statut === "commandé"
                          ? "bg-green-500"
                          : cmd.statut === "annulé"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                    >
                      {cmd.statut}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-white rounded text-xs ${cmd.statutPaiement === "payé"
                          ? "bg-green-600"
                          : "bg-red-600"
                        }`}
                    >
                      {cmd.statutPaiement}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    {new Date(cmd.dateCommande).toLocaleString()}
                  </td>

                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleStatut(cmd._id, "commandé")
                      }
                    >
                      <FaCheck />
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleStatut(cmd._id, "annulé")
                      }
                    >
                      <FaTimes />
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