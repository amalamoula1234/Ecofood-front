import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, color: "bg-blue-600" },
    { icon: <FaTwitter />, color: "bg-sky-400" },
    { icon: <FaInstagram />, color: "bg-gradient-to-r from-pink-500 to-purple-500" },
    { icon: <FaLinkedinIn />, color: "bg-blue-800" },
  ];

  const footerLinks = [
    { title: "Navigation", links: ["Home", "About Us", "Menu", "Contact"] },
  ];

  return (
    <footer className="bg-orange-50 pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 mb-16">

          {/* LOGO + slogan + réseaux sociaux */}
          <div className="flex flex-col gap-5">
            <div className="border-2 border-zinc-300 rounded-2xl px-5 py-2.5 w-fit">
              <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600">
                EcoFood
              </h2>
            </div>
            <p className="text-zinc-600 text-sm italic leading-relaxed">
              Serving happiness since 2020
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${item.color} w-9 h-9 flex items-center justify-center rounded-full text-white hover:opacity-90 transition-transform hover:scale-105 text-lg`}
                  aria-label={`Lien ${item.icon.type?.displayName || "social"}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col gap-5">
              <div className="border-2 border-zinc-300 rounded-2xl px-5 py-2.5 w-fit">
                <h3 className="text-base font-extrabold text-zinc-800">
                  {section.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-zinc-600 text-sm hover:text-orange-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <div className="border-2 border-zinc-300 rounded-2xl px-5 py-2.5 w-fit">
              <h3 className="text-base font-extrabold text-zinc-800">
                Nous Contacter
              </h3>
            </div>
            <ul className="flex flex-col gap-4 text-sm text-zinc-600">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-600 mt-1 text-lg shrink-0" />
                Gabes
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-600 text-lg shrink-0" />
                <span>46 255 143</span> {/* format plus lisible */}
              </li>
              <li className="flex items-center gap-3">
                <FaRegEnvelope className="text-orange-600 text-lg shrink-0" />
                <a
                  href="mailto:contact@ecofood.com"
                  className="hover:text-orange-600 transition-colors"
                >
                  contact@ecofood.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-white rounded-2xl py-10 px-6 md:px-10 shadow-sm border border-zinc-100">
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-800">
              Obtenez <span className="text-orange-600">15%</span> sur votre première commande !
            </h3>
            <form className="flex w-full max-w-xl flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 border-2 border-zinc-200 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400 transition"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:brightness-105 transition whitespace-nowrap"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 pt-6 text-center text-zinc-500 text-sm border-t border-zinc-200">
          © {new Date().getFullYear()} EcoFood. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;