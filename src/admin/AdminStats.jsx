import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line 
} from "recharts";
import { Users, Store, ShoppingBag, CreditCard, TrendingUp, Package } from "lucide-react";

export default function AdminStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/stats/admin");
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-10 text-center animate-pulse text-gray-400">Calcul des statistiques...</div>;
    if (!stats) return <div className="p-10 text-center text-red-500">Erreur lors du chargement des données.</div>;

    const COLORS = ["#f97316", "#3b82f6", "#ef4444", "#10b981"];

    const orderData = [
        { name: "Confirmées", value: stats.orders.commandé, color: "#10b981" },
        { name: "En attente", value: stats.orders.en_attente, color: "#f97316" },
        { name: "Annulées", value: stats.orders.annulé, color: "#ef4444" },
    ];

    const userData = [
        { name: "Clients", value: stats.users.client },
        { name: "Restaurateurs", value: stats.users.restaurateur },
        { name: "Admins", value: stats.users.admin },
    ];

    return (
        <div className="flex flex-col gap-8">
            
            {/* Header / Welcome */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord Global</h1>
                <p className="text-gray-500 text-sm">Voici un aperçu de l'activité de votre plateforme Ecofood.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Revenu Total" 
                    value={`${stats.totalRevenue.toLocaleString()} DT`} 
                    icon={<CreditCard className="text-blue-600" />} 
                    trend="+12%" 
                    bgColor="bg-blue-50"
                />
                <StatCard 
                    title="Commandes" 
                    value={stats.orders.total} 
                    icon={<ShoppingBag className="text-orange-600" />} 
                    trend="+18%" 
                    bgColor="bg-orange-50"
                />
                <StatCard 
                    title="Restaurants" 
                    value={stats.restaurants} 
                    icon={<Store className="text-purple-600" />} 
                    trend="+2" 
                    bgColor="bg-purple-50"
                />
                <StatCard 
                    title="Utilisateurs" 
                    value={stats.users.total} 
                    icon={<Users className="text-green-600" />} 
                    trend="+5" 
                    bgColor="bg-green-50"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Monthly Revenue Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp size={20} className="text-orange-500" />
                            Évolution des Revenus (DT)
                        </h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#f97316" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} 
                                    activeDot={{ r: 6, strokeWidth: 0 }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Distribution Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Package size={20} className="text-orange-500" />
                            Répartition des Commandes
                        </h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Users Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Users size={20} className="text-orange-500" />
                            Répartition des Utilisateurs par Rôle
                        </h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" axisLine={false} tickLine={false} hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 'bold'}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#f97316" radius={[0, 10, 10, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, bgColor }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgColor}`}>
                    {React.cloneElement(icon, { size: 22 })}
                </div>
                {trend && (
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                        {trend}
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</span>
                <span className="text-2xl font-black text-gray-800">{value}</span>
            </div>
        </div>
    );
}
