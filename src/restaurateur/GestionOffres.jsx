import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus, X, Check, Settings2, Bell, Tag, Clock, Calendar, Image } from "lucide-react";

function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border-l-4 border-orange-500 shadow-xl rounded-xl p-4 w-80 animate-slideIn"
        >
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Bell size={18} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Notification</p>
              <p className="text-xs text-gray-500 mt-1">{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
              <X size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

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

const CATEGORIES = ["Plat Principal", "Entrées", "Desserts", "Boissons", "Salades",];

function OffreForm({ data, setData, onConfirm, onCancel, title, confirmLabel }) {
  return (
    <div className="fixed z-50 w-full max-w-2xl" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <div className="bg-white rounded-xl shadow-2xl p-6 relative mx-4 max-h-[90vh] overflow-y-auto">
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
        <h2 className="text-base font-semibold text-gray-800 mb-5">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Nom */}
          <div className="col-span-2">
            <label className="text-xs text-gray-500">Nom de l'offre *</label>
            <input
              value={data.nom}
              onChange={e => setData(p => ({ ...p, nom: e.target.value }))}
              placeholder="Ex: Menu Ramadan Spécial"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="text-xs text-gray-500">Catégorie *</label>
            <select
              value={data.categorie}
              onChange={e => setData(p => ({ ...p, categorie: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none bg-white"
            >
              <option value="">-- Sélectionner --</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Restaurant */}
          <div>
            <label className="text-xs text-gray-500">Restaurant *</label>
            <input
              value={data.restaurant}
              onChange={e => setData(p => ({ ...p, restaurant: e.target.value }))}
              placeholder="Nom du restaurant"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-xs text-gray-500">Description</label>
            <textarea
              value={data.description}
              onChange={e => setData(p => ({ ...p, description: e.target.value }))}
              placeholder="Décrivez l'offre..."
              rows={3}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none resize-none"
            />
          </div>

          {/* Prix */}
          <div>
            <label className="text-xs text-gray-500">Prix (TD) *</label>
            <input
              type="number"
              value={data.prix}
              onChange={e => setData(p => ({ ...p, prix: e.target.value }))}
              placeholder="0.00"
              min="0"
              step="0.1"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>

          {/* Prix Ancien */}
          <div>
            <label className="text-xs text-gray-500">Ancien Prix (TD)</label>
            <input
              type="number"
              value={data.prixAncien}
              onChange={e => setData(p => ({ ...p, prixAncien: e.target.value }))}
              placeholder="0.00"
              min="0"
              step="0.1"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>

          {/* Durée Heures */}
          <div>
            <label className="text-xs text-gray-500">Durée (heures)</label>
            <input
              type="number"
              value={data.dureeHeures}
              onChange={e => setData(p => ({ ...p, dureeHeures: e.target.value }))}
              placeholder="Ex: 2"
              min="0"
              step="0.5"
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>

          {/* Date Début */}
          <div>
            <label className="text-xs text-gray-500">Date de début</label>
            <input
              type="date"
              value={data.dateDebut}
              onChange={e => setData(p => ({ ...p, dateDebut: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>

          {/* Disponibilité */}
          <div>
            <label className="text-xs text-gray-500">Disponibilité</label>
            <select
              value={data.disponibilite}
              onChange={e => setData(p => ({ ...p, disponibilite: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none bg-white"
            >
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
              <option value="limité">Limité</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="text-xs text-gray-500">Image du produit</label>

            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  // Créer URL temporaire pour preview
                  setData(p => ({ ...p, imageFile: file, imagePreview: URL.createObjectURL(file) }));
                }
              }}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />

            {/* Preview de l'image */}
            {data.imagePreview && (
              <div className="mt-2">
                <img
                  src={data.imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button onClick={onCancel} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <button onClick={onConfirm} className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors">
              <Check size={15} className="inline mr-1" /> {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const emptyOffre = {
  nom: "", categorie: "", description: "", prix: "", prixAncien: "",
  dureeHeures: "", dateDebut: "", disponibilite: "disponible", image: "", restaurant: ""
};

const disponibiliteStyle = {
  disponible: "bg-green-100 text-green-600",
  indisponible: "bg-red-100 text-red-600",
};

export default function GestionOffres() {
  const [offres, setOffres] = useState([]);
  const [editingOffre, setEditingOffre] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOffre, setNewOffre] = useState({ ...emptyOffre });
  const [deletingOffre, setDeletingOffre] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => removeToast(id), 4000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const fetchOffres = async () => {
    const res = await fetch("http://localhost:5000/api/offre/liste");
    const data = await res.json();
    setOffres(data);
  };

  useEffect(() => { fetchOffres(); }, []);

  const ajouterOffre = async () => {
    if (!newOffre.nom || !newOffre.prix || !newOffre.restaurant) return;
    await fetch("http://localhost:5000/api/offre/ajouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOffre),
    });
    fetchOffres();
    setNewOffre({ ...emptyOffre });
    setShowAddForm(false);
    addToast("Offre ajoutée avec succès");
  };

  const supprimerOffre = async () => {
    const offre = deletingOffre;
    await fetch(`http://localhost:5000/api/offre/${offre._id}`, { method: "DELETE" });
    fetchOffres();
    setDeletingOffre(null);
    addToast("Suppression effectuée avec succès");
  };

  const startEdit = (offre) => {
    setEditingOffre(offre);
    setEditData({
      nom: offre.nom, categorie: offre.categorie, description: offre.description,
      prix: offre.prix, prixAncien: offre.prixAncien || "", dureeHeures: offre.dureeHeures || "",
      dateDebut: offre.dateDebut ? offre.dateDebut.slice(0, 10) : "",
      disponibilite: offre.disponibilite, image: offre.image || "", restaurant: offre.restaurant
    });
  };

  const saveEdit = async () => {
    await fetch(`http://localhost:5000/api/offre/${editingOffre._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    fetchOffres();
    setEditingOffre(null);
    addToast("Modification enregistrée avec succès");
  };

  const discountPercent = (prix, prixAncien) => {
    if (!prixAncien || prixAncien <= prix) return null;
    return Math.round((1 - prix / prixAncien) * 100);
  };

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">

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
              />
            </>
          )}

          {/* Table */}
          <div className="relative">
            {deletingOffre && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40" />
                <DeleteModal offre={deletingOffre} onConfirm={supprimerOffre} onCancel={() => setDeletingOffre(null)} />
              </>
            )}
            {editingOffre && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setEditingOffre(null)} />
                <OffreForm
                  data={editData}
                  setData={setEditData}
                  onConfirm={saveEdit}
                  onCancel={() => setEditingOffre(null)}
                  title="Modifier l'offre"
                  confirmLabel="Valider"
                />
              </>
            )}

            <div className={`overflow-x-auto transition-opacity duration-200 ${deletingOffre || editingOffre ? "opacity-40 pointer-events-none" : ""}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    {["Image", "Nom", "Catégorie", "Restaurant", "Prix", "Durée", "Date début", "Disponibilité"].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">{h}</th>
                    ))}
                    <th className="text-left px-5 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                      <div className="flex items-center gap-2"><Settings2 size={13} /> Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offres.map((offre, i) => {
                    const discount = discountPercent(offre.prix, offre.prixAncien);
                    return (
                      <tr key={offre._id} className={`border-b border-gray-50 hover:bg-orange-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        {/* Image */}
                        <td className="px-5 py-3">
                          {offre.image ? (
                            <img
                              src={`http://localhost:5000/uploads/${offre.image}`}
                              alt={offre.nom}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Image size={18} className="text-gray-300" />
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
                        <td className="px-5 py-3 text-gray-600">{offre.restaurant || "—"}</td>
                        {/* Prix */}
                        <td className="px-5 py-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">{offre.prix} TND</span>
                            {offre.prixAncien && (
                              <span className="text-xs text-gray-400 line-through">{offre.prixAncien} TND</span>
                            )}
                            {discount && (
                              <span className="text-xs font-bold text-green-600">-{discount}%</span>
                            )}
                          </div>
                        </td>
                        {/* Durée */}
                        <td className="px-5 py-3 text-gray-500">
                          {offre.dureeHeures ? (
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-orange-400" />
                              {offre.dureeHeures}h
                            </span>
                          ) : "—"}
                        </td>
                        {/* Date début */}
                        <td className="px-5 py-3 text-gray-500">
                          {offre.dateDebut ? (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-orange-400" />
                              {new Date(offre.dateDebut).toLocaleDateString("fr-FR")}
                            </span>
                          ) : "—"}
                        </td>
                        {/* Disponibilité */}
                        <td className="px-5 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${disponibiliteStyle[offre.disponibilite] || "bg-gray-100 text-gray-500"}`}>
                            {offre.disponibilite || "—"}
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(offre)} className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                              <Pencil size={13} /> Modifier
                            </button>
                            <button onClick={() => setDeletingOffre(offre)} className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                              <Trash2 size={13} /> Supprimer
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