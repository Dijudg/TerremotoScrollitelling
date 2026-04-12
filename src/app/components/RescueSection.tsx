import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { GalleryButton } from "./GalleryButton";
import { AudioStoryPlayer } from "./AudioStoryPlayer";
import { chronicle1Images } from "../content/chronicle1Media";
import { featuredPortraits, siteAudio } from "../content/siteMedia";
import { buildGallery, pickImage } from "../content/mediaUtils";
import rescueUnderHotelImage from "../../assets/img/Cronica1/rescate-bajohotel-Foto-ElDiariodeEcuador.jpg";

export function RescueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rescueImage = rescueUnderHotelImage;

  const rescueGallery = buildGallery(chronicle1Images, [
    "Equipos de rescate trabajando entre los escombros del hotel.",
    "Las labores de busqueda abrieron una ultima esperanza para Pablo.",
    "El momento del rescate quedo grabado en la memoria de su familia.",
    "La maquinaria removio capas enteras de concreto para llegar hasta el.",
  ], 2);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen from-neutral-800 via-zinc-700 to-zinc-600 py-32"
      style={{ position: "relative" }}
    >
      <motion.div className="absolute inset-0 opacity-10" style={{ y }}>
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${rescueImage}')` }} />
      </motion.div>

      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" style={{ opacity }}>
        <SectionReveal>
          <div className="space-y-10 text-lg leading-relaxed md:text-xl">
            <p className="text-gray-200">
Minutos después, Pablo escuchó el taladro que rompía la gruesa estructura derrumbada. La punta de esta herramienta entró cerca de sus pies. Se asustó, pero su alegría era tan grande que pidió agua. Sin antes recordar que durante esos días tuvo que tomarse su orina para “aguantar”.             </p>

            <p className="text-gray-200">
Tomó el líquido de la botella y dispuso otro tanto para limpiar su rostro. “Parecía el hombre de piedra”, dijo con humor.             </p>

            <p className="text-white">
Las labores de rescate duraron aproximadamente dos horas. Cuando salió solo levantó los brazos en señal de agradecimiento.            </p>
          </div>
        </SectionReveal>

        <motion.div
              className="text-xl text-white md:text-2xl pt-24"
              initial={{ opacity: 0, y: 56, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.55 }}
            >
              <motion.div
                className=" flex items-center justify-center gap-4"
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
Dios hizo conmigo un milagro, por eso mucha gente me llama Milagritos                </span>
                <span className="text-9xl  text-yellow-300 pt-10 Finger-font" >”</span>

              </motion.div>

            </motion.div>

        <motion.div
          className="relative my-24 h-[70vh] overflow-hidden rounded-lg"
          style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [70, -70]) }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${rescueImage}')` }}>
          
            
          </div>
      
         
        </motion.div>
 <figcaption className="-mt-10 border-l border-white/20 pl-4 text-xs leading-relaxed text-white/55 md:text-sm">
            Rescate de Pablo Córdoba, el "Milagrito de Portoviejo". Foto: El Diario de Ecuador.            </figcaption>
        

        <div className="mt-24 rounded-lg bg-white p-10 backdrop-blur-sm">
          <SectionReveal>
            <h3 className="mb-12 text-4xl leading-[1.4]   text-black tracking-tight md:text-5xl">Su familia no perdió la esperanza </h3>

            <div className="space-y-8 text-lg leading-relaxed text-black md:text-xl">
              <p>
Aquel domingo 17 de abril de 2016, la familia de Pablo Córdoba lo buscaba en hospitales y en las morgues improvisadas. Creyeron que había muerto, porque apareció un cuerpo con características similares.               </p>

              <p>
Su hijo entró a reconocerlo. Observó un hombre delgado, de mediana estatura, de aproximadamente 50 años, que fue encontrado en las inmediaciones del hotel ‘El Gato’. Entró con un nudo en la garganta, vio el cuerpo y logró tragar la saliva. “Supo que no era yo, porque la persona tenía sus cinco dedos”.               </p>

              <p className="text-grey-200">
Antes de quedar sepultado, Pablo había sufrido un accidente que le dejó sin el dedo pulgar de la mano izquierda. Por ello, la esperanza de la familia Córdoba seguía intacta, más cuando recibieron la llamada.               </p>

<p>Esas llamadas que durante el terremoto llenaban de esperanza o también de dolor… “Mi esposa fue trasladada conmigo hasta la clínica, porque se desmayó de la impresión”, dice entre risas. </p>
              <p>
Pese a que un leve temblor aún recorre su cuerpo, Pablo cuenta su historia desde el optimismo; ya no desde el miedo que le generó la oscuridad de los escombros del hotel o de la cueva que alguna vez soñó.               </p>

              <p className="text-xl">
Ya lo superó, reconoce con orgullo. ¿Y ahora qué sigue? La respuesta es fácil: seguir viviendo con fe y agradecimiento a Dios.               </p>
            </div>
          </SectionReveal>
        </div>

        <div className="mt-16 space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
          <SectionReveal>
            <p>
Antes de irse, recuerda que grabó un video mientras estaba sepultado. Lo hizo con su celular que no solo le salvó sino que inmortalizó su historia. Promete enviar el material que lo guarda celosamente en una flash, pero no sabe bien cómo mandarlo; así que prefiere que una compañera de su trabajo lo haga.             </p>

            <p>
Ahora sí se despide. Dice que tiene que hacer un trámite antes de las 17:00 y para que el reloj marque esa hora falta muy poco. Se apresura, se pone su casco y emprende la marcha por la Pedro Gual, aquella calle que aún vibra… por los recuerdos de los que ya no están o por las historias de quienes sobrevivieron.            </p>

            <div className="pt-10">
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
