import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { chronicle3Images } from "../content/chronicle3Media";
import { featuredPortraits } from "../content/siteMedia";
import { pickImage } from "../content/mediaUtils";

const paragraphs = [
  'Ubicado entre las calles 24 de Mayo y De la Cultura, el centro comercial "Nuevo Tarqui" no termina de convencer a comerciantes como Laura Peralta, de 53 anos.',
  'Ella perdio su local en el Tarqui devastado, por lo que se traslado a este espacio en donde antes funcionaban las oficinas del Seguro Social que tambien se derrumbaron.',
  'Penso que al cambiarse a esas nuevas instalaciones podria cubrir sus deudas, pero no. Su casa esta hipotecada y su negocio aun no despega. "La ayuda nunca llego a quienes perdimos locales o casas".',
  'Por eso, Laura destaca el trabajo de John durante los anos posteriores al terremoto. "El si ha trabajado duro", destaca convencida.',
  '"He trabajado duro, pero nunca me dieron para reconstruir mi casa", enfatiza Vera, quien ya ajusta los 57 anos.',
  "Su casa quedo afectada por el edificio donde funcionaba un hotel. Cuando lo derribaron, botaron tambien su vivienda, por lo que el y su familia tuvieron que rentar un espacio para vivir.",
  'A esto se suma que el no acepto cambiarse de "Nuevo Tarqui", por lo que tuvo que seguir con su negocio como pescador y levantar su casa poco a poco.',
  "En estos 10 anos ha destinado cerca de USD 40.000 a la reconstruccion del primer piso de su casa; aun le faltan acabados y levantar el piso dos.",
  "No tiene que hacer mucho, porque la gente se ha puesto esquiva desde la tragedia. Tarqui esta tranquilo, sigue en terapia intensiva, pero su corazon aun late.",
];

export function FantasmaMarketSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollingParagraphs = paragraphs.slice(0, 3);
  const normalParagraphs = paragraphs.slice(3);

  const imageWidth = useTransform(scrollYProgress, [0, 0.4], ["100vw", "33.333vw"]);
  const imageLeft = useTransform(scrollYProgress, [0, 0.4], ["0vw", "33.333vw"]);
  const centerTitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const leftTitleOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const rightColumnOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const paragraphsY = useTransform(scrollYProgress, [0.4, 1], ["100vh", "-100vh"]);

  return (
    <>
      <section id="fantasma-market" ref={containerRef} className="relative bg-[#0a0a0a] text-black" style={{ height: "300vh" }}>
        <div className="sticky top-0 hidden h-screen w-full overflow-hidden bg-white md:block">
          <motion.div
            className="absolute top-0 z-10 h-screen overflow-hidden"
            style={{
              width: imageWidth,
              left: imageLeft,
            }}
          >
            <img src={featuredPortraits.laura} alt="Laura Peralta en Nuevo Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <motion.div className="absolute inset-0 bg-black/35" style={{ opacity: centerTitleOpacity }} />

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-start p-8 pb-5"
              style={{ opacity: centerTitleOpacity }}
            >
              <h2 className="font-heading max-w-4xl text-left text-3xl leading-[1.35] text-white md:text-5xl lg:text-6xl">
                "El mercado es un fantasma" de lo que fue...
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-0 left-0 z-20 flex h-screen w-[33.333vw] items-center justify-center pointer-events-none"
            style={{ opacity: leftTitleOpacity }}
          >
            <div className="-rotate-90 transform">
              <h3 className="font-heading whitespace-nowrap text-4xl font-bold leading-[1.4] text-black lg:text-5xl">
                "Nuevo Tarqui" no despega
              </h3>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-0 right-0 z-20 h-screen w-[33.333vw] overflow-hidden border-l border-gray-200"
            style={{ opacity: rightColumnOpacity }}
          >
            <motion.div className="flex w-full flex-col gap-12 px-10 xl:px-16" style={{ y: paragraphsY }}>
              {scrollingParagraphs.map((text, index) => (
                <div key={index} className="text-lg leading-relaxed text-black xl:text-xl">
                  <p>{text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex min-h-screen flex-col md:hidden">
          <div className="relative h-screen w-full">
            <img src={featuredPortraits.laura} alt="Laura Peralta en Nuevo Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-x-0 bottom-0 p-6 pb-5">
              <h2 className="font-heading text-left text-2xl leading-[1.35] text-white">
                "El mercado es un fantasma" de lo que fue...
              </h2>
            </div>
          </div>

          <div className="space-y-12 bg-white px-6 py-16">
            <h3 className="font-heading text-2xl font-bold leading-[1.5] text-black">
              "Nuevo Tarqui" no despega
            </h3>

            <div className="space-y-8">
              {scrollingParagraphs.map((text, index) => (
                <p key={index} className="text-lg leading-relaxed text-black">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full border-t border-gray-100 bg-white py-16 text-black md:py-24">
        <div className="container mx-auto max-w-3xl space-y-8 px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[pickImage(chronicle3Images, 9), pickImage(chronicle3Images, 10), pickImage(chronicle3Images, 11)].map((image, index) => (
              <div key={index} className="overflow-hidden rounded-2xl">
                <img src={image} alt="Nuevo Tarqui" loading="lazy" decoding="async" className="h-44 w-full object-cover" />
              </div>
            ))}
          </div>

          {normalParagraphs.map((text, index) => (
            <p key={index} className="text-lg leading-relaxed text-black md:text-xl">
              {text}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
