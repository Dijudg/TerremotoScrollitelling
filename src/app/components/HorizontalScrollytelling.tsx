import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface StorySection {
  title?: string;
  text: string;
  img: string;
  textContainerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  paragraphClassName?: string;
  detachedTitleClassName?: string;
}

interface HorizontalScrollytellingProps {
  sections: StorySection[];
}

export function HorizontalScrollytelling({ sections }: HorizontalScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The horizontal translation
  // If we have N sections, we want to translate -(N - 1) * 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * ((sections.length - 1) / sections.length)}%`]);
  const getClassName = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

  return (
    <section ref={containerRef} className="relative bg-black" style={{ height: `${sections.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-black">
        <motion.div 
          className="flex h-full"
          style={{ 
            width: `${sections.length * 100}%`, 
            x 
          }}
        >
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col md:block h-full w-screen relative shrink-0">
              {/* Mobile: Top half image, Desktop: Full background */}
              <div className="h-1/2 md:h-full md:absolute md:inset-0 w-full relative">
                <img 
                  src={section.img} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="hidden md:block absolute inset-0 bg-black/60" />
                <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>

              {section.title && section.detachedTitleClassName && (
                <div className={getClassName("absolute z-20 hidden p-24 md:block", section.detachedTitleClassName)}>
                  <h3 className={getClassName("mb-6 whitespace-pre-line text-balance text-3xl leading-[1.4] tracking-tight md:text-5xl", section.titleClassName)}>
                    {section.title}
                  </h3>
                </div>
              )}
              
              {/* Text Container */}
              <div
                className={getClassName(
                  "h-1/2 md:h-full md:absolute md:inset-0 w-full flex items-center justify-center p-8 md:p-24 bg-black md:bg-transparent overflow-y-auto md:overflow-visible",
                  section.textContainerClassName,
                )}
              >
                <div className={getClassName("max-w-3xl space-y-6 relative z-10 my-auto", section.contentClassName)}>
                  {section.title && (
                    <h3
                      className={getClassName(
                        "text-balance whitespace-pre-line text-3xl md:text-5xl tracking-tight mb-6 leading-[1.4]",
                        section.detachedTitleClassName ? "md:hidden" : undefined,
                        section.titleClassName,
                      )}
                    >
                      {section.title}
                    </h3>
                  )}
                  <p className={getClassName("text-balance text-lg md:text-2xl lg:text-3xl leading-relaxed text-gray-200 font-light", section.paragraphClassName)}>
                    {/* Add yellow highlight to specific word in specific paragraph, or just render it */}
                    {section.text.includes("una linterna") ? (
                      <span dangerouslySetInnerHTML={{ 
                        __html: section.text.replace("una linterna.", '<span class="text-yellow-400 font-semibold">una linterna.</span>') 
                      }} />
                    ) : section.text.includes("'la cueva… la cueva'") ? (
                      <span className="italic text-white">{section.text}</span>
                    ) : (
                      section.text
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
