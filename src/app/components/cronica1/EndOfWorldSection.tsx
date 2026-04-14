import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "../SectionReveal";
import { chronicle1Images } from "../../content/chronicle1Media";
import { pickImage } from "../../content/mediaUtils";

export function EndOfWorldSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black py-32 md:py-40"
      style={{ position: "relative" }}
    >
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{ y: imageY, scale: imageScale }}
        aria-hidden="true"
      >
        <img
          src={pickImage(chronicle1Images, 2)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(215,38,56,0.24),_transparent_38%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        <SectionReveal>
          <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[#d72638]">
            16 de abril de 2016
          </p>
          <h2
            className="font-heading mb-16 inline-block text-5xl leading-[1.45] tracking-normal md:text-7xl"
          >
            <span className="rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black box-decoration-clone">
              Sepultado vivo
            </span>
          </h2>

          <div className="space-y-9 text-lg leading-relaxed text-gray-200 md:text-xl">
            <p>
Pablo tenía razón al sentirse incómodo. A las 18:58, un fuerte terremoto azotó Manabí. El movimiento fue tan intenso que edificaciones como el hotel ‘El Gato’ se vinieron abajo con un estruendo. Las paredes y las columnas parecían construidas con arena; simplemente se desplomaron, dejando las losas apiladas al igual que una torre de ‘pancakes’.  </p>

            <p>
Cientos de personas fallecieron entre los escombros. Según cifras oficiales del gobierno de ese entonces, <span className="font-bold text-yellow-400">672 personas perecieron</span>. De hecho, se convirtió en el más fuerte de los últimos 67 años desde el terremoto de Ambato en agosto de 1949. Y uno de los más mortales, solo superado por el de Colombia en 1999 en el que murieron más de 1.000 ciudadanos.       </p>

          </div>
        </SectionReveal>
      </div>

      
    </section>
  );
}
