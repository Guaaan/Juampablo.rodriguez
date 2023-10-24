import { CMS_NAME } from "../lib/constants";
import Typewriter from "typewriter-effect";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-4 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <a href="/quien-soy" className="fat-anchor"> Juampablo</a>g
      </h1>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
       
        <p className="flex justify-end font-bold">repositorio de creación digital.</p>
      </div>
    </section>
    
  );
};

export default Intro;
