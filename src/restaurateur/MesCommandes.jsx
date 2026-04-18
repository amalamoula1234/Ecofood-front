import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Check, X, ClipboardList, User, Store, Calendar, CreditCard, Tag, Search, Filter, Package } from "lucide-react";
import Swal from "sweetalert2";

export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("tous");

  const fetchCommandes = async () => {
    try {
      const res = await api.get("/commande/mes-commandes");
      setCommandes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
    const interval = setInterval(fetchCommandes, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatut = async (id, newStatut) => {
    try {
      await api.patch(`/commande/${id}/statut`, { statut: newStatut });
      fetchCommandes();
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Commande ${newStatut === 'commandé' ? 'confirmée' : 'annulée'}`,
        showConfirmButton: false,
        timer: 2000
      });
    } catch (err) {
      Swal.fire("Erreur", "Mise à jour échouée", "error");
    }
  };

  const filteredCommandes = commandes.filter(cmd => filter === "tous" || cmd.statut === filter);

  if (loading) return <div className="p-10 text-center animate-pulse text-gray-400 font-syne text-xs uppercase tracking-widest">Chargement des commandes...</div>;

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-gray-900 font-syne tracking-tight text-center md:text-left">Gestion des Commandes</h1>
          <p className="text-gray-400 text-xs font-medium text-center md:text-left">Gérez vos flux de commandes en temps réel.</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            {["tous", "en_attente", "commandé", "annulé"].map(s => (
                <button 
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter transition-all ${filter === s ? "bg-orange-500 text-white shadow-md shadow-orange-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
                >
                    {s.replace('_', ' ')}
                </button>
            ))}
        </div>
      </div>

      {commandes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
            <ClipboardList size={32} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium text-sm">Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
           {/* Table Header (Desktop Only) */}
           <div className="hidden md:grid grid-cols-6 px-8 py-4 bg-gray-900/5 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <div className="col-span-2">Détails de l'Offre</div>
                <div>Client</div>
                <div>Total</div>
                <div>Statut</div>
                <div className="text-right">Actions</div>
           </div>

           {/* List */}
           {filteredCommandes.map((cmd) => (
             <div key={cmd._id} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:grid md:grid-cols-6 items-center gap-4 group hover:border-orange-200 transition-all duration-300">
                
                {/* Offre Details */}
                <div className="col-span-2 flex items-center gap-4 w-full">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 overflow-hidden flex-shrink-0">
                        {cmd.offre?.image ? (
                             <img src={`http://localhost:5000/uploads/${cmd.offre.image}`} className="w-full h-full object-cover" alt="" />
                        ) : <Package />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-bold tracking-tighter mb-0.5">#{cmd._id.slice(-6).toUpperCase()}</span>
                        <span className="font-bold text-gray-900 line-clamp-1">{cmd.offre?.nom || "Offre supprimée"}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                            <Store size={10} /> {cmd.restaurant?.nom || (cmd.restaurant && cmd.restaurant.nom) || "N/A"}
                        </span>
                    </div>
                </div>

                {/* Client info */}
                <div className="w-full flex md:flex-col items-center md:items-start justify-between md:justify-center">
                    <span className="md:hidden text-xs text-gray-300 font-bold uppercase tracking-widest">Client</span>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-[9px] font-bold">
                            {cmd.client?.nom?.charAt(0) || "U"}
                        </div>
                        <span className="text-xs font-bold text-gray-700">{cmd.client?.nom || "Utilisateur"}</span>
                    </div>
                </div>

                {/* Total */}
                <div className="w-full flex md:flex-col items-center md:items-start justify-between md:justify-center">
                    <span className="md:hidden text-xs text-gray-300 font-bold uppercase tracking-widest">Prix</span>
                    <span className="text-base font-black text-gray-900 font-syne">{cmd.total} <span className="text-[9px] font-bold text-gray-400">TD</span></span>
                </div>

                {/* Statut */}
                <div className="w-full flex md:flex-col items-center md:items-start justify-between md:justify-center">
                    <span className="md:hidden text-xs text-gray-300 font-bold uppercase tracking-widest">Statut</span>
                    <StatusBadge status={cmd.statut} />
                </div>

                {/* Actions */}
                <div className="w-full flex justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50 border-dashed">
                    {cmd.statut === "en_attente" && (
                        <>
                            <button 
                                onClick={() => handleStatut(cmd._id, "commandé")}
                                className="flex-1 md:flex-none h-11 w-11 flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all duration-300 shadow-sm shadow-emerald-50"
                                title="Confirmer la commande"
                            >
                                <Check size={20} strokeWidth={2.5} />
                            </button>
                            <button 
                                onClick={() => handleStatut(cmd._id, "annulé")}
                                className="flex-1 md:flex-none h-11 w-11 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all duration-300 shadow-sm shadow-red-50"
                                title="Annuler la commande"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </>
                    )}
                    {cmd.statut !== "en_attente" && (
                        <div className="h-11 px-3 flex items-center justify-center bg-gray-50 text-gray-300 rounded-xl text-[9px] font-black uppercase tracking-widest">
                            Traité
                        </div>
                    )}
                </div>

             </div>
           ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
    const styles = {
        en_attente: "bg-orange-50 text-orange-600 border-orange-100",
        commandé: "bg-emerald-50 text-emerald-600 border-emerald-100",
        annulé: "bg-red-50 text-red-600 border-red-100"
    };

    return (
        <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
}