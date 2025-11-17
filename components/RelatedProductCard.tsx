
import React from 'react';
import type { MenuItem } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface RelatedProductCardProps {
    item: MenuItem;
    onAddToCart: (itemName: string) => void;
}

export const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ item, onAddToCart }) => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110" />
            {item.isHot && (
                 <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">HOT</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3 w-full">
                <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                <div className="flex justify-between items-center mt-1">
                    <div className="text-white font-bold text-md">
                        ${item.price.toFixed(2)}
                        {item.originalPrice && (
                            <span className="text-gray-300 line-through text-xs ml-1">${item.originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item.name);
                }}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full text-violet-600 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-white"
                aria-label={`Add ${item.name} to cart`}
            >
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>
    );
};
