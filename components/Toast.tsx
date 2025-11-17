
import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center bg-gray-800 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg">
        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
        <span>{message}</span>
      </div>
    </div>
  );
};
