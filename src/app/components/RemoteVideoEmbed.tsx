import { useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import type { ResolvedVideoSource } from "../content/videoManifest";
import { buildEmbedUrl } from "../content/videoManifest";

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse?: (element?: HTMLElement) => void;
      };
    };
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
let facebookScriptPromise: Promise<void> | null = null;

function loadFacebookSdk() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.FB?.XFBML?.parse) {
    return Promise.resolve();
  }

  if (facebookScriptPromise) {
    return facebookScriptPromise;
  }

  facebookScriptPromise = new Promise((resolve, reject) => {
    const existingRoot = document.getElementById("fb-root");
    if (!existingRoot) {
      const root = document.createElement("div");
      root.id = "fb-root";
      document.body.prepend(root);
    }

    const existingScript = document.getElementById("facebook-jssdk") as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("No se pudo cargar Facebook SDK")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Facebook SDK"));
    document.body.appendChild(script);
  }).finally(() => {
    facebookScriptPromise = null;
  });

  return facebookScriptPromise;
}

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
    if (!active || (source?.kind !== "instagram" && source?.kind !== "facebook")) {
      return;
    }

    let cancelled = false;

    const loader = source.kind === "facebook" ? loadFacebookSdk() : loadInstagramScript();

    loader
      .then(() => {
        if (cancelled) {
          return;
        }

        if (source.kind === "facebook") {
          window.FB?.XFBML?.parse?.();
        } else {
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

  if (source.kind === "facebook") {
    return (
      <div
        className={className}
        style={{ width: "100%", ...style }}
      >
        <div
          className="fb-video"
          data-href={source.url}
          data-width="auto"
          data-show-text="false"
          data-allowfullscreen="true"
        >
          <blockquote
            className="fb-xfbml-parse-ignore"
            style={{
              margin: 0,
              padding: 0,
              width: "100%",
              minHeight: "100%",
            }}
          >
            <a href={source.url} target="_blank" rel="noreferrer">
              Ver video en Facebook
            </a>
          </blockquote>
        </div>
      </div>
    );
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
          minHeight: "100%",
          width: "100%",
          maxWidth: "100%",
          ...style,
        }}
      >
        <a href={source.url} target="_blank" rel="noreferrer">
          Ver publicación en Instagram
        </a>
      </blockquote>
    );
  }

  const allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  return (
    <iframe
      className={className}
      style={style}
      loading="lazy"
      src={active ? embedUrl : undefined}
      frameBorder="0"
      allow={allow}
      allowFullScreen
      title={title}
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
