import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { ChefHat, Star, MessageCircle, Send, User } from "lucide-react";
import Swal from "sweetalert2";


const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState(null);
    const [offres, setOffres] = useState([]);
    const [avis, setAvis] = useState([]);
    const [note, setNote] = useState(5);
    const [commentaire, setCommentaire] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const userLoggedIn = !!localStorage.getItem("token");

    // charger données
    const loadData = async () => {
        try {
            const resRest = await api.get(`/restaurant/${id}`);
            setRestaurant(resRest.data);

            const resOffres = await api.get(`/offre/restaurant/${id}`);
            setOffres(resOffres.data);

            const resAvis = await api.get(`/avis/restaurant/${id}`);
            setAvis(resAvis.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleSubmitAvis = async (e) => {
        e.preventDefault();
        if (!commentaire.trim()) return;

        setSubmitting(true);
        try {
            await api.post("/avis", {
                restaurant: id,
                note,
                commentaire
            });
            Swal.fire({
                icon: 'success',
                title: 'Merci!',
                text: 'Votre avis a été envoyé et sera visible après validation par un administrateur.',
                confirmButtonColor: '#f97316'
            });
            setCommentaire("");
            setNote(5);
        } catch (err) {
            Swal.fire("Erreur", "Impossible d'envoyer l'avis", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (!restaurant) {
        return <p className="text-center mt-20 text-gray-400">Chargement...</p>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* BANNER */}
            <div className="relative h-80 w-full">

                {restaurant.photo ? (
                    <img
                        src={`http://localhost:5000/uploads/${restaurant.photo}`}
                        alt={restaurant.nom}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-orange-200 flex items-center justify-center text-6xl">
                        🍽️
                    </div>
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-white text-5xl font-bold drop-shadow-lg">
                        {restaurant.nom}
                    </h1>
                </div>

            </div>

            {/* DETAILS RESTAURANT */}
            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="bg-white rounded-2xl shadow-md p-6 mb-12">

                    <h2 className="text-2xl font-bold mb-4 text-orange-500">
                        Informations du restaurant
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 text-gray-700">

                        <div>
                            <p className="font-semibold">📍 Adresse</p>
                            <p>{restaurant.adresse}</p>
                        </div>

                        <div>
                            <p className="font-semibold">📞 Téléphone</p>
                            <p>{restaurant.telephone}</p>
                        </div>

                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                <ChefHat size={18} className="text-orange-500" /> Type cuisine
                            </p>
                            <p>{restaurant.type_cuisine}</p>
                        </div>

                    </div>

                </div>

                {/* LISTE OFFRES */}
                <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">
                    Offres du restaurant
                </h2>

                {offres.length === 0 ? (
                    <p className="text-center text-gray-400">
                        Aucune offre disponible
                    </p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">

                        {offres.map((offre) => (
                            <div
                                key={offre._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                            >

                                {/* image offre */}
                                {offre.image ? (
                                    <img
                                        src={`http://localhost:5000/uploads/${offre.image}`}
                                        alt={offre.nom}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="h-48 bg-orange-100 flex items-center justify-center text-4xl">
                                        🍔
                                    </div>
                                )}

                                <div className="p-5 flex flex-col flex-1">

                                    <h3 className="text-lg font-bold mb-2">
                                        {offre.nom}
                                    </h3>

                                    <span className="inline-block bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">

                                        {offre.categorie}
                                    </span>


                                    <button
                                        onClick={() => navigate(`/offre/${offre._id}`)}
                                        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                                    >
                                        Voir offre
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

                {/* SECTION AVIS */}
                <div className="mt-20 pt-10 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row gap-12">
                        
                        {/* FORMULAIRE */}
                        <div className="md:w-1/3">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <MessageCircle size={22} className="text-orange-500" />
                                Donnez votre avis
                            </h3>
                            {userLoggedIn ? (
                                <form onSubmit={handleSubmitAvis} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNote(star)}
                                                    className={`transition-all hover:scale-120 ${note >= star ? 'text-orange-400' : 'text-gray-200'}`}
                                                >
                                                    <Star size={24} fill={note >= star ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                                        <textarea
                                            value={commentaire}
                                            onChange={(e) => setCommentaire(e.target.value)}
                                            rows="4"
                                            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all"
                                            placeholder="Comment était votre expérience ?"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        <Send size={18} />
                                        {submitting ? "Envoi..." : "Publier l'avis"}
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
                                    <p className="text-sm text-orange-800 font-medium mb-4">Connectez-vous pour laisser un avis sur ce restaurant.</p>
                                    <button 
                                        onClick={() => navigate("/login")}
                                        className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-sm"
                                    >
                                        Se connecter
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* LISTE AVIS */}
                        <div className="md:w-2/3">
                            <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Star size={22} className="text-orange-500" />
                                    Avis des clients
                                </span>
                                <span className="text-sm font-normal text-gray-400">{avis.length} avis confirmés</span>
                            </h3>

                            {avis.length === 0 ? (
                                <div className="bg-gray-50 rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
                                    <User size={30} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-gray-400 italic">Soyez le premier à donner votre avis !</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {avis.map((a) => (
                                        <div key={a._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                                                        {a.user?.prenom?.charAt(0) || "C"}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{a.user?.prenom} {a.user?.nom}</p>
                                                        <p className="text-[10px] text-gray-400">{new Date(a.date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 text-orange-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < a.note ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed italic">
                                                "{a.commentaire}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;