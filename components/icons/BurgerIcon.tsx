
import React from 'react';

export const BurgerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 11h16M4 17h16" />
    <path d="M12 5C8.68629 5 6 7.68629 6 11H18C18 7.68629 15.3137 5 12 5Z" fill="orange" stroke="none" />
    <path d="M6 17C6 19.2091 8.68629 21 12 21C15.3137 21 18 19.2091 18 17H6Z" fill="#A0522D" stroke="none"/>
    <rect x="6" y="11" width="12" height="6" rx="1" fill="#FFC107" stroke="none" />
    <rect x="6" y="11" width="12" height="2" fill="#4CAF50" stroke="none" />
  </svg>
);
