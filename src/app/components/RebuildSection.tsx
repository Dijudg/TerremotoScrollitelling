import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { GalleryButton } from "./GalleryButton";
import { chronicle2Images } from "../content/chronicle2Media";
import { buildGallery, pickImage } from "../content/mediaUtils";

export function RebuildSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rebuildImage = pickImage(chronicle2Images, 7);

  const reconstructionGallery = buildGallery(
    chronicle2Images,
    [
      "Nuevos espacios surgen donde antes habia escombros.",
      "La Plaza Memorial San Gregorio se levanta sobre la memoria de la ciudad.",
      "Trabajos de excavacion y preparacion del terreno para el memorial.",
      "La comunidad se reune para honrar a las victimas y construir el futuro.",
      "El reloj detenido a las 18:58 sigue como simbolo de memoria y esperanza.",
    ],
    2,
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32"
      style={{
        background: "linear-gradient(to bottom, #000000, #0f172a, #1e293b)",
        position: "relative",
      }}
    >
      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" style={{ opacity }}>
        <SectionReveal>
          <h2
            className="mb-16 inline-block text-5xl leading-[1.6] tracking-tight md:text-6xl"
            style={{ fontFamily: '"Finger Paint", cursive' }}
          >
            <span className="rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black box-decoration-clone">"Refundar" Portoviejo</span>
          </h2>

          <div className="space-y-10 text-lg leading-relaxed text-gray-200 md:text-xl">
            <p>
              El centro de comercio de Portoviejo era una estructura de seis pisos y el punto de encuentro de lugarenos y visitantes.
            </p>

            <p>
              Cercada con telas verdes y entre el sonido incesante de la maquinaria, Pincay cuenta que en ese punto se levanta la Plaza Memorial San Gregorio.
            </p>

            <p className="text-white">
              Alli se plasmaran los nombres de la familia de Javier, mientras la ciudad intenta reconstruirse sin renunciar a la memoria.
            </p>
          </div>
        </SectionReveal>

        <motion.div className="relative my-20 h-96 overflow-hidden rounded-lg" style={{ y }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${rebuildImage}')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </div>
        </motion.div>

        <SectionReveal>
          <div className="space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
            <p>
              Esta obra le llena de emocion. Mira los planos y recuerda que se han destinado 8,6 millones para su ejecucion y que contara con locales comerciales y un espacio de homenaje.
            </p>

            <p className="text-xl text-white">
              Tambien se colocara el reloj que se paro a las 18:58. Para algunos sera un duro recordatorio; para Pincay, un impulso para avanzar desde las oportunidades.
            </p>

            <p className="text-2xl font-light italic text-blue-300 md:text-3xl">
              "El dolor trae muchos aprendizajes. Todo es momentaneo".
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16">
          <GalleryButton images={reconstructionGallery} label="Ver fotos de la reconstruccion" theme="light" />
        </div>
      </motion.div>
    </section>
  );
}
