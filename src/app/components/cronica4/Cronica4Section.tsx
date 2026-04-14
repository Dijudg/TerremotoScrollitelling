import { SectionReveal } from "../SectionReveal";
import { HorizontalScrollytelling } from "../HorizontalScrollytelling";
import { GalleryButton } from "../GalleryButton";
import { LayeredHeadline } from "../LayeredHeadline";
import {
  chronicle4HorizontalImages,
  chronicle4HorizontalMobileImages,
  chronicle4Images,
} from "../../content/chronicle4Media";
import { siteVideos } from "../../content/siteMedia";
import { buildGallery, pickImage } from "../../content/mediaUtils";

interface StoryPanel {
  title?: string;
  titleLines?: string[];
  text: string;
  img: string;
  mobileImg?: string;
}

const introPanels: StoryPanel[] = [
  {
    title: "Los rescatistas “quebrados”",
    text: "Cuando recuerdan sus anécdotas durante y después del terremoto, sus miradas se pierden, como si el tiempo hiciera una pausa.",
    img: pickImage(chronicle4Images, 0),
  },
  {
    text: "Y es que es difícil olvidar aquellos gritos que imploraban ayuda; aquellos edificios virados como si jugaran con la gravedad; y aquel olor a muerte que asfixiaba.",
    img: pickImage(chronicle4Images, 1),
  },
  {
    text: "Ricardo, Luis y Bryan sintieron como la tierra se resquebrajaba y destruía todo. Vivieron el horror y la pérdida de sus familiares y, pese al miedo, apoyaron a sus comunidades.",
    img: pickImage(chronicle4Images, 2),
  },
  {
    title: "Ricardo: “Nos tomamos 15 minutos para no quebrarnos”",
    titleLines: ["Ricardo: “Nos tomamos", "15 minutos para", "no quebrarnos”"],
    text: "En medio de las tinieblas y de la desesperación, Ricardo Castro, bombero mantense, subió a una montaña de desperdicios -entre pedazos de paredes, vidrios y electrodomésticos aplastados- y divisó una pequeña niña, de aproximadamente un año. Estaba envuelta en una manta, sus ojos estaban cerrados y su rostro guardaba una gran tranquilidad. Parecía dormida, pero ya no respiraba.",
    img: pickImage(chronicle4Images, 3),
  },
];

const horizontalPanels: StoryPanel[] = [
  {
    text: "En ese momento, cientos de preguntas rondaban su cabeza. ¿Por qué, por qué y por qué? Sintió que sus piernas se volvían pesadas y al igual que aquellos seres inertes, se quebró y tuvo que parar.",
    img: pickImage(chronicle4HorizontalImages, 0),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 0),
  },
  {
    text: "Él y su equipo se tomaron 15 minutos para respirar, reconocer la catástrofe y continuar su labor en uno de los sitios más afectados por el terremoto: las inmediaciones del centro comercial Felipe Navarrete, en Tarqui. “Era un caos”, señala con cierta tensión.",
    img: pickImage(chronicle4HorizontalImages, 1),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 1),
  },
  {
    text: "Se organizaron y siguieron con sus labores. En una casa rescataron tres niños, un adulto y una embarazada. Luego siguieron con las personas que estaban en los hoteles Astoria y Mayita. Salvaron a una adolescente de 17 años y a una mujer que fue trasladada a una casa de salud.",
    img: pickImage(chronicle4HorizontalImages, 2),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 2),
  },
  {
    text: "Las horas seguían su curso, pero la gente no tenía tanto tiempo. Cuando ocurren estos eventos naturales, una reacción inmediata es fundamental, reconoce.\n\nEl grupo de Ricardo avanzaba entre las ruinas hasta el sector Santa Marta, en donde técnicamente -dice el bombero de contextura fuerte y voz pausada- extrajeron a cuatro niños y un adulto mayor. Este último falleció por las múltiples fracturas horas más tarde.",
    img: pickImage(chronicle4HorizontalImages, 3),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 3),
  },
  {
    text: "Su labor era casi mecánica, pasaban las horas y pese al cansancio y a la falta de personal e insumos, el trabajo no paraba. La dinámica se extendió durante varios meses, pero las imágenes se impregnaron en su memoria.\n\n¿Cómo seguir adelante? Es la pregunta inevitable que le hacen a Ricardo, quien encontró la respuesta de inmediato. Apoyó la conformación del equipo USAR en el Cuerpo de Bomberos de Manta. Ellos se especializan en la búsqueda y rescate urbano de personas en estructuras colapsadas.\n\nSon un equipo especializado de 27 rescatistas que han seguido cursos de liberación de personas de estructuras caídas y con cuerdas, primeros auxilios avanzados, materiales peligrosos; todo con guías internacionales. Ellos se sumaron a los cuatro equipos ya existentes en Quito, Guayaquil, Portoviejo y Cuenca.",
    img: pickImage(chronicle4HorizontalImages, 4),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 4),
  },
];

const luisOpeningParagraphs = [
  "El salvavidas Luis Zambrano estaba en sus horas libres cuando sintió el estruendo que devastó Pedernales, el epicentro del terremoto.",
  "El joven, de memoria fotográfica, recuerda muchos detalles, frases e incluso el temblor que recorrió su cuerpo y el de su madre cuando quedaron atrapados en el segundo piso de su vivienda tras el terremoto.",
  "Antes del movimiento sísmico, Luis estaba duchándose para ir a la iglesia. Su madre le ayudaba a planchar una camisa para que vaya “bien presentado”.",
  "Casualmente, charlaban sobre cómo sobrevivir a un terremoto. Ella decía que podía resguardarse debajo de una mesa. Mientras que él le recomendaba buscar las columnas de la casa. “Mami, este es el lugar seguro”, le dijo convencido. Sin percatarse que el reloj marcó las 18:58, hora en la que la tierra se estremeció.",
  "El movimiento fue similar a una ola de la playa manabita que los sacudía de arriba a abajo. La vibración duró incontables minutos; es como si la tierra quedara “resentida”. “Fue como un niño que fue castigado por su papá, porque el movimiento no paraba”.",
  "Mientras esto pasaba, Luis se descubrió abrazando a su madre; sintió la vibración de su cuerpo y los latidos agitados de su corazón. No sabía exactamente cómo llegó hacia dónde ella estaba. Solo repetía: “Mami, si yo te he ofendido alguna vez... perdóname”.",
  "Lentamente, apartó sus brazos del cuerpo tembloroso de la mujer y le dijo que se desplazaría para buscar sus zapatos; también buscaría unos para ella.",
  "A oscuras, trataba de buscar las paredes, tomó su teléfono y se dio cuenta que estaban en el suelo. También vio que el mueble en donde quería refugiarse su madre quedó aplastado.",
];

const revealParagraphs = [
  "Impactado por la destrucción, Luis le entregó los zapatos, pero ella estaba muy nerviosa y no le hacía caso. Entonces tuvo que utilizar una voz más imponente: ¡Póngase los zapatos!",
  "Luego buscó las escaleras para bajar a la primera planta. No se percató que la losa del piso dos aplastó una parte del uno y quedó inclinado. “Había muchos escombros y no podíamos bajar al piso uno para salir. Era el fin del mundo”, se repetía en su mente.",
  "Luis buscaba la manera para liberarse de los escombros. Lentamente se desplazó hacia un hueco que se abrió entre el muro de su casa y la de al lado. Con terror alcanzó a ver a su vecino sepultado por una de las paredes; solamente se le veía la cabeza y un hilo de sangre saliendo de sus orejas. Muy cerca estaba la esposa, quien lucía muy golpeada, pero despierta.",
  "De repente escuchó la voz de su padre y hermanas, quienes estaban fuera de la vivienda. Luis contestó que estaban bien, pero que la vecina necesitaba ayuda. Su padre entró brevemente y la rescató. En cambio, el vecino no se movía; ya no estaba.",
  "En ese momento, Luis tuvo una idea que le estremeció. Su madre y él solo tenían un camino para liberarse de su vivienda destruida: saltar sobre la pared que acabó con la vida de su vecino. Esto implicaría que al bajar aplastarían más el cuerpo inerte del hombre que durante años vivió junto a su familia.",
  "Su madre no quería hacerlo, pero le dijo que el vecino estaba muerto y ellos no.",
  "El reencuentro con su padre y sus hermanas fue una bendición. Todos sobrevivieron. Su hermana sintió un pequeño dolor que recorría su cuerpo: el dedo pequeño de su pie no estaba. Él quiso ayudarle, pero la joven lo detuvo: “Ñañito, es un recuerdo del terremoto”.",
  "Al día siguiente, Luis junto con otros salvavidas de la localidad se organizaron para recoger basura y escombros; también ayudaron a los refugiados en los albergues. Eso aplacó el miedo que permaneció durante varios días tras el terremoto.",
  "La historia del salvavidas estremece. Duele, pero trata de mantener la calma. “Nos estamos recuperando”, dice con esperanza y con una leve sonrisa.",
  "Se despide, toma su tabla de rescate de color naranja y sube al sitio de seguridad desde donde vigila la playa. Mira al horizonte y dice que mantiene su promesa de cuidar a los demás, así como lo hizo con su madre y su comunidad aquel día.",
];

const closingParagraphs = [
  "A pocos metros del malecón de Pedernales se levantó el memorial en honor a las víctimas del terremoto. 672 nombres se plasmaron en la placa de mármol de color negro, entre ellos, los Molina, familia de Bryan.",
  "El joven tenía apenas 19 años y practicaba surf para competencias internacionales. Recuerda que su entrenador y su familia lo motivaban a cumplir su sueño de surcar las olas dentro y fuera del país, por lo que se entrenaba a diario.",
  "En las tardes, luego de sus entrenamientos, salía con sus amigos al parque central de Pedernales, el cual, para 2016 estaba rodeado de edificaciones de entre cuatro, cinco o más pisos, una mini metrópoli.",
  "El sábado 16 de abril, Bryan conversaba con sus amigos. Estaba relajado y sonriente, pero el reloj marcó las 18:58 y la tierra se estremeció.",
  "Sintió que estaba surcando las olas, pero cuando topó el suelo vivió el terror: los edificios que le rodeaban empezaron a caer y una bruma cubrió el ambiente. “Nos quedamos ciegos varios segundos y nos sentíamos desorientados”.",
  "Solo se escuchaban gritos y llantos. La desesperación inundó su cuerpo y sintió un temblor indeterminado. No sabía si venía de la tierra o de su interior. Reaccionó y buscó a su familia entre los mares de personas que hablaban sobre “el fin del mundo”, “el tsunami” o simplemente buscaban entre las tinieblas a sus parientes y amigos.",
  "El joven de ojos verdes, cubiertos por gafas oscuras, emprendió su búsqueda. ¿Dónde están?, repetía en su cabeza. No reconocía nada. Hasta que llegó a un lugar desdibujado, ya no era la vivienda de su familia. Era un mal trazo de lo que había sido su hogar.",
  "“Estaba derrumbado”, recuerda con nostalgia y dice que fueron siete de los suyos que fallecieron, entre ellos, esposa, hijo, hermana, tías y abuelos. Surcó las paredes hechas añicos -como si se tratara del mar- y encontró a uno de sus primos, quien estaba vivo.",
  "Al día siguiente y con el dolor impregnado, se subió a uno de los camiones de la basura y junto a sus compañeros salvavidas -entre ellos Luis Zambrano- ayudó en la recolección de los desechos.",
  "El olor perforaba el olfato. Asfixiaba. Un hedor intenso emanaba de los cuerpos sin vida y se combinaba con el delicado aroma a acidez de la sangre, la descomposición de los alimentos, las aguas servidas del alcantarillado dañado y el particular olor a azufre del sudor de quienes aún respiraban. Pese a ello, Bryan solo necesitaba olvidar su pérdida, dice con resignación.",
  "Recargando…",
  "Luego del terremoto, Bryan dejó las competencias de surf y a sus 19 años “cogió más responsabilidades”. Ayudó a reconstruir la casa familiar y tras 10 años volvió a surcar las olas. Además es parte del grupo de salvavidas de esta ciudad costera.",
  "Arrodillado al pie del memorial señala los nombres de sus familiares. Sus labios tiemblan, pero no llora. Solo reflexiona: “Es algo que no te vas a reconstruir del todo porque es tu sangre, es tu familia y es tu ciudad” ya sea Portoviejo, Manta o Pedernales.",
  "10 años después, las desfiguradas calles cubiertas por paredes y vidrios rotos ya no están; tampoco se escuchan los gritos aterradores ni el llanto de quienes perdieron a los suyos o lo suyo; y el olor finalmente se disipó. Pero el recuerdo sigue en las palabras, en las miradas y en las acciones. Nada se ha borrado y es un recordatorio de lo que se hizo y de lo que está en deuda…",
];

const luisGallery = buildGallery(
  chronicle4Images,
  [
    "Pedernales sostiene en sus playas y calles las memorias de quienes auxiliaron a otros.",
    "Luis volvió a la rutina de salvavidas con la promesa de cuidar a los demás.",
    "La historia familiar se cruza con el oficio de rescate y vigilancia en la costa.",
    "La reconstrucción emocional también ocurre en los lugares donde se volvió a trabajar.",
  ],
  14,
);

const bryanGallery = buildGallery(
  chronicle4Images,
  [
    "El memorial de Pedernales guarda nombres que siguen presentes en la memoria de sus familias.",
    "Bryan reconstruyó responsabilidades antes de volver a surcar las olas.",
    "La ciudad cambió, pero las ausencias siguen marcando sus espacios públicos.",
    "El recuerdo se mantiene en las miradas, en el oficio y en los lugares recuperados.",
  ],
  22,
);

const paragraphClassName = "text-lg leading-relaxed text-gray-200 md:text-xl";
const eyebrowClassName = "mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80";
const layeredHeadlineClassName = "font-heading inline-block text-xl leading-none tracking-normal md:text-5xl lg:text-4xl";
const highlightedQuoteClassName = "Finger-font text-left text-2xl italic leading-relaxed text-white md:text-3xl";

function StoryHeadline({
  lines,
  className = "",
  align = "left",
}: {
  lines: string[];
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <h2 className={`${layeredHeadlineClassName} ${className}`}>
      <LayeredHeadline lines={lines} align={align} />
    </h2>
  );
}

function TextGroup({ paragraphs, className = "" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {paragraphs.map((paragraph, index) => {
        const isRecargandoTitle = paragraph.trim().startsWith("Recargando");

        if (isRecargandoTitle) {
          return (
            <StoryHeadline
              key={`${index}-${paragraph.slice(0, 24)}`}
              lines={["Recargando…"]}
              className="my-3"
            />
          );
        }

        return (
          <p key={`${index}-${paragraph.slice(0, 24)}`} className={paragraphClassName}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

function MediaCard({ src, alt, className = "", imageClassName = "" }: { src: string; alt: string; className?: string; imageClassName?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40 ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${imageClassName}`} />
    </div>
  );
}

function VideoFeature({ poster }: { poster: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
      <video
        src={siteVideos.chronicle4Lead}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full bg-black object-cover"
      />
    </div>
  );
}

function VerticalSection({ items }: { items: StoryPanel[] }) {
  return (
    <div className="container mx-auto max-w-6xl space-y-12 px-6 py-24">
      {items.map((panel, index) => (
        <SectionReveal key={index}>
          <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="space-y-8">
              {panel.title && (
                <StoryHeadline
                  lines={panel.titleLines ?? [panel.title]}
                  className="max-w-2xl"
                />
              )}
              <p className={paragraphClassName}>{panel.text}</p>
            </div>
            <MediaCard
              src={panel.img}
              alt={panel.title || "Crónica 4"}
              className={`${index > 0 ? "hidden lg:block" : ""} min-h-[280px] lg:min-h-[420px]`}
            />
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}

function LuisSection() {
  const heroImage = pickImage(chronicle4Images, 15);
  const supportImages = [pickImage(chronicle4Images, 16), pickImage(chronicle4Images, 17), pickImage(chronicle4Images, 18)];
  const wideImage = pickImage(chronicle4Images, 19);

  return (
    <section className="relative bg-[#070b0f] py-24 text-white md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionReveal>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className={eyebrowClassName}>Historia de Luis</p>
              <StoryHeadline
                lines={["Luis: “Mami, si te he", "ofendido,", "perdóname”"]}
                className="max-w-xl text-xl"
              />
            </div>
            <MediaCard src={heroImage} alt="Luis Zambrano en Pedernales" className="h-[360px] lg:h-[520px]" />
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <TextGroup paragraphs={luisOpeningParagraphs.slice(0, 4)} />
            <div className="space-y-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 md:p-8">
              <p className={highlightedQuoteClassName}>
                “Mami, si yo te he ofendido alguna vez... perdóname”.
              </p>
              <TextGroup paragraphs={luisOpeningParagraphs.slice(4, 6)} />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-16">
            <VideoFeature poster={heroImage} />
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="-mx-6 mt-16 flex snap-x gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {supportImages.map((image, index) => (
              <MediaCard
                key={image}
                src={image}
                alt={`Luis Zambrano contexto ${index + 1}`}
                className="h-[300px] min-w-[78vw] snap-start md:min-w-0"
              />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
            <MediaCard src={wideImage} alt="Contexto de rescate en Pedernales" className="h-[520px]" />
            <TextGroup paragraphs={[...luisOpeningParagraphs.slice(6), ...revealParagraphs.slice(0, 2)]} />
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <TextGroup paragraphs={revealParagraphs.slice(2, 4)} className="md:col-span-1" />
            <div className="space-y-6 md:col-span-1">
              <TextGroup paragraphs={revealParagraphs.slice(4, 5)} />
              <p className={highlightedQuoteClassName}>
                “Mira. Está expulsando sangre por los oídos (…) Tenemos que irnos”.
              </p>
              <TextGroup paragraphs={revealParagraphs.slice(5, 7)} />
            </div>
            <div className="space-y-6 md:col-span-1">
              <TextGroup paragraphs={revealParagraphs.slice(7)} />
              <GalleryButton images={luisGallery} label="Ver fotos de Luis" modalVariant="feature" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function BryanSection() {
  const heroImage = pickImage(chronicle4Images, 24);
  const portraitImage = pickImage(chronicle4Images, 25);
  const collageImages = [pickImage(chronicle4Images, 26), pickImage(chronicle4Images, 27), pickImage(chronicle4Images, 28), pickImage(chronicle4Images, 29)];

  return (
    <section className="relative bg-black py-24 text-white md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionReveal>
          <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10">
            <img src={heroImage} alt="Memorial de Pedernales" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <p className={eyebrowClassName}>Historia de Bryan</p>
              <StoryHeadline
                lines={["Bryan: “Han pasado", "muchos años y", "siguen faltando”"]}
                className="max-w-4xl"
              />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-14 flex snap-x gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
            <div className="min-w-[42vw] snap-start rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 md:min-w-0 md:p-6">
              <p className="text-3xl text-cyan-300 md:text-5xl">672</p>
              <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-white/60 md:mt-3 md:text-sm md:tracking-[0.18em]">nombres en el memorial</p>
            </div>
            <div className="min-w-[42vw] snap-start rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 md:min-w-0 md:p-6">
              <p className="text-3xl text-cyan-300 md:text-5xl">19</p>
              <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-white/60 md:mt-3 md:text-sm md:tracking-[0.18em]">años cuando cambió su vida</p>
            </div>
            <div className="min-w-[42vw] snap-start rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 md:min-w-0 md:p-6">
              <p className="text-3xl text-cyan-300 md:text-5xl">10</p>
              <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-white/60 md:mt-3 md:text-sm md:tracking-[0.18em]">años después volvió a las olas</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <MediaCard src={portraitImage} alt="Bryan en Pedernales" className="h-[520px]" />
            <div className="grid gap-8 md:grid-cols-2">
              <TextGroup paragraphs={closingParagraphs.slice(0, 4)} />
              <TextGroup paragraphs={closingParagraphs.slice(4, 8)} />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="-mx-6 mt-16 flex snap-x gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[230px_230px] md:overflow-visible md:px-0 md:pb-0">
            <MediaCard src={collageImages[0]} alt="Bryan collage 1" className="min-w-[78vw] snap-start md:row-span-2 md:min-w-0" />
            <MediaCard src={collageImages[1]} alt="Bryan collage 2" className="min-w-[78vw] snap-start md:min-w-0" />
            <div className="contents md:grid md:gap-4 md:grid-cols-2">
              <MediaCard src={collageImages[2]} alt="Bryan collage 3" className="min-w-[78vw] snap-start md:min-w-0" />
              <MediaCard src={collageImages[3]} alt="Bryan collage 4" className="min-w-[78vw] snap-start md:min-w-0" />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <TextGroup paragraphs={closingParagraphs.slice(8, 10)} />
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
              <p className={highlightedQuoteClassName}>
                “Es algo que no te vas a reconstruir del todo porque es tu sangre, es tu familia y es tu ciudad”.
              </p>
            </div>
            <TextGroup paragraphs={closingParagraphs.slice(10, 13)} />
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mx-auto mt-16 max-w-4xl space-y-8 text-center">
            <TextGroup paragraphs={closingParagraphs.slice(13)} />
            <GalleryButton images={bryanGallery} label="Ver fotos de Bryan" modalVariant="feature" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

export function Cronica4Section() {
  return (
    <section className="relative bg-black text-white">
      <SectionReveal>
        <div className="pt-32 pb-8 text-center">
          <div className="mb-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
          <p className="text-sm uppercase tracking-widest text-gray-400">Crónica 4</p>
          <div className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </SectionReveal>

      <VerticalSection items={introPanels} />
      <HorizontalScrollytelling sections={horizontalPanels} />
      <LuisSection />
      <BryanSection />
    </section>
  );
}
