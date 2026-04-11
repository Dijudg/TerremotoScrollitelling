import { motion } from "motion/react";

interface PanoramaStripProps {
  image: string;
  alt: string;
  caption?: string;
}

export function PanoramaStrip({ image, alt, caption }: PanoramaStripProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <motion.div
        className="relative h-[260px] w-full md:h-[320px]"
        initial={{ opacity: 0.6, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/65" />
        {caption && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p
              className="max-w-4xl text-balance text-2xl leading-[1.25] tracking-normal text-white md:text-4xl"
              style={{ textShadow: "0 3px 22px rgba(0, 0, 0, 0.95)" }}
            >
              {caption}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
