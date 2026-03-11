import { useState } from "react";
import {
    LayoutDashboard, Tag, ShoppingBag, Store, LogOut,
    ChevronDown, TrendingUp, Users, Star, Clock,
} 
from "lucide-react";
import { Link } from "react-router-dom";
import { PiForkKnifeFill } from "react-icons/pi";

const restaurateur = { email: "amal@gmail.com", nom: "Amal Ben Ali", isOnline: true };

const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { label: "Offres", icon: Tag, id: "offres" },
    { label: "Commandes", icon: ShoppingBag, id: "commandes" },
    { label: "Restaurant", icon: Store, id: "restaurant" },
];

const stats = [
    { label: "Revenus du mois", value: "12 430 DT", change: "+8.2%", icon: TrendingUp, color: "#FF6B35" },
    { label: "Clients servis", value: "1 284", change: "+5.1%", icon: Users, color: "#2EC4B6" },
    { label: "Note moyenne", value: "4.8 / 5", change: "+0.3", icon: Star, color: "#FFB703" },
    { label: "Temps moyen", value: "18 min", change: "-2 min", icon: Clock, color: "#9B5DE5" },
];

const sectionTitle = {
    dashboard: "Tableau de bord", offres: "Gestion des offres",
    commandes: "Commandes en cours", restaurant: "Paramètres du restaurant",
};

export default function DashboardRestaurateur() {
    const [activeItem, setActiveItem] = useState("dashboard");
    const [profileOpen, setProfileOpen] = useState(false);
    const initial = restaurateur.email.charAt(0).toUpperCase();

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
        .content::-webkit-scrollbar { width: 5px; }
        .content::-webkit-scrollbar-thumb { background: #DEDBD7; border-radius: 10px; }
      `}</style>

            <div className="flex h-screen overflow-hidden font-dm" style={{ background: "#F7F5F2" }}>

                {/* SIDEBAR */}
                <aside className="w-64 flex-shrink-0 flex flex-col bg-white" style={{ borderRight: "1px solid #EDEBE8" }}>

                    {/* Logo */}
                    <div className="px-7 pt-7 pb-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                        <Link to="/" className="flex items-center text-3xl font-bold" style={{ color: "#1A1A2E", textDecoration: "none" }}>
                            Ec
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-b from-orange-400 to-orange-600 text-white rounded-full text-2xl mx-1 shadow-md shadow-orange-300">
                                <PiForkKnifeFill />
                            </span>
                            Food
                        </Link>
                        <div className="mt-1.5 text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
                            Espace restaurateur
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3.5 py-5 flex flex-col gap-1">
                        <div className="px-3.5 pt-3 pb-1.5 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.25)" }}>
                            Navigation
                        </div>
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveItem(item.id)}
                                className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl border-none cursor-pointer text-left transition-all duration-200 font-dm text-sm"
                                style={{
                                    background: activeItem === item.id ? "rgba(255,107,53,0.1)" : "transparent",
                                    color: activeItem === item.id ? "#FF6B35" : "rgba(0,0,0,0.55)",
                                    fontWeight: activeItem === item.id ? 500 : 400,
                                }}
                                onMouseEnter={e => { if (activeItem !== item.id) { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "rgba(0,0,0,0.85)"; } }}
                                onMouseLeave={e => { if (activeItem !== item.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(0,0,0,0.55)"; } }}
                            >
                                <item.icon size={18} strokeWidth={2} style={{ opacity: activeItem === item.id ? 1 : 0.45 }} />
                                <span>{item.label}</span>
                                {activeItem === item.id && <span className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: "#FF6B35" }} />}
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="px-3.5 pb-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                        <button
                            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl border-none cursor-pointer transition-all duration-200 font-dm text-sm"
                            style={{ background: "transparent", color: "rgba(200,50,50,0.7)" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,80,80,0.08)"; e.currentTarget.style.color = "#cc3333"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(200,50,50,0.7)"; }}
                        >
                            <LogOut size={18} strokeWidth={2} />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </aside>

                {/* MAIN */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* TOPBAR */}
                    <header className="flex items-center justify-between px-8 flex-shrink-0 bg-white" style={{ height: 68, borderBottom: "1px solid #EDEBE8" }}>
                        <span className="font-syne font-bold text-base tracking-tight" style={{ color: "#1A1A2E" }}>{sectionTitle[activeItem]}</span>
                        <div
                            className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full cursor-pointer bg-white transition-all duration-200"
                            style={{ border: "1.5px solid #EDEBE8" }}
                            onClick={() => setProfileOpen(!profileOpen)}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.background = "#FFF9F7"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDEBE8"; e.currentTarget.style.background = "#fff"; }}
                        >
                            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative" style={{ background: "linear-gradient(135deg,#FF6B35,#FF9F1C)" }}>
                                <span className="font-syne font-bold text-sm text-white">{initial}</span>
                                {restaurateur.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full" style={{ background: "#22C55E", border: "2px solid #fff" }} />}
                            </div>
                            <div>
                                <div className="text-xs font-medium leading-tight" style={{ color: "#1A1A2E" }}>{restaurateur.nom}</div>
                                <div className="text-xs" style={{ color: "#9CA3AF" }}>{restaurateur.email}</div>
                            </div>
                            <ChevronDown size={16} style={{ color: "#9CA3AF", transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                        </div>
                    </header>

                    {/* HERO */}
                    <div className="bg-white flex-shrink-0 px-8 py-7" style={{ borderBottom: "1px solid #EDEBE8" }}>
                        <h1 className="font-syne font-extrabold text-2xl" style={{ color: "#1A1A2E", letterSpacing: "-0.8px" }}>
                            Bonjour, <strong style={{ color: "#FF6B35" }}>{restaurateur.nom.split(" ")[0]}</strong> 👋
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Voici un aperçu de votre activité aujourd'hui.</p>
                    </div>

                    {/* CONTENT */}
                    <main className="content flex-1 overflow-y-auto p-8">
                        {activeItem === "dashboard" && (
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className="bg-white rounded-2xl p-5 cursor-default transition-all duration-200"
                                        style={{ border: "1.5px solid #EDEBE8" }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,53,0.08)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDEBE8"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                                    >
                                        <div className="flex items-center justify-between mb-3.5">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                                                <s.icon size={20} color={s.color} strokeWidth={2} />
                                            </div>
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#F0FDF4", color: "#16A34A" }}>{s.change}</span>
                                        </div>
                                        <div className="font-syne font-bold text-2xl" style={{ color: "#1A1A2E", letterSpacing: "-0.5px" }}>{s.value}</div>
                                        <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="bg-white rounded-2xl p-7" style={{ border: "1.5px solid #EDEBE8" }}>
                            <div className="h-0.5 rounded-sm mb-5" style={{ width: 48, background: "linear-gradient(90deg,#FF6B35,#FF9F1C,#FFB703)" }} />
                            <h2 className="font-syne font-bold text-base mb-2" style={{ color: "#1A1A2E" }}>{sectionTitle[activeItem]}</h2>
                            <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>Contenu à venir selon la section sélectionnée…</p>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}