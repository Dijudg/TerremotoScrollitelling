import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { bindVideoTracking } from '../../../analytics';

interface ScrollVideoProps {
  src?: string;
  mobileSrc?: string;
  poster?: string;
  youtubeId?: string;
  analyticsLabel?: string;
  preload?: 'none' | 'metadata' | 'auto';
  showControls?: boolean;
  playPromptDelayMs?: number;
}

export function ScrollVideo({
  src,
  mobileSrc,
  poster,
  youtubeId,
  analyticsLabel = 'scroll_video',
  preload = 'none',
  showControls = false,
  playPromptDelayMs = 2500,
}: ScrollVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isPlayingInternal = useRef(false);
  const hasPlayedInternal = useRef(false);
  const lockTimeoutRef = useRef<number | null>(null);
  const continueMessageTimeoutRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [showContinueMessage, setShowContinueMessage] = useState(false);
  const [shouldLoadMedia, setShouldLoadMedia] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  const clearScrollLockTimers = useCallback(() => {
    if (lockTimeoutRef.current) {
      window.clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = null;
    }

    if (continueMessageTimeoutRef.current) {
      window.clearTimeout(continueMessageTimeoutRef.current);
      continueMessageTimeoutRef.current = null;
    }
  }, []);

  const startScrollLock = useCallback(() => {
    if (hasPlayedInternal.current) return;

    hasPlayedInternal.current = true;
    setIsScrollLocked(true);
    clearScrollLockTimers();

    lockTimeoutRef.current = window.setTimeout(() => {
      setIsScrollLocked(false);
      setShowContinueMessage(true);

      continueMessageTimeoutRef.current = window.setTimeout(() => {
        setShowContinueMessage(false);
      }, 3000);
    }, 5000);
  }, [clearScrollLockTimers]);

  const markPlaying = useCallback(() => {
    isPlayingInternal.current = true;
    setIsPlaying(true);
    setShowPlayPrompt(false);
    startScrollLock();
  }, [startScrollLock]);

  const markPaused = useCallback(() => {
    isPlayingInternal.current = false;
    setIsPlaying(false);
  }, []);

  const playHtmlVideo = useCallback((video: HTMLVideoElement) => {
    const playPromise = video.play();

    if (!playPromise) {
      markPlaying();
      return;
    }

    playPromise
      .then(markPlaying)
      .catch((err) => {
        markPaused();
        setShowPlayPrompt(true);

        if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
          console.error('Error reproduciendo video:', err);
        }
      });
  }, [markPaused, markPlaying]);

  const handleManualPlay = useCallback(() => {
    setShouldLoadMedia(true);
    setShowPlayPrompt(false);

    if (youtubeId) {
      iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      markPlaying();
      return;
    }

    window.setTimeout(() => {
      if (videoRef.current) {
        playHtmlVideo(videoRef.current);
      }
    }, 0);
  }, [markPlaying, playHtmlVideo, youtubeId]);

  useEffect(() => {
    return () => clearScrollLockTimers();
  }, [clearScrollLockTimers]);

  useEffect(() => {
    isPlayingInternal.current = false;
    hasPlayedInternal.current = false;
    setIsPlaying(false);
    setIsScrollLocked(false);
    setShowContinueMessage(false);
    setShowPlayPrompt(false);
    setIsVideoReady(false);
    clearScrollLockTimers();
  }, [clearScrollLockTimers, mobileSrc, src, youtubeId]);

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
      { rootMargin: '1200px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadMedia]);

  useEffect(() => {
    if (youtubeId || !shouldLoadMedia || !videoRef.current) return;

    setIsVideoReady(false);
    videoRef.current.load();
  }, [mobileSrc, shouldLoadMedia, src, youtubeId]);

  useEffect(() => {
    if (!shouldLoadMedia || isVideoReady || isPlaying) return;

    const promptTimer = window.setTimeout(() => {
      if (!isPlayingInternal.current) {
        setShowPlayPrompt(true);
      }
    }, playPromptDelayMs);

    return () => window.clearTimeout(promptTimer);
  }, [isPlaying, isVideoReady, playPromptDelayMs, shouldLoadMedia]);

  useEffect(() => {
    if (!isScrollLocked) return;

    let targetScrollY = window.scrollY;
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      targetScrollY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top: targetScrollY, behavior: 'instant' } as ScrollToOptions);
    }

    const preventDefault = (event: Event) => {
      event.preventDefault();
      event.returnValue = false;
      return false;
    };

    const preventKeyScroll = (event: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab'];
      if (keys.includes(event.key)) {
        event.preventDefault();
        event.returnValue = false;
        return false;
      }
    };

    let isReverting = false;
    const forceScrollPosition = () => {
      if (!isReverting && Math.abs(window.scrollY - targetScrollY) > 2) {
        isReverting = true;
        window.scrollTo({ top: targetScrollY, behavior: 'instant' } as ScrollToOptions);
        window.setTimeout(() => {
          isReverting = false;
        }, 0);
      }
    };

    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', preventDefault, { passive: false });
    window.addEventListener('scroll', forceScrollPosition, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventKeyScroll);
      window.removeEventListener('DOMMouseScroll', preventDefault);
      window.removeEventListener('scroll', forceScrollPosition);
    };
  }, [isScrollLocked]);

  useEffect(() => {
    if (!shouldLoadMedia) return;

    if (youtubeId) {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const unsubscribe = scrollYProgress.on('change', (latest) => {
        const inView = latest > 0.3 && latest < 0.7;
        const outOfView = latest < 0.1 || latest > 0.9;

        if (inView && !isPlayingInternal.current) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          markPlaying();
        } else if (outOfView && isPlayingInternal.current) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          markPaused();
        }
      });

      return () => unsubscribe();
    }

    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const inView = latest > 0.3 && latest < 0.7;
      const outOfView = latest < 0.1 || latest > 0.9;

      if (inView && !isPlayingInternal.current) {
        playHtmlVideo(video);
      } else if (outOfView && isPlayingInternal.current) {
        video.pause();
        markPaused();
      }
    });

    return () => {
      unsubscribe();
      if (!video.paused) {
        video.pause();
      }
    };
  }, [markPaused, markPlaying, playHtmlVideo, scrollYProgress, shouldLoadMedia, youtubeId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      markPaused();
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [markPaused]);

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      style={{ position: 'relative' }}
    >
      <motion.div
        className="absolute inset-0 h-screen w-full"
        style={{ opacity, scale }}
      >
        <div className="relative h-full w-full overflow-hidden">
          {youtubeId ? (
            <iframe
              ref={iframeRef}
              className="h-full w-full object-cover"
              loading="lazy"
              src={
                shouldLoadMedia
                  ? `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&mute=0&controls=${showControls ? 1 : 0}&rel=0&showinfo=0&modestbranding=1`
                  : undefined
              }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={poster}
              playsInline
              preload={preload}
              controls={showControls}
              onCanPlay={() => {
                setIsVideoReady(true);
                setShowPlayPrompt(false);
              }}
              onLoadedData={() => {
                setIsVideoReady(true);
                setShowPlayPrompt(false);
              }}
            >
              {shouldLoadMedia && mobileSrc && (
                <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
              )}
              {shouldLoadMedia && src && (
                <source src={src} type="video/mp4" media={mobileSrc ? "(min-width: 768px)" : undefined} />
              )}
              Tu navegador no soporta el elemento de video.
            </video>
          )}

          {showPlayPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 px-6 text-center"
            >
              <button
                type="button"
                onClick={handleManualPlay}
                className="group flex items-center gap-3 rounded-lg border border-white/30 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-2xl transition hover:bg-[#d72638] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-[#d72638]">
                  <svg className="ml-0.5 h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M4 2.5v11l9-5.5-9-5.5Z" />
                  </svg>
                </span>
                Reproducir video
              </button>
            </motion.div>
          )}

          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                REPRODUCIENDO
              </div>
            </motion.div>
          )}

          {showContinueMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 flex items-end justify-center pb-12"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
                <span className="text-sm font-medium">Continua explorando</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
