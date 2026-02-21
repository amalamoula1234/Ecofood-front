import React, { useState } from "react";
import pizza from "../../assets/pizza.jpg";
import menu3 from "../../assets/menu3.webp";
import menu4 from "../../assets/menu4.jpg";
import menu6 from "../../assets/menu6.jpg";
import menu0 from "../../assets/menu0.jpg";
import menu00 from "../../assets/menu00.jpg";
import menu11 from "../../assets/menu11.jpg";
import menuu from "../../assets/menuu.jpg";
import menu12 from "../../assets/menu12.jpg";
import brochettes from "../../assets/brochettes.jpg";
import pouletGrille from "../../assets/poulet-grille.jpg";
import ovenSnapper from "../../assets/oven-snapper.jpg";
import hotChocolate from "../../assets/hot-chocolate.jpg";
import greenAppleSoda from "../../assets/green-apple-soda.jpg";
import redVelvet from "../../assets/red-velvet.jpg";
import cremeCaramel from "../../assets/creme-caramel.jpg";
import cocktailDrinks from "../../assets/cocktail-drinks.jpg";
import koftaTunisienne from "../../assets/kofta-tunisienne.jpg";
import Lasagnes from "../../assets/Lasagnes.jpg";


const dishes = [
  // 🔥 GRILLADES
  { id: 5, name: "Oven-Baked Whole Snapper", price: "11.000 DT", tag: "New", image: ovenSnapper, category: "grillades" },
  { id: 6, name: "Poulet Grillé", price: "9.500 DT", tag: "", image: pouletGrille, category: "grillades" },
  { id: 7, name: "Brochettes", price: "7.500 DT", tag: "", image: brochettes, category: "grillades" },

  // 🫕 PLATS CHAUDS
  { id: 8, name: "Couscous Agneau", price: "12.000 DT", tag: "Hot", image: menu12, category: "plats" },
  { id: 9, name: "Pizza", price: "10.000 DT", tag: "", image: pizza, category: "plats" },
{ id: 10, name: "Kofta Tunisienne", price: "7.500 DT", tag: "", image: koftaTunisienne, category: "plats" },
  { id: 11, name: "Lasagnes", price: "8.500 DT", tag: "", image: Lasagnes, category: "plats" },

  // 🥗 SALADES
  { id: 12, name: "Salade Mechouia", price: "3.500 DT", tag: "New", image: menu11, category: "salades" },
  { id: 13, name: "Salade Tunisienne", price: "3.000 DT", tag: "", image: menu6, category: "salades" },
  { id: 14, name: "Salade Ommek Houria", price: "2.500 DT", tag: "", image: menu0, category: "salades" },
  { id: 15, name: "Salade Chakchouka", price: "4.000 DT", tag: "Hot", image: menu00, category: "salades" },

  // 🥤 BOISSONS
  { id: 16, name: "Cocktail & Drink Recipes", price: "1.500 DT", tag: "", image: cocktailDrinks, category: "boissons" },
  { id: 17, name: "Simple Green Apple Soda", price: "2.000 DT", tag: "", image: greenAppleSoda, category: "boissons" },
  { id: 18, name: "French Hot Chocolate", price: "2.500 DT", tag: "New", image: hotChocolate, category: "boissons" },

  // 🍰 DESSERTS
  { id: 19, name: "Red Velvet Strawberry Cheesecake", price: "4.000 DT", tag: "Hot", image: redVelvet, category: "desserts" },
  { id: 20, name: "Tiramisu Cake", price: "2.500 DT", tag: "", image: menuu, category: "desserts" },
  { id: 21, name: "Crème Caramel (Francesa)", price: "2.000 DT", tag: "New", image: cremeCaramel, category: "desserts" },
];

const TABS = [
  { label: "🍽️ Tout", value: "all" },
  { label: "🔥 Grillades", value: "grillades" },
  { label: "🫕 Plats Chauds", value: "plats" },
  { label: "🥗 Salades", value: "salades" },
  { label: "🥤 Boissons", value: "boissons" },
  { label: "🍰 Desserts", value: "desserts" },
];

const MenuCard = ({ name, price, tag, image }) => (
  <div className="rounded-xl shadow-md overflow-hidden bg-gray-50 dark:bg-gray-900 hover:scale-105 transition-transform duration-300">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      {tag && (
        <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full ${tag === "New" ? "bg-green-500" : "bg-orange-500"}`}>
          {tag}
        </span>
      )}
    </div>
    <div className="p-4 text-left">
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-orange-500 font-bold">{price}</p>
      <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition-colors duration-200">
        Commander
      </button>
    </div>
  </div>
);

const Menu = () => {
  const [activeTab, setActiveTab] = useState("all");
  const filteredDishes = activeTab === "all" ? dishes : dishes.filter((d) => d.category === activeTab);

  return (
    <section id="menu" className="bg-white dark:bg-black text-black dark:text-white py-16 px-5 lg:px-14 transition-colors duration-300">
      <div className="text-center mb-10">
        <p className="text-orange-500 font-medium uppercase tracking-wider mb-2">Notre Menu</p>
        <h2 className="text-3xl md:text-4xl font-bold">Nos meilleures suggestions pour vous</h2>
      </div>

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
              activeTab === tab.value
                ? "bg-orange-500 border-orange-500 text-white shadow-md"
                : "border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mb-6">
        {filteredDishes.length} plat{filteredDishes.length > 1 ? "s" : ""} trouvé{filteredDishes.length > 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredDishes.map((dish) => (
          <MenuCard key={dish.id} {...dish} />
        ))}
      </div>
    </section>
  );
};

export default Menu;