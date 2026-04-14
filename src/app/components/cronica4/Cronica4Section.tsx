import { SectionReveal } from "../SectionReveal";
import { HorizontalScrollytelling } from "../HorizontalScrollytelling";
import { ScrollStepRevealPanel } from "../ScrollStepRevealPanel";
import {
  chronicle4HorizontalImages,
  chronicle4HorizontalMobileImages,
  chronicle4Images,
} from "../../content/chronicle4Media";
import { pickImage } from "../../content/mediaUtils";

interface StoryPanel {
  title?: string;
  text: string;
  img: string;
  mobileImg?: string;
}

const introPanels: StoryPanel[] = [
  {
    title: "Cronica 4: relato en construccion",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    img: pickImage(chronicle4Images, 0),
  },
  {
    text: "Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    img: pickImage(chronicle4Images, 1),
  },
  {
    text: "Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    img: pickImage(chronicle4Images, 2),
  },
  {
    text: "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.",
    img: pickImage(chronicle4Images, 3),
  },
];

const horizontalPanels: StoryPanel[] = [
  {
    title: "Capitulo I",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: pickImage(chronicle4HorizontalImages, 0),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 0),
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: pickImage(chronicle4HorizontalImages, 1),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 1),
  },
  {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    img: pickImage(chronicle4HorizontalImages, 2),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 2),
  },
  {
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: pickImage(chronicle4HorizontalImages, 3),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 3),
  },
  {
    text: "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus.",
    img: pickImage(chronicle4HorizontalImages, 4),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 4),
  },
  {
    title: "Capitulo II",
    text: "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
    img: pickImage(chronicle4HorizontalImages, 5),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 5),
  },
  {
    text: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae.",
    img: pickImage(chronicle4HorizontalImages, 6),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 6),
  },
  {
    text: "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
    img: pickImage(chronicle4HorizontalImages, 7),
    mobileImg: pickImage(chronicle4HorizontalMobileImages, 7),
  },
];

const revealParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.",
  "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
];

const closingParagraphs = [
  "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
  "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
  "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.",
  "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
];

function VerticalSection({ items }: { items: StoryPanel[] }) {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-24">
      {items.map((panel, index) => (
        <SectionReveal key={index}>
          <div className="space-y-8 text-lg leading-relaxed text-gray-200 md:text-xl">
            {panel.title && <h2 className="mb-8 text-3xl text-white md:text-4xl">{panel.title}</h2>}
            <p>{panel.text}</p>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}

export function Cronica4Section() {
  const collageImages = [
    pickImage(chronicle4Images, 8),
    pickImage(chronicle4Images, 9),
    pickImage(chronicle4Images, 10),
    pickImage(chronicle4Images, 11),
  ];
  const spotlightImage = pickImage(chronicle4Images, 12);
  const closingImage = pickImage(chronicle4Images, 13);

  return (
    <section className="relative bg-black text-white">
      <SectionReveal>
        <div className="pt-32 pb-8 text-center">
          <div className="mb-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
          <p className="text-sm uppercase tracking-widest text-gray-400">Cronica 4</p>
          <div className="mt-8 inline-block h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </SectionReveal>

      <VerticalSection items={introPanels} />

      <HorizontalScrollytelling sections={horizontalPanels} />

      <ScrollStepRevealPanel image={spotlightImage} alt="Cronica 4" contentClassName="text-left">
        <div className="max-w-3xl space-y-8">
          <h3 className="text-3xl leading-[1.4] text-white md:text-4xl">Bloque narrativo temporal</h3>
          {revealParagraphs.map((paragraph) => (
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
              <img src={collageImages[0]} alt="Cronica 4 collage 1" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem]">
              <img src={collageImages[1]} alt="Cronica 4 collage 2" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem]">
                <img src={collageImages[2]} alt="Cronica 4 collage 3" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[2rem]">
                <img src={collageImages[3]} alt="Cronica 4 collage 4" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem]">
              <img src={closingImage} alt="Cronica 4 cierre" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl leading-[1.35] text-white md:text-5xl">Cierre provisional de la cronica 4</h3>

              {closingParagraphs.map((paragraph) => (
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
