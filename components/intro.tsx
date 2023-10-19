import { CMS_NAME } from "../lib/constants";
import Typewriter from "typewriter-effect";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Juampablog
      </h1>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
        repositorio de creación digital.
        {/* <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('Hello World!')
            .callFunction(() => {
              console.log('String typed out!');
            })
            .pauseFor(2500)
            .deleteAll()
            .callFunction(() => {
              console.log('All strings were deleted');
            })
           .start();
        }}
      /> */}
      </div>
    </section>
  );
};

export default Intro;
