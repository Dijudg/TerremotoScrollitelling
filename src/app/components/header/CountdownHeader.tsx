import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownHeaderProps {
  onComplete?: () => void;
}

export function CountdownHeader({ onComplete }: CountdownHeaderProps) {
  const [minutes, setMinutes] = useState(57);
  const [seconds, setSeconds] = useState(50);
  const [isShattered, setIsShattered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [shouldFall, setShouldFall] = useState(false);
  const glassBreakAudioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Crear el elemento de audio para el sonido de cristal
    glassBreakAudioRef.current = new Audio('https://cdn.freesound.org/previews/678/678268_1648170-lq.mp3');
    glassBreakAudioRef.current.volume = 0.6;
    
    return () => {
      if (glassBreakAudioRef.current) {
        glassBreakAudioRef.current.pause();
        glassBreakAudioRef.current.src = '';
      }
    };
  }, []);
  
  useEffect(() => {
    if (isShattered && !shouldFall) {
      // Caer automáticamente cinco segundos después de romperse
      const fallTimer = setTimeout(() => {
        setShouldFall(true);
        
        // Reproducir sonido de cristal rompiéndose
        if (glassBreakAudioRef.current) {
          glassBreakAudioRef.current.currentTime = 0;
          glassBreakAudioRef.current.play().catch(err => {
            console.log('Audio bloqueado:', err);
          });
        }
      }, 30000);

      return () => clearTimeout(fallTimer);
    }
  }, [isShattered, shouldFall]);

  useEffect(() => {
    if (!shouldFall || !onComplete) return;

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 1800);

    return () => window.clearTimeout(completeTimer);
  }, [onComplete, shouldFall]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            const newMinutes = prevMinutes + 1;
            if (newMinutes === 58) {
              setIsShattered(true);
              setIsPulsing(true);
            }
            return newMinutes;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = `18:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      {/* Header con el reloj */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-center py-4 px-6 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="font-clock relative flex items-center justify-center text-4xl tracking-normal text-white md:text-5xl"
          style={{
            textShadow: isShattered ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)' : '0 2px 10px rgba(0, 0, 0, 0.5)',
            filter: isShattered ? ' drop-shadow-[0_0_28px_rgba(215,38,56,0.55)]' : 'none'
          }}
          animate={isPulsing && !shouldFall ? {
            color: ['#ffffff', '#ff4444', '#ffffff'],
          } : {}}
          transition={isPulsing && !shouldFall ? {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          {formattedTime.split('').map((char, index) => {
            // Valores aleatorios estables basados en el índice
            const randomX = (Math.sin(index * 45) - 0.5) * 300;
            const randomRotate = (Math.cos(index * 90) - 0.5) * 240;
            const delay = Math.abs(Math.sin(index * 15)) * 0.3;
            
            return (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ y: 0, x: 0, rotateZ: 0, opacity: 1 }}
                animate={
                  shouldFall ? {
                    y: window.innerHeight,
                    x: randomX,
                    rotateZ: randomRotate,
                    opacity: 0,
                  } : isShattered ? {
                    x: [0, -3, 3, -1, 1, 0],
                    y: [0, 2, -2, 1, -1, 0],
                    rotateZ: [0, -2, 2, -1, 1, 0]
                  } : {}
                }
                transition={
                  shouldFall ? {
                    duration: 1.5 + Math.abs(Math.cos(index)),
                    delay: delay,
                    ease: [0.6, 0.05, 0.01, 0.9]
                  } : isShattered ? {
                    duration: 0.3 + (index * 0.05),
                    repeat: Infinity,
                    repeatType: "mirror"
                  } : {}
                }
              >
                {char}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.header>

      {/* Efecto de pantalla rota */}
      <AnimatePresence>
        {isShattered && (
          <motion.div
            className="fixed inset-0 z-[85] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldFall ? 0 : 1 }}
            exit={{ opacity: 0, y: window.innerHeight }}
            transition={shouldFall ? { 
              opacity: { duration: 0.6 },
              y: { duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }
            } : { duration: 0.3 }}
          >
            {/* SVG con grietas de pantalla rota */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradiente para las grietas */}
                <linearGradient id="crackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.8)', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: 'rgba(200, 200, 255, 0.6)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0.3)', stopOpacity: 1 }} />
                </linearGradient>
                
                {/* Filtro de desenfoque para efecto de profundidad */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Grieta principal desde el centro hacia arriba a la izquierda */}
              <motion.path
                d="M 50 50 L 48 45 L 45 40 L 42 35 L 38 28 L 35 20 L 30 10 L 25 0"
                stroke="url(#crackGradient)"
                strokeWidth="0.15"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {/* Grieta secundaria hacia arriba derecha */}
              <motion.path
                d="M 50 50 L 52 45 L 55 38 L 60 30 L 65 22 L 72 12 L 78 5 L 85 0"
                stroke="url(#crackGradient)"
                strokeWidth="0.12"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              />

              {/* Grieta hacia abajo izquierda */}
              <motion.path
                d="M 50 50 L 48 55 L 45 62 L 40 70 L 35 78 L 28 88 L 20 95 L 15 100"
                stroke="url(#crackGradient)"
                strokeWidth="0.13"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
              />

              {/* Grieta hacia abajo derecha */}
              <motion.path
                d="M 50 50 L 53 58 L 58 65 L 63 72 L 68 80 L 75 88 L 82 95 L 90 100"
                stroke="url(#crackGradient)"
                strokeWidth="0.14"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              />

              {/* Grietas diagonales adicionales */}
              <motion.path
                d="M 50 50 L 35 45 L 20 42 L 10 40 L 0 38"
                stroke="url(#crackGradient)"
                strokeWidth="0.1"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
              />

              <motion.path
                d="M 50 50 L 65 48 L 78 46 L 88 44 L 100 42"
                stroke="url(#crackGradient)"
                strokeWidth="0.1"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
              />

              {/* Grietas ramificadas - brazo superior izquierdo */}
              <motion.path
                d="M 45 40 L 42 38 L 38 35 L 32 30"
                stroke="url(#crackGradient)"
                strokeWidth="0.08"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.35, ease: "easeOut" }}
              />

              <motion.path
                d="M 42 35 L 38 32 L 32 28 L 25 22"
                stroke="url(#crackGradient)"
                strokeWidth="0.07"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.4, ease: "easeOut" }}
              />

              {/* Grietas ramificadas - brazo superior derecho */}
              <motion.path
                d="M 55 38 L 58 35 L 62 30 L 68 24"
                stroke="url(#crackGradient)"
                strokeWidth="0.08"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.38, ease: "easeOut" }}
              />

              <motion.path
                d="M 60 30 L 64 26 L 70 20 L 76 12"
                stroke="url(#crackGradient)"
                strokeWidth="0.07"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.42, ease: "easeOut" }}
              />

              {/* Grietas ramificadas - brazo inferior izquierdo */}
              <motion.path
                d="M 45 62 L 40 65 L 35 70 L 28 76"
                stroke="url(#crackGradient)"
                strokeWidth="0.08"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.36, ease: "easeOut" }}
              />

              {/* Grietas ramificadas - brazo inferior derecho */}
              <motion.path
                d="M 58 65 L 62 68 L 68 74 L 75 82"
                stroke="url(#crackGradient)"
                strokeWidth="0.08"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.39, ease: "easeOut" }}
              />

              {/* Círculo de impacto en el centro */}
              <motion.circle
                cx="50"
                cy="50"
                r="2"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="0.2"
                filter="url(#glow)"
                initial={{ r: 0, opacity: 1 }}
                animate={{ r: 4, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Fragmentos de vidrio flotantes */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const distance = 8 + Math.random() * 5;
                const endX = 50 + Math.cos(angle) * distance;
                const endY = 50 + Math.sin(angle) * distance;
                
                return (
                  <motion.circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="0.3"
                    fill="rgba(255, 255, 255, 0.6)"
                    initial={{ cx: 50, cy: 50, opacity: 1 }}
                    animate={{ 
                      cx: endX, 
                      cy: endY, 
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.1 + i * 0.05,
                      ease: "easeOut" 
                    }}
                  />
                );
              })}
            </svg>

            {/* Overlay de flash blanco inicial */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Efecto de vibración en los bordes */}
            <motion.div
              className="absolute inset-0 border-4 border-white/20"
              animate={{
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 2, -2, 1, -1, 0],
              }}
              transition={{
                duration: 0.4,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut"
              }}
            />
            
            {/* Fragmentos de cristal cayendo cuando shouldFall es true */}
            {shouldFall && (
              <>
                {[...Array(20)].map((_, i) => {
                  const startX = 10 + Math.random() * 80;
                  const endX = startX + (Math.random() - 0.5) * 30;
                  const size = 0.5 + Math.random() * 1.5;
                  const rotation = Math.random() * 360;
                  const delay = i * 0.03;
                  
                  return (
                    <motion.polygon
                      key={`fall-${i}`}
                      points={`${startX},${50 - size} ${startX + size},${50} ${startX},${50 + size} ${startX - size},${50}`}
                      fill="rgba(255, 255, 255, 0.5)"
                      stroke="rgba(200, 220, 255, 0.7)"
                      strokeWidth="0.1"
                      initial={{ 
                        y: 0, 
                        x: 0,
                        opacity: 1,
                        rotateZ: rotation
                      }}
                      animate={{ 
                        y: 100, 
                        x: (Math.random() - 0.5) * 20,
                        opacity: 0,
                        rotateZ: rotation + 180 + Math.random() * 360
                      }}
                      transition={{ 
                        duration: 1.2 + Math.random() * 0.4,
                        delay,
                        ease: [0.6, 0.05, 0.01, 0.9]
                      }}
                    />
                  );
                })}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
