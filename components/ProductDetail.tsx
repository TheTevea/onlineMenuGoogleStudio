
import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ShareIcon } from './icons/ShareIcon';
import { MessengerIcon } from './icons/MessengerIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { CartPlusIcon } from './icons/CartPlusIcon';
import { WalletIcon } from './icons/WalletIcon';
import { RelatedProductCard } from './RelatedProductCard';


interface ProductDetailProps {
  item: MenuItem;
  onBack: () => void;
  onAddToCart: (itemName: string) => void;
  relatedItems: MenuItem[];
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ item, onBack, onAddToCart, relatedItems }) => {
  const [mainImage, setMainImage] = useState(item.images[0]);
  
  return (
    <div className="bg-white">
        <div className="relative">
            <img src={mainImage} alt={item.name} className="w-full h-80 object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
            <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors" aria-label="Go back">
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors" aria-label="Share">
                <ShareIcon className="w-6 h-6 text-gray-800" />
            </button>
        </div>

        <div className="p-6">
            <div className="flex justify-center -mt-16 relative z-10 space-x-2">
                {item.images.slice(1).map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`} 
                        className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer transition-all ${mainImage === img ? 'border-violet-500 scale-110' : 'border-white'}`}
                        onClick={() => setMainImage(item.images[0])} // For demo, clicking any thumb resets to main. A more complex state could handle this better.
                        onMouseEnter={() => setMainImage(img)}
                        onMouseLeave={() => setMainImage(item.images[0])}
                    />
                ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-6">{item.name}</h1>
            
            <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl font-bold text-violet-600">${item.price.toFixed(2)}</span>
                {item.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                )}
            </div>

            <p className="text-gray-600 mt-4">{item.description}</p>
            
            <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
                 <div className="flex items-center space-x-4 mt-3">
                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><MessengerIcon className="w-6 h-6 text-blue-600" /></a>
                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><TiktokIcon className="w-6 h-6 text-gray-800" /></a>
                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><FacebookIcon className="w-6 h-6 text-blue-700" /></a>
                </div>
            </div>

            {relatedItems.length > 0 && (
                 <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Products</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedItems.map(relatedItem => (
                            <RelatedProductCard key={relatedItem.id} item={relatedItem} onAddToCart={onAddToCart} />
                        ))}
                    </div>
                </div>
            )}
        </div>
        
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t p-4 flex space-x-3">
            <button onClick={() => onAddToCart(item.name)} className="flex-1 flex items-center justify-center p-3 border-2 border-violet-500 text-violet-600 font-bold rounded-xl hover:bg-violet-50 transition-colors">
                <CartPlusIcon className="w-6 h-6 mr-2" />
                Add to Cart
            </button>
            <button className="flex-1 flex items-center justify-center p-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-lg">
                <WalletIcon className="w-6 h-6 mr-2" />
                Buy Now
            </button>
        </div>
    </div>
  );
};
