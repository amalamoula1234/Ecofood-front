import axios from "axios";

export const getCommandes = () => {
  return axios.get("http://localhost:5000/api/commande");
};