import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

type AudioStoryPlayerProps = {
  src: string;
  image: string;
  imageAlt: string;
  label: string;
};

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function AudioStoryPlayer({ src, image, imageAlt, label }: AudioStoryPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play().catch(() => {});
      return;
    }

    audio.pause();
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="flex w-full items-center gap-4 rounded-[2rem] bg-[#ececec] p-4 text-black shadow-[0_10px_35px_rgba(0,0,0,0.18)] md:gap-5 md:p-5">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="h-20 w-20 shrink-0 rounded-full object-cover md:h-24 md:w-24"
      />

      <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pausar ${label}` : `Reproducir ${label}`}
          data-ga-label={isPlaying ? `Pausar ${label}` : `Reproducir ${label}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-black hover:text-white"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="shrink-0 text-sm tabular-nums text-zinc-700">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => handleSeek(Number(event.target.value))}
            aria-label={`Progreso de ${label}`}
            className="audio-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-300"
          />
        </div>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? `Activar audio de ${label}` : `Silenciar ${label}`}
          data-ga-label={isMuted ? `Activar audio de ${label}` : `Silenciar ${label}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-700 transition hover:bg-white hover:text-black"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      <audio ref={audioRef} preload="metadata" src={src} />
    </div>
  );
}
