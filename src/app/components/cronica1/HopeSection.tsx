import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "../SectionReveal";

export function HopeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-32">
      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6 " style={{ opacity }}>
        <SectionReveal>
          <h2
            className="font-heading mb-16 inline-block text-5xl leading-[1.6] tracking-normal md:text-6xl"
          >
            <span className="rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black box-decoration-clone">¿Lograrían salvarlo? </span>
          </h2>

          <div className="space-y-10 text-lg leading-relaxed text-gray-200 md:text-xl">
            <p>
La tarde del domingo 17 de abril, Pablo concilió el sueño. Cientos de pensamientos rondaban su cabeza y había uno central: ¿Lograrían salvarlo?             </p>

            <p>
Así amaneció el lunes 18 y este portovejense, de 63 años -a quien se le conoce como ‘traga años’ porque parece más joven-, despertó sin energías y el destello de esperanza empezó a flaquear. La voz se le apagó y, por primera vez, pensó en la muerte.            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="space-y-10 text-lg pt-10 leading-relaxed text-gray-200 md:text-xl">

            <p >
             Cansado, tomó su celular y revisó los últimos números que estaban en la memoria del dispositivo. “Doña Verónica”, decía uno de ellos. Se trataba de una esmeraldeña a la que Pablo le estaba construyendo un anaquel. Días atrás y como el mueble era muy alto, le faltaron clavos y le llamó para que le comprara algunos.
            </p>

            <motion.div
              className="text-xl text-white md:text-2xl"
              initial={{ opacity: 0, y: 56, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.55 }}
            >
              Sin pensarlo dos veces, aplastó llamar y al otro lado de la línea una voz contestó:
              <motion.div
                className="mb-0 flex items-center justify-center gap-4"
                animate={{
                  scale: [1, 1.035, 1],
                  textShadow: [
                    "0 0 0 rgba(253, 224, 71, 0)",
                    "0 0 26px rgba(253, 224, 71, 0.55)",
                    "0 0 0 rgba(253, 224, 71, 0)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-9xl  text-yellow-300 pt-10 Finger-font" >“</span>
                <span className="mt-4 block text-2xl italic font-bold text-balance text-center text-yellow-300 md:text-4xl Finger-font">
                  Yo sabía que ese cuerpito no podía haber muerto
                </span>
                <span className="text-9xl  text-yellow-300 pt-10 Finger-font" >”</span>

              </motion.div>
              <span className="block w-full md:px-16 text-center text-lg font-light italic -mt-8"> , dijo la mujer entre risas y con aquella exuberancia típica del dialecto de la Costa de Ecuador.  </span>

            </motion.div>

            <p>
             Esa voz femenina lo trajo a la vida. “Doña Verónica, estoy atrapado en el hotel y los escombros me van a matar”, gritó con esperanza.
            </p>
             <p>
Verónica llamó de inmediato a los cuerpos de rescate. En menos de 10 minutos se escuchó el timbre del teléfono de Pablo.             </p>
          </div>
        </SectionReveal>

        <div className="mt-24">
          <SectionReveal>
            <h3 className="mb-12 text-4xl leading-[1.4] tracking-tight md:text-5xl">Tres días sepultado  </h3>

            <div className="space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
              <p>
Los cuerpos de rescate se dirigieron rápidamente hacia donde él estaba. Ya no era el hotel donde laboró durante 18 años. Solo quedaba un cúmulo de escombros de lo que había sido su sitio de trabajo o una residencia para acoger a los visitantes que iban a Portoviejo. </p>

              <p className="text-white">
“Recibí una llamada del ECU, era una voz de un colombiano. Les dije: soy Pablo Córdoba y estoy completamente sano, por favor, quiero que me rescaten”, contó. En su voz y pese a los años aún se siente la alegría y la esperanza que le provocó aquella llamada telefónica.  </p>

              <p>
Le preguntaron dónde estaba y él les dio la ubicación exacta. “Estoy a unos 30 metros de la entrada del hotel, entre las calles Pedro Gual y Olmedo”. </p>            </div>
          </SectionReveal>
        </div>
      </motion.div>
    </section>
  );
}
