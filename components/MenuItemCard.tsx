
import React from 'react';
import type { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onItemSelect: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onItemSelect }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex group cursor-pointer"
      onClick={() => onItemSelect(item)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onItemSelect(item)}
      aria-label={`View details for ${item.name}`}
    >
        <div className="w-1/3 flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <div>
                <span className="text-xs text-gray-400 font-mono">ID: {item.id}</span>
                <h3 className="text-lg font-bold text-gray-800 mt-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-4 flex-grow">{item.description}</p>
            </div>
            <div className="mt-auto flex justify-between items-end">
                <div className="flex flex-col items-start">
                    <span className="text-xl font-bold text-violet-600">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                </div>
                 <div className="text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
  );
};
