import { CMS_NAME } from "../lib/constants";
import Typewriter from "typewriter-effect";

const Intro = () => {
  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          ¿Quien es Juampablo Rodríguez?
        </h1>
      </section>
      <section className="flex-col md:flex-row flex items-start md:justify-start md:mb-12">
        <div className="text-right md:text-left text-lg md:pl-8">
          <p className="font-serif font-thin">te debes estar preguntando.</p>
        </div>
      </section>
      <section className="flex-col md:flex-row flex items-center md:justify-betwe">
        <button className="bg-[#0000ff] text-white ...">
          botón
        </button>

        <p>
          Es un desarrollador de software nacido en septiembre del año 2000, desde que puede recordar usaba la computadora de su casa, una ibm beige que 
        </p>
      </section>
    </>
  );
};

export default Intro;
