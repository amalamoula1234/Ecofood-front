import { useState } from "react";
import GestionOffres from "./GestionOffres";
import {
  LayoutDashboard,
  Tag,
  ShoppingBag,
  LogOut,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import { PiForkKnifeFill } from "react-icons/pi";

const restaurateur = { email: "amal@gmail.com", nom: "Amal Ben Ali", isOnline: true };

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Offres", icon: Tag, id: "offres" },
  { label: "Commandes", icon: ShoppingBag, id: "commandes" },
];

export default function DashboardRestaurateur() {

  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const initial = restaurateur.email.charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }

        .content::-webkit-scrollbar { width: 5px; }
        .content::-webkit-scrollbar-thumb {
          background: #DEDBD7;
          border-radius: 10px;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden font-dm" style={{ background: "#F7F5F2" }}>

        {/* SIDEBAR */}
        <aside
          className={`${sidebarOpen ? "w-64" : "w-20"
            } flex-shrink-0 flex flex-col bg-white transition-all duration-300`}
          style={{ borderRight: "1px solid #EDEBE8" }}
        >

          {/* LOGO */}
          <div className="px-5 pt-7 pb-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>

            <div className="flex items-center justify-between">

              {sidebarOpen && (
                <Link
                  to="/"
                  className="flex items-center text-3xl font-bold"
                  style={{ color: "#1A1A2E", textDecoration: "none" }}
                >
                  Ec
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-b from-orange-400 to-orange-600 text-white rounded-full text-2xl mx-1 shadow-md shadow-orange-300">
                    <PiForkKnifeFill />
                  </span>
                  Food
                </Link>
              )}

              {/* BUTTON TOGGLE */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>

            </div>

            {sidebarOpen && (
              <div
                className="mt-2 text-xs font-medium tracking-widest uppercase"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Espace restaurateur
              </div>
            )}
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-3 py-5 flex flex-col gap-1">

            {sidebarOpen && (
              <div
                className="px-3 pt-3 pb-1 text-xs font-semibold tracking-widest uppercase"
                style={{ color: "rgba(0,0,0,0.25)" }}
              >
                Navigation
              </div>
            )}

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border-none cursor-pointer text-left transition-all duration-200 font-dm text-sm"
                style={{
                  background: activeItem === item.id ? "rgba(255,107,53,0.1)" : "transparent",
                  color: activeItem === item.id ? "#FF6B35" : "rgba(0,0,0,0.55)",
                  fontWeight: activeItem === item.id ? 500 : 400,
                  justifyContent: sidebarOpen ? "flex-start" : "center"
                }}
              >
                <item.icon size={18} strokeWidth={2} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}

          </nav>

          {/* FOOTER */}
          <div className="px-3 pb-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>

            <button
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border-none cursor-pointer transition-all duration-200 font-dm text-sm"
              style={{
                background: "transparent",
                color: "rgba(200,50,50,0.7)",
                justifyContent: sidebarOpen ? "flex-start" : "center"
              }}
            >
              <LogOut size={18} strokeWidth={2} />
              {sidebarOpen && <span>Déconnexion</span>}
            </button>

          </div>

        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* CONTENT */}
          <main className="content flex-1 overflow-y-auto p-8">

            {/* DASHBOARD */}
            {activeItem === "dashboard" && (
              <div className="bg-white rounded-2xl p-7" style={{ border: "1.5px solid #EDEBE8" }}>
                <h2 className="font-syne font-bold text-base mb-2">
                  Tableau de bord
                </h2>

                <p className="text-sm text-gray-400">
                  Bienvenue dans votre espace restaurateur.
                </p>
              </div>
            )}

            {/* OFFRES */}
            {activeItem === "offres" && (
              <GestionOffres />
            )}

            {/* COMMANDES */}
            {activeItem === "commandes" && (
              <div className="bg-white rounded-2xl p-7" style={{ border: "1.5px solid #EDEBE8" }}>
                <h2 className="font-syne font-bold text-base mb-2">
                  Gestion des commandes
                </h2>

                <p className="text-sm text-gray-400">
                  Liste des commandes à venir...
                </p>
              </div>
            )}

          </main>

        </div>

      </div>
    </>
  );
}