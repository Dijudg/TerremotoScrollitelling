import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { chronicle1Images } from "../content/chronicle1Media";
import { pickImage } from "../content/mediaUtils";

export function HopeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const hopeImage = pickImage(chronicle1Images, 4);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32" style={{ position: "relative" }}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(20, 20, 20, ${backgroundBrightness})`,
          background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a, #2a2a2a)",
        }}
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${hopeImage}')` }} />
      </motion.div>

      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" style={{ opacity }}>
        <SectionReveal>
          <h2
            className="mb-16 inline-block text-5xl leading-[1.6] tracking-tight md:text-6xl"
            style={{ fontFamily: '"Finger Paint", cursive' }}
          >
            <span className="rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black box-decoration-clone">Lograrian salvarlo?</span>
          </h2>

          <div className="space-y-10 text-lg leading-relaxed text-gray-200 md:text-xl">
            <p>
              La tarde del domingo 17 de abril, Pablo concilio el sueno. Cientos de pensamientos rondaban su cabeza y habia uno central: lograrian salvarlo?
            </p>

            <p>
              Asi amanecio el lunes 18 y este portovejense, de 63 anos, desperto sin energias y el destello de esperanza empezo a flaquear. Por primera vez, penso en la muerte.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="relative my-24 h-[60vh] overflow-hidden rounded-lg"
          style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [60, -60]) }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${hopeImage}')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-6xl font-thin text-blue-300/60 md:text-8xl">esperanza</p>
            </div>
          </div>
        </motion.div>

        <SectionReveal>
          <div className="space-y-10 text-lg leading-relaxed text-gray-200 md:text-xl">
            <h3 className="mb-8 text-3xl leading-[1.4] md:text-4xl">La llamada</h3>

            <p>
              Cansado, tomo su celular y reviso los ultimos numeros que estaban en la memoria del dispositivo. Uno de ellos decia Dona Veronica.
            </p>

            <p className="text-xl text-white md:text-2xl">
              Sin pensarlo dos veces, llamo y una voz contesto:
              <span className="mt-4 block text-2xl italic text-green-400 md:text-3xl">
                "Yo sabia que ese cuerpito no podia haber muerto"
              </span>
            </p>

            <p className="text-green-300">
              Para Pablo, esa voz femenina lo trajo de vuelta. Veronica llamo de inmediato a los cuerpos de rescate y, en menos de 10 minutos, el telefono de Pablo volvio a sonar.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-24">
          <SectionReveal>
            <h3 className="mb-12 text-4xl leading-[1.4] tracking-tight md:text-5xl">Tres dias sepultado</h3>

            <div className="space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
              <p>
                Los cuerpos de rescate se dirigieron rapidamente hacia donde el estaba. Ya no era el hotel donde laboro durante 18 anos, sino un cumulo de escombros.
              </p>

              <p className="text-white">
                "Recibi una llamada del ECU. Les dije: soy Pablo Cordoba y estoy completamente sano, por favor, quiero que me rescaten", conto.
              </p>

              <p>
                Del otro lado, una voz colombiana le pregunto donde estaba y el dio la ubicacion exacta: a unos 30 metros de la entrada del hotel, entre las calles Pedro Gual y Olmedo.
              </p>
            </div>
          </SectionReveal>
        </div>
      </motion.div>
    </section>
  );
}
