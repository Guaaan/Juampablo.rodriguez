import React from 'react';

interface TabButtonProps {
  active: boolean;
  colorClass: string; // ej: "bg-primary" o "bg-warm"
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, colorClass, onClick, children }) => (
  <button
    onClick={onClick}
    className={`font-serif py-1 px-4 m-5 rounded-md text-white transition-all duration-300 ${colorClass}
      ${active ? 'shadow-md scale-105' : 'opacity-80 hover:opacity-100 hover:scale-105'}
    `}
  >
    {children}
  </button>
);

export default TabButton;
