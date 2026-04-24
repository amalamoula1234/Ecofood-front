import React from 'react'
import hero from "../../assets/hero.jpg";

const Hero = () => {
    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>

            {/* BACKGROUND IMAGE */}
            <div className='absolute inset-0 z-0'>
                <img
                    src={hero}
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
              

            </div>

        </section>
    )
}

export default Hero