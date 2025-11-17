
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchVisible: boolean;
  setIsSearchVisible: (isVisible: boolean) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  isSearchVisible,
  setIsSearchVisible
}) => {
  return (
    <div className="flex items-center space-x-2 relative h-12">
      {/* Search Bar View */}
      <div
        className={`absolute inset-0 flex items-center transition-all duration-300 ease-in-out ${
          isSearchVisible ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'
        }`}
        aria-hidden={!isSearchVisible}
      >
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search for food, drinks, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-24 rounded-full bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow"
            aria-label="Search menu"
          />
          <button
            onClick={() => {
              setIsSearchVisible(false);
              setSearchQuery('');
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Category Filters View */}
      <div
        className={`absolute inset-0 flex items-center space-x-2 transition-opacity duration-300 ease-in-out ${
          !isSearchVisible ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'
        }`}
        aria-hidden={isSearchVisible}
      >
        <button
          onClick={() => setIsSearchVisible(true)}
          className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
          aria-label="Open search bar"
        >
          <SearchIcon className="w-5 h-5 text-gray-600" />
        </button>
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
    </div>
  );
};
