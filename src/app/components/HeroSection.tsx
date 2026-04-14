import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { siteVideos } from "../content/siteMedia";
import { bindVideoTracking } from "../../../analytics";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glassBreakAudioRef = useRef<HTMLAudioElement | null>(null);
  const [clockLabel, setClockLabel] = useState("18:57:50");
  const [isShattered, setIsShattered] = useState(false);
  const [shouldFall, setShouldFall] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.88, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const isCountingDown = clockLabel.split(":").length === 3;

  const crackFragments = useMemo(
    () =>
      [...Array(8)].map((_, index) => {
        const angle = (index * 45) * (Math.PI / 180);
        const distance = 8 + ((index % 5) + 1);
        return {
          index,
          endX: 50 + Math.cos(angle) * distance,
          endY: 50 + Math.sin(angle) * distance,
        };
      }),
    [],
  );

  const fallingFragments = useMemo(
    () =>
      [...Array(20)].map((_, index) => {
        const startX = 10 + ((index * 17) % 80);
        const driftX = ((index % 5) - 2) * 6;
        const size = 0.5 + ((index % 4) * 0.35);
        const rotation = (index * 37) % 360;
        return {
          index,
          startX,
          driftX,
          size,
          rotation,
          duration: 1.2 + (index % 5) * 0.08,
          delay: index * 0.03,
        };
      }),
    [],
  );

  useEffect(() => {
    glassBreakAudioRef.current = new Audio(
      "https://cdn.freesound.org/previews/678/678268_1648170-lq.mp3",
    );
    glassBreakAudioRef.current.volume = 0.6;

    return () => {
      if (glassBreakAudioRef.current) {
        glassBreakAudioRef.current.pause();
        glassBreakAudioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClockLabel((previousValue) => {
        if (previousValue === "18:58") {
          window.clearInterval(interval);
          return previousValue;
        }

        const [hours, minutes, seconds] = previousValue.split(":").map(Number);
        const nextDate = new Date(2000, 0, 1, hours, minutes, seconds + 1);
        const nextHours = `${nextDate.getHours()}`.padStart(2, "0");
        const nextMinutes = `${nextDate.getMinutes()}`.padStart(2, "0");
        const nextSeconds = `${nextDate.getSeconds()}`.padStart(2, "0");
        const nextValue =
          nextMinutes === "58" && nextSeconds === "00"
            ? "18:58"
            : `${nextHours}:${nextMinutes}:${nextSeconds}`;

        if (nextValue === "18:58") {
          setIsShattered(true);
          glassBreakAudioRef.current?.play().catch(() => {});
          window.clearInterval(interval);
        }

        return nextValue;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isShattered && !shouldFall && latest > 0.02) {
        setShouldFall(true);
      }
    });

    return () => unsubscribe();
  }, [isShattered, scrollYProgress, shouldFall]);

  useEffect(() => {
    if (!videoRef.current) return;

    return bindVideoTracking(videoRef.current, {
      videoId: "hero_portada",
      videoName: "Hero portada",
      placement: "hero",
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ position: "relative" }}
    >
      <motion.div className="absolute inset-0 h-full w-full" style={{ scale }}>
        <video
          ref={videoRef}
          src={siteVideos.hero}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(215,38,56,0.12),_transparent_42%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black" />
      </motion.div>

      {isShattered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[11]"
          initial={{ opacity: 1, y: 0 }}
          animate={
            shouldFall
              ? {
                  opacity: 0,
                  y: typeof window !== "undefined" ? window.innerHeight : 1080,
                }
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={
            shouldFall
              ? {
                  opacity: { duration: 0.6 },
                  y: { duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] },
                }
              : { duration: 0.3 }
          }
        >
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroCrackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "rgba(255, 255, 255, 0.8)", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "rgba(200, 200, 255, 0.6)", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "rgba(255, 255, 255, 0.3)", stopOpacity: 1 }} />
              </linearGradient>
              <filter id="heroCrackGlow">
                <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d="M 50 50 L 48 45 L 45 40 L 42 35 L 38 28 L 35 20 L 30 10 L 25 0"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.15"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.path
              d="M 50 50 L 52 45 L 55 38 L 60 30 L 65 22 L 72 12 L 78 5 L 85 0"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.12"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            />
            <motion.path
              d="M 50 50 L 48 55 L 45 62 L 40 70 L 35 78 L 28 88 L 20 95 L 15 100"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.13"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            />
            <motion.path
              d="M 50 50 L 53 58 L 58 65 L 63 72 L 68 80 L 75 88 L 82 95 L 90 100"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.14"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            />
            <motion.path
              d="M 50 50 L 35 45 L 20 42 L 10 40 L 0 38"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.1"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
            />
            <motion.path
              d="M 50 50 L 65 48 L 78 46 L 88 44 L 100 42"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.1"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
              d="M 45 40 L 42 38 L 38 35 L 32 30"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.08"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.35, ease: "easeOut" }}
            />
            <motion.path
              d="M 42 35 L 38 32 L 32 28 L 25 22"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.07"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.4, ease: "easeOut" }}
            />
            <motion.path
              d="M 55 38 L 58 35 L 62 30 L 68 24"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.08"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.38, ease: "easeOut" }}
            />
            <motion.path
              d="M 60 30 L 64 26 L 70 20 L 76 12"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.07"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.42, ease: "easeOut" }}
            />
            <motion.path
              d="M 45 62 L 40 65 L 35 70 L 28 76"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.08"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.36, ease: "easeOut" }}
            />
            <motion.path
              d="M 58 65 L 62 68 L 68 74 L 75 82"
              stroke="url(#heroCrackGradient)"
              strokeWidth="0.08"
              fill="none"
              strokeLinecap="round"
              filter="url(#heroCrackGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.39, ease: "easeOut" }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="2"
              fill="none"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="0.2"
              filter="url(#heroCrackGlow)"
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {crackFragments.map((fragment) => (
              <motion.circle
                key={fragment.index}
                cx="50"
                cy="50"
                r="0.3"
                fill="rgba(255, 255, 255, 0.6)"
                initial={{ cx: 50, cy: 50, opacity: 1 }}
                animate={{
                  cx: fragment.endX,
                  cy: fragment.endY,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + fragment.index * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <motion.div
            className="absolute inset-0 border-4 border-white/20"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 2, -2, 1, -1, 0],
            }}
            transition={{
              duration: 0.4,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ease: "easeInOut",
            }}
          />

          {shouldFall && (
            <svg
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {fallingFragments.map((fragment) => (
                <motion.polygon
                  key={`fall-${fragment.index}`}
                  points={`${fragment.startX},${50 - fragment.size} ${fragment.startX + fragment.size},${50} ${fragment.startX},${50 + fragment.size} ${fragment.startX - fragment.size},${50}`}
                  fill="rgba(255, 255, 255, 0.5)"
                  stroke="rgba(200, 220, 255, 0.7)"
                  strokeWidth="0.1"
                  initial={{
                    y: 0,
                    x: 0,
                    opacity: 1,
                    rotateZ: fragment.rotation,
                  }}
                  animate={{
                    y: 100,
                    x: fragment.driftX,
                    opacity: 0,
                    rotateZ: fragment.rotation + 180 + fragment.index * 12,
                  }}
                  transition={{
                    duration: fragment.duration,
                    delay: fragment.delay,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                />
              ))}
            </svg>
          )}
        </motion.div>
      )}

      <motion.div
        className="relative z-10 flex h-full items-center px-6 pt-24 pb-16 md:px-10 lg:px-16"
        style={{ opacity }}
      >
        <div className="ml-auto flex w-full max-w-6xl flex-col items-center gap-12 text-center md:items-end md:text-right">
          <div className="flex flex-col items-center gap-4 md:items-end">
            <motion.span
              className={`font-clock hero-clock leading-none tracking-normal ${
                isCountingDown
                  ? "text-[3.4rem] md:text-[5.8rem] lg:text-[7.2rem]"
                  : "text-[5rem] md:text-[8rem] lg:text-[10rem]"
              }`}
              style={{
                color: isShattered ? "#d72638" : "#d72638",
                textShadow: isShattered
                  ? "0 0 20px rgba(215, 38, 56, 0.55), 0 0 40px rgba(255, 0, 0, 0.5)"
                  : undefined,
                filter: isShattered
                  ? " drop-shadow-[0_0_28px_rgba(215,38,56,0.55)]"
                  : undefined,
              }}
              animate={
                isShattered
                  ? {
                      scale: [1, 1.03, 1],
                      opacity: [0.94, 1, 0.94],
                    }
                  : {
                      scale: [1, 1.03, 1],
                      opacity: [0.94, 1, 0.94],
                    }
              }
              transition={{
                duration: isShattered ? 1 : 1.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {clockLabel}
            </motion.span>
          </div>

          <div className="max-w-3xl space-y-5">
            <h1
              className="font-heading text-3xl leading-[1.08] text-white md:text-5xl text-balance lg:text-8xl"
            >
              Más allá del tiempo
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-balance text-white/72 md:ml-auto md:text-2xl">
              Crónicas sobre la memoria, la pérdida y la reconstrucción de Manabí a 10 años del terremoto del 16 de abril de 2016.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.42em] text-white/45 md:text-xs">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-[#d72638] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
    
  );
}
 
