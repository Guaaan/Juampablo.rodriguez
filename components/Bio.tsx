import React from "react";
import TabPanel from "./TabPanel";
import ContactDropdown from "./ContactDropdown";
import RotatingImage from "./RotatingImage";
import Link from 'next/link'

const Profile = () => {
  const tabs = [
    {
      id: "experiencia",
      title: "Experiencia Profesional",
      color: "bg-primary text-white",
      content: (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">Experiencia Profesional</h2>

          <div>
            <h3 className="text-xl font-semibold">
              ITAM – Desarrollador Python / IA (2025 – Actualidad)
            </h3>
            <p>
              Desarrollo de soluciones con GPT-4o realtime, sistemas RAG, bots
              de visión con Azure Vision y despliegue de aplicaciones de IA en
              Azure. Automatización de flujos de lenguaje, datos y visión
              artificial.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Servicios Informáticos IMQ – Full Stack Developer (2022 – 2025)
            </h3>
            <p>
              Desarrollo de plataformas e-commerce, sistemas para farmacias,
              dashboards B2B, herramientas de análisis de precios y sistemas
              inteligentes de atención al cliente. Tecnologías: Svelte, JS,
              Node.js, Python, C#, .NET Core, SQL Server, PostgreSQL, AWS y
              Docker.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              ITISB (UNAB) – Desarrollador VR Freelance (2024)
            </h3>
            <p>
              Creación de experiencias VR para museos, programación de
              mecánicas, UI inmersiva, optimización para Meta Quest y pruebas
              con usuarios reales.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Farmacia Géminis – Programador / Informático (2021 – 2022)
            </h3>
            <p>
              Desarrollo de sistemas internos en C# WinForms, gestión de
              inventario y facturación, administración de bases de datos y redes
              internas.
            </p>
          </div>
        </div>
      ),
    },

    {
      id: "proyectos",
      title: "Proyectos y Soluciones Tecnológicas",
      color: "bg-accent text-white",
      content: (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Proyectos y Soluciones Tecnológicas
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Webscraping avanzado:</strong> extracción de datos en
              sitios dinámicos (medicamentos, propiedades) usando Python,
              Playwright y Scrapy.
            </li>
            <li>
              <strong>Bots de IA:</strong> asistentes con GPT-4o realtime,
              análisis de imagen, clasificación de datos y automatización de
              procesos.
            </li>
            <li>
              <strong>Proyectos XR:</strong> experiencias interactivas para
              museos, prototipos de juegos, efectos AR y sistemas educativos.
            </li>
            <li>
              <strong>Aplicaciones web personalizadas:</strong> dashboards,
              APIs, formularios inteligentes, integraciones B2B y herramientas
              internas.
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: "skills",
      title: "Habilidades Técnicas",
      color: "bg-success text-white",
      content: (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Habilidades Técnicas</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Frontend:</strong> Svelte, React, Next.js, HTML, CSS, JS,
              Tailwind
            </li>
            <li>
              <strong>Backend:</strong> Python, Node.js, C#, .NET, Flask, SQL
            </li>
            <li>
              <strong>IA / Cloud:</strong> Azure AI Foundry, Vision, VMs, GPT-4o
              realtime
            </li>
            <li>
              <strong>3D / VR:</strong> Unity, Blender, Oculus SDK
            </li>
            <li>
              <strong>Bases de datos:</strong> PostgreSQL, SQL Server, MySQL
            </li>
            <li>
              <strong>DevOps:</strong> AWS, Docker, CI/CD, Nginx, Ubuntu
            </li>
            <li>
              <strong>Otros:</strong> Git, WebGL, Playwright, Scrapy
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: "ia",
      title: "Inteligencia Artificial y Automatización",
      color: "bg-danger text-white",
      content: (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Inteligencia Artificial y Automatización
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Sistemas RAG con embeddings avanzados y búsquedas vectoriales.
            </li>
            <li>
              GPT-4o Realtime para automatización conversacional y de análisis.
            </li>
            <li>
              Bots de visión con Azure Computer Vision y detección de patrones.
            </li>
            <li>
              Automatización de scraping, análisis de datos y pipelines ETL.
            </li>
            <li>Integración de IA en aplicaciones web y servicios internos.</li>
          </ul>
        </div>
      ),
    },

    {
      id: "software",
      title: "Desarrollo Web y Software",
      color: "bg-warm text-white",
      content: (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">Desarrollo Web y Software</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Aplicaciones full stack con Svelte, React y Node.js.</li>
            <li>Dashboards administrativos y sistemas B2B.</li>
            <li>APIs REST, backend modular y sistemas escalables.</li>
            <li>Integraciones con bases de datos SQL y NoSQL.</li>
            <li>
              E-commerce, sistemas para farmacias y plataformas de gestión.
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: "xr",
      title: "VR / AR / Experiencias Inmersivas",
      color: "bg-warning text-black",
      content: (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            VR / AR / Experiencias Inmersivas
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Desarrollo VR en Unity para Meta Quest.</li>
            <li>Optimización de rendimiento y programación de mecánicas.</li>
            <li>Prototipos interactivos para museos y educación.</li>
            <li>Animación, UI inmersiva y diseño sonoro básico.</li>
          </ul>
        </div>
      ),
    },

    {
      id: "educacion",
      title: "Formación y Certificaciones",
      color: "bg-magenta text-white",
      content: (
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold mb-4">
            Formación y Certificaciones
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Artes Mediales (VR/AR/XR), Universidad Católica (2025)</li>
            <li>
              Curso Desarrollo de Videojuegos (Unity/Blender), UTN Buenos Aires
              (2023–2024)
            </li>
            <li>Bootcamp Full Stack, 4Geeks Academy (2020)</li>
            <li>Bachillerato en Ciencias (2017)</li>
            <li>Inglés Avanzado (2017)</li>
          </ul>
        </div>
      ),
    },

    {
      id: "instalaciones",
      title: "Servicios Tecnológicos e Instalaciones",
      color: "bg-slateCustom text-white",
      content: (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Servicios Tecnológicos e Instalaciones
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Instalación de sistemas de vigilancia CCTV/IP.</li>
            <li>Montaje de audio profesional para bares y locales.</li>
            <li>Redes comerciales: impresoras, POS, servidores.</li>
            <li>Tendido estructurado y configuración de equipos.</li>
            <li>Soporte técnico y mantenimiento on-site.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href="/" className="hover:underline fat-anchor">
            {"<"}
          </Link>
          ¿Juampablo Rodríguez?
        </h1>
      </section>
      <div className="max-w-4xl mx-auto mt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700">
              Apasionado por la tecnología desde la infancia, Juampablo
              Rodríguez combina desarrollo de software e instalaciones
              informáticas, trabajando desde 2020 con empresas, pymes e
              individuos.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <RotatingImage src="/assets/blog/authors/juan.jpg" />
          </div>
        </div>
      </div>
      <TabPanel tabs={tabs} />

      <div className="flex justify-center mt-6">
        <ContactDropdown />
        <a
          href="/"
          className="btn bg-warm text-white font-serif py-2 px-4 m-5"
          rel="noopener noreferrer"
        >
          Volver al Inicio
        </a>
      </div>
    </>
  );
};

export default Profile;
