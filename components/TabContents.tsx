import React from 'react';

export const BioContent = () => (
  <div className="max-w-2xl mx-auto">
    <p>Juampablo Rodríguez Rojas 2000. Merida, Venezuela.</p>
    <p className="mt-4">
      Desarrollador de software residenciado en Chile. Conoció su pasión
      por las computadoras antes de saber leer, de niño vió clases de
      guitarra y editó código HTML gracias a Tumblr; Estudió diseño de
      páginas web en el instituto Simón Bolivar de Mérida así como una
      certificación de desarrollo fullstack en 4Geeks academy en
      Santiago de Chile. Actualmente se dedica a desarrollar soluciones
      web y de inteligencia artificial para IMQ, actualmente se
      encuentra estudiando desarrollo de videojuegos en la Universidad
      Tecnologica de Buenos Aires.
    </p>
  </div>
);

export const InstalacionesContent = () => (
  <div className="max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Instalaciones y Setup</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li>VSCode como editor principal</li>
      <li>Terminal iTerm2 con Oh My Zsh</li>
      <li>Node.js y npm para desarrollo web</li>
      <li>Git para control de versiones</li>
    </ul>
  </div>
);

export const ProyectosContent = () => (
  <div className="max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Proyectos Personales</h2>
    <div className="space-y-4">
      <div className="project">
        <h3 className="text-xl font-semibold">Blog Personal</h3>
        <p>Un espacio donde comparto mis experiencias y conocimientos en desarrollo.</p>
      </div>
      <div className="project">
        <h3 className="text-xl font-semibold">Guitarra Virtual</h3>
        <p>Aplicación web interactiva para aprender guitarra.</p>
      </div>
      <div className="project">
        <h3 className="text-xl font-semibold">Portfolio 3D</h3>
        <p>Showcase de proyectos con tecnologías Three.js y React Three Fiber.</p>
      </div>
    </div>
  </div>
);

export const ComercialContent = () => (
  <div className="max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Proyectos Comerciales</h2>
    <div className="space-y-4">
      <div className="project">
        <h3 className="text-xl font-semibold">IMQ - Soluciones Web</h3>
        <p>Desarrollo de soluciones empresariales con IA y tecnologías web modernas.</p>
      </div>
      <div className="project">
        <h3 className="text-xl font-semibold">Desarrollo Freelance</h3>
        <p>Proyectos personalizados para clientes en diferentes industrias.</p>
      </div>
    </div>
  </div>
);