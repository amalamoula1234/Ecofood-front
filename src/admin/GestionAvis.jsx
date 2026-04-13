import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import { Check, X, Star, MessageSquare, Trash2, ShieldCheck, Clock } from "lucide-react";

export default function GestionAvis() {
    const [avis, setAvis] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAvis = async () => {
        try {
            const res = await api.get("/avis/admin/tous");
            setAvis(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Erreur chargement avis:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvis();
    }, []);

    const modifierStatut = async (id, nouveauStatut) => {
        try {
            await api.patch(`/avis/admin/${id}/statut`, { statut: nouveauStatut });
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: `Avis ${nouveauStatut === 'confirmé' ? 'approuvé' : 'rejeté'}`,
                showConfirmButton: false,
                timer: 2000
            });
            fetchAvis();
        } catch (err) {
            Swal.fire("Erreur", "Action non effectuée", "error");
        }
    };

    const supprimerAvis = async (id) => {
        const result = await Swal.fire({
            title: 'Supprimer définitivement ?',
            text: "Cette action ne peut pas être annulée.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/avis/admin/${id}`);
                Swal.fire('Supprimé', 'L\'avis a été retiré de la base.', 'success');
                fetchAvis();
            } catch (err) {
                Swal.fire("Erreur", "Suppression échouée", "error");
            }
        }
    };

    if (loading) return <div className="p-10 text-center">Chargement des avis...</div>;

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmé': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejeté': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmé': return <ShieldCheck size={14} />;
            case 'rejeté': return <X size={14} />;
            default: return <Clock size={14} />;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare size={20} className="text-orange-500" />
                    Modération des Avis Clients
                </h2>
                <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    {avis.length} Avis au total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white border-b border-gray-100">
                            <th className="px-6 py-4 text-left text-gray-400 font-bold uppercase text-[10px] tracking-widest">Client</th>
                            <th className="px-6 py-4 text-left text-gray-400 font-bold uppercase text-[10px] tracking-widest">Restaurant</th>
                            <th className="px-6 py-4 text-left text-gray-400 font-bold uppercase text-[10px] tracking-widest">Avis</th>
                            <th className="px-6 py-4 text-left text-gray-400 font-bold uppercase text-[10px] tracking-widest">Statut</th>
                            <th className="px-6 py-4 text-right text-gray-400 font-bold uppercase text-[10px] tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {avis.map((a) => (
                            <tr key={a._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800">{a.user?.nom} {a.user?.prenom}</span>
                                        <span className="text-[10px] text-gray-400">{a.user?.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">
                                    {a.restaurant?.nom}
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <div className="flex items-center gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < a.note ? "gold" : "none"} stroke={i < a.note ? "gold" : "#ccc"} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-xs italic">"{a.commentaire}"</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(a.statut)}`}>
                                        {getStatusIcon(a.statut)}
                                        {a.statut.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {a.statut !== 'confirmé' && (
                                            <button 
                                                onClick={() => modifierStatut(a._id, 'confirmé')}
                                                className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Approuver"
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}
                                        {a.statut !== 'rejeté' && (
                                            <button 
                                                onClick={() => modifierStatut(a._id, 'rejeté')}
                                                className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                                                title="Rejeter"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => supprimerAvis(a._id)}
                                            className="p-2 bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-white rounded-xl transition-all"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {avis.length === 0 && (
                    <div className="py-20 text-center text-gray-400 italic">
                        Aucun avis n'a encore été déposé.
                    </div>
                )}
            </div>
        </div>
    );
}
