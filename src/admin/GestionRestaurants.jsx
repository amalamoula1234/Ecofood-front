import { useEffect, useState } from "react";
import axios from "axios";

export default function GestionRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurateurs, setRestaurateurs] = useState([]);
  const [form, setForm] = useState({ nom: "", adresse: "", telephone: "", type_cuisine: "", restaurateur: "", photo: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRestaurants();
    fetchRestaurateurs();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurant/");
      setRestaurants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRestaurateurs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/restaurateur/liste"); // ton endpoint pour les restaurateurs
      setRestaurateurs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/restaurant/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/restaurant/ajouter", form);
      }
      setForm({ nom: "", adresse: "", telephone: "", type_cuisine: "", restaurateur: "", photo: "" });
      setEditingId(null);
      fetchRestaurants();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (resto) => {
    setForm({
      nom: resto.nom,
      adresse: resto.adresse,
      telephone: resto.telephone,
      type_cuisine: resto.type_cuisine,
      restaurateur: resto.restaurateur._id || resto.restaurateur || "-", // si objet ou id
      photo: resto.photo || "",
    });
    setEditingId(resto._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce restaurant ?")) {
      await axios.delete(`http://localhost:5000/api/restaurant/${id}`);
      fetchRestaurants();
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire ajout / modification */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-bold">{editingId ? "Modifier" : "Ajouter"} un restaurant</h3>
        <input type="text" placeholder="Nom" className="input" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
        <input type="text" placeholder="Adresse" className="input" value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} />
        <input type="text" placeholder="Téléphone" className="input" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
        <input type="text" placeholder="Type cuisine" className="input" value={form.type_cuisine} onChange={e => setForm({ ...form, type_cuisine: e.target.value })} />

        {/* Select restaurateur */}
        <select
          value={form.restaurateur}
          onChange={e => setForm({ ...form, restaurateur: e.target.value })}
          className="input"
        >
          <option value="">-- Sélectionnez un restaurateur --</option>
          {restaurateurs.map(r => (
            <option key={r._id} value={r._id}>{r.nom}</option>
          ))}
        </select>

        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg">
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* Liste des restaurants */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Liste des restaurants</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3">Nom</th>
              <th className="py-2 px-3">Adresse</th>
              <th className="py-2 px-3">Téléphone</th>
              <th className="py-2 px-3">Type cuisine</th>
              <th className="py-2 px-3">Restaurateur</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{r.nom}</td>
                <td className="py-2 px-3">{r.adresse}</td>
                <td className="py-2 px-3">{r.telephone}</td>
                <td className="py-2 px-3">{r.type_cuisine}</td>
                <td className="py-2 px-3">
                  {r.restaurateur?.nom || r.restaurateur || "—"}
                </td>
                <td className="py-2 px-3 space-x-2">
                  <button onClick={() => handleEdit(r)} className="text-blue-500">Modifier</button>
                  <button onClick={() => handleDelete(r._id)} className="text-red-500">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}