// components/ContactDropdown.tsx
import React, { useState, useRef, useEffect } from "react";

const ContactDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        className="btn bg-primary text-white font-serif py-2 px-6 flex items-center gap-2 px-4 m-5"
      >
        Contactar
        <svg
          className={`w-4 h-4 transition-transform duration-150 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Menú */}
      <div
        ref={menuRef}
        className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30 overflow-hidden transition-all origin-top-right ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <a
          href="https://wa.me/56945854758"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          <span>📱</span>
          <div>
            <div className="font-medium">WhatsApp</div>
            <div className="text-xs text-gray-500">+56 9 4585 4758</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/juampablorodriguez/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          <span>💼</span>
          <div>
            <div className="font-medium">LinkedIn</div>
            <div className="text-xs text-gray-500">Ver perfil</div>
          </div>
        </a>

        <a
          href="mailto:juampablo.txt@gmail.com"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          <span>📧</span>
          <div>
            <div className="font-medium">Correo</div>
            <div className="text-xs text-gray-500">juampablo.txt@gmail.com</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ContactDropdown;
