
import React from 'react';

export const CartPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-5.512A1.125 1.125 0 0018.115 6H6.115a1.125 1.125 0 00-1.125 1.125v1.513M7.5 14.25v-2.625m0 0L7.5 11.25m-2.625 2.625L11.25 7.5m0 0L14.25 11.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 15v6" />
    </svg>
);
