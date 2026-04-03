import axios from "axios";

const BASE_URL = "http://localhost:5000/api/commande";

// Lister toutes les commandes
export const getCommandes = async () => {
  const res = await axios.get(`${BASE_URL}/liste`);
  return res.data;
};

// Ajouter une commande
export const addCommande = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

// Mettre à jour le statut
export const updateStatut = async (id, statut) => {
  const res = await axios.patch(`${BASE_URL}/${id}/statut`, { statut });
  return res.data;
};

// Mettre à jour le statut paiement
export const updateStatutPaiement = async (id, statutPaiement) => {
  const res = await axios.patch(`${BASE_URL}/${id}/paiement`, { statutPaiement });
  return res.data;
};

// Supprimer une commande
export const deleteCommande = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};