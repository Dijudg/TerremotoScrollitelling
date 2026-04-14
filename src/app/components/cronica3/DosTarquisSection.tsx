import { SectionReveal } from "../SectionReveal";
import { HorizontalScrollytelling } from "../HorizontalScrollytelling";
import { ScrollStepRevealPanel } from "../ScrollStepRevealPanel";
import { LayeredHeadline } from "../LayeredHeadline";
import {
  chronicle3HorizontalImages,
  chronicle3HorizontalMdImages,
  chronicle3HorizontalMobileImages,
  chronicle3Images,
} from "../../content/chronicle3Media";
import { featuredPortraits } from "../../content/siteMedia";
import { pickImage } from "../../content/mediaUtils";
import dosTarquisLeadVideo from "../../../assets/img/Cronica3/terremoto-testimonia-milagritos-ectv-phone3.mp4";
import dolorImage from "../../../assets/img/Cronica3/dolor.png";
import fondoSeccionImage from "../../../assets/img/Cronica3/fondo-seccion.png";

interface StoryPanel {
  title?: string;
  text: string;
  img: string;
  mobileImg?: string;
  desktopMdImg?: string;
  textContainerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  paragraphClassName?: string;
  detachedTitleClassName?: string;
}

const introPanels: StoryPanel[] = [
  {
    title: "Dos Tarquis y el dolor aún retumba",
    text: 'Antes del 16 de abril de 2016, Tarqui vibraba, mucho ruido y algo de tensión. Decenas de personas recorrían las calles a pie o en auto; entraban y salían de los locales comerciales y una inusitada velocidad impregnaba el aire. De hecho, decían que era la “ciudad que no dormía” en pleno corazón de Manta, incluso hay quienes se aventuraban a llamarla “Sodoma y Gomorra”. ',
    img: pickImage(chronicle3Images, 0),
  },
  {
    text: "Sin embargo, 10 años después del terremoto de 7,8 grados en la escala de Richter, todo se detuvo. En las calles, el tránsito fluye sin mayor inconvenientes. No hay prisas ni pitazos; solo una relativa calma que en algunas vías es mayor porque los edificios de entre cuatro y cinco pisos permanecen deshabitados. Lo mismo ocurre con muchos locales comerciales, cuyas puertas plegables están cerradas.  ",
    img: pickImage(chronicle3Images, 1),
  },
  {
    text: "Es como si se tratará de otra localidad, algo que solo lleva el nombre pero ya perdió su esencia. Ahora solo queda el recuerdo de lo que fue, por ejemplo, el centro comercial Felipe Navarrete -uno de los polos comerciales más movidos del Tarqui, la parroquia más antigua de Manta-. Sus seis pisos se desmoronaron durante el terremoto y perecieron al menos 90 personas. ",
    img: pickImage(chronicle3Images, 2),
  },
  
   {
    text: "En su lugar, solo queda una gran explanada de terreno… desértica y tapada con una cerca de madera. Junto a esta se improvisaron locales para que comerciantes imprimieran ‘sabor’ a esta zona, pero las ventas aún no se levantan.  ",
    img: pickImage(chronicle3Images, 3),
  },
];

const horizontalPanels: StoryPanel[] = [
  {
    title: "Betty, el dolor de perder a su hija sigue latente",
    text: "Las lágrimas caen por su rostro en señal de que su dolor aún está latente. Sus ojos, cubiertos por unas gafas grandes y de color café, se pierden por unos instantes mientras camina por la acera donde se alzaba el centro comercial Felipe Navarrete, centro de la parroquia Tarqui, en Manta. ",
    img: pickImage(chronicle3HorizontalImages, 0),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 0),
  },
  {
    text: "Su nombre es Betty y cada abril -desde hace 10 años- realiza un ritual en conmemoración de los fallecidos en el terremoto, entre ellos su hija María Gabriela. ",
    img: pickImage(chronicle3HorizontalImages, 1),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 1),
  },
  {
    text: "En el primer piso del centro comercial Felipe Navarrete funcionaba una reconocida papelería que se llenaba durante los meses de marzo y abril por las compras de los útiles escolares. El movimiento era intenso, por lo que se contrataba gente para solventar esas necesidades. ",
    img: pickImage(chronicle3HorizontalImages, 2),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 2),
    textContainerClassName: "md:justify-start",
    contentClassName: "md:w-1/2 md:max-w-none md:mr-auto",
  },
  {
    text: "María Gabriela entró a trabajar en este concurrido espacio. Llevaba apenas tres días de labores y su madre le prometió pasarla viendo. Ese día -relata Betty- su nuera también le pidió ayuda con su nieto y le dijo que llegaría antes de las 17:00. ",
    img: pickImage(chronicle3HorizontalImages, 3),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 3),
    textContainerClassName: "md:items-stretch md:justify-center md:!px-24 md:!pt-0 md:!pb-16",
    contentClassName: "md:max-w-2xl md:text-center md:mt-auto md:mb-0",
    paragraphClassName: "md:text-center",
  },
  {
    text: "El plan era perfecto. Si su nuera llegaba -como lo dijo- antes de la hora señalada, alcanzaría a ir a la papelería para encontrarse con María Gabriela. No obstante, la nuera se demoró y llegó pasadas las 18:30. \n\n Minutos después, un fuerte terremoto azotó la provincia de Manabí y devastó completamente Tarqui. ",
    img: pickImage(chronicle3HorizontalImages, 4),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 4),
    textContainerClassName: "md:justify-end",
    contentClassName: "md:w-1/2 md:max-w-none md:ml-auto md:text-right",
    paragraphClassName: "md:text-right",
  },
  {
    title: '"Me arranco\nla vida"',
    text: "¿Qué hubiera pasado si ella, sus nietos y su otra hija embarazada,\nhabrían ido a recoger a María Gabriela?, reflexiona Betty.\nDe pronto no estaría contando la historia,\npero confiesa que “no sentiría tanto dolor”. ",
    img: pickImage(chronicle3HorizontalImages, 5),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 5),
    detachedTitleClassName: "inset-0 right-auto w-1/2 !p-0 md:!flex items-center justify-center text-center",
    textContainerClassName: "md:justify-end",
    contentClassName: "md:w-1/2 md:max-w-none md:ml-auto md:text-right",
    titleClassName: "md:!mb-0 md:text-center md:leading-tight",
    paragraphClassName: "md:text-right md:whitespace-pre-line",
  },
  {
    text: "Minutos después del terremoto -retoma su relato- intentó comunicarse con su hija, pero no le contestó. Imaginaba que al ser una mujer astuta y deportista habría alcanzado a correr. ",
    img: pickImage(chronicle3HorizontalImages, 6),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 6),
  },
  {
    text: "La esperanza seguía intacta hasta que recibió la llamada de su exmarido. “Todo el edificio se cayó”, escuchó al otro lado del teléfono. Por un momento se quedó sin aire, sintió que la tierra se abría y la tragaba. ",
    img: pickImage(chronicle3HorizontalImages, 7),
    mobileImg: pickImage(chronicle3HorizontalMobileImages, 7),
    textContainerClassName: "md:justify-start",
    contentClassName: "md:max-w-2xl md:mr-auto",
    paragraphClassName: "md:text-left",
  },
].map((panel, index) => ({
  ...panel,
  desktopMdImg: pickImage(chronicle3HorizontalMdImages, index),
}));

const sadnessParagraphs = [
  "Esa misma sensación surgió cuando le dijeron que encontraron el cuerpo de una joven con similares características a las de su hija. ",
  "Entró a la morgue improvisada en donde reposaban decenas de cuerpos. Un hombre vestido de blanco le hablaba, pero ella no entendía las palabras. Estaba en trance. “Tómese su tiempo. Mire si es o no”, repite con su voz a punto de desfallecer. ",
  "¿La reconoció? Desde el primer momento -confiesa- pero no quería decirlo. Una fuerza magnética tapaba su boca, pero no sus ojos porque la veía y recuerda que “estaba muy linda”. ",
  "Finalmente, la respuesta llegó con un grito que inundó el lugar… Era su dolor que brotaba desde el vientre de una madre que perdió a su hija.  ",
 
];

const loremIpsumBettySection = [
  "Betty es una mujer valiente y tiene una enorme fuerza. Con todo su dolor se arriesga a ir al lugar donde perdió a su hija. Camina entre los locales y se detiene a pocos metros de la esquina de la avenida 109. ",
  "En ese lugar se levanta un pequeño memorial por los fallecidos en el terremoto. Ella promovió su construcción, porque cada año -desde hace 10- organiza la misa para quienes ya no están. ",
  "Y, de hecho, será el último año que lo haga, porque ya es momento de sanar o al menos hacer que ese dolor sea más llevadero. Lo hará por su familia; tiene más hijos y varios nietos que son su alegría, incluida la hija de María Gabriela que ya cumplió 15 años. ",
  "Ya no la ve mucho, porque vive con el padre. Siente que no solo perdió a su hija sino a su nieta. Aún así mantiene la esperanza de que vendrán días mejores. Respira, acomoda su cartera y cruza nuevamente por aquella calle que le robó su tranquilidad",
];

const johnParagraphs = [
  "John Vera, un hombre de ‘gran verbo’, camina a diario por las calles vacías de Tarqui. Vive frente al malecón y es dueño de uno de los locales improvisados detrás del centro comercial Felipe Navarrete. ",
  "Allí vende camisetas, chaquetas y otros insumos, pero reconoce que hace de todo. Es pescador, comerciante y organiza ferias; además es dirigente y abanderó el comité de moradores para la reconstrucción. ",
  'Esta palabra se ha convertido en una utopía para él, ya que, 10 años más tarde el comercio no se ha reactivado. Una de las razones es que al declararla como ‘zona cero’ los comerciantes se dispersaron y se fueron a las diferentes localidades de Manta, incluso unos están en los locales del conocido Nuevo Tarqui. ',
  '“Pero no le diga así”, repone John, a quien este nombre le disgusta, porque no ha dado los “resultados esperados”. ',
];

function IntroTwoColumnSection() {
  const [firstPanel, ...restPanels] = introPanels;

  return (
    <div className="container mx-auto max-w-6xl px-6 py-24">
      <SectionReveal>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="space-y-8 text-lg leading-relaxed text-gray-200 md:text-xl">
            {firstPanel.title && (
              <h2 className="font-heading mb-8 text-xl leading-[1.2] tracking-normal md:text-5xl lg:text-4xl">
                <LayeredHeadline
                  lines={[
                    "Dos Tarquis y",
                    "el dolor aún retumba",
                  ]}
                />
              </h2>
            )}
            <p>{firstPanel.text}</p>
            {restPanels.map((panel) => (
              <p key={panel.text}>{panel.text}</p>
            ))}
           
          </div>

          <div className="relative  overflow-hidden   lg:min-h-0 gap-4">
            <video
              src={dosTarquisLeadVideo}
              className="md:h-[700px] lg:h-[800px] w-full object-cover lg:max-h-screen rounded-[2rem]"
              controls
              playsInline
              preload="metadata"
            />
             <img
              src={dolorImage}
              alt="Dolor en Tarqui"
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg mt-4 object-cover"
            />
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}

export function DosTarquisSection() {
  const collageImages = [pickImage(chronicle3Images, 11), pickImage(chronicle3Images, 12), pickImage(chronicle3Images, 13), pickImage(chronicle3Images, 14)];

  return (
    <section className="relative bg-black text-white">
      <SectionReveal>
        <div className="pt-32 pb-8 text-center">
          <div className="mb-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
          <p className="text-sm uppercase tracking-widest text-gray-400">Crónica 3</p>
          <div className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </SectionReveal>

      <IntroTwoColumnSection />

      <HorizontalScrollytelling sections={horizontalPanels} imageOverlayClassName="bg-transparent" />

      <ScrollStepRevealPanel
        image={fondoSeccionImage}
        alt="Fondo de sección Cronica 3"
        overlayClassName="bg-transparent"
        contentClassName="text-left"
      >
        <div className="max-w-3xl space-y-8">
          
          {sadnessParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-gray-200 md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollStepRevealPanel>

      <section
        className="relative overflow-hidden py-24"
        style={{
        
          position: "relative",
        }}
      >
        <div className=" absolute left-1/2 top-0 h-full w-[28rem] " />

        <div className="container relative z-10 mx-auto max-w-5xl px-6">
          <SectionReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative mx-auto w-full max-w-md">
              <div className="relative mx-auto w-full max-w-md py-4"><h3 className="font-heading text-xl text-white md:text-6xl text-balance">La tristeza sigue viva </h3></div>

                <div className="absolute inset-0 rounded-full bg-[#d72638]/35 blur-[70px]" />
                <img
                  src={featuredPortraits.betty}
                  alt="Betty Cedeno en Tarqui"
                  loading="lazy"
                  decoding="async"
                  className="relative   rounded-lg  w-full  h-[600px]  object-cover shadow-[0_36px_64px_rgba(0,0,0,0.9)]"
                />
                
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-200 md:text-xl">
                
                {loremIpsumBettySection.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="bg-white text-black">
        <div className="container mx-auto max-w-5xl px-6 py-24">
          <SectionReveal>
            <div className="mt-20 space-y-8">
            <div className="relative h-[350px] w-full overflow-hidden rounded-[2rem]">
              <img
                src={featuredPortraits.john}
                alt="John Vera"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              <h2 className="font-heading absolute right-4 bottom-4 left-4 text-base leading-[1.2] tracking-normal md:text-2xl">
                <LayeredHeadline
                  lines={[
                    "John, 10 años de lucha",
                    "para reactivar al",
                    "verdadero Tarqui",
                  ]}
                />
              </h2>
            </div>

            <div className="space-y-8 text-left">
              {johnParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-gray-800 md:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="Finger-font text-left text-xl italic text-balance text-black">
              “El mercado es un fantasma” de lo que fue…
            </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

