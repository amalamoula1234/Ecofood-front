import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";


const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState(null);
    const [offres, setOffres] = useState([]);

    useEffect(() => {

        // charger restaurant
        axios.get(`http://localhost:5000/api/restaurant/${id}`)
            .then(res => setRestaurant(res.data))
            .catch(err => console.log(err));

        // charger offres du restaurant
        axios.get(`http://localhost:5000/api/offre/restaurant/${id}`)
            .then(res => setOffres(res.data))
            .catch(err => console.log(err));

    }, [id]);

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

            </div>
        </div>
    );
};

export default RestaurantDetail;