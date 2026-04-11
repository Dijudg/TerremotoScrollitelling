import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionReveal } from './SectionReveal';

export function LossSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen py-32 bg-gradient-to-b from-zinc-900 to-black"
      style={{ position: 'relative' }}
    >
      <motion.div 
        className="container mx-auto px-6 max-w-4xl relative z-10"
        style={{ opacity }}
      >
        <div className="mt-8">
          <SectionReveal>
            <h3 className="text-4xl md:text-5xl mb-12 tracking-tight leading-[1.4]">
              Javier y Jeremy, un vínculo inquebrantable
            </h3>

            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-gray-200">
              <p>
                Pese a la pérdida de más de la mitad de sus seres queridos, Javier se levantó sin dudarlo. Es activo, 
                conversón y nunca despinta una sonrisa de su rostro. Más bien se reconoce como una persona que no llora 
                porque ya cumplió su proceso de duelo.
              </p>

              <p className="text-blue-200 text-xl italic">
                De hecho, su ley de vida es "no llorar sino hacer pañuelos para los que sufren" igual o más de lo que él 
                ha tenido que vivir.
              </p>

              <p>
                No solo perdió a más de la mitad de su familia. En su cabeza se cruzan recuerdos vívidos de sus primeros 
                años de vida. Cuenta cuando fue abanderado y no tenía zapatos para desfilar en el minuto cívico.
              </p>

              <p>
                Luego recuerda que sobrevivió a 14 disparos que le propinaron años atrás durante un mitin político. Una de 
                las balas "le dio un besito" al corazón y pasó de largo hasta destruir el bazo. "Nada grave", dice con humor.
              </p>

              <p className="text-white">
                Pero, su voz pierde el volumen y se entrecorta cuando habla de su hijo mayor: Jeremy, de 22 años. En aquella 
                época tenía 12 y prefirió no ir a la fiesta con su madre y hermanos. Se quedó con su padre en la casa y 
                juntos sobrevivieron.
              </p>

              <p>
                La pérdida fue un golpe devastador. Javier tuvo que contener a su hijo y acompañarlo en el proceso de luto. 
                No fue fácil -reconoce-, pero siempre le ha gustado el 'coaching' y piensa que eso ayudó a llegar con un 
                mensaje de esperanza para su primogénito.
              </p>

              <p className="text-2xl text-green-300 font-light">
                Hoy ya es todo un hombre. Está en octavo año de Medicina y no tiene 'mañas' como tomar licor. "Lo saqué 
                adelante yo solo. Es mi fuerza y mi motor", dice con gran orgullo este padre portovejense.
              </p>
            </div>
          </SectionReveal>
        </div>
      </motion.div>
    </section>
  );
}