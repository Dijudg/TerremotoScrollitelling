import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { GalleryButton } from "./GalleryButton";
import { LayeredHeadline } from "./LayeredHeadline";
import { chronicle3Images } from "../content/chronicle3Media";
import { buildGallery, pickImage } from "../content/mediaUtils";

export function MemorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
  const memorialImage = pickImage(chronicle3Images, 0);

  const memorialGallery = buildGallery(
    chronicle3Images,
    [
      "Un espacio para honrar a las victimas y a quienes siguen reconstruyendo su historia.",
      "Flores, velas y nombres que resisten al olvido.",
      "Familias reunidas por la memoria en cada aniversario del terremoto.",
      "El memorial como simbolo de resiliencia para Manabi.",
      "El reloj detenido a las 18:58 sigue marcando el instante que lo cambio todo.",
    ],
    6,
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #1e293b, #0f172a, #020617)",
        position: "relative",
      }}
    >
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${memorialImage}')` }} />

      <motion.div
        className="container mx-auto relative z-10 max-w-5xl px-6 py-32 text-center"
        style={{ opacity, scale }}
      >
        <SectionReveal>
          <div className="mb-16 inline-block">
            <div className="relative mx-auto h-64 w-64">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="mb-2 text-7xl font-light text-[#d72638]">18:58</div>
                  <div className="text-sm uppercase tracking-widest text-gray-400">16 de abril, 2016</div>
                </motion.div>
              </div>

              <motion.div
                className="absolute top-1/2 left-1/2 h-20 w-1 origin-bottom -translate-x-1/2 -translate-y-full bg-white"
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 114 }}
                transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "bottom center" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 h-28 w-1 origin-bottom -translate-x-1/2 -translate-y-full bg-white/60"
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 348 }}
                transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "bottom center" }}
              />
              <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </div>
          </div>
        </SectionReveal>

        <div className="mx-auto max-w-3xl space-y-12">
          <SectionReveal>
            <h2
              className="mb-8 inline-block text-4xl leading-[1.6] tracking-tight md:text-5xl lg:text-6xl"
              style={{ fontFamily: '"Finger Paint", cursive' }}
            >
              <LayeredHeadline
                lines={[
                  "Un momento que",
                  "cambio para siempre",
                ]}
                align="center"
              />
            </h2>

            <p className="text-xl leading-relaxed text-gray-300 md:text-2xl">
              672 vidas perdidas. Miles de familias transformadas. Una ciudad reconstruyendose desde la memoria.
            </p>

            <p className="text-lg leading-relaxed text-gray-400 md:text-xl">
              El reloj detenido a las 18:58 no es solo un simbolo del pasado, sino un recordatorio de la resiliencia, la esperanza y la capacidad humana de renacer incluso desde las ruinas mas profundas.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-24 mb-16">
          <SectionReveal>
            <div className="inline-block rounded-lg border border-white/20 px-12 py-8 backdrop-blur-sm">
              <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">Plaza Memorial San Gregorio</p>
              <p className="text-base italic text-gray-300">En memoria de todas las victimas del terremoto de Manabi.</p>
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16 mb-16">
          <GalleryButton images={memorialGallery} label="Ver imagenes del memorial" theme="light" />
        </div>

        <div className="mt-32 space-y-6">
          <SectionReveal>
            <div className="mx-auto mb-8 h-px w-48 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <p className="text-sm uppercase tracking-widest text-gray-500">Historias que no se olvidan</p>
            <p className="text-xs text-gray-600">Pablo Cordoba • Javier Pincay • Betty • John Vera • Las 672 victimas</p>
          </SectionReveal>
        </div>

        <motion.div
          className="mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          viewport={{ once: true }}
        >
          <div className="h-32" />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
