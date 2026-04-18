import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line 
} from "recharts";
import { Store, ShoppingBag, CreditCard, TrendingUp, Package, Clock } from "lucide-react";

export default function RestaurateurStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/stats/restaurateur");
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-10 text-center animate-pulse text-gray-400 font-syne uppercase tracking-widest text-xs">Analyse de vos performances...</div>;
    if (!stats) return <div className="p-10 text-center text-red-500">Impossible de charger vos statistiques.</div>;

    const orderData = [
        { name: "Livrées", value: stats.orders.commandé, color: "#10b981" },
        { name: "En attente", value: stats.orders.en_attente, color: "#f59e0b" },
        { name: "Annulées", value: stats.orders.annulé, color: "#ef4444" },
    ];

    return (
        <div className="flex flex-col gap-10 animate-in fade-in duration-500">
            
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-gray-900 font-syne tracking-tight">Vue d'ensemble</h1>
                <p className="text-gray-400 text-sm font-medium">Suivez la croissance et les commandes de vos restaurants.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Ventes Totales" 
                    value={`${stats.totalRevenue.toLocaleString()} TD`} 
                    icon={<CreditCard className="text-orange-600" />} 
                    sub="Revenu global généré"
                    bgColor="bg-orange-50"
                />
                <StatCard 
                    title="Commandes" 
                    value={stats.orders.total} 
                    icon={<ShoppingBag className="text-blue-600" />} 
                    sub="Volume total reçu"
                    bgColor="bg-blue-50"
                />
                <StatCard 
                    title="Mes Restaurants" 
                    value={stats.restaurants} 
                    icon={<Store className="text-emerald-600" />} 
                    sub="Établissements actifs"
                    bgColor="bg-emerald-50"
                />
                <StatCard 
                    title="Offres en ligne" 
                    value={stats.offers} 
                    icon={<Package className="text-purple-600" />} 
                    sub="Total Flash Offers"
                    bgColor="bg-purple-50"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                
                {/* Monthly Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative group overflow-hidden">
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg font-syne">Évolution du Chiffre d'Affaire</h3>
                            <p className="text-xs text-gray-400 mt-1">Historique des 6 derniers mois</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-orange-50 text-orange-500">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    
                    <div className="h-72 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.monthlyRevenue}>
                                <defs>
                                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} 
                                    dy={15} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 11}} 
                                    tickFormatter={(val) => `${val} TD`}
                                />
                                <Tooltip 
                                    cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '5 5' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#f97316" 
                                    strokeWidth={4} 
                                    dot={{ r: 5, fill: '#f97316', strokeWidth: 3, stroke: '#fff' }} 
                                    activeDot={{ r: 8, strokeWidth: 0 }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Distribution Pie Chart */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="font-bold text-gray-800 text-lg font-syne">États des Commandes</h3>
                        <div className="p-3 rounded-2xl bg-blue-50 text-blue-500">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="h-60 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    cornerRadius={10}
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        {orderData.map(item => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, icon, sub, bgColor }) {
    return (
        <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-default">
            <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(icon, { size: 24, strokeWidth: 2 })}
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{title}</span>
                <span className="text-3xl font-black text-gray-900 font-syne tracking-tight mb-1">{value}</span>
                <span className="text-xs text-gray-300">{sub}</span>
            </div>
        </div>
    );
}
