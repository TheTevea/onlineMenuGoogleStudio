import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { XIcon } from './icons/XIcon';
import { HomeIcon } from './icons/HomeIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { TagIcon } from './icons/TagIcon';

interface LocationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
}

const AddressTypeButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-colors text-sm font-semibold space-x-2 ${
            isActive ? 'bg-violet-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);


export const LocationModal: React.FC<LocationModalProps> = ({ isVisible, onClose, onSave }) => {
  const [addressType, setAddressType] = useState('Home');
  const [address, setAddress] = useState('FX65+FPW, Ta Khmau, Cambodia');

  if (!isVisible) return null;

  const handleSave = () => {
    onSave(address);
  };

  return (
    <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
    >
      <div 
        className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-md mx-auto overflow-hidden transition-all transform duration-300 scale-100"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center">
          <h2 id="location-modal-title" className="text-xl font-bold text-gray-800">Location</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200" aria-label="Close location modal">
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </header>

        <div className="p-4">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img src="https://picsum.photos/seed/map/600/300" alt="Map placeholder" className="w-full h-full object-cover"/>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Delivery Address</h3>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search or enter address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
                    />
                </div>
            </div>
            
            <button className="w-full p-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                Set Location
            </button>
        </div>
        
        <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
                <AddressTypeButton 
                    label="Home"
                    icon={<HomeIcon className="w-5 h-5" />}
                    isActive={addressType === 'Home'}
                    onClick={() => setAddressType('Home')}
                />
                <AddressTypeButton 
                    label="Work"
                    icon={<BriefcaseIcon className="w-5 h-5" />}
                    isActive={addressType === 'Work'}
                    onClick={() => setAddressType('Work')}
                />
                <AddressTypeButton 
                    label="Custom"
                    icon={<TagIcon className="w-5 h-5" />}
                    isActive={addressType === 'Custom'}
                    onClick={() => setAddressType('Custom')}
                />
            </div>
            <button 
                onClick={handleSave}
                className="mt-4 w-full p-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-lg"
            >
                Save
            </button>
        </div>

      </div>
    </div>
  );
};