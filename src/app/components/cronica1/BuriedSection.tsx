import { type MouseEvent, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { SectionReveal } from "../SectionReveal";
import { HorizontalScrollytelling } from "../HorizontalScrollytelling";
import { AmbientSound } from "../AmbientSound";
import { useIsMobile } from "../ui/use-mobile";
import { chronicle1HorizontalImages, chronicle1HorizontalMobileImages } from "../../content/chronicle1Media";
import { pickImage } from "../../content/mediaUtils";
import buriedAliveImage from "../../../assets/img/Cronica1/horizontal/enterradovivo.png";

const storySections = [
  {
   
    text: "Acostado, trató de auscultarse y sentir su cuerpo: manos, piernas, espalda. Todo estaba bien, pero tenía sed. De repente sintió entre sus piernas algo cilíndrico. ¿Era una botella de agua, de esas que acomodó hace escasos minutos? Empezó a moverse, como pudo, deslizándose hábilmente hasta llegar al objeto anhelado. Pero cuando lo tuvo en sus manos supo que no era lo que buscaba. Era algo más: una linterna. \n\nNo calmó su sed, pero el aparato se convirtió en uno de los insumos más importantes para salvar su vida. ",
    img: pickImage(chronicle1HorizontalImages, 0),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 0),
    textContainerClassName: "md:text-lg md:items-start md:justify-end md:text-right",
    contentClassName: "md:my-0 md:max-w-[42rem]",
  },
  {
    text: " Con dificultad, aún atrapado entre la losa destruida, evidenció la devastación total. “El fin del mundo -parecía-, ya que había mucho polvo, desolación y gritos que estremecían”. También alcanzó a ver el celular que le regaló su hija cuando cumplió años. Estaba destruido.  ",
    img: pickImage(chronicle1HorizontalImages, 1),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 1),
    textContainerClassName: "md:items-end md:justify-start",
    contentClassName: "md:my-0 md:max-w-[42rem]",
  },
  {
    text: "Como si se tratara de un rompecabezas, improvisó para arreglar el dispositivo. Oprimió el botón de encendido y una luz tenue iluminó la cara de Pablo, quien sintió una ligera esperanza de salvarse. Marcó el número de su esposa, hijos y demás familiares y ninguno contestó. La red de celular estaba caída; al igual que el resto de servicios: luz, agua, internet. Nada servía. ",
    img: pickImage(chronicle1HorizontalImages, 2),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 2),
    textContainerClassName: "md:items-start md:justify-center md:text-center",
    contentClassName: "md:my-0 md:max-w-[48rem]",
  },
  {
    text: "\"Era el apocalipsis\", cuenta mientras modula su voz, la cual a veces tiembla entre tantos recuerdos. Siguió intentando durante varios minutos, pero temía que la batería se acabara, por lo que apagó el teléfono para ahorrar energía.  \n\nSu cuerpo seguía paralizado y la sed acariciaba con fuerza su garganta. La oprimía, pero no tenía opciones. Bueno, una: beber su propia orina. Trató de que el líquido que sale de su cuerpo fluya lentamente hacia su mano, la cual sintió por unos momentos aquella calidez; luego subió hacia sus labios e irrigó su boca con dirección hacia su garganta. Liberándola. \"Eso calmó mis ansias y pude sobrevivir\".",
    img: pickImage(chronicle1HorizontalImages, 3),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 3),
  },
  {
    title: "Un sueño o una premonición",
    text: "Enterrado entre los restos del hotel, escuchaba los  gritos de las personas que pedían ayuda. Él hacía lo mismo, pero nadie lo escuchaba. Un niño creyó oírlo, le avisó a un adulto, pero este no logró escucharlo y se fueron. Golpeaba con un fierro las paredes y lo ignoraban. \n\nParecía que esos gruesos escombros del hotel de cinco pisos se convirtieron en aquella cueva que tanto miedo le causó meses antes del terremoto.  ",
    img: pickImage(chronicle1HorizontalImages, 4),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 4),
    textContainerClassName: "md:items-start md:justify-end md:text-right",
    contentClassName: "md:my-0 md:max-w-[28rem]",
    titleClassName: "md:text-right",
  },
  {
    text: "En el presente, Pablo pisa con cuidado el césped donde antes se situaba ‘El Gato’ y este recuerdo se le interpuso. Un año antes del terremoto, un amigo de Pablo estudiaba Geografía y le gustaba ingresar a cuevas para buscar restos o analizar el suelo, por lo que le sugirió entrar a la cueva de su finca. \n\n“Era una cueva grande y ya teníamos todo”, reconoció. En una mochila pusieron sogas y cabos que les ayudarían a no perderse dentro de la tierra. Lo único que faltaba era la fecha para irse de aventura. Nunca se concretó. \n\n Tras la conversación con su amigo, Pablo empezó a tener varios sueños a modo de profecía  en el que la cueva se le venía encima. Todo se desmoronaba y su cabeza quedaba aplastada por la tierra. ",
    img: pickImage(chronicle1HorizontalImages, 5),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 5),
  },
  {
    text: "Tras la conversación con su amigo, Pablo empezó a tener varios sueños a modo de profecía  en el que la cueva se le venía encima. Todo se desmoronaba y su cabeza quedaba aplastada por la tierra.   ",
    img: pickImage(chronicle1HorizontalImages, 6),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 6),
    textContainerClassName: "md:items-center md:justify-start md:p-12",
    contentClassName: "md:my-0 md:max-w-[33vw]",
  },
  {
    text: "Le contó a su esposa el sueño y ella le respondió: “No digas eso. No seas molestoso”. Aquella imagen le marcó. Por eso decidió “hacerse el loco” con su amigo y no fue a la aventura.  ",
    img: pickImage(chronicle1HorizontalImages, 7),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 7),
    textContainerClassName: "md:items-start md:justify-end md:pr-32 md:pt-32 md:text-right",
    contentClassName: "md:my-0 md:max-w-[33vw]",
    paragraphClassName: "whitespace-pre-line",
  },
];

export function BuriedSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pointerLightX = useMotionValue(48);
  const pointerLightY = useMotionValue(42);
  const smoothPointerLightX = useSpring(pointerLightX, { stiffness: 180, damping: 26, mass: 0.35 });
  const smoothPointerLightY = useSpring(pointerLightY, { stiffness: 180, damping: 26, mass: 0.35 });
  const pointerLightLeft = useMotionTemplate`${smoothPointerLightX}%`;
  const pointerLightTop = useMotionTemplate`${smoothPointerLightY}%`;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lightIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]);
  const buriedImageY = useTransform(scrollYProgress, [0, 0.45, 1], [20, -110, -240]);
  const buriedImageScale = useTransform(scrollYProgress, [0, 0.42, 0.72, 1], [1.12, 1, 0.86, 0.68]);
  const buriedImageRotate = useTransform(scrollYProgress, [0, 0.45, 1], [-9, 4, -7]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top) / rect.height) * 100;

    pointerLightX.set(Math.min(100, Math.max(0, nextX)));
    pointerLightY.set(Math.min(100, Math.max(0, nextY)));
  };

  const handleMouseLeave = () => {
    pointerLightX.set(48);
    pointerLightY.set(42);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-x-clip"
      style={{
        background: "linear-gradient(to bottom, #000000, #0a0a0a, #000000)",
        position: "relative",
      }}
    >
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute top-0 left-1/2 h-full w-96 -translate-x-1/2 transform"
          style={{ opacity: lightIntensity }}
        >
          <div className="h-full w-full bg-gradient-to-b from-yellow-500/20 via-yellow-400/5 to-transparent blur-3xl" />
        </motion.div>
      )}

      <motion.div className="container relative z-11 mx-auto max-w-5xl px-6 pb-10" >
        <SectionReveal>
          <div className="grid items-center gap-12 md:grid-cols-[2fr_3fr]">
            <div className="md:order-2">
            

              <div className="space-y-8 text-lg leading-relaxed text-gray-200 md:text-xl">
                <p>
A los 45 minutos del terremoto, Pablo abrió los ojos y no reconocía nada. Estaba debajo de uno de los muebles que lo protegía de los tres pisos que cayeron sobre él. Entre la oscuridad y los pedazos de paredes y vidrios exhaló por primera vez. Se encontraba con vida. 
              </p>
                <p>
Respiraba, aunque el aire se tornaba cada vez más denso por la gruesa capa de polvo que se levantó tras el desmoronamiento de la edificación portovejense. 
                </p>
                
              </div>
            </div>

            {!isMobile && (
              <div className="relative -mx-6 hidden min-h-[300px] items-center justify-center overflow-visible md:order-1 md:mx-0 md:-mt-16 md:flex md:min-h-[460px]">
                <motion.figure
                  className="relative left-1/2 w-[102vw] max-w-none -translate-x-1/2 md:left-auto md:mx-auto md:w-full md:max-w-[60rem] md:translate-x-0"
                  onMouseEnter={handleMouseMove}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    y: buriedImageY,
                    scale: buriedImageScale,
                    rotate: buriedImageRotate,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#d72638]/35 blur-[70px]"
                    animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.86, 1.18, 0.86] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-x-6 bottom-0 h-24 rounded-full bg-black/90 blur-2xl"
                    animate={{ scaleX: [0.75, 1.15, 0.75], opacity: [0.55, 0.95, 0.55] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={buriedAliveImage}
                    alt="Representacion de Pablo sepultado vivo"
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 w-full drop-shadow-[0_38px_60px_rgba(0,0,0,0.95)]"
                  />
                  <motion.div
                    className="pointer-events-none absolute z-20 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,220,0.82)_0%,_rgba(255,220,140,0.32)_30%,_rgba(255,255,255,0)_68%)] blur-sm mix-blend-screen md:h-72 md:w-72"
                    style={{ left: pointerLightLeft, top: pointerLightTop }}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.figure>
              </div>
            )}
          </div>
        </SectionReveal>
      </motion.div>

      <HorizontalScrollytelling
        sections={storySections}
        enablePeriodicShake
        imageOverlayClassName="bg-black/10"
        mobileImageOverlayClassName="bg-gradient-to-t from-black/10 via-black/5 to-transparent"
      />
      <AmbientSound soundUrl="https://www.soundjay.com/mechanical/sounds/crash-01.mp3" />
    </section>
  );
}
