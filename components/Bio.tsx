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
            guitarra y editó código HTML gracias a Tumblr; En 2015 estudió diseño de
            páginas web en el instituto Simón Bolivar de Mérida, en 2020 una
            certificación de desarrollo fullstack en 4Geeks academy en
            Santiago de Chile. 
          </p>
          <p className="mt-2">
            En 2023 estudió desarrollo de veojuegos en la Universidad Tecnológica Nacional de Buenos Aires. 
          </p>
          <p className="mt-2">
            Desde 2024 hasta 2025 vio un curso intensivo de composición musical con Andrés Mondaca.  
          </p>
          <p className="mt-2">
            En 2025 también hizo un curso de artes mediales en el campus oriente de la Pontifica Universidad Católica
          </p>
        </div>
      )
    },
    {
      id: 'instalaciones',
      title: 'Instalaciones Electrónicas',
      color: 'bg-danger text-white',
      content: (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Instalaciones y servicios</h2>
          <p className="mt-2">
            En los últimos 5 años me he dedicado a instalaciones electrónicas y cableado,
            especializándome en: cámaras de seguridad, sistemas de audio para bares y
            restaurantes, y redes para entornos comerciales (impresoras, puntos de
            venta e integración de servidores). Realizo desde la planificación del
            tendido de cable hasta la puesta en marcha y configuración de equipos.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Instalación y configuración de sistemas de vigilancia CCTV/IP</li>
            <li>Montaje de sistemas de audio profesional para locales</li>
            <li>Redes y conectividad: impresoras, POS y servidores</li>
            <li>Mantenimiento y soporte técnico on-site</li>
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
          <h2 className="text-2xl font-bold mb-4">Videojuegos y proyectos creativos</h2>
          <div className="space-y-4">
            <div className="project">
              <h3 className="text-xl font-semibold">Oh Tocar Guitarra</h3>
              <p>Juego musical que combina práctica de guitarra con mecánicas lúdicas,
              diseñado para aprender y divertirse.</p>
            </div>
            <div className="project">
              <h3 className="text-xl font-semibold">Corazón Abajo</h3>
              <p>Aventura narrativa con énfasis en la atmósfera y la composición
              sonora, desarrollada como proyecto independiente.</p>
            </div>
            <div className="project">
              <h3 className="text-xl font-semibold">Tugurios</h3>
              <p>Juego de exploración/estrategia con estética retro, creado como
              proyecto personal y prototipo jugable.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'comercial',
      title: 'Experiencia Laboral',
      color: 'bg-magenta text-white',
      content: (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Experiencia Profesional</h2>
          <div className="space-y-4">
            <div className="project">
              <h3 className="text-xl font-semibold">IMQ - Soluciones Web</h3>
              <p>Desarrollo de soluciones empresariales con enfoque en integración
              y automatización.</p>
            </div>
            <div className="project">
              <h3 className="text-xl font-semibold">Desarrollo Freelance</h3>
              <p>Proyectos personalizados para clientes variados, abarcando desde
              aplicaciones web hasta prototipos interactivos.</p>
            </div>
            <div className="project">
              <h3 className="text-xl font-semibold">Servicios Técnicos e Instalaciones</h3>
              <p>Instalaciones electrónicas y soporte para locales comerciales,
              incluyendo sistemas de vigilancia, audio y redes.</p>
            </div>
            <p className="mt-2">Para un listado detallado de puestos y fechas, consulte el CV o contacte directamente.</p>
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
