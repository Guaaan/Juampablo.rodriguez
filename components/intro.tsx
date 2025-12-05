import { CMS_NAME } from "../lib/constants";
import { useCallback, useMemo, useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const SLOGANS = [
  "Programación e informática.",
  "Realidad virtual, mixta, extendida y aumentada.",
  "Instalaciones electrónicas.",
];

const Intro = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initTypewriter = useCallback(
    (typewriter) => {
      const slogans = SLOGANS.slice(); // copia del array
      let index = 0;

      const typeNext = () => {
        const slogan = slogans[index % slogans.length];
        typewriter
          .typeString(slogan)
          .pauseFor(2400)
          .deleteChars(slogan.length)
          .callFunction(() => {
            index += 1;
            typeNext();
          });
      };

      typeNext();
      typewriter.start();
    },
    []
  );

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-4 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <a href="/quien-soy" className="fat-anchor">
          Juampablo
        </a>
        g
      </h1>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
        <p className="flex justify-end font-bold">
          {isClient && <Typewriter onInit={initTypewriter} options={{ cursor: "|" }} />}
        </p>
      </div>
    </section>
  );
};

export default Intro;
