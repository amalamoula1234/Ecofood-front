import api from "../api/axios";

// Lister TOUTES les commandes (Admin)
export const getCommandes = async () => {
  const res = await api.get("/commande/liste");
  return res.data;
};

// Lister MES commandes (Restaurateur)
export const getMesCommandes = async () => {
  const res = await api.get("/commande/mes-commandes");
  return res.data;
};

// Ajouter une commande
export const addCommande = async (data) => {
  const res = await api.post("/commande", data);
  return res.data;
};

// Mettre à jour le statut
export const updateStatut = async (id, statut) => {
  const res = await api.patch(`/commande/${id}/statut`, { statut });
  return res.data;
};

// Mettre à jour le statut paiement
export const updateStatutPaiement = async (id, statutPaiement) => {
  const res = await api.patch(`/commande/${id}/paiement`, { statutPaiement });
  return res.data;
};

// Supprimer une commande
export const deleteCommande = async (id) => {
  const res = await api.delete(`/commande/${id}`);
  return res.data;
};