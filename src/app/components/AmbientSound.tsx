import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

interface AmbientSoundProps {
  soundUrl: string;
  volume?: number;
  loop?: boolean;
  fadeIn?: boolean;
  fadeDuration?: number; // en segundos
}

export function AmbientSound({ 
  soundUrl, 
  volume = 0.3, 
  loop = true,
  fadeIn = true,
  fadeDuration = 2
}: AmbientSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const fadeIntervalRef = useRef<number>();

  useEffect(() => {
    // Crear el elemento de audio
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.loop = loop;
      audioRef.current.volume = fadeIn ? 0 : volume;
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;

    if (isInView) {
      // Reproducir cuando entra en vista
      audio.play().catch(err => {
        console.log('Autoplay bloqueado, esperando interacción del usuario:', err);
      });

      // Fade in si está habilitado
      if (fadeIn) {
        let currentVolume = 0;
        const step = volume / (fadeDuration * 20); // 20 pasos por segundo
        
        fadeIntervalRef.current = window.setInterval(() => {
          currentVolume = Math.min(currentVolume + step, volume);
          if (audio) {
            audio.volume = currentVolume;
          }
          
          if (currentVolume >= volume) {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
            }
          }
        }, 50);
      }
    } else {
      // Pausar cuando sale de vista
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      
      // Fade out
      let currentVolume = audio.volume;
      const step = currentVolume / (fadeDuration * 20);
      
      fadeIntervalRef.current = window.setInterval(() => {
        currentVolume = Math.max(currentVolume - step, 0);
        if (audio) {
          audio.volume = currentVolume;
        }
        
        if (currentVolume <= 0) {
          audio.pause();
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
        }
      }, 50);
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [isInView, soundUrl, volume, loop, fadeIn, fadeDuration]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}
