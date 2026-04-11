import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HorizontalRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

export function HorizontalReveal({ children, direction = 'left', delay = 0 }: HorizontalRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const startX = direction === 'left' ? -100 : 100;
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [startX, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        x, 
        opacity,
        position: 'relative'
      }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
