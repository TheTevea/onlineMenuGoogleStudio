
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center space-x-2">
       <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
            <SearchIcon className="w-5 h-5 text-gray-600" />
       </div>
      {/* Fix: Corrected CSS property name from '-ms-overflow-style' to its camelCase equivalent 'msOverflowStyle' for React inline styles. */}
      <div className="flex-grow overflow-x-auto whitespace-nowrap py-2 space-x-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`inline-block px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-violet-100 hover:text-violet-700 shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
