import { SectionReveal } from "./SectionReveal";
import { HorizontalScrollytelling } from "./HorizontalScrollytelling";
import { ScrollStepRevealPanel } from "./ScrollStepRevealPanel";
import { chronicle3Images } from "../content/chronicle3Media";
import { featuredPortraits } from "../content/siteMedia";
import { pickImage } from "../content/mediaUtils";

interface StoryPanel {
  title?: string;
  text: string;
  img: string;
}

const introPanels: StoryPanel[] = [
  {
    title: "Dos Tarquis y el dolor aun retumba",
    text: 'Antes del 16 de abril de 2016, Tarqui vibraba. Decenas de personas recorrían sus calles y la velocidad impregnaba el aire. Habia quienes la llamaban "la ciudad que no dormia".',
    img: pickImage(chronicle3Images, 0),
  },
  {
    text: "Diez anos despues del terremoto, todo se detuvo. En las calles, el transito fluye sin mayor inconveniente y muchos edificios permanecen deshabitados.",
    img: pickImage(chronicle3Images, 1),
  },
  {
    text: "Es como si se tratara de otra localidad, algo que lleva el nombre pero ya perdio su esencia. Solo queda el recuerdo del centro comercial Felipe Navarrete.",
    img: pickImage(chronicle3Images, 2),
  },
  {
    text: "En su lugar, solo queda una gran explanada y locales improvisados para comerciantes que aun intentan devolverle sabor a la zona.",
    img: pickImage(chronicle3Images, 3),
  },
];

const horizontalPanels: StoryPanel[] = [
  {
    title: "Betty, el dolor de perder a su hija sigue latente",
    text: "Las lagrimas caen por su rostro en senal de que su dolor aun sigue vivo. Betty camina por la acera donde se alzaba el centro comercial Felipe Navarrete.",
    img: featuredPortraits.betty,
  },
  {
    text: "Cada abril, desde hace 10 anos, realiza un ritual en conmemoracion de los fallecidos en el terremoto, entre ellos su hija Maria Gabriela.",
    img: pickImage(chronicle3Images, 4),
  },
  {
    text: "En el primer piso del centro comercial funcionaba una papeleria llena durante marzo y abril por las compras de utiles escolares.",
    img: pickImage(chronicle3Images, 5),
  },
  {
    text: "Maria Gabriela llevaba apenas tres dias de labores cuando la tarde se partio en dos. Su madre queria pasar a verla, pero todo cambio.",
    img: pickImage(chronicle3Images, 6),
  },
  {
    text: "Minutos despues, un fuerte terremoto azoto la provincia de Manabi y devasto completamente Tarqui.",
    img: pickImage(chronicle3Images, 7),
  },
  {
    title: '"Me arranco la vida"',
    text: "Betty se pregunta que habria pasado si toda la familia hubiera ido a recoger a Maria Gabriela. Confiesa que no sentiria tanto dolor, pero tampoco estaria contando la historia.",
    img: pickImage(chronicle3Images, 8),
  },
  {
    text: "La esperanza siguio intacta hasta que recibio la llamada de su exmarido. Escucho que todo el edificio se habia caido y sintio que la tierra se abria bajo sus pies.",
    img: pickImage(chronicle3Images, 9),
  },
  {
    text: "Entro a la morgue improvisada y reconocio a su hija. Primero no quiso decirlo, pero finalmente el grito de una madre le confirmo la perdida.",
    img: pickImage(chronicle3Images, 10),
  },
];

const sadnessParagraphs = [
  "Betty es una mujer valiente. Con todo su dolor se arriesga a ir al lugar donde perdio a su hija y se detiene a pocos metros de la esquina de la avenida 109.",
  "En ese lugar se levanta un pequeno memorial por los fallecidos en el terremoto. Ella promovio su construccion y, durante una decada, ha organizado la misa para quienes ya no estan.",
  "Sabe que este puede ser el ultimo ano en que lo haga, porque tambien es momento de sanar por su familia, por sus otros hijos y por los nietos que aun la sostienen.",
];

const johnParagraphs = [
  "John Vera camina a diario por las calles vacias de Tarqui. Vive frente al malecon y es dueno de uno de los locales improvisados detras del centro comercial Felipe Navarrete.",
  "Alli vende camisetas, chaquetas y otros insumos, pero reconoce que hace de todo. Es pescador, comerciante, organiza ferias y ha sido dirigente barrial durante toda la reconstruccion.",
  'Esta palabra se ha convertido en una utopia para el. Diez anos mas tarde el comercio no se ha reactivado y muchos comerciantes se dispersaron por Manta, incluso hacia el llamado "Nuevo Tarqui".',
  '"Pero no le diga asi", repone John, a quien este nombre le disgusta porque no ha dado los resultados esperados.',
];

function VerticalSection({ items }: { items: StoryPanel[] }) {
  return (
    <div className="container mx-auto max-w-4xl space-y-32 px-6 py-24">
      {items.map((panel, index) => (
        <SectionReveal key={index}>
          <div className="space-y-8 text-lg leading-relaxed text-gray-200 md:text-xl">
            {panel.title && <h3 className="mb-8 text-3xl leading-[1.4] text-white md:text-4xl">{panel.title}</h3>}
            <p>{panel.text}</p>
            <div className="relative my-12 h-[50vh] w-full overflow-hidden rounded-lg">
              <img src={panel.img} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}

export function DosTarquisSection() {
  const collageImages = [pickImage(chronicle3Images, 11), pickImage(chronicle3Images, 12), pickImage(chronicle3Images, 13), pickImage(chronicle3Images, 14)];

  return (
    <section id="cronica-3" className="relative bg-black text-white">
      <SectionReveal>
        <div className="pt-32 pb-8 text-center">
          <div className="mb-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
          <p className="text-sm uppercase tracking-widest text-gray-400">Cronica 3</p>
          <div className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </SectionReveal>

      <VerticalSection items={introPanels} />

      <HorizontalScrollytelling sections={horizontalPanels} />

      <ScrollStepRevealPanel image={featuredPortraits.betty} alt="Betty Cedeno" contentClassName="text-left">
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl leading-[1.4] text-white md:text-4xl">La tristeza sigue viva</h3>
          {sadnessParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-gray-200 md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollStepRevealPanel>

      <div className="container mx-auto max-w-5xl px-6 py-24">
        <SectionReveal>
          <div className="mt-20 grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:grid-rows-[220px_220px]">
            <div className="overflow-hidden rounded-[2rem] md:row-span-2">
              <img src={collageImages[0]} alt="Collage de Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem]">
              <img src={collageImages[1]} alt="Memoria de Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem]">
                <img src={collageImages[2]} alt="Resiliencia de Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[2rem]">
                <img src={collageImages[3]} alt="Cotidianidad en Tarqui" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem]">
              <img src={featuredPortraits.john} alt="John Vera" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl leading-[1.35] text-white md:text-5xl">John, 10 anos de lucha para reactivar al "verdadero" Tarqui</h3>

              {johnParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-gray-200 md:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
