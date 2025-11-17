
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryFilters } from './components/CategoryFilters';
import { MenuList } from './components/MenuList';
import { ProductDetail } from './components/ProductDetail';
import { menuData, filterCategories } from './constants';
import type { MenuCategory, MenuItem } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(filterCategories[0]);
  const [cartCount, setCartCount] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const filteredMenu = useMemo<MenuCategory[]>(() => {
    // Search takes precedence
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.trim().toLowerCase();
      return menuData
        .map(category => {
          const filteredItems = category.items.filter(item =>
            item.name.toLowerCase().includes(lowercasedQuery) ||
            item.description.toLowerCase().includes(lowercasedQuery)
          );
          return { ...category, items: filteredItems };
        })
        .filter(category => category.items.length > 0);
    }

    // Category filtering logic
    if (activeCategory === 'All') {
      return menuData;
    }
    
    return menuData
      .map(section => {
        const filteredItems = section.items.filter(item => {
          // Special case for "Main Course" filter to include related categories
          if (activeCategory === 'Main Course') {
            return ['Main Course', 'Khmer Food', 'Food'].includes(item.category);
          }
          // Default case: direct category match
          return item.category === activeCategory;
        });
        return { ...section, items: filteredItems };
      })
      .filter(section => section.items.length > 0);

  }, [activeCategory, searchQuery]);
  
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const relatedItems = useMemo(() => {
    if (!selectedItem) return [];
    // Find all items in the same category, excluding the selected item itself.
    return menuData
      .flatMap(category => category.items)
      .filter(item => item.category === selectedItem.category && item.id !== selectedItem.id)
      .slice(0, 4); // Show up to 4 related items
  }, [selectedItem]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-5xl mx-auto">
        {!selectedItem && <Header cartCount={cartCount} />}
        
        {selectedItem ? (
          <ProductDetail 
            item={selectedItem} 
            onBack={handleBack}
            onAddToCart={handleAddToCart}
            relatedItems={relatedItems}
          />
        ) : (
          <>
            <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-lg px-4 md:px-0 py-3">
                <CategoryFilters 
                  categories={filterCategories} 
                  activeCategory={activeCategory} 
                  setActiveCategory={setActiveCategory} 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  isSearchVisible={isSearchVisible}
                  setIsSearchVisible={setIsSearchVisible}
                />
            </div>
            <div className="p-4 md:p-6">
              <MenuList menuCategories={filteredMenu} onItemSelect={handleSelectItem} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
