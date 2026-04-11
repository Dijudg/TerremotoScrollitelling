import { motion } from "motion/react";

interface PanoramaStripProps {
  image: string;
  alt: string;
}

export function PanoramaStrip({ image, alt }: PanoramaStripProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <motion.div
        className="relative h-[200px] w-full"
        initial={{ opacity: 0.6, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/55" />
      </motion.div>
    </section>
  );
}
