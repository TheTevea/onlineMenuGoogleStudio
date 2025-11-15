
import React from 'react';
import { MenuItemCard } from './MenuItemCard';
import type { MenuCategory, MenuItem } from '../types';

interface MenuListProps {
  menuCategories: MenuCategory[];
  onItemSelect: (item: MenuItem) => void;
}

export const MenuList: React.FC<MenuListProps> = ({ menuCategories, onItemSelect }) => {
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
