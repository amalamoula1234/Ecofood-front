import { useState, useEffect, useRef } from "react";
import { Bell, Check, Trash2, X } from "lucide-react";
import api from "../api/axios";

export default function NotificationPanel() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const panelRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const res = await api.get("/notification");
            setNotifications(res.data);
            setUnreadCount(res.data.filter(n => !n.lu).length);
        } catch (err) {
            console.error("Erreur notifications:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = async (id) => {
        try {
            await api.patch(`/notification/${id}/lu`);
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNotif = async (id) => {
        try {
            await api.delete(`/notification/${id}`);
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-orange-500 transition-colors focus:outline-none"
            >
                <Bell size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in zoom-in duration-200">
                    <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {unreadCount} Nouvelles
                            </span>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-10 text-center">
                                <Bell className="mx-auto text-gray-200 mb-2" size={32} />
                                <p className="text-gray-400 text-xs text-balance">Aucune notification pour le moment</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map((n) => (
                                    <div 
                                        key={n._id} 
                                        className={`p-4 hover:bg-gray-50 transition-colors relative group ${!n.lu ? 'bg-orange-50/30' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!n.lu ? 'bg-orange-500' : 'bg-transparent'}`} />
                                            <div className="flex-1">
                                                <p className={`text-xs leading-relaxed ${!n.lu ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                                    {n.message}
                                                </p>
                                                <span className="text-[10px] text-gray-400 mt-1 block uppercase font-semibold">
                                                    {new Date(n.dateEnvoi).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!n.lu && (
                                                <button 
                                                    onClick={() => markAsRead(n._id)}
                                                    className="p-1 text-green-500 hover:bg-green-50 rounded"
                                                    title="Marquer comme lu"
                                                >
                                                    <Check size={14} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => deleteNotif(n._id)}
                                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                                                title="Supprimer"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                            <button className="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-wider">
                                Tout voir
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
