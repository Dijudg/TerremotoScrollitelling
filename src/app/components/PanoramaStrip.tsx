import { ScrollStepRevealPanel } from "./ScrollStepRevealPanel";
import enterradov from "../../assets/img/Cronica1/horizontal/enterradovivo.png";

interface PanoramaStripProps {
  image: string;
  alt: string;
  caption?: string;
}

export function PanoramaStrip({  alt, caption }: PanoramaStripProps) {
  return (
    <ScrollStepRevealPanel image={enterradov} alt={alt} contentClassName="text-center">
      {caption && (
        <p
          className="max-w-4xl text-balance text-2xl leading-[1.25] tracking-normal text-white md:text-4xl"
          style={{ textShadow: "0 3px 22px rgba(0, 0, 0, 0.95)" }}
        >
          {caption}
        </p>
      )}
    </ScrollStepRevealPanel>
  );
}
