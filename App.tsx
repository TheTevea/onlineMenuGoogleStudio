import React, { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { CategoryFilters } from './components/CategoryFilters';
import { MenuList } from './components/MenuList';
import { ProductDetail } from './components/ProductDetail';
import { Toast } from './components/Toast';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { LocationModal } from './components/LocationModal';
import { menuData, filterCategories } from './constants';
import type { MenuCategory, MenuItem, CartItem } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(filterCategories[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState<boolean>(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

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
  
  const handleAddToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setToastMessage(`${item.name} added to cart!`);
    setIsToastVisible(true);

    if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
        setIsToastVisible(false);
    }, 3000);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart(prevCart => {
        if (quantity <= 0) {
            return prevCart.filter(item => item.id !== itemId);
        }
        return prevCart.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        );
    });
  };

  const handleRemoveItem = (itemId: string) => {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleBuyNow = (item: MenuItem) => {
    setSelectedItem(item);
    setIsCartVisible(false);
    setIsCheckoutVisible(true);
    window.scrollTo(0, 0);
  };

  const handleSaveAddress = (address: string) => {
    setDeliveryAddress(address);
    setIsLocationModalVisible(false);
  };

  const showMenu = () => {
    setSelectedItem(null);
    setIsCartVisible(false);
    setIsCheckoutVisible(false);
  };

  const showCart = () => {
      setSelectedItem(null);
      setIsCheckoutVisible(false);
      setIsCartVisible(true);
  };

  const showProduct = (item: MenuItem) => {
      setSelectedItem(item);
      setIsCartVisible(false);
      setIsCheckoutVisible(false);
      window.scrollTo(0, 0);
  };


  const relatedItems = useMemo(() => {
    if (!selectedItem) return [];
    // Find all items in the same category, excluding the selected item itself.
    return menuData
      .flatMap(category => category.items)
      .filter(item => item.category === selectedItem.category && item.id !== selectedItem.id)
      .slice(0, 4); // Show up to 4 related items
  }, [selectedItem]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-5xl mx-auto">
        {isCartVisible ? (
          <CartPage 
            onClose={showMenu}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        ) : isCheckoutVisible && selectedItem ? (
          <CheckoutPage
            item={selectedItem}
            onBack={() => showProduct(selectedItem)}
            onAddAddressClick={() => setIsLocationModalVisible(true)}
            deliveryAddress={deliveryAddress}
          />
        ) : selectedItem ? (
          <ProductDetail 
            item={selectedItem} 
            onBack={showMenu}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            relatedItems={relatedItems}
          />
        ) : (
          <>
            <Header cartCount={cartCount} onCartClick={showCart} />
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
              <MenuList menuCategories={filteredMenu} onItemSelect={showProduct} />
            </div>
          </>
        )}
      </main>
      <Toast message={toastMessage} isVisible={isToastVisible} />
      <LocationModal 
        isVisible={isLocationModalVisible} 
        onClose={() => setIsLocationModalVisible(false)} 
        onSave={handleSaveAddress}
      />
    </div>
  );
};

export default App;