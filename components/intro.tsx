import { CMS_NAME } from "@/lib/constants";
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

  const [hoverJuampa, setHoverJuampa] = useState(false);
  const [hoverBlog, setHoverBlog] = useState(false);

  const typewriterOptions = {
    strings: SLOGANS,
    autoStart: true,
    loop: true,
    delay: 70,
    deleteSpeed: 40,
    pauseFor: 2400,
    cursor: '|',
  }

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-4 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <span className="inline-flex">
          <span
            className="transition-colors duration-300 cursor-pointer"
            style={{ color: hoverJuampa ? '#0000ff' : 'inherit' }}
            onMouseEnter={() => setHoverJuampa(true)}
            onMouseLeave={() => setHoverJuampa(false)}
          >
            Juampa
          </span>
          <span
            className="transition-colors duration-300 cursor-pointer"
            style={{ color: hoverBlog ? '#00e436' : 'inherit' }}
            onMouseEnter={() => setHoverBlog(true)}
            onMouseLeave={() => setHoverBlog(false)}
          >
            blog
          </span>
        </span>
      </h1>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
        <p className="flex justify-end font-bold">
          {isClient && <Typewriter options={typewriterOptions} />}
        </p>
      </div>
    </section>
  );
};

export default Intro;
