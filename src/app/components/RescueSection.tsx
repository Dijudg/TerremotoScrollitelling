import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { GalleryButton } from "./GalleryButton";
import { AudioStoryPlayer } from "./AudioStoryPlayer";
import { chronicle1Images } from "../content/chronicle1Media";
import { featuredPortraits, siteAudio } from "../content/siteMedia";
import { buildGallery, pickImage } from "../content/mediaUtils";

export function RescueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rescueImage = pickImage(chronicle1Images, 5);

  const rescueGallery = buildGallery(chronicle1Images, [
    "Equipos de rescate trabajando entre los escombros del hotel.",
    "Las labores de busqueda abrieron una ultima esperanza para Pablo.",
    "El momento del rescate quedo grabado en la memoria de su familia.",
    "La maquinaria removio capas enteras de concreto para llegar hasta el.",
  ], 2);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 py-32"
      style={{ position: "relative" }}
    >
      <motion.div className="absolute inset-0 opacity-30" style={{ y }}>
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${rescueImage}')` }} />
      </motion.div>

      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" style={{ opacity }}>
        <SectionReveal>
          <h2
            className="mb-16 inline-block text-5xl leading-[1.6] tracking-tight md:text-6xl"
            style={{ fontFamily: '"Finger Paint", cursive' }}
          >
            <span className="rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black box-decoration-clone">El rescate</span>
          </h2>

          <div className="space-y-10 text-lg leading-relaxed md:text-xl">
            <p className="text-gray-200">
              Minutos despues, Pablo escucho el taladro que rompia la gruesa estructura derrumbada. La punta de la herramienta entro cerca de sus pies.
            </p>

            <p className="text-gray-200">
              Tomo el liquido de una botella y dispuso otro tanto para limpiar su rostro. "Parecia el hombre de piedra", dijo con humor.
            </p>

            <p className="text-white">
              Las labores de rescate duraron aproximadamente dos horas. Cuando salio, solo levanto los brazos en senal de agradecimiento.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="relative my-24 h-[70vh] overflow-hidden rounded-lg"
          style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [70, -70]) }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${rescueImage}')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-6xl font-thin text-green-300/70 md:text-8xl">alivio</p>
            </div>
          </div>
        </motion.div>

        <SectionReveal>
          <div className="space-y-10 text-lg leading-relaxed md:text-xl">
            <p className="text-3xl font-light italic text-yellow-300 md:text-4xl">
              "Dios hizo conmigo un milagro, por eso mucha gente me llama Milagritos"
            </p>
          </div>
        </SectionReveal>

        <div className="mt-24 rounded-lg bg-black/30 p-10 backdrop-blur-sm">
          <SectionReveal>
            <h3 className="mb-12 text-4xl leading-[1.4] tracking-tight md:text-5xl">Su familia no perdio la esperanza</h3>

            <div className="space-y-8 text-lg leading-relaxed text-gray-200 md:text-xl">
              <p>
                Aquel domingo 17 de abril de 2016, la familia de Pablo Cordoba lo buscaba en hospitales y en las morgues improvisadas. Creyeron que habia muerto porque aparecio un cuerpo con caracteristicas similares.
              </p>

              <p>
                Su hijo entro a reconocerlo. Observo a un hombre delgado, de mediana estatura, encontrado en las inmediaciones del hotel El Gato, y supo que no era el.
              </p>

              <p className="text-white">
                Antes de quedar sepultado, Pablo habia sufrido un accidente que le dejo sin el dedo pulgar de la mano izquierda. Por ello, la esperanza de la familia Cordoba seguia intacta.
              </p>

              <p>
                Pese a que un leve temblor aun recorre su cuerpo, Pablo cuenta su historia desde el optimismo; ya no desde el miedo que le genero la oscuridad de los escombros.
              </p>

              <p className="text-xl text-white">
                Ya lo supero, reconoce con orgullo. Ahora quiere seguir viviendo con fe y agradecimiento.
              </p>
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16 space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
          <SectionReveal>
            <p>
              Antes de irse, recuerda que grabo un video mientras estaba sepultado. Lo hizo con su celular, el mismo aparato que no solo le salvo, sino que inmortalizo su historia.
            </p>

            <p>
              Se despide, se pone el casco y emprende la marcha por la Pedro Gual, aquella calle que todavia vibra por los recuerdos de quienes ya no estan y por las historias de quienes sobrevivieron.
            </p>

            <div className="pt-4">
              <AudioStoryPlayer
                src={siteAudio.pablo}
                image={featuredPortraits.pablo}
                imageAlt="Pablo Cordoba"
                label="Audio de Pablo Cordoba"
              />
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16">
          <GalleryButton images={rescueGallery} label="Ver imagenes del rescate" />
        </div>
      </motion.div>
    </section>
  );
}
