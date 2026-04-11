import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const transforms = [y1, y2, y3];

  return (
    <div ref={ref} className="w-full flex flex-col md:flex-row gap-6 md:gap-10 h-auto md:h-[60vh] lg:h-[80vh] overflow-hidden justify-center items-center">
      {images.map((src, idx) => (
        <motion.div 
          key={idx}
          className="relative w-full md:w-1/3 aspect-[4/5] overflow-hidden rounded-sm"
          style={{ y: transforms[idx] }}
        >
          <ImageWithFallback 
            src={src} 
            alt={`Image ${idx + 1}`}
            className="w-full h-full object-cover scale-110 filter grayscale hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </motion.div>
      ))}
    </div>
  );
}
