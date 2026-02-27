import axios from "axios";

export const getOffres = () => {
  return axios.get("http://localhost:5000/api/offre");
};