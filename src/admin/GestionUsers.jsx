import { useEffect, useState } from "react";
import { Trash2, Pencil, UserPlus, X, Check, Settings2, Bell } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

function DeleteModal({ user, onConfirm, onCancel }) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
      <div className="bg-white rounded-xl shadow-2xl p-6 relative mx-4">
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Suppression de l'utilisateur '{user.nom} {user.prenom}'
        </h2>
        <p className="text-orange-500 font-medium text-sm mb-6">
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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

function EditModal({ editData, setEditData, onConfirm, onCancel }) {
  return (
    <div className="fixed z-50 w-full max-w-md" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>      <div className="bg-white rounded-xl shadow-2xl p-6 relative mx-4">
      <button onClick={onCancel} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        <X size={16} />
      </button>
      <h2 className="text-base font-semibold text-gray-800 mb-5">Modifier l'utilisateur</h2>
      <div className="flex flex-col gap-4">
        {["nom", "prenom", "email", "telephone"].map((field) => (
          <div key={field}>
            <label className="text-xs text-gray-500 capitalize">{field}</label>
            <input
              value={editData[field]}
              onChange={(e) => setEditData(prev => ({ ...prev, [field]: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
            />
          </div>
        ))}
        <div>
          <label className="text-xs text-gray-500 capitalize">Role</label>
          <select
            value={editData.role}
            onChange={(e) => setEditData(prev => ({ ...prev, role: e.target.value }))}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none bg-white"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
            <option value="restaurateur">Restaurateur</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <button onClick={onCancel} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button onClick={onConfirm} className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors">
            Valider
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default function GestionUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ nom: "", prenom: "", email: "", mdp: "", telephone: "", role: "client" });
  const [deletingUser, setDeletingUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => removeToast(id), 4000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/user/liste");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const ajouterUser = async () => {
    if (!newUser.nom || !newUser.email || !newUser.mdp) return;
    await fetch("http://localhost:5000/api/user/ajouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    fetchUsers();
    setNewUser({ nom: "", prenom: "", email: "", mdp: "", telephone: "", role: "client" });
    setShowAddForm(false);
    addToast("Utilisateur ajouté avec succès");
  };

  const supprimerUser = async () => {
    const user = deletingUser;
    await fetch(`http://localhost:5000/api/user/${user._id}`, { method: "DELETE" });
    fetchUsers();
    setDeletingUser(null);
    addToast("Suppression effectuée avec succès");
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setEditData({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, role: user.role });
  };

  const saveEdit = async () => {
    await fetch(`http://localhost:5000/api/user/${editingUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    fetchUsers();
    setEditingUser(null);
    addToast("Modification enregistrée avec succès");
  };

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-white px-8 py-5 flex items-center justify-between border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
            >
              <UserPlus size={16} /> Ajouter
            </button>
          </div>

          {/* Backdrop */}
          {showAddForm && (
            <>
              <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowAddForm(false)} />
              <div className="fixed z-50 w-full max-w-md" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="bg-white rounded-xl shadow-2xl p-6 relative">
                  <button onClick={() => setShowAddForm(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                  <h2 className="text-base font-semibold text-gray-800 mb-5">Ajouter un utilisateur</h2>
                  <div className="flex flex-col gap-4">
                    {[
                      { field: "nom", placeholder: "Nom", type: "text" },
                      { field: "prenom", placeholder: "Prénom", type: "text" },
                      { field: "email", placeholder: "Email", type: "email" },
                      { field: "telephone", placeholder: "Téléphone", type: "text" },
                      { field: "mdp", placeholder: "Mot de passe", type: "password" },
                    ].map(({ field, placeholder, type }) => (
                      <div key={field}>
                        <label className="text-xs text-gray-500 capitalize">{placeholder}</label>
                        {field === "mdp" ? (
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Mot de passe"
                              value={newUser.mdp}
                              onChange={e => setNewUser(p => ({ ...p, mdp: e.target.value }))}
                              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none pr-10"
                            />
                            <span
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute top-[10px] right-3 text-gray-400 cursor-pointer"
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        ) : (
                          <input
                            type={type}
                            placeholder={placeholder}
                            value={newUser[field]}
                            onChange={e => setNewUser(p => ({ ...p, [field]: e.target.value }))}
                            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
                          />
                        )}
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-gray-500">Role</label>
                      <select
                        value={newUser.role}
                        onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}
                        className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none bg-white"
                      >
                        <option value="client">Client</option>
                        <option value="admin">Admin</option>
                        <option value="restaurateur">Restaurateur</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                      <button onClick={() => setShowAddForm(false)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                        Annuler
                      </button>
                      <button onClick={ajouterUser} className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors">
                        <Check size={15} className="inline mr-1" /> Confirmer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Table */}
          <div className="relative">
            {deletingUser && <DeleteModal user={deletingUser} onConfirm={supprimerUser} onCancel={() => setDeletingUser(null)} />}
            {editingUser && <EditModal editData={editData} setEditData={setEditData} onConfirm={saveEdit} onCancel={() => setEditingUser(null)} />}

            <div className={`overflow-x-auto transition-opacity duration-200 ${deletingUser || editingUser ? "opacity-40 pointer-events-none" : ""}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    {["Nom", "Prénom", "Email", "Téléphone", "Role"].map(h => (
                      <th key={h} className="text-left px-8 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">{h}</th>
                    ))}
                    <th className="text-left px-8 py-4 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                      <div className="flex items-center gap-2"><Settings2 size={13} /> Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user._id} className={`border-b border-gray-50 hover:bg-orange-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-8 py-4 font-medium text-gray-800">{user.nom}</td>
                      <td className="px-8 py-4 text-gray-600">{user.prenom}</td>
                      <td className="px-8 py-4 text-gray-500">{user.email}</td>
                      <td className="px-8 py-4 text-gray-500">{user.telephone || "—"}</td>
                      <td className="px-8 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "admin" ? "bg-red-100 text-red-600" :
                          user.role === "restaurateur" ? "bg-blue-100 text-blue-600" :
                            "bg-green-100 text-green-600"
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(user)} className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                            <Pencil size={13} /> Modifier
                          </button>
                          <button onClick={() => setDeletingUser(user)} className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                            <Trash2 size={13} /> Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <p>Aucun utilisateur trouvé</p>
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