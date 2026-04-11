import { type ReactNode, type TouchEvent, type WheelEvent, useEffect, useRef, useState } from "react";

interface MobileStoryPagerSection {
  title?: string;
  text: string;
  img: string;
  mobileImg?: string;
  textContainerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  paragraphClassName?: string;
}

interface MobileStoryPagerProps {
  sections: MobileStoryPagerSection[];
  renderText?: (text: string) => ReactNode;
  className?: string;
  imageOverlayClassName?: string;
}

const SWIPE_THRESHOLD = 44;
const TOUCH_MOVE_THRESHOLD = 10;
const NAVIGATION_LOCK_MS = 520;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getGestureIntent = (deltaX: number, deltaY: number, threshold: number) => {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (Math.max(absX, absY) < threshold) {
    return 0;
  }

  if (absX > absY) {
    return deltaX < 0 ? 1 : -1;
  }

  return deltaY < 0 ? 1 : -1;
};

const getClassName = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

export function MobileStoryPager({
  sections,
  renderText,
  className,
  imageOverlayClassName = "bg-gradient-to-t from-black via-black/10 to-transparent",
}: MobileStoryPagerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const activeIndexRef = useRef(0);
  const lastNavigationRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const canNavigate = (direction: number) => {
    if (direction > 0) {
      return activeIndexRef.current < sections.length - 1;
    }

    return activeIndexRef.current > 0;
  };

  const navigate = (direction: number) => {
    if (!direction || !canNavigate(direction)) {
      return;
    }

    const now = window.performance.now();
    if (now - lastNavigationRef.current < NAVIGATION_LOCK_MS) {
      return;
    }

    const nextIndex = clamp(activeIndexRef.current + direction, 0, sections.length - 1);
    lastNavigationRef.current = now;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const intent = getGestureIntent(touch.clientX - start.x, touch.clientY - start.y, SWIPE_THRESHOLD);
    navigate(intent);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const intent = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX > 0 ? 1 : -1
      : event.deltaY > 0 ? 1 : -1;

    if (!canNavigate(intent)) {
      return;
    }

    event.preventDefault();
    navigate(intent);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      const start = touchStartRef.current;
      const touch = event.touches[0];

      if (!start || !touch) {
        return;
      }

      const intent = getGestureIntent(touch.clientX - start.x, touch.clientY - start.y, TOUCH_MOVE_THRESHOLD);
      if (canNavigate(intent)) {
        event.preventDefault();
      }
    };

    viewport.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      viewport.removeEventListener("touchmove", handleTouchMove);
    };
  }, [sections.length]);

  return (
    <section className={getClassName("relative h-[100svh] overflow-hidden bg-black text-white", className)}>
      <div
        ref={viewportRef}
        className="h-full w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translate3d(-${activeIndex * 100}vw, 0, 0)`,
            width: `${sections.length * 100}%`,
            willChange: "transform",
          }}
        >
          {sections.map((section, index) => (
            <article key={index} className="relative flex h-full w-screen shrink-0 flex-col">
              <div className="relative h-[44svh] w-full">
                <img src={section.mobileImg ?? section.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-100" />
                <div className={getClassName("absolute inset-0", imageOverlayClassName)} />
              </div>

              <div
                className={getClassName(
                  "flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-black px-6 py-7",
                  section.textContainerClassName,
                )}
              >
                <div className={getClassName("my-auto w-full max-w-3xl space-y-4", section.contentClassName)}>
                  {section.title && (
                    <h3 className={getClassName("whitespace-pre-line text-sm font-semibold leading-none tracking-tight", section.titleClassName)}>
                      {section.title}
                    </h3>
                  )}
                  <p className={getClassName("text-balance text-sm leading-none text-gray-200", section.paragraphClassName)}>
                    {renderText ? renderText(section.text) : section.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {sections.map((_, index) => (
          <span
            key={index}
            className={getClassName(
              "h-1.5 rounded-full transition-all duration-300",
              index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/35",
            )}
          />
        ))}
      </div>
    </section>
  );
}
