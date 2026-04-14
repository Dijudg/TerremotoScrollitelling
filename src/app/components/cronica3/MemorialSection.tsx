import { useEffect, useRef, type ReactNode } from "react";
import { Building2, ChevronDown, Construction, Droplets, Gavel, Landmark, Store, Waves } from "lucide-react";
import { SectionReveal } from "../SectionReveal";
import { GalleryButton } from "../GalleryButton";
import { chronicle3Images } from "../../content/chronicle3Media";
import { chronicle4Images } from "../../content/chronicle4Media";
import { buildGallery, pickImage } from "../../content/mediaUtils";

const quoteClassName = "Finger-font text-left text-xl italic text-balance text-black";
const paragraphClassName = "text-lg leading-relaxed text-black/85 md:text-xl";
const sectionHeadingClassName = "font-heading mb-8 mt-16 text-balance text-3xl font-bold leading-[1.35] text-black md:text-5xl";

const reconstructionStats = [
  { value: "USD 2.200 M", label: "recaudados con la Ley de Solidaridad" },
  { value: "USD 118 M", label: "encontrados en la cuenta de reconstrucción" },
  { value: "USD 5-7 M", label: "sin asignación, según Giler" },
  { value: "13 años", label: "de prisión para Glas y Bernal" },
];

const pedernalesStats = [
  { value: "USD 2,3 M", label: "para alcantarillado y obras adicionales" },
  { value: "USD 2,3 M", label: "para el nuevo malecón" },
  { value: "10.000", label: "turistas cada fin de semana" },
  { value: "14", label: "comerciantes reubicados en caipiriñas" },
];

const priorityProjects = [
  { name: "Agua potable en Chone", amount: 24, label: "USD 24 M", icon: Droplets },
  { name: "Agua potable en Sucre, Tosagua y San Vicente", amount: 14, label: "USD 14 M", icon: Droplets },
  { name: "Plaza Memorial San Gregorio", amount: 8.5, label: "USD 8,5 M", icon: Landmark },
  { name: "Puentes Lodana y Quimis", amount: 7, label: "USD 7 M", icon: Construction },
  { name: "Mercado de Jipijapa", amount: 7, label: "USD 7 M", icon: Store },
  { name: "Agua potable para Manta", amount: 6, label: "USD 5-6 M", icon: Waves },
  { name: "Mercado de Calceta", amount: 4.5, label: "USD 4,5 M", icon: Store },
  { name: "Obras en Esmeraldas", amount: 4.5, label: "USD 4,5 M", icon: Building2 },
];

const justiceTimeline = [
  { year: "2016", text: "Se crea el Comité de Reconstrucción y se expide la Ley de Solidaridad." },
  { year: "2019", text: "Fiscalía recibe la primera denuncia por presuntos abusos de dinero público." },
  { year: "2020", text: "Cpccs envía una nueva queja por presunta delincuencia organizada." },
  { year: "2024", text: "Se formulan cargos por peculado y se vinculan más exfuncionarios." },
  { year: "2025", text: "Glas y Bernal son sentenciados a 13 años de prisión." },
];

const pedernalesGallery = buildGallery(
  chronicle3Images,
  [
    "Espacios urbanos que todavía cargan señales de la reconstrucción pendiente.",
    "Zonas comerciales y vías donde la recuperación convive con las cicatrices del terremoto.",
    "Manabí mantiene obras, memorias y deudas abiertas una década después.",
    "La memoria pública también se sostiene en los lugares que siguen marcados.",
  ],
  4,
);

const justiceGallery = buildGallery(
  chronicle4Images,
  [
    "Los rescatistas y sobrevivientes sostienen la otra cara de la historia: la memoria humana.",
    "Las comunidades afectadas reconstruyeron rutinas mientras esperaban respuestas institucionales.",
    "La reparación sigue siendo material, judicial y también simbólica.",
    "Las historias personales ayudan a medir lo que las cifras no alcanzan a mostrar.",
  ],
  6,
);

function Paragraph({ children }: { children: ReactNode }) {
  return <p className={paragraphClassName}>{children}</p>;
}

function Quote({ children }: { children: ReactNode }) {
  return <p className={quoteClassName}>{children}</p>;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <SectionReveal>
      <h3 className={sectionHeadingClassName}>{children}</h3>
    </SectionReveal>
  );
}

function FeatureSplit({ text, visual }: { text: ReactNode; visual: ReactNode }) {
  return (
    <SectionReveal>
      <div className="my-12 grid min-w-0 gap-8 overflow-x-clip lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0 space-y-7">{text}</div>
        <div className="min-w-0">{visual}</div>
      </div>
    </SectionReveal>
  );
}

function StatCards({ items }: { items: Array<{ value: string; label: string }> }) {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
      {items.map((item) => (
        <div key={item.label} className="min-w-[42vw] snap-start rounded-lg border border-black/15 bg-black/[0.03] p-4 sm:min-w-0 sm:p-5">
          <p className="font-heading text-2xl leading-tight text-black md:text-4xl">{item.value}</p>
          <p className="mt-2 text-xs leading-snug text-black/65 sm:mt-3 sm:text-sm sm:leading-relaxed">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function ImageGalleryFeature({
  image,
  alt,
  caption,
  gallery,
  label,
}: {
  image: string;
  alt: string;
  caption: string;
  gallery: Array<{ url: string; caption?: string }>;
  label: string;
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-black/15">
        <img src={image} alt={alt} loading="lazy" decoding="async" className="h-[320px] w-full object-cover" />
      </div>
      <p className="text-sm italic leading-relaxed text-black/60">{caption}</p>
      <GalleryButton images={gallery} label={label} theme="light" />
    </div>
  );
}

function ProjectBars() {
  const maxAmount = Math.max(...priorityProjects.map((project) => project.amount));
  const visibleProjects = priorityProjects.slice(0, 4);
  const hiddenProjects = priorityProjects.slice(4);

  return (
    <div className="rounded-lg border border-black/15 bg-white p-5 shadow-sm md:p-8">
      <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-black/60">Obras priorizadas con recursos encontrados</h4>
      <div className="space-y-5">
        {visibleProjects.map((project) => (
          <ProjectBarItem key={project.name} project={project} maxAmount={maxAmount} />
        ))}
      </div>

      {hiddenProjects.length > 0 && (
        <details className="group mt-6 rounded-lg border border-black/10 bg-black/[0.025]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-black/60 transition-colors hover:text-black [&::-webkit-details-marker]:hidden">
            <span>Ver más obras priorizadas</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="space-y-5 border-t border-black/10 px-4 py-5">
            {hiddenProjects.map((project) => (
              <ProjectBarItem key={project.name} project={project} maxAmount={maxAmount} compact />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function ProjectBarItem({
  project,
  maxAmount,
  compact = false,
}: {
  project: (typeof priorityProjects)[number];
  maxAmount: number;
  compact?: boolean;
}) {
  const Icon = project.icon;

  return (
    <div>
      <div className={`mb-2 grid grid-cols-[2rem_1fr_auto] items-center gap-3 text-black/70 ${compact ? "text-xs" : "text-sm"}`}>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d72638]/10 text-[#d72638]">
          <Icon className="h-4 w-4" />
        </span>
        <span>{project.name}</span>
        <strong className="text-black">{project.label}</strong>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-[#d72638]"
          style={{ width: `${Math.max(14, (project.amount / maxAmount) * 100)}%` }}
        />
      </div>
    </div>
  );
}

function FlourishEmbed() {
  return (
    <div className="overflow-hidden rounded-lg border border-black/15 bg-white shadow-sm">
      <iframe
        src="https://public.flourish.studio/visualisation/28525005/embed"
        title="Infografía reconstrucción de Manabí"
        loading="lazy"
        className="h-[680px] w-full"
        allowFullScreen
      />
    </div>
  );
}

function JusticeTimeline() {
  const mobileTimelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = mobileTimelineRef.current;

    if (!timeline) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    let animationFrame = 0;
    let timeoutId = 0;
    let hasAnimated = false;

    const animateScroll = () => {
      const maxScroll = timeline.scrollWidth - timeline.clientWidth;

      if (maxScroll <= 0) {
        return;
      }

      const duration = 8500;
      const startTime = performance.now();
      timeline.scrollLeft = 0;

      const step = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        timeline.scrollLeft = maxScroll * easedProgress;

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };

      animationFrame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return;
        }

        hasAnimated = true;
        timeoutId = window.setTimeout(animateScroll, 500);
      },
      { threshold: 0.35 },
    );

    observer.observe(timeline);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full min-w-0 max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-black/15 bg-black/[0.03] py-5 md:max-w-none md:p-8">
      <div className="mb-6 flex items-center gap-2.5 text-black/60 px-5">
        <Gavel className="h-4 w-4" />
        <h4 className="text-[11px] font-bold uppercase  tracking-[0.14em] text-balance">Ruta del caso Reconstrucción de Manabí</h4>
      </div>

      <div className="hidden md:block">
        <ol className="relative space-y-0 border-l border-black/15 pl-6">
          {justiceTimeline.map((item, index) => (
            <li key={item.year} className="relative pb-5 last:pb-0">
              <span
                className={`absolute -left-[1.95rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white shadow-sm ${
                  index === justiceTimeline.length - 1 ? "bg-[#d72638]" : "bg-[#66DC71]"
                }`}
                aria-hidden="true"
              />
              <div className="grid gap-2 lg:grid-cols-[4rem_1fr]">
                <p className="font-heading text-xl leading-none text-[#d72638]">{item.year}</p>
                <div>
                  <p className="text-[9px] font-semibold uppercase leading-none tracking-[0.12em] text-black/40">
                    Etapa {index + 1}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-black/70">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div ref={mobileTimelineRef} className="block w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-3 md:hidden">
        <ol className="inline-flex min-w-max list-none items-start">
          {justiceTimeline.map((item, index) => {
            const isLast = index === justiceTimeline.length - 1;

            return (
              <li key={item.year} className="w-[190px] shrink-0 transition-all duration-200">
                <div className="mb-5 flex flex-col items-center px-4 text-center">
                  <span className="font-heading text-3xl leading-none text-[#d72638]">{item.year}</span>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
                    Etapa {index + 1}
                  </span>
                </div>
                <div
                  className={`relative flex min-h-[132px] justify-center border-t-2 px-4 pt-7 text-center transition-all duration-200 ${
                    isLast ? "border-[#d72638]" : "border-[#66DC71]"
                  }`}
                >
                  <span
                    className={`absolute -top-[14px] left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border-2 border-white shadow-sm ${
                      isLast ? "bg-[#d72638]" : "bg-[#66DC71]"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-black/75">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function MemorialSection() {
  return (
    <section className="relative min-h-screen bg-white text-black">
      <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionReveal>
          <div className="mb-14 flex items-center justify-center">
            <div className="relative h-52 w-52 rounded-full border-2 border-black/20 md:h-64 md:w-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-6xl font-light text-[#d72638] md:text-7xl">18:58</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-black/60 md:text-sm">16 de abril, 2016</div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 h-16 w-[2px] -translate-x-1/2 -translate-y-full bg-black md:h-20" />
              <div className="absolute top-1/2 left-1/2 h-20 w-[2px] -translate-x-1/2 -translate-y-full rotate-[132deg] bg-black/55 md:h-24" />
              <div className="absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <h2 className="font-heading mb-10 text-balance text-center text-4xl leading-tight md:text-6xl">
            Manabí, entre la necesidad y la corrupción
          </h2>
        </SectionReveal>

        <SectionReveal>
          <div className="mx-auto my-12 max-w-5xl bg-black/10 md:p-12">
            <Paragraph>
              El dolor de los sobrevivientes, la <strong>heroicidad de los rescatistas</strong> y la <strong>resiliencia de la comunidad</strong> son una parte de la historia que marcó Ecuador en 2016. La otra, <em>más fría y menos poética</em>, es la de los recursos que nunca llegaron, las obras no priorizadas y la corrupción que se impuso sobre cientos de sepulcros, sobre las familias fracturadas y sobre las necesidades más básicas de quienes lo perdieron todo.
            </Paragraph>
          </div>
        </SectionReveal>

        

        <FeatureSplit
          text={
            <>
              <Paragraph>
                <strong>Pedernales fue el epicentro del terremoto</strong> y la localidad más afectada por el sismo. El alcantarillado quedó dañado y sorprendentemente ha sido uno de los más ignorados durante estos 10 años. Manuel Isidro Panezo, alcalde, cuestiona que pese a que su ciudad fue el epicentro no se han entregado los recursos necesarios para su reconstrucción.
              </Paragraph>
              <Quote>“A última hora nos dijeron que se acabó la plata (...) Fue una injusticia”.</Quote>
              <Paragraph>
                Actualmente se requieren <strong>USD 2,3 millones</strong> para la construcción del alcantarillado y para incluir el asfaltado de la vía principal, planta de tratamiento de agua, conexiones de agua lluvia, residuales y demás obras adicionales. Todo esto es necesario para mejorar la situación de esta ciudad que, cada fin de semana, recibe al menos <strong>10.000 turistas nacionales y extranjeros</strong>.
              </Paragraph>
            </>
          }
          visual={<StatCards items={pedernalesStats} />}
        />

        <FeatureSplit
          text={
            <>
              <Paragraph>
                A esto se suma la construcción del nuevo malecón de la ciudad que resultó muy afectado en el terremoto. Luego de 10 años, la obra avanza; contará con casetas -conocidas como caipiriñas- para los <strong>14 comerciantes</strong> de la zona. El monto de inversión es de <strong>USD 2,3 millones</strong> y se espera que estén listas para finales de este 2026.
              </Paragraph>
              <Paragraph>
                Su ubicación cambiará. No estará cerca del memorial ni de la palabra PEDERNALES, se ubicará a pocos metros de la intersección del Malecón y avenida Juan Pereira, donde los pobladores cuentan que fue el epicentro del sismo. De hecho se observa una división en la vía, la cual quedó resquebrajada.
              </Paragraph>
              <Paragraph>
                También se retirará el asta del memorial donde se izó la Bandera Nacional en 2016. Con el tiempo está desgastado y los turistas corren riesgo de que se caiga.
              </Paragraph>
            </>
          }
          visual={
            <ImageGalleryFeature
              image={pickImage(chronicle3Images, 6)}
              alt="Vista de Manabí durante la reconstrucción"
              caption="Imagen referencial del sitio para acompañar el bloque sobre obras pendientes y recuperación urbana."
              gallery={pedernalesGallery}
              label="Ver imágenes de contexto"
            />
          }
        />

        <SectionHeading>¿Aún hay dinero para la reconstrucción de Manabí?</SectionHeading>

        <FeatureSplit
          text={
            <>
              <Paragraph>
                La respuesta es sencilla, pero el trámite fue un proceso un tanto complejo. Lo explica <strong>Gerardo Giler</strong>, subsecretario de la Zonal 4 (Manabí) del Ministerio de Infraestructura y Transporte.
              </Paragraph>
              <Quote>
                “Usted recordará que hubo un ministro que indicó que no había nada de dinero para la reconstrucción; ni un centavo. Sin embargo, se verificó la información y encontramos USD 118 millones dentro de la cuenta de la Ley de Solidaridad”.
              </Quote>
              <Paragraph>
                Con ese dinero se priorizaron obras para Manabí, entre ellos, el puente Lodana (Santa Ana) y el puente Quimis (vía Montecristi-Jipijapa-La Cadena), con <strong>USD 7 millones</strong>. Además está la Plaza Memorial San Gregorio, en Portoviejo, con <strong>USD 8,5 millones</strong>; el sistema de agua potable en Chone con un valor de <strong>USD 24 millones</strong> y el mercado de Calceta, con <strong>USD 4,5 millones</strong>.
              </Paragraph>
            </>
          }
          visual={<ProjectBars />}
        />

        <FeatureSplit
          text={
            <>
              <Paragraph>
                No son las únicas. Se ejecutarán los sistemas de agua potable para Sucre, Tosagua y San Vicente, con un monto de aproximadamente <strong>USD 14 millones</strong>; el mercado de Jipijapa, con un valor de <strong>USD 7 millones</strong>, y el agua potable para Manta, que costará entre <strong>USD 5 y 6 millones</strong>.
              </Paragraph>
              <Paragraph>
                Estas obras ya están en proceso de ejecución y se espera que estén listas para finales de <strong>2026</strong>; excepto el proyecto de Chone que se prevé que concluya durante el primer trimestre de <strong>2027</strong>.
              </Paragraph>
              <Paragraph>
                Los recursos también han sido destinados para obras de reconstrucción en Esmeraldas. Por ejemplo, se destinaron <strong>USD 4,5 millones</strong> para el agua potable en Muisne; las vías Chontaduro-Chumunde y Roto-Cube; y la estación de bombeo en Atacames.
              </Paragraph>
              <Paragraph>
                <strong>¿Y Pedernales?</strong> Giler reconoce que esta ciudad costera fue una de las localidades más afectadas por el terremoto. Sin embargo, quien debe priorizar las obras es el Comité de la Reconstrucción, el cual tiene un representante de los municipios.
              </Paragraph>
              <Quote>“Cada uno debe promover el proyecto y se debe cumplir con los requisitos necesarios para su ejecución”.</Quote>
              <Paragraph>
                A la fecha, Giler señala que queda un saldo de entre <strong>USD 5 millones y USD 7 millones</strong>; aún están sin asignación.
              </Paragraph>
            </>
          }
          visual={<FlourishEmbed />}
        />

        <SectionHeading>¿La justicia llegó? 13 años de cárcel para Glas y Bernal</SectionHeading>

        <FeatureSplit
          text={
            <>
              <Paragraph>
                Mientras Pedernales espera obras básicas como alcantarillado, la justicia ecuatoriana condenó en <strong>2025</strong> a dos exfuncionarios por desviar más de <strong>USD 200 millones</strong> que debieron usarse precisamente para la reconstrucción de las localidades afectadas por el terremoto.
              </Paragraph>
              <Paragraph>
                En abril de 2016, el presidente Rafael Correa promulgó el Decreto Ejecutivo 1004, en el que se creó el Comité de Reconstrucción y Reactivación Productiva y del Empleo con la finalidad de ejecutar las acciones para la reconstrucción de Manabí y Esmeraldas.
              </Paragraph>
              <Paragraph>
                Un mes más tarde se expidió la Ley Orgánica de Solidaridad y Corresponsabilidad Ciudadana, la cual contempló la recaudación de contribuciones de todos los ecuatorianos, entre ellas, el aumento del impuesto al valor agregado (IVA) del <strong>12% al 14%</strong>. En total se estima que se recolectó un poco más de <strong>USD 2.200 millones</strong>, según cifras proporcionadas por el Ministerio de Infraestructura y Transporte.
              </Paragraph>
            </>
          }
          visual={<JusticeTimeline />}
        />

        <FeatureSplit
          text={
            <>
              <Paragraph>
                No fue hasta el año <strong>2019</strong> -tres años después del terremoto- que la Fiscalía recibió la primera denuncia por parte del Consejo de Participación Ciudadana y Control Social transitorio (Cpccs-t) sobre presuntos abusos del dinero público.
              </Paragraph>
              <Paragraph>
                Un mes después recibió un informe con indicios de responsabilidad penal por parte de la Contraloría. La entidad realizó un examen especial a los contratos suscritos para la construcción del Parque Las Vegas, en Portoviejo; el proyecto del tramo Acceso al Puerto de Manta; el redondel del Imperio Colisa. Todos los mencionados recibieron fondos de la Ley de Solidaridad.
              </Paragraph>
              <Paragraph>
                Lejos de solucionarse, las denuncias siguieron. En febrero de 2020, el Cpccs envió a Fiscalía una nueva queja. Esta vez fue por el presunto delito de delincuencia organizada, ya que salió a la luz una reunión entre Jorge Glas, Carlos Bernal y Pablo Ortiz.
              </Paragraph>
              <Paragraph>
                En aquella reunión se señala que se priorizaron <strong>584 proyectos</strong> <em>“sin sustento técnico”</em> en el marco de la reactivación de las zonas afectadas. Significa que los recursos fueron utilizados para obras que no tenían nada que ver con el movimiento telúrico.
              </Paragraph>
            </>
          }
          visual={
            <ImageGalleryFeature
              image={pickImage(chronicle4Images, 8)}
              alt="Memoria y reconstrucción en Manabí"
              caption="Imagen referencial del sitio para acompañar el eje judicial y de memoria pública."
              gallery={justiceGallery}
              label="Ver galería de memoria"
            />
          }
        />

        <SectionReveal>
          <figure className="relative left-1/2 my-16 h-[360px] w-screen -translate-x-1/2 overflow-hidden md:my-24 md:h-[520px]">
            <img
              src={pickImage(chronicle4Images, 9)}
              alt="Reconstrucción y memoria pública en Manabí"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" aria-hidden="true" />
          </figure>
        </SectionReveal>

        <SectionReveal>
          <div className="mx-auto max-w-4xl space-y-7">
            <Paragraph>
              En enero de 2024 se formularon cargos en contra de los exfuncionarios mencionados por la presunta participación en el delito de peculado. El juez dictó prisión preventiva para Glas y Bernal; más la retención, inmovilización y congelamiento de sus cuentas.
            </Paragraph>
            <Paragraph>
              Entre alegatos y suspensiones de las audiencias, en abril de 2024 se vincularon a seis personas más a la investigación, entre ellos, Walter Hipólito S., Boris Sebastián C., Franklin José B., Omar Wilfrido Ch., Víctor Salvador J. y Milton Daniel M.
            </Paragraph>
            <Paragraph>
              En 2025, a nueve años del terremoto, se vivió lo más fuerte del caso denominado <strong>Reconstrucción de Manabí</strong>. En ese año, la Fiscalía comprobó que Glas y Bernal -ambos exfuncionarios del gobierno de Rafael Correa- fueron los coautores del delito de peculado, ya que usaron mal los recursos públicos recaudados con la Ley de Solidaridad.
            </Paragraph>
            <Paragraph>
              Por ello se les dictó <strong>13 años de prisión</strong>. Glas cumple esta y otras penas en la cárcel del Encuentro, en Santa Elena. Mientras que Bernal reside en Estados Unidos desde el 2018 -dos años después del terremoto- y no ha vuelto al país. Su defensa se realizó vía telemática.
            </Paragraph>
            <Paragraph>
              A esto se suma la <strong>inhabilitación de por vida</strong> para ejercer un cargo público y la pérdida de sus derechos políticos por <strong>25 años</strong>. También tienen que pagar <strong>USD 250 millones</strong> como reparación integral y una multa de <strong>USD 32.900</strong>. Los sentenciados además deberán publicar la condena en tres medios de circulación nacional y un resumen del fallo.
            </Paragraph>
            <Paragraph>
              Los siete procesados restantes fueron liberados del proceso, porque no se encontraron las pruebas suficientes para condenarlos.
            </Paragraph>
            <Quote>
              Entonces, ¿la justicia llegó? No, porque 10 años después, Manabí sigue esperando.
            </Quote>
            <Paragraph>
              En Pedernales, el pavimento dividido sigue ahí; al igual que los edificios agrietados y los espacios baldíos donde se levantaban casas y negocios; <em>cicatrices del desastre…</em>
            </Paragraph>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
