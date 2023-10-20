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
      <div className="flex-row md:flex-row flex items-center md:justify-betwen">
        <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 items-start">
          <button className="bg-[#0000ff] text-center text-white font-serif py-1 px-4">
            Claro!
          </button>
        </div>
        <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 items-start">
          <a
            href="/"
            className="btn bg-[#ff0000] hover:bg-[#bb0000] text-white font-serif py-1 px-4"
          >
            no realmente
          </a>
        </div>
      </div>
      <div className="flex-row md:flex-row flex items-center md:justify-betwen">
        {/* <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 items-start">
          <button className="bg-[#0000ff] text-center text-white font-serif py-1 px-4">
            Claro!
          </button>
        </div>
        <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 items-start">
          <a
            href="/"
            className="btn bg-[#ff0000] hover:bg-[#bb0000] text-white font-serif py-1 px-4"
          >
            no realmente
          </a>
        </div> */}

        <div className="max-w-2xl flex-rw mx-auto">
          <p>
            Es un desarrollador de software nacido en septiembre del año 2000,
            desde que puede recordar usaba la computadora de su casa, una ibm
            beige que
          </p>
        </div>
      </div>
    </>
  );
};

export default Intro;
