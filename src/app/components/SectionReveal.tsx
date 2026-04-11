import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth fade in as section enters viewport
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Subtle upward movement
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  // Subtle scale effect for depth
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity, 
        y,
        scale,
        position: 'relative'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
