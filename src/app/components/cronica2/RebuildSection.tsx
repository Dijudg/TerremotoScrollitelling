import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "../SectionReveal";
import { GalleryButton } from "../GalleryButton";
import { chronicle2ReconstructionImages } from "../../content/chronicle2Media";
import javierHistoriaHijoImage from "../../../assets/img/Cronica2/JavierPicay-portoviejo-historiahijo.jpg";

export function RebuildSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rebuildImage = javierHistoriaHijoImage;

  const getImageDescription = (url: string) => {
    const fileName = decodeURIComponent(url.split("/").pop() ?? "")
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return fileName;
  };

 const reconstructionGallery = [
  {
    url: chronicle2ReconstructionImages[0],
    caption: "Calles Pedro Gual y Chile 2026",
    credit: "Crédito: El Telégrafo",
  },
  {
    url: chronicle2ReconstructionImages[1],
    caption: "Superficie donde se encontraba el Hotel el Gato.",
    credit: "Crédito: El Telégrafo",
  },
  {
    url: chronicle2ReconstructionImages[2],
    caption: "Vista aérea donde se levantava el edificio del IESS en Portoviejo.",
    credit: "Crédito: El Telégrafo",
  },
  {
    url: chronicle2ReconstructionImages[3],
    caption: "Predio del antiguo edificio del IESS en Portoviejo.",
    credit: "Crédito: El Telégrafo",
  },
  {
   url: chronicle2ReconstructionImages[5],
    caption: "Javier Pincay, alcalde de Portoviejo, muestra la obra donde se levantará la nueva Plaza San Gregorio.",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[6],
    caption: "Área donde se levanta la Plaza Memorial San Gregorio.",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[7],
    caption: "Predio abandonado del antiguo edificio del IESS en Portoviejo.",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[8],
    caption: "Lugar donde fallecieron Familiares de Javier Pincay, alcalde de Portoviejo.",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[9],
    caption: "Secuelas terremoto",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[10],
    caption: "Secuelas terremoto en las inmediaciones del antiguo Hotel el Gato.",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[11],
    caption: "Daño estructural en edificios debido al terremeoto.",
    credit: "Crédito: El Telégrafo",
  },
   {
   url: chronicle2ReconstructionImages[12],
    caption: "Terreno donde se encontraba el Hotel el Gato.",
    credit: "Crédito: El Telégrafo",
  },
   
];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white py-32 text-black"
      style={{ position: "relative" }}
    >
      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" style={{ opacity }}>
        <SectionReveal>
          <h2
            className="font-heading mb-16 inline-block text-5xl leading-[1.6] tracking-normal md:text-6xl"
          >
            <span className="rounded-2xl bg-[#E5E7EB] px-6 py-2 text-black box-decoration-clone">“Refundar” Portoviejo</span>
          </h2>

          <div className="space-y-10 text-lg leading-relaxed text-gray-800 md:text-xl">
            <p>
El centro de comercio de Portoviejo era una estructura de seis pisos y el punto de encuentro de los lugareños y visitantes. “Antes del terremoto, todos decíamos: encontrémonos en el centro comercial para hacer tal o cual trámite y sabíamos a dónde llegar”, dice Pincay, quien está parado sobre aquella enorme explanada de tierra. 
            </p>
            <p>
Cercada con telas verdes y entre el sonido incesante de la maquinaria y de las mezcladoras, Pincay cuenta que en ese punto se levanta la ‘Plaza Memorial San Gregorio’ en honor a las <strong>672 víctimas</strong> que perecieron en el terremoto de Manabí y Esmeraldas. 
            </p>
            <p className="text-black">
Ahí, por ejemplo, se plasmarán los nombres de la familia de Javier, quien ha acelerado los trabajos desde su actual cargo como alcalde de la ciudad, para que una parte se inaugure el 16 de abril cuando se cumplen 10 años del terremoto. 
            </p>  
            </div>
        </SectionReveal>

        <motion.div className="relative my-20 h-96 overflow-hidden rounded-lg" style={{ y }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${rebuildImage}')` }} />
        </motion.div>
    <div className="mb-12 text-center">
          <GalleryButton images={reconstructionGallery} label="Ver fotos " theme="light" />
        </div>
        <SectionReveal>
          <div className="space-y-8 text-lg leading-relaxed text-gray-800 md:text-xl">
            <p>
Esta obra le llena de emoción. Mira los planos y recuerda que se han destinado cerca de <strong>USD 8,6 millones</strong> para su ejecución. El monto responde a que contará con locales comerciales, la placa de homenaje a las víctimas y una plaza para disfrutar de comidas y bebidas. 
            </p>
            <p className="text-xl text-black">
También <strong>se colocará el reloj que se paró a las 18:58,</strong> hora exacta del terremoto. Para algunos será un cruel recordatorio de aquel fatídico día que enlutó a Ecuador, pero para Pincay es un impulso para avanzar desde las oportunidades. 
            </p>
            <p className=" text-xl text-bold italic  Finger-font">
“El dolor (por la pérdida de su familia) trae muchos aprendizajes. El estar en una cama muriendo también. En mi mente solo decía: ya pasará, ya pasará, ya pasará, todo es momentáneo”. 
            </p>
            </div>
        </SectionReveal>

    
      </motion.div>
    </section>
  );
}
