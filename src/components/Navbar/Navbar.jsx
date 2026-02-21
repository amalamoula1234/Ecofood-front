import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { IoCart, IoSearch } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { TbMenu2, TbMenu3 } from "react-icons/tb";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isLoggedIn = false;

  return (
    <header className='bg-white shadow-sm fixed top-0 left-0 right-0 z-50'>
      <nav className='max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex justify-between items-center'>

        {/* LOGO */}
        <Link to="/" className='flex items-center text-3xl font-bold'>
          Ec
          <span className='inline-flex items-center justify-center w-10 h-10 bg-gradient-to-b from-orange-400 to-orange-600 text-white rounded-full text-2xl mx-1 shadow-md shadow-orange-300'>
            <PiForkKnifeFill />
          </span>
          Food
        </Link>

        {/* MENU Desktop */}
        <ul className='hidden md:flex items-center gap-x-10 lg:gap-x-12'>
          <li>
            <Link to="/" className='font-bold tracking-wider text-zinc-800 hover:text-orange-500 transition-colors'>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className='font-bold tracking-wider text-zinc-800 hover:text-orange-500 transition-colors'>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/menu" className='font-bold tracking-wider text-zinc-800 hover:text-orange-500 transition-colors'>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/contact" className='font-bold tracking-wider text-zinc-800 hover:text-orange-500 transition-colors'>
              Contact
            </Link>
          </li>
        </ul>

        {/* NAV ACTION */}
        <div className='flex items-center gap-x-5 md:gap-x-7'>

          {/* INPUT FIELD (desktop) */}
          <div className='hidden md:flex items-center border-2 border-orange-500 rounded-full overflow-hidden'>
            <input
              type="text"
              placeholder='Search....'
              autoComplete='off'
              className='w-48 lg:w-64 px-4 py-2 focus:outline-none text-sm'
            />
            <button className='bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 flex items-center justify-center'>
              <IoSearch className="text-xl" />
            </button>
          </div>

          {/* LIEN CONNEXION / COMPTE */}
          {isLoggedIn ? (
            <Link to="/profile" className='flex items-center gap-2 text-zinc-800 hover:text-orange-500 transition-colors'>
              <FaUser className="text-xl" />
            </Link>
          ) : (
            <Link to="/login" className='flex items-center gap-2 text-zinc-800 hover:text-orange-500 transition-colors'>
              <FaUser className="text-xl" />
            </Link>
          )}

          {/* PANIER */}
          <Link to="/cart" className='text-zinc-800 hover:text-orange-500 text-2xl transition-colors'>
            <IoCart />
          </Link>

          {/* HAMBURGER MOBILE */}
          <button
            className='md:hidden text-3xl text-zinc-800 cursor-pointer focus:outline-none'
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {showMenu ? <TbMenu3 /> : <TbMenu2 />}
          </button>
        </div>

      </nav>

      {/* MOBILE MENU  */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out z-40 overflow-hidden ${
          showMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-y-6 py-8 px-6">
          <li>
            <Link to="/" onClick={toggleMenu} className='font-bold text-lg text-zinc-800 hover:text-orange-500 transition-colors'>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu} className='font-bold text-lg text-zinc-800 hover:text-orange-500 transition-colors'>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={toggleMenu} className='font-bold text-lg text-zinc-800 hover:text-orange-500 transition-colors'>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu} className='font-bold text-lg text-zinc-800 hover:text-orange-500 transition-colors'>
              Contact
            </Link>
          </li>

         
          
          {/* Search mobile */}
          <li className='w-full max-w-xs'>
            <div className='flex border-2 border-orange-500 rounded-full overflow-hidden'>
              <input
                type="text"
                placeholder='Search....'
                className='flex-1 px-4 py-3 focus:outline-none bg-transparent'
              />
              <button className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 flex items-center'>
                <IoSearch className="text-xl" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;