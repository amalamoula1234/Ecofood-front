import React, { useEffect, useState } from "react";
import {
  Trash2, Pencil, Plus, X, Check, Settings2, Bell, Tag,
  Image as ImageIcon, Leaf, Clock, ShoppingCart, DollarSign
} from "lucide-react";
import api from "../api/axios";
import Swal from "sweetalert2";

const CATEGORIES = ["Plat Principal", "Entrées", "Desserts", "Boissons", "Salades"];

export default function GestionOffres() {
  const [offres, setOffres] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOffre, setEditingOffre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nom: "", categorie: "", description: "", prix: "", prixAncien: "", image: "", restaurant: ""
  });

  const fetchOffres = async () => {
    try {
      const res = await api.get("/offre/mes-offres");
      setOffres(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurant/mes-restaurants");
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOffres();
    fetchRestaurants();
  }, []);

  const handleOpenForm = (offre = null) => {
    if (offre) {
      setEditingOffre(offre);
      setFormData({
        nom: offre.nom,
        categorie: offre.categorie,
        description: offre.description,
        prix: offre.prix,
        prixAncien: offre.prixAncien || "",
        restaurant: offre.restaurant?._id || offre.restaurant,
      });
    } else {
      setEditingOffre(null);
      setFormData({ nom: "", categorie: "", description: "", prix: "", prixAncien: "", image: "", restaurant: "" });
    }
    setShowForm(true);
  };

  const handleSave = async (e) => {
  e.preventDefault();

  try {
    if (editingOffre) {
      await api.put(`/offre/${editingOffre._id}`, {
        nom: formData.nom,
        categorie: formData.categorie,
        description: formData.description,
        prix: formData.prix,
        prixAncien: formData.prixAncien,
        image: "default.png",
        restaurant: formData.restaurant
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Offre mise à jour',
        showConfirmButton: false,
        timer: 2000
      });

    } else {
      await api.post("/offre/ajouter", {
        nom: formData.nom,
        categorie: formData.categorie,
        description: formData.description,
        prix: formData.prix,
        prixAncien: formData.prixAncien,
        image: "default.png",
        restaurant: formData.restaurant
      });

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Offre créée',
        showConfirmButton: false,
        timer: 2000
      });
    }

    setShowForm(false);
    fetchOffres();

  } catch (err) {
    Swal.fire("Erreur", "Opération échouée", "error");
    console.log(err);
  }
};

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Supprimer cette offre ?',
      text: "Elle ne sera plus visible par les clients.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/offre/${id}`);
        fetchOffres();
        Swal.fire('Supprimé', 'L\'offre a été retirée.', 'success');
      } catch (err) {
        Swal.fire("Erreur", "Suppression échouée", "error");
      }
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-gray-400 font-syne text-xs uppercase tracking-widest">Chargement de vos offres...</div>;

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-gray-900 font-syne tracking-tight">Mes Flash Offers</h1>
          <p className="text-gray-400 text-xs font-medium">Gérez votre inventaire anti-gaspillage.</p>
        </div>

        <button
          onClick={() => handleOpenForm()}
          className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-2xl font-bold text-xs hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-gray-200 active:scale-95"        >
          <Plus size={16} strokeWidth={3} />
          <span>Nouvelle Offre</span>
        </button>
      </div>

      {/* Grid of Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {offres.map((offre) => (
          <div key={offre._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            {/* Image Container */}
            <div className={`relative h-40 w-full bg-gray-50 flex items-center justify-center overflow-hidden`}>
              {offre.image ? (
                <img
                  src={`http://localhost:5000/uploads/${offre.image}`}
                  alt={offre.nom}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <ImageIcon size={32} className="text-gray-200" />
              )}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-800 shadow-sm">
                {offre.categorie}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-orange-500 mb-1.5">
                <Leaf size={10} /> Ecofood Verified
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-1 font-syne group-hover:text-orange-600 transition-colors line-clamp-1">{offre.nom}</h3>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6 h-8">{offre.description}</p>

              <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Prix Flash</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-gray-900 font-syne">{offre.prix} <span className="text-[10px]">TD</span></span>
                    {offre.prixAncien && <span className="text-[10px] text-gray-300 line-through">{offre.prixAncien} TD</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(offre)}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all duration-300"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(offre._id)}
                    className="w-11 h-11 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div
          onClick={() => handleOpenForm()}
          className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 group min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-300 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
            <Plus size={24} strokeWidth={3} />
          </div>
          <p className="mt-3 font-bold text-gray-400 group-hover:text-orange-600 transition-colors uppercase text-[9px] tracking-[0.2em]">Ajouter une offre</p>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <form
            onSubmit={handleSave}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
          >
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900 font-syne">{editingOffre ? "Modifier l'offre" : "Nouvelle Offre"}</h2>
                <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Détails</label>
                  <input
                    required
                    placeholder="Nom de l'offre"
                    className="w-full h-11 bg-gray-50 rounded-xl px-5 text-sm font-medium border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all"
                    value={formData.nom}
                    onChange={e => setFormData({ ...formData, nom: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    required
                    className="h-11 bg-gray-50 rounded-xl px-5 text-sm font-medium border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none"
                    value={formData.categorie}
                    onChange={e => setFormData({ ...formData, categorie: e.target.value })}
                  >
                    <option value="">Catégorie</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    required
                    className="h-11 bg-gray-50 rounded-xl px-5 text-sm font-medium border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none"
                    value={formData.restaurant}
                    onChange={e => setFormData({ ...formData, restaurant: e.target.value })}
                  >
                    <option value="">Mon Restaurant</option>
                    {restaurants.map(r => <option key={r._id} value={r._id}>{r.nom}</option>)}
                  </select>
                </div>

                <textarea
                  required
                  placeholder="Description de l'offre (ingrédients, saveurs...)"
                  className="w-full bg-gray-50 rounded-xl p-5 text-sm font-medium border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all h-24 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1.5 block ml-1">Prix Promo</span>
                    <div className="relative">
                      <input
                        required
                        type="number"
                        placeholder="0.00"
                        className="w-full h-11 bg-gray-50 rounded-xl px-5 text-sm font-bold border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all"
                        value={formData.prix}
                        onChange={e => setFormData({ ...formData, prix: e.target.value })}
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase">TD</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1.5 block ml-1">Prix Initial</span>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full h-11 bg-gray-50 rounded-xl px-5 text-sm font-bold border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all text-gray-400"
                        value={formData.prixAncien}
                        onChange={e => setFormData({ ...formData, prixAncien: e.target.value })}
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 uppercase">TD</span>
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full bg-gray-50 rounded-xl p-3 text-sm border"
                  onChange={(e) =>
                    setFormData({ ...formData, image: "default.png" })
                  }
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full h-12 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all active:scale-95"
                  >
                    {editingOffre ? "Mettre à jour" : "Lancer l'Offre Flash"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}