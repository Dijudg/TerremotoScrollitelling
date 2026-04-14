import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

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

const SWIPE_THRESHOLD = 58;
const TOUCH_MOVE_THRESHOLD = 10;
const NAVIGATION_LOCK_MS = 780;
const SNAP_LOCK_MS = 420;
const SLIDE_TRANSITION_MS = 760;

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
const splitParagraphs = (text: string) => text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);

export function MobileStoryPager({
  sections,
  renderText,
  className,
  imageOverlayClassName = "bg-gradient-to-t from-black via-black/10 to-transparent",
}: MobileStoryPagerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const activeIndexRef = useRef(0);
  const isLockedRef = useRef(false);
  const isReleasingRef = useRef(false);
  const isRestoringScrollRef = useRef(false);
  const lockedScrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastNavigationRef = useRef(0);
  const lastSnapRef = useRef(0);
  const releaseTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const setActiveSlide = useCallback(
    (index: number) => {
      const nextIndex = clamp(index, 0, sections.length - 1);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [sections.length],
  );

  const canNavigate = useCallback((direction: number) => {
    if (direction > 0) {
      return activeIndexRef.current < sections.length - 1;
    }

    return activeIndexRef.current > 0;
  }, [sections.length]);

  const isBoundaryExit = useCallback(
    (direction: number) =>
      (direction < 0 && activeIndexRef.current === 0) ||
      (direction > 0 && activeIndexRef.current === sections.length - 1),
    [sections.length],
  );

  const navigate = useCallback((direction: number) => {
    if (!direction || !canNavigate(direction)) {
      return;
    }

    const now = window.performance.now();
    if (now - lastNavigationRef.current < NAVIGATION_LOCK_MS) {
      return;
    }

    const nextIndex = clamp(activeIndexRef.current + direction, 0, sections.length - 1);
    lastNavigationRef.current = now;
    setActiveSlide(nextIndex);
  }, [canNavigate, sections.length, setActiveSlide]);

  const scrollToPosition = useCallback((top: number, behavior: ScrollBehavior = "auto") => {
    isRestoringScrollRef.current = true;
    window.scrollTo({ top, behavior });
    lastScrollYRef.current = top;

    window.requestAnimationFrame(() => {
      if (behavior === "auto") {
        lastScrollYRef.current = window.scrollY;
        isRestoringScrollRef.current = false;
        return;
      }

      window.setTimeout(() => {
        lastScrollYRef.current = window.scrollY;
        isRestoringScrollRef.current = false;
      }, 720);
    });
  }, []);

  const lockPager = useCallback((startIndex: number) => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const now = window.performance.now();
    if (now - lastSnapRef.current < SNAP_LOCK_MS) {
      return;
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    lastSnapRef.current = now;
    lockedScrollYRef.current = sectionTop;
    isLockedRef.current = true;
    setIsLocked(true);
    setActiveSlide(startIndex);
    setDragOffset(0);
    setIsDragging(false);
    scrollToPosition(sectionTop);
  }, [scrollToPosition, setActiveSlide]);

  const releasePager = useCallback((direction: number) => {
    const section = sectionRef.current;
    if (!section || !isBoundaryExit(direction)) {
      return;
    }

    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetTop = direction > 0
      ? sectionTop + section.offsetHeight
      : sectionTop - window.innerHeight;

    isLockedRef.current = false;
    setIsLocked(false);
    setDragOffset(0);
    setIsDragging(false);
    isReleasingRef.current = true;
    scrollToPosition(Math.max(0, targetTop), "smooth");

    releaseTimerRef.current = window.setTimeout(() => {
      isReleasingRef.current = false;
      releaseTimerRef.current = null;
    }, 760);
  }, [isBoundaryExit, scrollToPosition]);

  const handleIntent = useCallback(
    (intent: number) => {
      if (!intent) {
        return;
      }

      if (!isLockedRef.current) {
        if (intent > 0) {
          lockPager(0);
        }
        return;
      }

      if (isBoundaryExit(intent)) {
        releasePager(intent);
        return;
      }

      setDragOffset(0);
      setIsDragging(false);
      navigate(intent);
    },
    [isBoundaryExit, lockPager, navigate, releasePager],
  );

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const shouldUseMobileLock = () => !window.matchMedia("(min-width: 768px)").matches;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || !shouldUseMobileLock()) {
        return;
      }

      if (isRestoringScrollRef.current) {
        return;
      }

      const currentScrollY = window.scrollY;

      if (isLockedRef.current) {
        if (Math.abs(currentScrollY - lockedScrollYRef.current) > 1) {
          scrollToPosition(lockedScrollYRef.current);
        }
        return;
      }

      const previousScrollY = lastScrollYRef.current;
      const direction = currentScrollY > previousScrollY ? 1 : currentScrollY < previousScrollY ? -1 : 0;
      lastScrollYRef.current = currentScrollY;

      if (isReleasingRef.current) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const enteredFromPrevious = direction > 0 && rect.top <= 0 && rect.bottom > 0;
      const enteredFromNext = direction < 0 && rect.bottom >= viewportHeight && rect.top < viewportHeight;
      const alreadyAligned = direction === 0 && Math.abs(rect.top) <= 1 && rect.bottom > viewportHeight * 0.8;

      if (enteredFromPrevious || alreadyAligned) {
        lockPager(0);
        return;
      }

      if (enteredFromNext) {
        lockPager(sections.length - 1);
      }
    };

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (!isLockedRef.current || !shouldUseMobileLock()) {
        return;
      }

      event.preventDefault();
      const intent = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX > 0 ? 1 : -1
        : event.deltaY > 0 ? 1 : -1;

      handleIntent(intent);
    };

    const handleTouchStart = (event: globalThis.TouchEvent) => {
      if (!isLockedRef.current || !shouldUseMobileLock()) {
        return;
      }

      const touch = event.touches[0];
      touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
      setDragOffset(0);
      setIsDragging(false);
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      if (!isLockedRef.current || !shouldUseMobileLock()) {
        return;
      }

      event.preventDefault();
      const start = touchStartRef.current;
      const touch = event.touches[0];

      if (!start || !touch) {
        return;
      }

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      const intent = getGestureIntent(deltaX, deltaY, TOUCH_MOVE_THRESHOLD);
      const rawOffset = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      const maxOffset = window.innerWidth * 0.34;

      setIsDragging(true);
      setDragOffset(clamp(rawOffset, -maxOffset, maxOffset));

      if (isBoundaryExit(intent)) {
        setDragOffset(clamp(rawOffset, -maxOffset * 0.42, maxOffset * 0.42));
      }
    };

    const handleTouchEnd = (event: globalThis.TouchEvent) => {
      if (!isLockedRef.current || !shouldUseMobileLock()) {
        touchStartRef.current = null;
        return;
      }

      const start = touchStartRef.current;
      const touch = event.changedTouches[0];
      touchStartRef.current = null;
      setDragOffset(0);
      setIsDragging(false);

      if (!start || !touch) {
        return;
      }

      const intent = getGestureIntent(touch.clientX - start.x, touch.clientY - start.y, SWIPE_THRESHOLD);
      handleIntent(intent);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, [handleIntent, isBoundaryExit, lockPager, scrollToPosition, sections.length]);

  return (
    <section
      ref={sectionRef}
      className={getClassName(
        "relative h-[100svh] overflow-hidden bg-black text-white opacity-0 transition-opacity duration-500 ease-out",
        isLocked ? "touch-none opacity-100" : "touch-pan-y opacity-0",
        className,
      )}
    >
      <div
        ref={viewportRef}
        className="h-full w-full overflow-hidden"
      >
        <div
          className={getClassName(
            "flex h-full ease-[cubic-bezier(0.22,1,0.36,1)]",
            isDragging ? "transition-none" : "transition-transform",
          )}
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}vw + ${dragOffset}px), 0, 0)`,
            transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
            width: `${sections.length * 100}%`,
            willChange: "transform",
          }}
        >
          {sections.map((section, index) => (
            <article key={index} className="relative flex h-full w-screen shrink-0 flex-col">
              <div className="relative aspect-square w-full shrink-0 bg-black">
                <img src={section.mobileImg ?? section.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain opacity-100" />
                <div className={getClassName("absolute inset-0", imageOverlayClassName)} />
              </div>

              <div
                className={getClassName(
                  "flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black px-6 py-7",
                  section.textContainerClassName,
                )}
              >
                <div className={getClassName("my-auto w-full max-w-3xl space-y-4", section.contentClassName)}>
                  {section.title && (
                    <h3 className={getClassName("whitespace-pre-line text-sm font-semibold leading-none tracking-tight", section.titleClassName)}>
                      {section.title}
                    </h3>
                  )}
                  {splitParagraphs(section.text).map((paragraph, paragraphIndex) => (
                    <p
                      key={`${index}-paragraph-${paragraphIndex}`}
                      className={getClassName("text-balance text-sm leading-none text-gray-200", section.paragraphClassName)}
                    >
                      {renderText ? renderText(paragraph) : paragraph}
                    </p>
                  ))}
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
