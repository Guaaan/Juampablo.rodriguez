import { CMS_NAME } from "../lib/constants";
import Typewriter from "typewriter-effect";
import React, { useState } from "react";

const Intro = () => {
  const [showBio, setShowBio] = useState(false);

  const handleShowBio = () => {
    setShowBio(true);
  };

  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          ¿Quien es Juampablo Rodríguez?
        </h1>
      </section>
      <section className="flex-col md:flex-row flex items-start md:justify-start md:mb-6">
        <div className="text-right md:text-left text-lg md:pl-8">
          <p className="font-serif font-thin">te debes estar preguntando.</p>
        </div>
      </section>
      {!showBio && (
        <div className="flex-row md:flex-row flex items-center md:justify-center">
          <div className="flex-col md:flex-row flex items-center md:justify-between mt-2 mb-6 md:mb-8 items-start">
            <button
              onClick={handleShowBio}
              className="bg-[#0000ff] text-center text-white font-serif py-1 px-4 m-5"
            >
              dime!
            </button>
          </div>
          <div className="flex-col md:flex-row flex items-center md:justify-between mt-2 mb-6 md:mb-8 items-start">
            <a
              href="/"
              className="btn bg-[#ff0000] text-white font-serif py-1 px-4 m-5"
            >
              no quiero saber.
            </a>
          </div>
        </div>
      )}

      {showBio && (
        <div className="bio-content flex-row md:flex-row flex items-center md:justify-betwen">
          <div className="max-w-2xl flex-row mx-auto">
            <p>Juampablo Rodríguez Rojas 2000. Merida, Venezuela.</p>

            <p>
              Desarrollador de software residenciado en Chile. Conoció su pasión
              por las computadoras antes de saber leer, de niño vió clases de
              guitarra y editó código HTML gracias a Tumblr; Estudió diseño de
              páginas web en el instituto Simón Bolivar de Mérida así como una
              certificación de desarrollo fullstack en 4Geeks academy en
              Santiago de Chile. Actualmente se dedica a desarrollar soluciones
              web y de inteligencia artificial para IMQ, mientras aprende a
              desarrollar videojuegos de manera independiente en su tiempo libre.
            </p>
          </div>
          <div className="flex-row md:flex-row flex items-center mt-2 mb-6 md:mb-8">
            <a
              href="/"
              className="btn bg-[#ff0000] text-white font-serif py-1 px-4 m-5"
            >
              volver al inicio.
            </a>
            <a
              href="https://www.linkedin.com/in/juampablorodriguez/"
              className="btn bg-[#0000ff] text-white font-serif py-1 px-4 m-5"
            >
              quiero contactar con Juampablo.
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;
