import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export function Scene({ children, className }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "w-full min-h-[70vh] flex items-center justify-center p-6 md:p-12 lg:p-24",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
