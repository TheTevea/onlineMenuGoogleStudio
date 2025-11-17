import React from 'react';
import type { CartItem } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { MinusIcon } from './icons/MinusIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ShoppingBagIcon } from './icons/ShoppingBagIcon';

interface CartPageProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const TAX_RATE = 0.10; // 10% tax

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-gray-500">
        <ShoppingBagIcon className="w-24 h-24 text-gray-300" />
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="mt-2 text-center">Looks like you haven't added anything to your cart yet.</p>
        <button
          onClick={onClose}
          className="mt-8 px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 animate-fade-in">
      <header className="flex items-center mb-6">
        <button onClick={onClose} className="p-2 mr-4 rounded-full hover:bg-gray-200 transition-colors" aria-label="Go back to menu">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
      </header>
      
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-grow ml-4">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" aria-label={`Decrease quantity of ${item.name}`}>
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="font-bold w-6 text-center" aria-live="polite">{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors" aria-label={`Increase quantity of ${item.name}`}>
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <button onClick={() => onRemoveItem(item.id)} className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors" aria-label={`Remove ${item.name}`}>
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 mt-2 pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button className="mt-6 w-full p-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-lg text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
