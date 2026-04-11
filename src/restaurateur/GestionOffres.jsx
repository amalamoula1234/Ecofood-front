import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus, X, Check, Settings2, Bell, Tag, Image as ImageIcon } from "lucide-react";
import api from "../api/axios";
import Swal from "sweetalert2";

// Toast removed as we use Swal now


function DeleteModal({ offre, onConfirm, onCancel }) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
      <div className="bg-white rounded-xl shadow-2xl p-6 relative mx-4">
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Suppression de l'offre '{offre.nom}'
        </h2>
        <p className="text-orange-500 font-medium text-sm mb-6">
          Êtes-vous sûr de vouloir supprimer cette offre ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["Plat Principal", "Entrées", "Desserts", "Boissons", "Salades"];

const OffreForm = ({ data, setData, onConfirm, onCancel, title, confirmLabel, restaurants }) => (
  <div className="fixed z-50 w-full max-w-2xl" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <div className="bg-white rounded-xl shadow-2xl p-6 relative mx-4 max-h-[90vh] overflow-y-auto">
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
        <h2 className="text-base font-semibold text-gray-800 mb-5">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Nom de l'offre *</label>
            <input
              value={data.nom}
              onChange={e => setData(p => ({ ...p, nom: e.target.value }))}
              placeholder="Ex: Menu Ramadan Spécial"
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-orange-400 outline-none transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Catégorie *</label>
            <select
              value={data.categorie}
              onChange={e => setData(p => ({ ...p, categorie: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-orange-400 outline-none bg-white transition-all shadow-sm"
            >
              <option value="">-- Sélectionner --</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Restaurant *</label>
            <select
              value={data.restaurant}
              onChange={e => setData(p => ({ ...p, restaurant: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-orange-400 outline-none bg-white transition-all shadow-sm"
            >
              <option value="">-- Vos restaurants --</option>
              {restaurants.map(r => <option key={r._id} value={r._id}>{r.nom}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Description *</label>
            <textarea
              value={data.description}
              onChange={e => setData(p => ({ ...p, description: e.target.value }))}
              placeholder="Décrivez l'offre..."
              rows={3}
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-orange-400 outline-none resize-none transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Prix (TD) *</label>
            <input
              type="number"
              value={data.prix}
              onChange={e => setData(p => ({ ...p, prix: e.target.value }))}
              placeholder="0.00"
              className="w-full mt-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-orange-400 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t">
            <button onClick={onCancel} className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <button onClick={onConfirm} className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-sm font-bold shadow-md shadow-orange-100 transition-all">
              <Check size={16} className="inline mr-1" /> {confirmLabel}
            </button>
          </div>
        </div>
      </div>
  </div>
);

const emptyOffre = {
  nom: "", categorie: "", description: "", prix: "", prixAncien: "", image: "", restaurant: ""
};

export default function GestionOffres() {
  const [offres, setOffres] = useState([]);
  const [editingOffre, setEditingOffre] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOffre, setNewOffre] = useState({ ...emptyOffre });
  const [deletingOffre, setDeletingOffre] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.get("/restaurant/mes-restaurants")
      .then(res => setRestaurants(res.data))
      .catch((err) => {
          console.error(err);
          setRestaurants([]);
      });
  }, []);

  const addToast = (message, icon = 'success') => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: icon,
      title: message
    });
  };

  const fetchOffres = async () => {
    try {
      const res = await api.get("/offre/mes-offres");
      setOffres(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchOffres(); }, []);

  const ajouterOffre = async () => {
    if (!newOffre.nom || !newOffre.prix || !newOffre.restaurant) {
        return addToast("Veuillez remplir les champs obligatoires", "warning");
    }
    try {
      await api.post("/offre/ajouter", newOffre);
      fetchOffres();
      setNewOffre({ ...emptyOffre });
      setShowAddForm(false);
      addToast("Offre ajoutée avec succès");
    } catch (err) {
      addToast("Erreur lors de l'ajout", "error");
    }
  };

  const supprimerOffre = async (offre) => {
    const result = await Swal.fire({
      title: 'Supprimer cette offre ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/offre/${offre._id}`);
        fetchOffres();
        addToast("Offre supprimée avec succès");
      } catch (err) {
        addToast("Erreur lors de la suppression", "error");
      }
    }
  };

  const startEdit = (offre) => {
    setEditingOffre(offre);
    setEditData({
      nom: offre.nom,
      categorie: offre.categorie,
      description: offre.description,
      prix: offre.prix,
      restaurant: offre.restaurant._id || offre.restaurant,
    });
  };

  const saveEdit = async () => {
    try {
      await api.put(`/offre/${editingOffre._id}`, editData);
      fetchOffres();
      setEditingOffre(null);
      addToast("Modification enregistrée !");
    } catch (err) {
      addToast("Erreur lors de la modification", "error");
    }
  };

  

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-white px-8 py-5 flex items-center justify-between border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-800">Gestion des Offres</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
            >
              <Plus size={16} /> Ajouter une offre
            </button>
          </div>

          {/* Add Modal */}
          {showAddForm && (
            <>
              <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowAddForm(false)} />
              <OffreForm
                data={newOffre}
                setData={setNewOffre}
                onConfirm={ajouterOffre}
                onCancel={() => setShowAddForm(false)}
                title="Ajouter une offre"
                confirmLabel="Confirmer"
                restaurants={restaurants}
              />
            </>
          )}

          {/* Table */}
          <div className="relative">
            {editingOffre && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setEditingOffre(null)} />
                <OffreForm
                  data={editData}
                  setData={setEditData}
                  onConfirm={saveEdit}
                  onCancel={() => setEditingOffre(null)}
                  title="Modifier l'offre"
                  confirmLabel="Mettre à jour"
                  restaurants={restaurants}
                />
              </>
            )}

            <div className={`overflow-x-auto transition-opacity duration-200 ${deletingOffre || editingOffre ? "opacity-40 pointer-events-none" : ""}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    {["Image", "Nom", "Catégorie", "Restaurant", "Prix"].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">{h}</th>
                    ))}
                    <th className="text-left px-5 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                      <div className="flex items-center gap-2"><Settings2 size={13} /> Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offres.map((offre, i) => {
                    return (
                      <tr key={offre._id} className={`border-b border-gray-50 hover:bg-orange-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        {/* Image */}
                        <td className="px-5 py-3">
                          {offre.image ? (
                            <img
                              src={`http://localhost:5000/uploads/${offre.image}`}
                              alt={offre.nom}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                              <ImageIcon size={18} className="text-gray-300" />
                            </div>
                          )}
                        </td>
                        {/* Nom */}
                        <td className="px-5 py-3 font-medium text-gray-800 max-w-[160px]">
                          <div className="truncate">{offre.nom}</div>
                          {offre.description && (
                            <div className="text-xs text-gray-400 truncate max-w-[140px]">{offre.description}</div>
                          )}
                        </td>
                        {/* Catégorie */}
                        <td className="px-5 py-3">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Tag size={11} className="text-orange-400" />
                            {offre.categorie || "—"}
                          </span>
                        </td>
                        {/* Restaurant */}
                        <td className="px-5 py-3 text-gray-700 font-medium">
                            {offre.restaurant?.nom || "—"}
                        </td>
                        {/* Prix */}
                        <td className="px-5 py-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">{offre.prix} TD</span>
                            {offre.prixAncien && (
                              <span className="text-xs text-gray-400 line-through">{offre.prixAncien} TD</span>
                            )}
                            
                          </div>
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => setEditingOffre(offre)} className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                              <Pencil size={13} />
                            </button>
                            <button onClick={() => supprimerOffre(offre)} className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {offres.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <p>Aucune offre trouvée</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 border-t border-gray-100 text-gray-300 text-xs text-right">
            Données en temps réel · {new Date().toLocaleDateString("fr-FR")}
          </div>
        </div>
      </div>
    </>
  );
}