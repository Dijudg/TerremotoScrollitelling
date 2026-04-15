import { useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import type { ResolvedVideoSource } from "../content/videoManifest";
import { buildEmbedUrl } from "../content/videoManifest";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

type RemoteVideoEmbedProps = {
  source?: ResolvedVideoSource | null;
  title: string;
  className?: string;
  style?: CSSProperties;
  active?: boolean;
  autoPlay?: boolean;
  showControls?: boolean;
};

let instagramScriptPromise: Promise<void> | null = null;

function loadInstagramScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.instgrm?.Embeds?.process) {
    return Promise.resolve();
  }

  if (instagramScriptPromise) {
    return instagramScriptPromise;
  }

  instagramScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>("script[data-instagram-embed]");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("No se pudo cargar Instagram embed.js")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://www.instagram.com/embed.js";
    script.dataset.instagramEmbed = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Instagram embed.js"));
    document.body.appendChild(script);
  }).finally(() => {
    instagramScriptPromise = null;
  });

  return instagramScriptPromise;
}

export function RemoteVideoEmbed({
  source,
  title,
  className,
  style,
  active = true,
  autoPlay = true,
  showControls = false,
}: RemoteVideoEmbedProps) {
  const embedUrl = useMemo(() => {
    if (!source) {
      return null;
    }

    if (source.kind === "video") {
      return null;
    }

    if (source.kind === "youtube") {
      return buildEmbedUrl(source.kind, source.url, { autoPlay, controls: showControls });
    }

    if (source.embedUrl) {
      return source.embedUrl;
    }

    return buildEmbedUrl(source.kind, source.url, { autoPlay, controls: showControls });
  }, [autoPlay, showControls, source]);

  useEffect(() => {
    if (!active || source?.kind !== "instagram") {
      return;
    }

    let cancelled = false;

    loadInstagramScript()
      .then(() => {
        if (!cancelled) {
          window.instgrm?.Embeds?.process?.();
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [active, source?.kind, source?.url]);

  if (!active || !source || source.kind === "video" || !embedUrl) {
    return null;
  }

  if (source.kind === "instagram") {
    return (
      <blockquote
        className={`instagram-media ${className ?? ""}`}
        data-instgrm-permalink={source.url}
        data-instgrm-version="14"
        data-instgrm-captioned="true"
        style={{
          background: "#000",
          border: 0,
          margin: 0,
          padding: 0,
          width: "100%",
          ...style,
        }}
      >
        <a href={source.url} target="_blank" rel="noreferrer">
          Ver publicación en Instagram
        </a>
      </blockquote>
    );
  }

  const allow = source.kind === "youtube"
    ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    : "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";

  const src = source.kind === "youtube"
    ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}enablejsapi=1&autoplay=${autoPlay ? 1 : 0}&mute=1&playsinline=1&controls=${showControls ? 1 : 0}&rel=0&modestbranding=1`
    : embedUrl;

  return (
    <iframe
      className={className}
      style={style}
      loading="lazy"
      src={active ? src : undefined}
      frameBorder="0"
      allow={allow}
      allowFullScreen
      title={title}
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
