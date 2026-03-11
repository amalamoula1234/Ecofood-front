import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";


const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [categorieActive, setCategorieActive] = useState("Tout");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/restaurant/")
            .then(res => setRestaurants(res.data))
            .catch(err => console.log("Erreur chargement restaurants:", err));
    }, []);

    const categories = ["Tout", ...new Set(restaurants.map(r => r.type_cuisine).filter(Boolean))];

    const restaurantsFiltres = categorieActive === "Tout"
        ? restaurants
        : restaurants.filter(r => r.type_cuisine === categorieActive);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">

            {/* TITRE */}
            <h2 className="text-center text-5xl font-extrabold text-orange-500 mb-10 tracking-tight drop-shadow-sm">
                Nos Restaurants
            </h2>

            {/* CATEGORIES */}
            {restaurants.length > 0 && (
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategorieActive(cat)}
                            className={`px-6 py-4 rounded-2xl font-bold text-sm shadow transition-all duration-200 active:scale-95
                ${categorieActive === cat
                                    ? "bg-orange-500 text-white shadow-orange-300 shadow-md scale-105"
                                    : "bg-white text-zinc-700 hover:bg-orange-50 hover:text-orange-500 border border-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {restaurants.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">Aucun restaurant disponible</p>
            ) : restaurantsFiltres.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">Aucun restaurant dans cette catégorie</p>
            ) : (
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restaurantsFiltres.map((restaurant) => (
                        <div
                            key={restaurant._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                        >

                            {/* Image */}
                            {restaurant.photo ? (
                                <img
                                    src={`http://localhost:5000/uploads/${restaurant.photo}`}
                                    alt={restaurant.nom}
                                    className="w-full h-52 object-cover"
                                />
                            ) : (
                                <div className="w-full h-52 bg-orange-100 flex items-center justify-center">
                                    <span className="text-orange-300 text-5xl">🍽️</span>
                                </div>
                            )}

                            {/* Contenu */}
                            <div className="p-5 flex flex-col flex-1">

                                {/* Nom */}
                                <h3 className="text-xl font-bold text-zinc-800 mb-1">
                                    {restaurant.nom}
                                </h3>

                                {/* Adresse */}
                                <p className="text-gray-500 text-sm mb-2">
                                    {restaurant.adresse}
                                </p>

                                {/* Type cuisine */}
                                <span className="inline-block bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                                    {restaurant.type_cuisine}
                                </span>

                                {/* Bouton */}
                                <button
                                    onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                                    className="mt-auto w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-300 flex items-center justify-center gap-2"
                                >
                                    <FaStore /> Voir restaurant
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Restaurant;