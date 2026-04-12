import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { GalleryButton } from "./GalleryButton";
import { HorizontalScrollytelling } from "./HorizontalScrollytelling";
import { LayeredHeadline } from "./LayeredHeadline";
import { AudioStoryPlayer } from "./AudioStoryPlayer";
import { ScrollStepRevealPanel } from "./ScrollStepRevealPanel";
import { chronicle2Images } from "../content/chronicle2Media";
import { featuredPortraits, siteAudio } from "../content/siteMedia";
import { buildGallery, pickImage } from "../content/mediaUtils";

const javierSections = [
  {
    title: "Vivir el luto y renacer",
    text: "La calle Pedro Gual tiene un flujo alto de carros, pero ya no es la misma. Antes del terremoto era considerada el corazon comercial de Portoviejo.",
    img: pickImage(chronicle2Images, 0),
  },
  {
    text: "Esta zona ostentaba edificios de seis pisos o mas con un gran movimiento peatonal y vehicular. La tarde del 16 de abril de 2016 no fue la excepcion.",
    img: pickImage(chronicle2Images, 1),
  },
  {
    text: "Eran las 18:58 y el vehiculo de la familia de Javier Pincay esperaba el cambio a verde, pero este caprichosamente no llego. En contraste, un fuerte sacudon estremecio la ciudad.",
    img: pickImage(chronicle2Images, 2),
  },
  {
    text: "Debajo de los escombros quedaron su esposa Vicky y dos de sus hijos. Javier aun habla de ellos con una mezcla de dolor y gratitud.",
    img: featuredPortraits.javier,
  },
  {
    text: "El edificio del Seguro Social ya no esta; solo queda el espacio cercado por una reja negra y el cesped creciendo en silencio.",
    img: pickImage(chronicle2Images, 3),
  },
  {
    text: "Marco al numero del celular y no tuvo respuesta. Tambien llamo a su suegra y a sus cunadas, pero nada funcionaba. Solo quedaba insistir.",
    img: pickImage(chronicle2Images, 4),
  },
  {
    text: "Busco a su familia a oscuras, guiandose apenas por la intuicion y por el recorrido que imaginaba del vehiculo por las calles de Portoviejo.",
    img: pickImage(chronicle2Images, 5),
  },
  {
    text: "Al siguiente dia los encontro. El carro con su familia yacia debajo de los escombros de lo que fue el edificio del Seguro Social.",
    img: pickImage(chronicle2Images, 6),
  },
];

export function JavierSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const javierGallery = buildGallery(
    chronicle2Images,
    [
      "La calle Pedro Gual antes del terremoto, el corazon comercial de Portoviejo.",
      "La esquina donde la familia Pincay quedo atrapada bajo los escombros.",
      "Javier Pincay, de victima a alcalde comprometido con la reconstruccion.",
      "El duelo se transformo en una nueva razon para seguir adelante.",
    ],
    1,
  );

  const javierAudioPlayers = [
    {
      label: "Audio de Javier 1",
      src: siteAudio.javier,
      image: featuredPortraits.javier,
      alt: "Javier Pincay",
    },
    {
      label: "Audio de Javier 2",
      src: siteAudio.javier,
      image: featuredPortraits.javier,
      alt: "Javier Pincay",
    },
    {
      label: "Audio de Javier 3",
      src: siteAudio.javier,
      image: featuredPortraits.javier,
      alt: "Javier Pincay",
    },
  ];

  return (
    <section id="cronica-2" ref={sectionRef} className="relative bg-black pt-32 pb-16">
      <div className="absolute top-0 left-0 right-0 z-0 h-32 bg-gradient-to-b from-zinc-900 to-black" />

      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" style={{ opacity }}>
        <SectionReveal>
          <div className="mb-20 text-center">
            <div className="mb-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
            <p className="text-sm uppercase tracking-widest text-gray-400">Cronica 2</p>
            <div className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </SectionReveal>

        <SectionReveal>
          <h2
            className="font-heading mb-16 inline-block text-5xl leading-[1.6] tracking-normal md:text-6xl"
          >
            <LayeredHeadline
              lines={[
                "Javier Pincay, vivir el luto",
                "y renacer junto a su hijo",
              ]}
            />
          </h2>
        </SectionReveal>
      </motion.div>

      <HorizontalScrollytelling sections={javierSections} />

      <ScrollStepRevealPanel image={featuredPortraits.javier} alt="Javier Pincay" contentClassName="overflow-y-auto py-16">
        <div className="w-full max-w-4xl space-y-5">
          {javierAudioPlayers.map((player) => (
            <AudioStoryPlayer
              key={player.label}
              src={player.src}
              image={player.image}
              imageAlt={player.alt}
              label={player.label}
            />
          ))}
        </div>
      </ScrollStepRevealPanel>

      <motion.div className="container mx-auto relative z-10 mt-24 mb-16 flex max-w-4xl justify-center px-6">
        <GalleryButton images={javierGallery} label="Ver historia de Javier" />
      </motion.div>
    </section>
  );
}
