import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GalleryButton } from "../GalleryButton";
import { chronicle3Images } from "../../content/chronicle3Media";
import { featuredPortraits } from "../../content/siteMedia";
import { pickImage } from "../../content/mediaUtils";

const paragraphs = [
  'Ubicado entre las calles 24 de Mayo y De la Cultura, el centro comercial “Nuevo Tarqui” no termina de convencer a comerciantes como Laura Peralta, de 53 años. Ella perdió su local en el Tarqui devastado, por lo que se trasladó a este espacio en donde antes funcionaban las oficinas del Seguro Social que también se derrumbaron. ',
  'Pensó que al cambiarse a esas nuevas instalaciones podría cubrir sus deudas, pero no. Su casa está hipotecada y su negocio aún no despega.', 
  '“La ayuda nunca llegó a quienes perdimos locales o casas”. ',
  'Por eso, Laura destaca el trabajo de John durante los años posteriores al terremoto. “Él sí ha trabajado duro”, destaca convencida. ',
  '“He trabajado duro, pero nunca me dieron para reconstruir mi casa”, enfatiza Vera, quien ya ajusta los 57 años. ',
  'Su casa quedó afectada por el edificio donde funcionaba un hotel. Cuando lo derribaron, botaron también su vivienda, por lo que él y su familia tuvieron que rentar un espacio para vivir. Le costaba USD 400, los cuales salieron de su bolsillo.',
  "A esto se suma que él no aceptó cambiarse de “Nuevo Tarqui”, por lo que tuvo que seguir con su negocio como pescador. Con ello ha podido ir pagando poco a poco la reconstrucción de su casa. ",
  'En estos 10 años ha destinado cerca de USD 40.000 en la reconstrucción del primer piso de su casa; aún le faltan acabados y levantar el piso dos. “Nos quedaron debiendo bastante”, dice este mantense mientras vuelve a sus labores de venta en su local llamado ‘Iguana J.V.’ ',
  "No tiene que hacer mucho, porque la gente se ha puesto esquiva desde la tragedia del terremoto. El reloj marca las 12:00 -hora de gran movimiento comercial- y el sol es intenso, quema, y Tarqui está tranquilo, sigue en terapia intensiva, pero su corazón aún late… ",

];

const highlightedQuoteText = "He trabajado duro, pero nunca me dieron para reconstruir mi casa";
const highlightedQuoteFragments = [highlightedQuoteText, "La ayuda nunca"];
const isHighlightedQuoteParagraph = (text: string) =>
  highlightedQuoteFragments.some((fragment) => text.includes(fragment));

const fantasmaMarketGallery = [pickImage(chronicle3Images, 9), pickImage(chronicle3Images, 10), pickImage(chronicle3Images, 11)].map(
  (url) => ({ url }),
);

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
      <section
        id="fantasma-market"
        ref={containerRef}
        className="relative bg-white text-black md:h-[300vh] md:bg-[#0a0a0a]"
      >
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
            className="absolute top-0 right-0 z-20 h-screen w-[33.333vw] overflow-hidden"
            style={{ opacity: rightColumnOpacity }}
          >
            <motion.div className="flex w-full flex-col gap-12 px-10 xl:px-16" style={{ y: paragraphsY }}>
              {scrollingParagraphs.map((text, index) => {
                const isHighlightedQuote = isHighlightedQuoteParagraph(text);
                return (
                  <div key={index} className="text-lg leading-relaxed text-black xl:text-xl">
                    <p className={isHighlightedQuote ? "Finger-font text-left text-xl italic text-balance text-black" : undefined}>
                      {text}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex min-h-screen flex-col md:hidden">
          <div className="relative h-screen w-full">
            <img src={featuredPortraits.laura} alt="Laura Peralta en Nuevo Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
           
          </div>

          <div className="space-y-12 bg-white px-6 py-16">
            <h3 className="font-heading text-2xl font-bold leading-[1.5] text-black">
              "Nuevo Tarqui" no despega
            </h3>

            <div className="space-y-8">
              {scrollingParagraphs.map((text, index) => {
                const isHighlightedQuote = isHighlightedQuoteParagraph(text);
                return (
                  <p
                    key={index}
                    className={
                      isHighlightedQuote
                        ? "Finger-font text-left text-xl italic text-balance text-black"
                        : "text-lg leading-relaxed text-black"
                    }
                  >
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full bg-white py-16 text-black md:py-24">
        <div className="container mx-auto max-w-3xl space-y-8 px-6">
          <div className="pb-4 text-center">
            <GalleryButton images={fantasmaMarketGallery} label="Ver galeria de imágenes" theme="light" />
          </div>

          {normalParagraphs.map((text, index) => {
            const isHighlightedQuote = isHighlightedQuoteParagraph(text);
            return (
              <p
                key={index}
                className={
                  isHighlightedQuote
                    ? "Finger-font text-left text-xl italic text-balance text-black"
                    : "text-lg leading-relaxed text-black md:text-xl"
                }
              >
                {text}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
}
