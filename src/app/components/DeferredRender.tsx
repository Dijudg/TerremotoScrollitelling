import { ReactNode, useEffect, useRef, useState } from "react";

type DeferredRenderProps = {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
};

export function DeferredRender({
  children,
  minHeight = "100vh",
  rootMargin = "1200px 0px",
}: DeferredRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={containerRef} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}
