
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

  const filteredMenu = useMemo<MenuCategory[]>(() => {
    if (activeCategory === 'All') {
      return menuData;
    }
    
    const newMenuData = menuData.map(categorySection => {
      const filteredItems = categorySection.items.filter(item => {
          if (activeCategory === 'Main Course' && (item.category === 'Main Course' || item.category === 'Khmer Food' || item.category === 'Food')) return true;
          return item.category === activeCategory;
      });
      return { ...categorySection, items: filteredItems };
    }).filter(categorySection => categorySection.items.length > 0);

    const directMatch = menuData.find(cat => cat.title === activeCategory);
    if(directMatch) return [directMatch];
    
    if(newMenuData.length > 0) return newMenuData;

    const fallbackFiltered = menuData
      .map(section => ({
        ...section,
        items: section.items.filter(item => item.category === activeCategory),
      }))
      .filter(section => section.items.length > 0);
      
    return fallbackFiltered.length > 0 ? fallbackFiltered : menuData;

  }, [activeCategory]);
  
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
