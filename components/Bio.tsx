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
              por favor!
            </button>
          </div>
          <div className="flex-col md:flex-row flex items-center md:justify-between mt-2 mb-6 md:mb-8 items-start">
            <a
              href="/"
              className="btn bg-[#ff0000] text-white font-serif py-1 px-4 m-5"
            >
              no realmente.
            </a>
          </div>
        </div>
      )}

      {showBio && (
        <div className="bio-content flex-row md:flex-row flex items-center md:justify-betwen">
          <div className="max-w-2xl flex-row mx-auto">
            <p>
              Es un desarrollador de software nacido en septiembre del año 2000
              en Mérida, Venezuela. Desde antes de poder leer o escribir, usando
              la computadora de su casa y la Nintendo 64 de un primo desarrolló
              una pasión por la informática y los videojuegos.
            </p>

            <br />
            <p>
              Gracias a tumblr en 2012 aprendió a editar el HTML de su blog. En
              2015 realiza un curso de diseño web en el instituto Simón Bolivar
              donde aprende HTML y CSS.
            </p>

            <br />
            <p>
              En 2018 migra a chile donde luego de dos años estudia programación
              fullstack, donde aprende Javascript, Python y posteriormente C#.
              para dedidcarse a desarrollar sistemas administrativos, paginas
              web y proyectos de web scraping a tiempo completo.
            </p>
            <br />
            <p>
              Luego de tres años de aprender 3D de manera autodidacta en su
              tiempo libre combinando su conocimiento en programación orientada
              a objetos comienza a desarrollar proyectos en el motor de
              videojuegos Unity y darle vida a TUGURIOS: una serie de espacios
              oniricos interectivos.
            </p>
            <br />
            <p>
              Actualmente se encuentra empleado, trabajando para IMQ Soluciones
              de manera remota; y como siempre, trabajando en proyectos
              personales.
            </p>
          </div>
          <div className="flex-row md:flex-row flex items-center mt-2 mb-6 md:mb-8">
            <a
              href="/"
              className="btn bg-[#ff0000] text-white font-serif py-1 px-4 m-5"
            >
              volver al inicio.
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Intro;
