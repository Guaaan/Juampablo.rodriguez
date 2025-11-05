import React, { useState } from 'react';

interface TabItem {
  id: string;
  title: string;
  color: string; // espera clases Tailwind como 'bg-primary text-white'
  content: React.ReactNode;
}

interface TabPanelProps {
  tabs: TabItem[];
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(''); // inicio sin nada activo

  const toggle = (id: string) => {
    setActiveTab(prev => (prev === id ? '' : id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 my-6">
        {tabs.map(({ id, title, color }) => {
          const selected = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              aria-pressed={selected}
              className={`${color} px-4 py-2 rounded-md font-semibold transition-transform transform focus:outline-none flex items-center gap-2
                ${selected ? 'scale-105 ring-4 ring-white/20 shadow-lg' : 'hover:scale-105'}`}
            >
              <span className="sr-only">{selected ? 'Seleccionado: ' : ''}</span>
              {title}
            </button>
          );
        })}
      </div>

      <div className="content-container mt-6 transition-all duration-200">
        {tabs.map(tab =>
          tab.id === activeTab ? (
            <div key={tab.id} className="p-4 rounded-md bg-white/5 border border-white/5">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabPanel;