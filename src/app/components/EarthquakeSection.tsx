import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { GalleryButton } from "./GalleryButton";
import { AmbientSound } from "./AmbientSound";
import { chronicle1Images } from "../content/chronicle1Media";
import { buildGallery } from "../content/mediaUtils";
import { bindVideoTracking } from "../../../analytics";

type EarthquakeSectionProps = {
  videoSrc?: string;
  desktopVideoSrc?: string;
  mobileVideoSrc?: string;
  poster?: string;
  analyticsLabel?: string;
};

export function EarthquakeSection({
  videoSrc,
  desktopVideoSrc,
  mobileVideoSrc,
  poster,
  analyticsLabel = "cronica_1_video_earthquake",
}: EarthquakeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [0.82, 1.05, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0.35]);
  const resolvedDesktopVideoSrc = desktopVideoSrc ?? videoSrc;

  const earthquakeGallery = buildGallery(chronicle1Images, [
    "Los escombros del hotel El Gato donde Pablo quedo atrapado.",
    "Edificios colapsados en el centro de Portoviejo tras el terremoto de 7.8 grados.",
    "Las calles de Manabi quedaron devastadas por el sismo del 16 de abril de 2016.",
    "La destruccion transformo la memoria de una provincia completa.",
  ]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;
    videoRef.current.load();
  }, [mobileVideoSrc, resolvedDesktopVideoSrc, shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const video = videoRef.current;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const inView = latest > 0.08 && latest < 0.92;

      if (inView && video.paused) {
        video.play().catch(() => {});
        return;
      }

      if (!inView && !video.paused) {
        video.pause();
      }
    });

    return () => {
      unsubscribe();
      video.pause();
    };
  }, [scrollYProgress, shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    return bindVideoTracking(videoRef.current, {
      videoId: analyticsLabel,
      videoName: analyticsLabel.replace(/_/g, " "),
      placement: "earthquake_overlay",
    });
  }, [analyticsLabel, shouldLoadVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[135vh] bg-black"
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: videoOpacity, scale: videoScale }}
        >
          {resolvedDesktopVideoSrc || mobileVideoSrc ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={poster}
              autoPlay
              playsInline
              muted={false}
              loop
              preload="none"
            >
              {shouldLoadVideo && mobileVideoSrc && (
                <source src={mobileVideoSrc} type="video/mp4" media="(max-width: 767px)" />
              )}
              {shouldLoadVideo && resolvedDesktopVideoSrc && (
                <source src={resolvedDesktopVideoSrc} type="video/mp4" media="(min-width: 768px)" />
              )}
              {shouldLoadVideo && !resolvedDesktopVideoSrc && mobileVideoSrc && (
                <source src={mobileVideoSrc} type="video/mp4" />
              )}
              Tu navegador no soporta el elemento de video.
            </video>
          ) : (
            <div className="h-full w-full bg-zinc-950" />
          )}
        </motion.div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(215,38,56,0.24),_transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

        <motion.div
          className="container relative z-10 mx-auto max-w-4xl px-6 text-center"
          style={{ scale, opacity }}
        >
          <SectionReveal>
            <h2
              className="font-heading mb-8 inline-block text-7xl font-bold tracking-normal md:text-9xl"
            >
              <span className="text-[#d72638] drop-shadow-[0_0_28px_rgba(215,38,56,0.55)]">18:58</span>
            </h2>

            <p className="mb-16 text-2xl font-light text-white md:text-4xl">
              La hora que cambio Manabi
            </p>

            <div className="mx-auto max-w-3xl space-y-6 text-xl leading-relaxed text-gray-200 md:text-2xl">
              <p>Un sismo de magnitud 7.8 sacudio la costa ecuatoriana.</p>
              <p className="my-12 text-3xl font-light text-white md:text-5xl">
                Todo se derrumbo en segundos.
              </p>
            </div>

            <div className="mt-16">
              <GalleryButton images={earthquakeGallery} label="Ver impacto del terremoto" theme="dark" />
            </div>
          </SectionReveal>
        </motion.div>

        {shouldLoadVideo && (
          <div
            className="pointer-events-none absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs text-white"
            aria-hidden="true"
          >
            VIDEO
          </div>
        )}

      </div>
      <AmbientSound soundUrl="https://www.soundjay.com/nature/sounds/earthquake-01.mp3" />
    </section>
  );
}
