import React from 'react';

interface TabButtonProps {
  active: boolean;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, color, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-center text-white font-serif py-1 px-4 m-2 transition-all duration-300 ${
      active ? `bg-[${color}] scale-105` : `bg-[${color}] opacity-70`
    }`}
  >
    {children}
  </button>
);

export default TabButton;