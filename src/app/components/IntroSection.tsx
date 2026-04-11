import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionReveal } from './SectionReveal';
import { LayeredHeadline } from './LayeredHeadline';
import { chronicle1Images } from '../content/chronicle1Media';
import { pickImage } from '../content/mediaUtils';
import milagritoBackground from '../../assets/img/Cronica1/MilagritoP.jpeg';
import milagritosImage from '../../assets/img/Cronica1/milagritos.jpeg';
import milagritos2Image from '../../assets/img/Cronica1/milagritos2.jpeg';
import milagritos3Image from '../../assets/img/Cronica1/milagritos3.jpeg';
import milagritos4Image from '../../assets/img/Cronica1/hotel-elgato.jpg';

export function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const lotImages = [milagritosImage, milagritos2Image, milagritos3Image];
  const hotelImage = pickImage(chronicle1Images, 1);

  return (
    <section
      id="cronica-1"
      ref={sectionRef}
      className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-black via-zinc-900 to-black"
      style={{ position: 'relative' }}
    >
      <div className="pointer-events-none sticky top-0 z-0 hidden h-screen items-center justify-center overflow-hidden md:flex" aria-hidden="true">
          <img
            src={milagritoBackground}
            alt=""
            loading="lazy"
            decoding="async"
          className="h-screen w-full object-cover object-center opacity-80"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%, black 75%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 28%, black 75%, transparent 100%)",
            }}
          />
        </div>

      <div className="container relative z-10 mx-auto max-w-4xl items-center justify-center px-6 py-32 md:-mt-[100vh] md:ml-24 md:pt-40">
        <SectionReveal>
          <h2 className="mb-16 inline-block rotate-1 transform text-center text-xl leading-none tracking-tight md:text-5xl lg:text-4xl" style={{ fontFamily: '"Finger Paint", cursive' }}>
            <LayeredHeadline
              lines={[
                "Tres dias bajo escombros:",
                "la historia del ''Milagritos de Portoviejo''",
              ]}
            />
          </h2>

          <div className="space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
            <p>
Aunque sus labios y sus manos aún tiemblan, Pablo entró nuevamente al lugar donde quedó sepultado. Ya no estaban las camas ni los muebles del hotel de cinco pisos que cuidaba; tampoco estaban los escombros ni las losas que lo aplastaron.             </p>

            <p>
Ahora solo queda un espacio… un lote baldío con un césped verde parcialmente cercado por una reja negra y un letrero gigante que dice ‘Se vende’; más un número de celular para los interesados en comprar y volver a darle vida a la esquina de la Pedro Gual y Olmedo, en pleno centro de Portoviejo.             </p>
          </div>
        </SectionReveal>

        <motion.figure
          className="relative my-24"
          style={{ y: useTransform(scrollYProgress, [0.2, 0.6], [50, -50]) }}
        >
          <div className="grid min-h-[60vh] overflow-hidden rounded-lg bg-black/40 shadow-2xl md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[34vh] overflow-hidden md:min-h-[60vh]">
              <img
                src={lotImages[0]}
                alt="Portoviejo, en el corazon de Manabi"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <div className="grid min-h-[26vh] grid-cols-2 gap-2 bg-black p-2 md:min-h-[60vh] md:grid-cols-1">
              {lotImages.slice(1).map((image, index) => (
                <div key={image} className="relative overflow-hidden rounded-sm">
                  <img
                    src={image}
                    alt={`Portoviejo, detalle ${index + 2}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              ))}
            </div>
          </div>

          <figcaption className="mt-3 border-l border-white/20 pl-4 text-xs leading-relaxed text-white/55 md:text-sm">
            El terreno donde se alzaba el hotel 'El Gato' en la esquina de Pedro Gual y Olmedo, en Portoviejo. Abril, 2026.
          </figcaption>
        </motion.figure>

        <SectionReveal>
          <div className="space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl">
            <p>
Hace 10 años, en ese sitio se alzaba imponente el hotel ‘El Gato’ que tenía cinco pisos y 40 habitaciones. Allí llegaban todo tipo de personas a hospedarse, desde comerciantes, oficinistas de otras provincias y aspirantes a jugadores de fútbol.             </p>
          
            <p>
              Pablo conocía las historias de varios huéspedes. Sabía, por ejemplo, que cinco jóvenes colombianos llegaron en abril de 2016 para probar suerte en un club de esta ciudad costera de Ecuador. También conocía que su jefe llegaba todas las tardes a fumar un cigarrillo con él, porque en su casa no le dejaban hacerlo. Fumaban, conversaban un rato y retornaba a su casa; mientras él seguía con las actividades propias de encargado de un hotel. 
            </p>

          </div>


        </SectionReveal>

        <motion.figure
  className="relative my-24"
  style={{ y }}
>
  <div className="relative h-100  overflow-hidden rounded-lg md:h-140">
    <div
      className="absolute inset-0 bg-contain bg-center bg-no-repeat rounded-lg"
      style={{
        backgroundImage: `url('${milagritos4Image}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
    </div>
  </div>

  <figcaption className="mx-auto text-center mt-3 border-l border-white/20 pl-4 text-xs leading-relaxed text-white/55 md:text-sm">
    <span className="font-bold">Foto:</span>  hotel 'El Gato' en Portoviejo antes del terremoto.  <br/><span className="font-bold">Fuente:</span> Hosteltur
  </figcaption>
</motion.figure>

 
        <SectionReveal>
          <div className="space-y-8 text-lg leading-relaxed text-gray-300 md:text-xl text-balance">
          
            <p>Pero, la tarde del sábado 16 de abril de 2016, el ambiente era “pesado”. Su jefe no llegó a la cita pactada casi como ritual. La comida que pidió a uno de sus vecinos tampoco llegó y una sensación extraña recorrió su cuerpo. ¿Una premonición? No sabía, pero algo retumbaba en el aire. 
            </p>

            <p>En el segundo piso del hotel -relata como si volviera a ese momento- había una sala de computadoras. “Un cyber”, dice.             </p>

            <p>Subió, acomodó la dispensa con snacks y bebidas, y siguió con su ronda normal que consistía en cerrar una puerta plegable. Lo hizo, pero el malestar todavía rondaba su mente.             </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
