import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MobileStoryPager } from "./MobileStoryPager";

interface StorySection {
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

interface HorizontalScrollytellingProps {
  sections: StorySection[];
  enablePeriodicShake?: boolean;
  imageOverlayClassName?: string;
  mobileImageOverlayClassName?: string;
}

interface PeriodicShakeFrameProps {
  children: ReactNode;
  className?: string;
  enabled: boolean;
}

const getClassName = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");
const splitParagraphs = (text: string) => text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);

function PeriodicShakeFrame({ children, className, enabled }: PeriodicShakeFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;

    if (!enabled || !frame) {
      return;
    }

    const stopTimers = (resetState = true) => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (resetState) {
        setIsShaking(false);
      }
    };

    const triggerShake = () => {
      setIsShaking(false);
      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = null;
        setIsShaking(true);
        timeoutRef.current = window.setTimeout(() => setIsShaking(false), 760);
      });
    };

    const startTimer = () => {
      if (intervalRef.current !== null) {
        return;
      }

      intervalRef.current = window.setInterval(triggerShake, 20000);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimer();
        } else {
          stopTimers();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      stopTimers(false);
    };
  }, [enabled]);

  return (
    <div ref={frameRef} className={getClassName(className, isShaking ? "story-quake-active" : undefined)}>
      {children}
    </div>
  );
}

export function HorizontalScrollytelling({
  sections,
  enablePeriodicShake = false,
  imageOverlayClassName = "bg-black/60",
  mobileImageOverlayClassName = "bg-gradient-to-t from-black to-transparent",
}: HorizontalScrollytellingProps) {
  const renderText = (text: string) => {
    if (text.includes("una linterna")) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: text.replace("una linterna.", '<span class="text-yellow-400 font-semibold">una linterna.</span>'),
          }}
        />
      );
    }

    if (text.includes("la cueva") && text.includes("\n")) {
      return <span className="italic text-white">{text}</span>;
    }

    return text;
  };

  return (
    <>
      <PeriodicShakeFrame className="md:hidden" enabled={enablePeriodicShake}>
        <MobileStoryPager
          sections={sections}
          renderText={renderText}
          imageOverlayClassName={mobileImageOverlayClassName}
        />
      </PeriodicShakeFrame>
      <DesktopHorizontalScrollytelling
        sections={sections}
        renderText={renderText}
        enablePeriodicShake={enablePeriodicShake}
        imageOverlayClassName={imageOverlayClassName}
        mobileImageOverlayClassName={mobileImageOverlayClassName}
      />
    </>
  );
}

function DesktopHorizontalScrollytelling({
  sections,
  renderText,
  enablePeriodicShake = false,
  imageOverlayClassName = "bg-black/60",
}: HorizontalScrollytellingProps & {
  renderText: (text: string) => ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The horizontal translation
  // If we have N sections, we want to translate -(N - 1) * 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * ((sections.length - 1) / sections.length)}%`]);

  return (
    <section ref={containerRef} className="relative hidden bg-black md:block" style={{ height: `${sections.length * 100}vh` }}>
      <PeriodicShakeFrame
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-black"
        enabled={enablePeriodicShake}
      >
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
                <picture className="block h-full w-full">
                  {section.desktopMdImg && (
                    <source media="(min-width: 768px) and (max-width: 1023px)" srcSet={section.desktopMdImg} />
                  )}
                  <img
                    src={section.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-100"
                  />
                </picture>
                <div className={getClassName("hidden md:block absolute inset-0", imageOverlayClassName)} />
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
                        "text-balance whitespace-pre-line text-xl md:text-5xl tracking-tight mb-6 leading-[1.4]",
                        section.detachedTitleClassName ? "md:hidden" : undefined,
                        section.titleClassName,
                      )}
                    >
                      {section.title}
                    </h3>
                  )}
                  {splitParagraphs(section.text).map((paragraph, paragraphIndex) => (
                    <p
                      key={`${index}-paragraph-${paragraphIndex}`}
                      className={getClassName("text-balance text-base  lg:text-xl  text-gray-200 font-light", section.paragraphClassName)}
                    >
                      {renderText(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </PeriodicShakeFrame>
    </section>
  );
}
