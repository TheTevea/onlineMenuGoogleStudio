import React from 'react';
import type { MenuItem } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { EditIcon } from './icons/EditIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CheckoutPageProps {
  item: MenuItem;
  onBack: () => void;
  onAddAddressClick: () => void;
  deliveryAddress: string | null;
}

const CheckoutSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
        {children}
    </div>
);

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ item, onBack, onAddAddressClick, deliveryAddress }) => {
    const quantity = 1;
    const subtotal = item.price * quantity;
    const discount = 0.00;
    const deliveryFee = 0.00;
    // FIX: Removed explicit type annotation to allow for correct type inference.
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="animate-fade-in pb-24">
            <header className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-lg flex items-center p-4 mb-4">
                <button onClick={onBack} className="p-2 mr-4 rounded-full hover:bg-gray-200 transition-colors" aria-label="Go back to product">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </header>
            
            <div className="px-4 space-y-4">
                <CheckoutSection title="Customer Details">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-gray-700">Non sint doloremque</p>
                            <p className="text-gray-500">2323232323</p>
                        </div>
                        <button className="p-2 text-violet-600 hover:bg-violet-100 rounded-full">
                            <EditIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <textarea 
                        className="mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
                        rows={3}
                        placeholder="Add any special instructions or notes"
                    ></textarea>
                </CheckoutSection>
                
                <CheckoutSection title="Delivery Details*">
                    {deliveryAddress ? (
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-700">Deliver to:</p>
                                    <p className="text-gray-600">{deliveryAddress}</p>
                                </div>
                                <button onClick={onAddAddressClick} className="p-2 text-violet-600 hover:bg-violet-100 rounded-full" aria-label="Edit address">
                                    <EditIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <textarea 
                                className="mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
                                rows={2}
                                placeholder="Add a note for the driver (e.g. apartment number)"
                            ></textarea>
                        </div>
                    ) : (
                        <button 
                            onClick={onAddAddressClick}
                            className="w-full flex justify-between items-center text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <MapPinIcon className="w-6 h-6 text-violet-500 mr-3"/>
                                <span className="text-gray-700 font-semibold">Add your address</span>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400"/>
                        </button>
                    )}
                </CheckoutSection>
                
                <CheckoutSection title="Shipping Method">
                    <div className="flex justify-between items-center p-3 border border-violet-500 bg-violet-50 rounded-lg">
                        <span className="font-semibold text-violet-700">Free Shipping</span>
                        <span className="font-bold text-violet-700">Free</span>
                    </div>
                </CheckoutSection>

                <CheckoutSection title="Payment Method">
                    <div className="p-3 border rounded-lg">
                        <p className="font-semibold text-gray-700">ABA KHQR</p>
                        <div className="flex flex-col items-center text-center my-4">
                            <div className="p-4 border-2 border-dashed rounded-lg">
                                <QrCodeIcon className="w-32 h-32 text-gray-800"/>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Scan to pay with any banking app</p>
                        </div>
                    </div>
                </CheckoutSection>
                
                <CheckoutSection title="Order Summary">
                    <div className="flex items-center space-x-4 mb-4 pb-4 border-b">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                        <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {quantity}</p>
                        </div>
                        <p className="ml-auto font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span className="font-semibold">-${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span className="font-semibold">{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 mt-2 pt-2 border-t">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </CheckoutSection>
                
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800">Terms and Conditions</h2>
                    <div className="flex items-start mt-4">
                        <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500" />
                        <label htmlFor="terms" className="ml-3 text-sm text-gray-600">I agree to the <a href="#" className="font-semibold text-violet-600 hover:underline">Terms and Conditions</a> and <a href="#" className="font-semibold text-violet-600 hover:underline">Privacy Policy</a></label>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        By placing this order, you confirm that you have read and agree to our terms of service and privacy policy.
                    </p>
                </div>
            </div>
            
            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t">
                <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
                    <div>
                        <span className="text-sm text-gray-600">Total</span>
                        <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                    </div>
                    <button className="px-10 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-lg">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};