
import React from 'react';
import { MenuItemCard } from './MenuItemCard';
import type { MenuCategory, MenuItem } from '../types';

interface MenuListProps {
  menuCategories: MenuCategory[];
  onItemSelect: (item: MenuItem) => void;
}

export const MenuList: React.FC<MenuListProps> = ({ menuCategories, onItemSelect }) => {
  if (menuCategories.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-xl font-semibold text-gray-900">No items found</h3>
        <p className="mt-1 text-sm text-gray-500">We couldn't find any items matching your search or filter.</p>
        <p className="mt-1 text-sm text-gray-500">Please try a different search term or category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {menuCategories.map((category) => (
        <section key={category.title} id={category.title.toLowerCase().replace(' ', '-')}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-violet-200">{category.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {category.items.map((item) => (
              <MenuItemCard key={item.id} item={item} onItemSelect={onItemSelect} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
