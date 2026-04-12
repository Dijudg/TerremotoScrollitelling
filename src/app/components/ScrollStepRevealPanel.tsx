import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollStepRevealPanelProps {
  image: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

const getClassName = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

export function ScrollStepRevealPanel({
  image,
  alt,
  children,
  className,
  imageClassName,
  overlayClassName = "bg-gradient-to-t from-black via-black/35 to-black/20",
  contentClassName,
}: ScrollStepRevealPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.22, 0.36], [0, 1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.3, 1], [96, 0, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.84, 1, 1.04]);
  const contentOpacity = useTransform(scrollYProgress, [0.42, 0.56, 0.82], [0, 1, 1]);
  const contentY = useTransform(scrollYProgress, [0.42, 0.6], [72, 0]);
  const contentScale = useTransform(scrollYProgress, [0.42, 0.6], [0.94, 1]);

  return (
    <div ref={panelRef} className={getClassName("relative h-[200svh] w-full overflow-visible bg-black", className)}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={getClassName("absolute inset-0 h-full w-full object-cover", imageClassName)}
          style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
        />
        <div className={getClassName("absolute inset-0", overlayClassName)} />
        {children && (
          <motion.div
            className={getClassName("absolute inset-0 flex items-center justify-center px-6", contentClassName)}
            style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
