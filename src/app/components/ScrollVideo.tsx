import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { bindVideoTracking } from '../../../analytics';

interface ScrollVideoProps {
  src?: string;
  poster?: string;
  youtubeId?: string; // ID de YouTube si se usa YouTube
  analyticsLabel?: string;
  preload?: "none" | "metadata" | "auto";
}

export function ScrollVideo({
  src,
  poster,
  youtubeId,
  analyticsLabel = 'scroll_video',
  preload = "none",
}: ScrollVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [showContinueMessage, setShowContinueMessage] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [shouldLoadMedia, setShouldLoadMedia] = useState(false);

  // Trackers internos para no depender de re-renders en los callbacks de scroll
  const isPlayingInternal = useRef(false);
  const hasPlayedInternal = useRef(false);

  // Detectar primera interacción del usuario para habilitar audio
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };
    
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || shouldLoadMedia) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMedia(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadMedia]);

  useEffect(() => {
    if (youtubeId || !shouldLoadMedia || !videoRef.current) return;

    videoRef.current.load();
  }, [shouldLoadMedia, src, youtubeId]);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Bloquear/desbloquear scroll mejorado
  useEffect(() => {
    if (!isScrollLocked) return;

    // Calcular el centro exacto para el video y mover ahí inmediatamente
    let targetScrollY = window.scrollY;
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      targetScrollY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top: targetScrollY, behavior: 'instant' } as any);
    }

    // Prevenir eventos de scroll nativo en lugar de alterar propiedades CSS del body/html
    // Alterar 'overflow' es lo que causa que el documento colapse y mande al usuario al inicio (home).
    const preventDefault = (e: Event) => {
      e.preventDefault();
      // Para navegadores antiguos
      e.returnValue = false;
      return false;
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab'];
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.returnValue = false;
        return false;
      }
    };

    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', preventDefault, { passive: false });

    // Si algún evento de momentum se salta los preventDefault (especialmente iOS),
    // revertimos inmediatamente la posición del scroll.
    let isReverting = false;
    const forceScrollPosition = () => {
      if (!isReverting && Math.abs(window.scrollY - targetScrollY) > 2) {
        isReverting = true;
        window.scrollTo({ top: targetScrollY, behavior: 'instant' } as any);
        // Desbloquear revert timeout para próximos ticks
        setTimeout(() => { isReverting = false; }, 0);
      }
    };

    window.addEventListener('scroll', forceScrollPosition, { passive: false });

    return () => {
      // Limpiar todos los listeners
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventKeyScroll);
      window.removeEventListener('DOMMouseScroll', preventDefault);
      window.removeEventListener('scroll', forceScrollPosition);
    };
  }, [isScrollLocked]);

  useEffect(() => {
    if (youtubeId) {
      // Para YouTube, usar la API de YouTube iframe
      if (!shouldLoadMedia) return;

      const iframe = iframeRef.current;
      if (!iframe) return;

      const unsubscribe = scrollYProgress.on('change', (latest) => {
        const inView = latest > 0.3 && latest < 0.7;
        const outOfView = latest < 0.1 || latest > 0.9;

        if (inView && !isPlayingInternal.current) {
          // Enviar comando de play al iframe de YouTube
          iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          isPlayingInternal.current = true;
          setIsPlaying(true);
          
          // Bloquear scroll solo la primera vez que se reproduce
          if (!hasPlayedInternal.current) {
            hasPlayedInternal.current = true;
            setIsScrollLocked(true);
            
            // Desbloquear scroll después de 5 segundos
            setTimeout(() => {
              setIsScrollLocked(false);
              setShowContinueMessage(true);
              
              // Ocultar mensaje después de 3 segundos
              setTimeout(() => {
                setShowContinueMessage(false);
              }, 3000);
            }, 5000);
          }
        } else if (outOfView && isPlayingInternal.current) {
          // Pausar si sale de la vista
          iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          isPlayingInternal.current = false;
          setIsPlaying(false);
        }
      });

      return () => {
        unsubscribe();
      };
    } else {
      // Para video HTML5 normal
      if (!shouldLoadMedia) return;

      const video = videoRef.current;
      if (!video) return;

      const unsubscribe = scrollYProgress.on('change', (latest) => {
        const inView = latest > 0.3 && latest < 0.7;
        const outOfView = latest < 0.1 || latest > 0.9;

        if (inView && !isPlayingInternal.current) {
          // Play directamente sin depender del readyState (maneja la promesa internamente)
          video.play()?.catch(err => {
            if (err.name !== 'AbortError') {
              console.error('Error reproduciendo video:', err);
            }
          });
          
          isPlayingInternal.current = true;
          setIsPlaying(true);
          
          // Bloquear scroll solo la primera vez que se reproduce
          if (!hasPlayedInternal.current) {
            hasPlayedInternal.current = true;
            setIsScrollLocked(true);
            
            // Desbloquear scroll después de 5 segundos
            setTimeout(() => {
              setIsScrollLocked(false);
              setShowContinueMessage(true);
              
              // Ocultar mensaje después de 3 segundos
              setTimeout(() => {
                setShowContinueMessage(false);
              }, 3000);
            }, 5000);
          }
        } else if (outOfView && isPlayingInternal.current) {
          video.pause();
          isPlayingInternal.current = false;
          setIsPlaying(false);
        }
      });

      return () => {
        unsubscribe();
        if (video && !video.paused) {
          video.pause();
        }
      };
    }
  }, [scrollYProgress, shouldLoadMedia, youtubeId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    if (youtubeId || !shouldLoadMedia || !videoRef.current) return;

    return bindVideoTracking(videoRef.current, {
      videoId: analyticsLabel,
      videoName: analyticsLabel.replace(/_/g, ' '),
      placement: 'scrollytelling',
    });
  }, [analyticsLabel, shouldLoadMedia, youtubeId]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      style={{ position: 'relative' }}
    >
      <motion.div 
        className="w-full h-screen absolute inset-0"
        style={{ opacity, scale }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {youtubeId ? (
            <iframe
              ref={iframeRef}
              className="w-full h-full object-cover"
              loading="lazy"
              src={
                shouldLoadMedia
                  ? `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&mute=0&controls=0&rel=0&showinfo=0&modestbranding=1`
                  : undefined
              }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={poster}
              playsInline
              preload={preload}
            >
              {shouldLoadMedia && src && <source src={src} type="video/mp4" />}
              Tu navegador no soporta el elemento de video.
            </video>
          )}
          
          {/* Play indicator */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                REPRODUCIENDO
              </div>
            </motion.div>
          )}
          
          {/* Continue message */}
          {showContinueMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-end justify-center pb-12"
            >
              <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
                <span className="text-sm font-medium">Continúa explorando</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
