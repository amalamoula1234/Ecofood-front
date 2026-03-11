import React from 'react'
import font from "../../assets/font.webp";
import Button from '../Button/Button'

const Hero = () => {
    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>

            {/* BACKGROUND IMAGE */}
            <div className='absolute inset-0 z-0'>
                <img
                    src={font}
                    alt="Hero Background"
                    className='w-full h-full object-cover object-center'
                />
                {/* El Gradient tawa walla yghatti el tsawira el lkoul (overlay) bech el text yji dhoher fil wast */}
                <div className='absolute inset-0 bg-black/50'></div>
            </div>

            {/* HERO CONTENT - MODIFIÉ POUR ÊTRE AU CENTRE */}
            <div className='relative z-10 px-6 max-w-3xl flex flex-col items-center text-center gap-6'>

                <p className='text-orange-400 uppercase tracking-[0.4em] text-xs font-semibold'>
                    Qualité supérieure
                </p>

                {/* TA PHRASE : Centrée */}
                <h1
                    className="text-2xl md:text-4xl font-extralight leading-tight text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Nous croyons qu'une bonne cuisine{" "}
                    <span className="text-orange-400 font-medium italic">
                        est synonyme de satisfaction.
                    </span>
                    <br />
                    Offrez-vous{" "}
                    <span className="text-orange-400 font-medium italic">
                        un sourire.
                    </span>
                </h1>
                {/* TEXTE S8IR W RGIG - Centré */}
                <p className='text-gray-300 text-sm md:text-base font-light max-w-md leading-relaxed tracking-wide opacity-90'>
                    Découvrez des produits frais d'exception, préparés avec amour et servis avec passion pour vous faire sourire.                </p>

                <div className='mt-4'>
                    <Button content="Shop Now" />
                </div>

            </div>

        </section>
    )
}

export default Hero