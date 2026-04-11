import { type MouseEvent, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { HorizontalScrollytelling } from "./HorizontalScrollytelling";
import { AmbientSound } from "./AmbientSound";
import { useIsMobile } from "./ui/use-mobile";
import { chronicle1HorizontalImages, chronicle1HorizontalMobileImages } from "../content/chronicle1Media";
import { pickImage } from "../content/mediaUtils";
import buriedAliveImage from "../../assets/img/Cronica1/enterradovivo.png";

const storySections = [
  {
    title: "La linterna",
    text: "Acostado, trató de auscultarse y sentir su cuerpo: sus manos, sus piernas, su espalda. Todo estaba bien, pero tenía sed. De repente sintió entre sus piernas algo cilíndrico. ¿Era una botella de agua, de esas que acomodó hace escasos minutos? Empezó a moverse, deslizándose como una culebra que busca su alimento, hasta llegar al objeto anhelado. Pero cuando lo tuvo en sus manos supo que no era lo que buscaba. Era algo más: una linterna. ",
    img: pickImage(chronicle1HorizontalImages, 0),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 0),
    textContainerClassName: " md:items-start md:justify-end md:text-right",
    contentClassName: "md:my-0 md:max-w-[42rem]",
  },
  {
    text: "De pronto, no calmaría su sed, pero se convirtió en uno de los insumos más importantes que incluso salvó su vida. Con luz, pudo divisar la devastación total. “El fin del mundo -parecía-, ya que había mucho polvo y escombros”. También alcanzó a ver el celular que le regaló su hija cuando cumplió años. Tremendo regalo, pero estaba destruido.",
    img: pickImage(chronicle1HorizontalImages, 1),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 1),
    textContainerClassName: "md:items-end md:justify-start",
    contentClassName: "md:my-0 md:max-w-[42rem]",
  },
  {
    text: "Como si se tratara de un rompecabezas, construyó nuevamente el dispositivo. Oprimió el botón de encendido y una luz tenue iluminó la cara de Pablo, quien sintió una ligera esperanza de salvarse. Marcó el número de su esposa, hijos y demás familiares y ninguno contestó. La red de celular estaba caída; al igual que el resto de servicios: luz, agua, Internet. Nada servía. ",
    img: pickImage(chronicle1HorizontalImages, 2),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 2),
    textContainerClassName: "md:items-start md:justify-center md:text-center",
    contentClassName: "md:my-0 md:max-w-[48rem]",
  },
  {
    text: "“Era el apocalipsis”, cuenta mientras modula su voz, la cual a veces tiembla entre tantos recuerdos. Siguió intentando, pero temía que la batería se acabara, por lo que optó por apagar el teléfono para economizar energía. ",
    img: pickImage(chronicle1HorizontalImages, 3),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 3),
  },
  {
    title: "Un sueño o\nuna premonición",
    text: "Enterrado entre los escombros, escuchaba los nada sutiles gritos de las personas que pedían ayuda. Él hacía lo mismo, pero nadie lo escuchaba. Un niño creyó oírlo, le avisó a un adulto y este no logró escucharlo y se fueron. Golpeaba con un fierro las paredes y lo ignoraban. \nParecía que esos gruesos escombros del hotel de cinco pisos se convirtieron en aquella cueva que tanto miedo le causó ir meses antes del terremoto. ",
    img: pickImage(chronicle1HorizontalImages, 4),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 4),
    textContainerClassName: "md:items-start md:justify-end md:text-right",
    contentClassName: "md:my-0 md:max-w-[28rem]",
    titleClassName: "md:text-right",
  },
  {
    text: "Mientras Pablo pisaba con cuidado el césped donde antes se situaba ‘El Gato’ este  recuerdo se interpuso. Nítido y claro. Un año antes del terremoto, un amigo de Pablo estudiaba Geografía y le gustaba ingresar a cuevas para buscar restos o analizar el suelo, por lo que le sugirió ingresar a la cueva de su finca. ",
    img: pickImage(chronicle1HorizontalImages, 5),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 5),
  },
  {
    text: "“Era una cueva grande y ya teníamos todo”, reconoció. En una mochila pusieron sogas y cabos que les ayudarían a no perderse dentro de la tierra. Lo único que faltaba era la fecha para irse de aventura. Nunca llegó.",
    img: pickImage(chronicle1HorizontalImages, 6),
    mobileImg: pickImage(chronicle1HorizontalMobileImages, 6),
    textContainerClassName: "md:items-center md:justify-start md:p-12",
    contentClassName: "md:my-0 md:max-w-[33vw]",
  },
  {
    text: "Tras la conversación con su amigo, Pablo empezó a tener varios sueños de que la cueva se le venía encima. Todo se desmoronaba y su cabeza quedaba aplastada por la tierra. n/Rápidamente le contó a su esposa el sueño y ella le respondió: “No digas eso. No seas loco”. Aquella imagen le marcó y decidió “hacerse el loco” con su amigo y no fue.",
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

      <motion.div className="container relative z-11 mx-auto max-w-5xl px-6 pb-20" >
        <SectionReveal>
          <div className="grid items-center gap-12 md:grid-cols-[2fr_3fr]">
            <div className="md:order-2">
              <h2
                className="mb-12 inline-block text-2xl leading-[1.6] tracking-tight md:text-3xl"
                style={{ fontFamily: '"Finger Paint", cursive' }}
              >
                <span className="rounded-2xl   py-2 text-white box-decoration-clone">Sepultado vivo
                </span>
              </h2>

              <div className="space-y-8 text-lg leading-relaxed text-gray-200 md:text-xl">
                <p>
A los 45 minutos del terremoto, Pablo abrió los ojos y no reconocía nada. Estaba debajo de uno de los muebles que lo protegía de los tres pisos que cayeron sobre él, pero estaba vivo.                 </p>

                <p>
Respiraba, aunque el aire se tornaba cada vez más denso por la gruesa capa de polvo que se levantó tras el desmoronamiento de las edificaciones en Portoviejo.                 </p>
              </div>
            </div>

            <div className="relative -mx-6  flex min-h-[300px] items-center justify-center overflow-visible md:order-1 md:mx-0 md:-mt-16 md:min-h-[460px]">
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
                {!isMobile && (
                  <>
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
                  </>
                )}
                <img
                  src={buriedAliveImage}
                  alt="Representacion de Pablo sepultado vivo"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-full md:drop-shadow-[0_38px_60px_rgba(0,0,0,0.95)]"
                />
                {isMobile ? (
                  <div className="pointer-events-none absolute left-[48%] top-[42%] z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-yellow-100/35" />
                ) : (
                  <motion.div
                    className="pointer-events-none absolute z-20 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,220,0.82)_0%,_rgba(255,220,140,0.32)_30%,_rgba(255,255,255,0)_68%)] blur-sm mix-blend-screen md:h-72 md:w-72"
                    style={{ left: pointerLightLeft, top: pointerLightTop }}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.figure>
            </div>
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
