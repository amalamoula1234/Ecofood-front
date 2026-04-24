import React from "react";

import img1 from "../../assets/process1.png";
import img2 from "../../assets/process2.png";
import img3 from "../../assets/process3.png";
import aboutus from "../../assets/aboutus.jpg";

const steps = [
  {
    img: img1,
    title: "Commande facile",
    desc: "Quelques étapes suffisent pour commander.",
  },
  {
    img: img2,
    title: "Livraison ultra-rapide",
    desc: "Une livraison toujours à l'heure, voire plus rapide encore.",
  },
  {
    img: img3,
    title: "Qualité optimale",
    desc: "La rapidité est notre priorité, mais la qualité l'est tout autant.",
  },
];

const Process = ({ img, title, desc }) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-900 hover:scale-105 transition-transform duration-300">
      <img
        src={img}
        alt={title}
        className="w-24 h-24 object-contain mb-4"
      />
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {desc}
      </p>
    </div>
  );
};

const About = () => {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-5 lg:px-14 transition-colors duration-300">
      
      {/* 🌱 Présentation plateforme */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={aboutus}
            alt="Présentation EcoFood"
            className="w-80 md:w-96 rounded-2xl shadow-lg"
          />
        </div>

        {/* Texte */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            À propos de{" "}
            <span className="text-green-600">
              Eco
            </span>
            <span className="text-orange-500">
              Food
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            <span className="font-semibold text-green-600">EcoFood</span> est votre application préférée pour découvrir des plats délicieux 
            tout en respectant l'environnement. Nous croyons à une alimentation saine et durable.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Notre mission est de réduire le gaspillage alimentaire tout en offrant
            une expérience gastronomique unique. Grâce à{" "}
            <span className="font-semibold text-orange-500">EcoFood</span>, chaque repas devient
            un moment inoubliable.
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Rejoignez-nous dans cette aventure et découvrez comment allier goût,
            qualité et respect de la planète.
          </p>
        </div>
      </div>

      {/* 🔥 Comment ça marche */}
      <div className="text-center mb-12">
        <p className="text-orange-500 font-medium uppercase tracking-wider mb-2">
          Nos Services
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Comment ça marche ?
        </h2>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {steps.map((step, index) => (
          <Process key={index} {...step} />
        ))}
      </div>

    </section>
  );
};

export default About;
