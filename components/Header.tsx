import React from 'react';
import { BurgerIcon } from './icons/BurgerIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { MessengerIcon } from './icons/MessengerIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LocationIcon } from './icons/LocationIcon';
import { CartIcon } from './icons/CartIcon';
import { UserIcon } from './icons/UserIcon';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  return (
    <header className="relative">
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
        <button 
          onClick={onCartClick}
          className="relative p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
          aria-label={`View cart with ${cartCount} items`}
        >
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
        <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
          <UserIcon />
        </button>
      </div>
      <div className="h-48 md:h-64 overflow-hidden rounded-b-3xl">
        <img
          src="https://picsum.photos/seed/restaurant/1200/400"
          alt="Restaurant banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative px-4 -mt-12 z-10">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-lg border-4 border-white">
             <div className="w-24 h-24 md:w-32 md:h-32 bg-green-500 rounded-full flex items-center justify-center">
                 <BurgerIcon className="w-16 h-16 md:w-20 md:h-20 text-white" />
             </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-14">Gourmet Burger & Grill</h1>
            <div className="flex items-center space-x-2 text-gray-600 mt-1">
              <PhoneIcon className="w-4 h-4" />
              <span>02342334323</span>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <a href="#" className="text-blue-600 hover:text-blue-800"><MessengerIcon className="w-6 h-6" /></a>
              <a href="#" className="text-gray-800 hover:text-black"><TiktokIcon className="w-6 h-6" /></a>
              <a href="#" className="text-blue-700 hover:text-blue-900"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" className="text-red-500 hover:text-red-700"><LocationIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
