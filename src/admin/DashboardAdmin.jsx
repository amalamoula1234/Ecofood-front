import { useState } from "react";
import GestionUsers from "./GestionUsers";
import GestionRestaurants from "./GestionRestaurants";
import GestionCommandes from "./GestionCommandes";
import GestionAvis from "./GestionAvis";
import NotificationPanel from "../components/NotificationPanel";
import { PiForkKnifeFill } from "react-icons/pi";
import Swal from 'sweetalert2';

const icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    ),
    artisans: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    logout: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
    orders: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14h6" /><path d="M9 18h6" /><path d="M9 10h6" />
        </svg>
    ),
    avis: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    ),
};

const navMain = [
    { label: "Dashboard", icon: icons.dashboard },
    { label: "Utilisateurs", icon: icons.users },
    { label: "Restaurants", icon: icons.artisans },
    { label: "Commandes", icon: icons.orders },
    { label: "Avis", icon: icons.avis },
];

export default function DashboardAdmin() {
    const [activeNav, setActiveNav] = useState("Dashboard");
    const [showMenu, setShowMenu] = useState(false);

    // user depuis localStorage

    const user = JSON.parse(localStorage.getItem("user")) || { nom: "Admin", email: "admin@gmail.com" };

    // حرف أول من email للـ avatar
    const avatarLetter = user.email.charAt(0).toUpperCase();

    // logout
    const handleLogout = () => {
        localStorage.clear();        // يمسح كل شي: token + user
        window.location.href = "/login";  // يرجع لصفحة Login
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden font-sans">

            {/* ===== TOPBAR ===== */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">

                {/* Logo */}
                <div className="flex items-center text-xl font-bold text-gray-800">
                    Ec
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-b from-orange-400 to-orange-600 text-white rounded-full text-lg mx-1 shadow-md shadow-orange-300">
                        <PiForkKnifeFill />
                    </span>
                    Food
                </div>

                {/* Left Side: Right actions */}
                <div className="flex items-center gap-4">
                    <NotificationPanel />
                    
                    {/* Avatar + dropdown */}
                    <div className="relative">
                    <div
                        className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer select-none"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        {avatarLetter}
                    </div>
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>

                    {/* Menu dropdown */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden z-50">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.nom}</div>
                            <button
                                onClick={() => Swal.fire('En développement', 'Cette page Profil est en cours de création', 'info')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Profil</button>
                            <button
                                onClick={() => Swal.fire('En développement', 'Les Paramètres bientôt disponibles', 'info')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Paramètres</button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500">Déconnexion</button>
                        </div>
                    )}
                </div>
            </div>
        </header>

            {/* ===== BODY ===== */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR */}
                <aside className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 py-6 px-3">
                    <div className="flex flex-col gap-1 flex-1 pt-2">
                        {navMain.map(item => {
                            const isActive = activeNav === item.label;
                            return (
                                <div
                                    key={item.label}
                                    onClick={() => setActiveNav(item.label)}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 select-none
                                        ${isActive
                                            ? "bg-orange-500 text-white shadow-md"
                                            : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto p-10 flex flex-col gap-7">
                    {activeNav === "Dashboard" && <div className="text-gray-700 text-xl">Bienvenue, {user.nom}!</div>}
                    {activeNav === "Utilisateurs" && <GestionUsers />}
                    {activeNav === "Restaurants" && <GestionRestaurants />}
                    {activeNav === "Commandes" && <GestionCommandes />}
                    {activeNav === "Avis" && <GestionAvis />}
                             </main>

            </div>
        </div>
    );
}