import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "../SectionReveal";
import { GalleryButton } from "../GalleryButton";
import { HorizontalScrollytelling } from "../HorizontalScrollytelling";
import { LayeredHeadline } from "../LayeredHeadline";
import { LossSection } from "./LossSection";
import { chronicle2HorizontalImages, chronicle2HorizontalMobileImages, chronicle2Images } from "../../content/chronicle2Media";
import { featuredPortraits } from "../../content/siteMedia";
import { buildGallery, pickImage } from "../../content/mediaUtils";
import jeremyMobileImage from "../../../assets/img/Cronica2/imagen-jeremymovil.png";

const javierSections = [
  {
    text: "La calle Pedro Gual tiene un flujo alto de carros, pero ya no es la misma. Hace 10 años, en una de sus intersecciones funcionaba el centro de comercio más importante de Portoviejo y, aunque suene cliché, antes del terremoto era considerado el corazón de esta ciudad.",
    img: pickImage(chronicle2HorizontalImages, 0),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 0),
    textContainerClassName: "md:items-start md:justify-start md:text-left",
    contentClassName: "md:my-0 md:max-w-[42rem]",
  },
  {
    text: "Esta zona ostentaba edificios de seis pisos o más con un gran movimiento peatonal y vehicular. La tarde-noche del sábado 16 de abril de 2016 no fue la excepción. En la esquina de la Pedro Gual y Chile, decenas de carros circulaban con normalidad hasta que el semáforo cambió a rojo.",
    img: pickImage(chronicle2HorizontalImages, 1),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 1),
    textContainerClassName: "md:items-start md:justify-center md:text-center",
    contentClassName: "md:my-0 md:max-w-[44rem]",
  },
  {
    text: "Eran las 18:58 y el vehículo de la familia Pincay esperaba el cambio a verde, pero este caprichosamente no llegó. En contraste, un fuerte sacudón estremeció la ciudad costera. Las paredes y las ventanas mostraron su fragilidad ante el devastador sismo y, a la par, se convirtieron en “armas letales”.\n\nChocaban sin piedad sobre carros y decenas de personas, a las que la oscuridad les llegaba casi de inmediato. El ruido dolía y se difundió cual rumor en las calles para luego dar paso a la nada, al vacío.",
    img: pickImage(chronicle2HorizontalImages, 2),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 2),
    textContainerClassName: "md:items-stretch md:justify-center",
    contentClassName: "md:my-0 md:flex md:h-full md:w-full md:max-w-none md:items-start md:justify-between md:gap-16 md:py-20 md:space-y-0 md:[&>p:first-of-type]:max-w-[42rem] md:[&>p:first-of-type]:text-left md:[&>p:last-of-type]:ml-auto md:[&>p:last-of-type]:max-w-[30rem] md:[&>p:last-of-type]:self-end md:[&>p:last-of-type]:text-right",
  },
  {
    text: "Debajo de los escombros quedaron su esposa Vicky, con quien había compartido 20 años de matrimonio, y sus dos hijos de 7 y 11 años con quienes vivió momentos que lo mantienen vivo y que aún le sacan sonrisas.",
    img: pickImage(chronicle2HorizontalImages, 3),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 3),
    textContainerClassName: "md:items-start md:justify-center md:text-center",
    contentClassName: "md:my-0 md:max-w-[44rem]",
  },
  {
    text: "“Tenía una mujer hermosa y unos hijos maravillosos. Eran lo más lindo que me pudo dar la vida”, señala Javier Pincay, mientras dibuja una sonrisa y reflexiona que hay personas que les hubiera gustado tener una familia como la que él tenía. \n\nY es que es tan difícil preguntar sobre la pérdida de sus seres queridos a pocos metros de distancia de donde ocurrió todo. Pero Javier no tiene problema en contar que, 10 años después, aquella esquina luce diferente.",
    img: pickImage(chronicle2HorizontalImages, 4),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 4),
  },
  {
    text: "El edificio de seis pisos que aplastó a su familia ya no está; solo queda el espacio cercado por una reja negra conteniendo el césped crecido; en total calma.\n\nTampoco está aquella escena apocalíptica que vio mientras buscaba a su familia.",
    img: pickImage(chronicle2HorizontalImages, 5),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 5),
    textContainerClassName: "md:items-center md:justify-center",
    contentClassName: "md:my-0 md:flex md:w-full md:max-w-none md:items-center md:justify-between md:gap-16 md:space-y-0 md:[&>p:first-of-type]:max-w-[34rem] md:[&>p:first-of-type]:text-left md:[&>p:last-of-type]:max-w-[30rem] md:[&>p:last-of-type]:text-right",
  },
  {
    text: "Marcó al número del celular y no tuvo respuesta. También llamó a su suegra y cuñadas, pero nada funcionaba. Insistía. No podía hacer otra cosa, porque tenía la esperanza de encontrarlos con vida. \n\n “Vicky”, gritaba repetidamente, pero no había respuesta. Pensaba que tal vez su esposa tocaría el claxon y él llegaría a rescatarlos.",
    img: pickImage(chronicle2HorizontalImages, 6),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 6),
  },
  {
    text: "Los minutos pasaban y él dibujaba mapas en su mente para seguir el rastro del vehículo por las calles de Portoviejo. Pero sus esfuerzos no dieron frutos. \n\n Al siguiente día los encontró. El carro con su esposa, dos de sus tres hijos, su suegra, sus cuñadas y su sobrino yacían debajo de los escombros de lo que fue el edificio del Seguro Social.",
    img: pickImage(chronicle2HorizontalImages, 7),
    mobileImg: pickImage(chronicle2HorizontalMobileImages, 7),
  },
];
export function JavierSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  

  return (
    <section ref={sectionRef} className="relative bg-black pt-32 pb-16">
      <div className="absolute top-0 left-0 right-0 z-0 h-32 bg-gradient-to-b from-zinc-900 to-black" />

      <motion.div className="container mx-auto relative z-10 max-w-4xl px-6" >
        <SectionReveal>
          <div className="mb-20 text-center">
            <div className="mb-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
            <p className="text-sm uppercase tracking-widest text-gray-400">Crónica 2</p>
            <div className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        </SectionReveal>

        <SectionReveal>
          <h2
            className="font-heading mx-auto mb-16 flex max-w-4xl justify-center text-center text-xl leading-[1.2] tracking-normal md:text-5xl lg:text-4xl"
          >
            <LayeredHeadline
              align="center"
              lines={[
                "Javier Pincay,",
                "no llorar sino hacer pañuelos ",
                "para los que sufren",
              ]}
            />
          </h2>
        </SectionReveal>
      </motion.div>

      <HorizontalScrollytelling
        sections={javierSections}
        imageOverlayClassName="bg-black/25"
        mobileImageOverlayClassName="bg-transparent"
      />

      <LossSection />

      

      <div className="container mx-auto relative z-10 mt-10 mb-12 px-6 md:hidden">
        <img
          src={jeremyMobileImage}
          alt="Jeremy en Portoviejo"
          loading="lazy"
          decoding="async"
          className="w-full rounded-md object-cover"
        />
      </div>
    </section>
  );
}

