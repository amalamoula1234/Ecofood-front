import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function GestionRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurateurs, setRestaurateurs] = useState([]);
  const [form, setForm] = useState({ nom: "", adresse: "", telephone: "", type_cuisine: "", restaurateur: "", photo: "" });
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetchRestaurants();
    fetchRestaurateurs();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurant/");
      setRestaurants(res.data);
    } catch (err) { 
      console.log(err);
      Swal.fire('Erreur', 'Impossible de charger les restaurants', 'error');
    }
  };

  const fetchRestaurateurs = async () => {
    try {
      const res = await api.get("/user/restaurateur/liste");
      setRestaurateurs(res.data);
    } catch (err) { 
      console.log(err); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/restaurant/${editingId}`, form);
        Swal.fire({
          icon: 'success',
          title: 'Modifié !',
          text: 'Le restaurant a été mis à jour.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await api.post("/restaurant/", form); // fixed endpoint to match standard
        Swal.fire({
          icon: 'success',
          title: 'Ajouté !',
          text: 'Le restaurant a été créé avec succès.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setForm({ nom: "", adresse: "", telephone: "", type_cuisine: "", restaurateur: "", photo: "" });
      setEditingId(null);
      fetchRestaurants();
    } catch (err) { 
      console.log(err);
      Swal.fire('Erreur', 'Une erreur est survenue', 'error');
    }
  };

  const handleEdit = (resto) => {
    setForm({
      nom: resto.nom,
      adresse: resto.adresse,
      telephone: resto.telephone,
      type_cuisine: resto.type_cuisine,
      restaurateur: resto.restaurateur?._id || resto.restaurateur || "",
      photo: resto.photo || "",
    });
    setEditingId(resto._id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleCancel = () => {
    setForm({ nom: "", adresse: "", telephone: "", type_cuisine: "", restaurateur: "", photo: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/restaurant/${id}`);
        fetchRestaurants();
        Swal.fire(
          'Supprimé !',
          'Le restaurant a été supprimé.',
          'success'
        );
      } catch (err) {
        Swal.fire('Erreur', 'Impossible de supprimer le restaurant', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* Formulaire ajout / modification */}
      <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header du formulaire */}
        <div className={`px-6 py-4 border-b border-gray-100 flex items-center gap-3 ${editingId ? "bg-orange-50" : "bg-gray-50"}`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${editingId ? "bg-orange-100" : "bg-white border border-gray-200"}`}>
            {editingId ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 11L2 13H4L11.5 5.5L9.5 3.5L2 11ZM13.2 3.8C13.4 3.6 13.4 3.3 13.2 3.1L11.9 1.8C11.7 1.6 11.4 1.6 11.2 1.8L10.2 2.8L12.2 4.8L13.2 3.8Z" fill="#f97316" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 2V13M2 7.5H13" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <h3 className="text-sm font-semibold text-gray-700">
            {editingId ? "Modifier le restaurant" : "Ajouter un restaurant"}
          </h3>
        </div>

        {/* Champs */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nom</label>
              <input
                type="text"
                placeholder="Nom du restaurant"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                value={form.nom}
                onChange={e => setForm({ ...form, nom: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type de cuisine</label>
              <input
                type="text"
                placeholder="Ex: Tunisienne, Italienne..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                value={form.type_cuisine}
                onChange={e => setForm({ ...form, type_cuisine: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Adresse</label>
              <input
                type="text"
                placeholder="Rue, ville..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                value={form.adresse}
                onChange={e => setForm({ ...form, adresse: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Téléphone</label>
              <input
                type="text"
                placeholder="+216 XX XXX XXX"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                value={form.telephone}
                onChange={e => setForm({ ...form, telephone: e.target.value })}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Restaurateur</label>
              <select
                value={form.restaurateur}
                onChange={e => setForm({ ...form, restaurateur: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value="">-- Sélectionnez un restaurateur --</option>
                {restaurateurs.map(r => (
                  <option key={r._id} value={r._id}>{r.nom}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
            >
              {editingId ? "Enregistrer" : "Ajouter"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Liste des restaurants */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">Liste des restaurants</h3>
        </div>

        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Adresse</th>
              <th className="px-6 py-3">Téléphone</th>
              <th className="px-6 py-3">Type cuisine</th>
              <th className="px-6 py-3">Restaurateur</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {restaurants.map(r => (
              <tr key={r._id} className="hover:bg-orange-50 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-800">{r.nom}</td>
                <td className="px-6 py-3 text-gray-500">{r.adresse}</td>
                <td className="px-6 py-3 text-gray-500">{r.telephone}</td>
                <td className="px-6 py-3">
                  <span className="text-gray-500 text-xs font-medium">
                    {r.type_cuisine}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-600">
                  {r.restaurateur?.nom || r.restaurateur || "—"}
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}