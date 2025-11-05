import React from "react";
import TabPanel from "./TabPanel";

const Profile = () => {
  const tabs = [
    {
      id: 'bio',
      title: 'Bio',
      color: 'bg-primary text-white',
      content: (
        <div className="max-w-2xl mx-auto">
          <p>Juampablo Rodríguez Rojas 2000. Merida, Venezuela.</p>
          <p className="mt-4">
            Desarrollador de software residenciado en Chile. Conoció su pasión
            por las computadoras antes de saber leer, de niño vió clases de
            guitarra y editó código HTML gracias a Tumblr; Estudió diseño de
            páginas web en el instituto Simón Bolivar de Mérida así como una
            certificación de desarrollo fullstack en 4Geeks academy en
            Santiago de Chile.
          </p>
        </div>
      )
    },
    {
      id: 'instalaciones',
      title: 'Instalaciones',
      color: 'bg-danger text-white',
      content: (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Setup de Desarrollo</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>VSCode como editor principal</li>
            <li>Terminal iTerm2 con Oh My Zsh</li>
            <li>Node.js y npm para desarrollo web</li>
            <li>Git para control de versiones</li>
          </ul>
        </div>
      )
    },
    {
      id: 'proyectos',
      title: 'Proyectos Personales',
      color: 'bg-success text-white',
      content: (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Proyectos Destacados</h2>
          <div className="space-y-4">
            <div className="project">
              <h3 className="text-xl font-semibold">Blog Personal</h3>
              <p>Un espacio donde comparto mis experiencias y conocimientos.</p>
            </div>
            <div className="project">
              <h3 className="text-xl font-semibold">Portfolio 3D</h3>
              <p>Showcase de proyectos con Three.js y React Three Fiber.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'comercial',
      title: 'Comercial',
      color: 'bg-magenta text-white',
      content: (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Experiencia Profesional</h2>
          <div className="space-y-4">
            <div className="project">
              <h3 className="text-xl font-semibold">IMQ - Soluciones Web</h3>
              <p>Desarrollo de soluciones empresariales con IA.</p>
            </div>
            <div className="project">
              <h3 className="text-xl font-semibold">Desarrollo Freelance</h3>
              <p>Proyectos personalizados para diversos clientes.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          ¿Qué hace Juampablo Rodríguez?
        </h1>
      </section>
      
      <TabPanel tabs={tabs} />

      <div className="flex justify-center mt-6">
        <a
          href="https://www.linkedin.com/in/juampablorodriguez/"
          className="btn bg-primary text-white font-serif py-1 px-4 m-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contactar con Juampablo
        </a>
        <a
          href="/"
          className="btn bg-warm text-white font-serif py-1 px-4 m-5"
          rel="noopener noreferrer"
        >
          Volver al Inicio
        </a>
      </div>
    </>
  );
};

export default Profile;
