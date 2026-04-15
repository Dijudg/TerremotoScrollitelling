export const remoteVideoManifestUrl = "https://www.eltelegrafo.com.ec/images/videos/video.json";

export type RemoteVideoPlatform = "youtube" | "facebook" | "instagram" | "video";

export interface RemoteVideoEndpoint {
  type?: string;
  url?: string;
}

export interface RemoteChronicleVideo {
  id?: string;
  title?: string;
  description?: string;
  desktop?: RemoteVideoEndpoint;
  mobile?: RemoteVideoEndpoint;
  active?: boolean;
  order?: number;
}

export interface RemoteVideoManifest {
  updatedAt?: string;
  chronicles?: Record<string, RemoteChronicleVideo[]>;
}

export interface ResolvedVideoSource {
  kind: RemoteVideoPlatform;
  url: string;
  youtubeId?: string;
  embedUrl?: string;
}

function safeUrl(input: string) {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function normalizeUrl(input: string) {
  return input.trim();
}

export async function fetchRemoteVideoManifest(signal?: AbortSignal): Promise<RemoteVideoManifest | null> {
  const response = await fetch(remoteVideoManifestUrl, {
    signal,
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar el manifiesto de videos: ${response.status}`);
  }

  return (await response.json()) as RemoteVideoManifest;
}

export function getActiveChronicleVideo(manifest: RemoteVideoManifest | null, key: string) {
  const items = manifest?.chronicles?.[key] ?? [];

  return [...items]
    .filter((item) => item.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0] ?? null;
}

function extractYouTubeId(url: string) {
  const parsed = safeUrl(url);

  if (!parsed) {
    return null;
  }

  if (parsed.hostname.includes("youtu.be")) {
    return parsed.pathname.replace("/", "") || null;
  }

  const fromQuery = parsed.searchParams.get("v");
  if (fromQuery) {
    return fromQuery;
  }

  const embeddedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/);
  if (embeddedMatch?.[1]) {
    return embeddedMatch[1];
  }

  const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/);
  if (shortsMatch?.[1]) {
    return shortsMatch[1];
  }

  return null;
}

function extractInstagramPath(url: string) {
  const parsed = safeUrl(url);
  if (!parsed) {
    return null;
  }

  const match = parsed.pathname.match(/^\/(p|reel|tv)\/([^/]+)/);
  if (!match) {
    return null;
  }

  return { kind: match[1], shortcode: match[2] };
}

function isInstagramUrl(url: string) {
  return /instagram\.com/i.test(url);
}

function isFacebookUrl(url: string) {
  return /facebook\.com/i.test(url) || /fb\.watch/i.test(url);
}

function isYouTubeUrl(url: string) {
  return /youtube\.com|youtu\.be/i.test(url);
}

export function buildEmbedUrl(
  kind: RemoteVideoPlatform,
  url: string,
  options: { autoPlay?: boolean; controls?: boolean } = {},
) {
  const { autoPlay = true, controls = true } = options;

  if (kind === "youtube") {
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return null;
    }

    const params = new URLSearchParams({
      enablejsapi: "1",
      autoplay: autoPlay ? "1" : "0",
      mute: "1",
      playsinline: "1",
      controls: controls ? "1" : "0",
      rel: "0",
      modestbranding: "1",
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  if (kind === "facebook") {
    const params = new URLSearchParams({
      href: url,
      autoplay: autoPlay ? "1" : "0",
      show_text: "0",
      width: "1280",
    });

    return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
  }

  if (kind === "instagram") {
    const parsed = extractInstagramPath(url);
    if (!parsed) {
      return null;
    }

    const suffix = parsed.kind === "reel" ? "reel" : parsed.kind;
    return `https://www.instagram.com/${suffix}/${parsed.shortcode}/embed/`;
  }

  return null;
}

function buildYouTubeEmbedUrl(url: string) {
  return buildEmbedUrl("youtube", url, { autoPlay: true, controls: true });
}

function buildFacebookEmbedUrl(url: string) {
  return buildEmbedUrl("facebook", url, { autoPlay: true, controls: true });
}

function inferPlatform(url: string): RemoteVideoPlatform {
  if (isYouTubeUrl(url)) {
    return "youtube";
  }

  if (isInstagramUrl(url)) {
    return "instagram";
  }

  if (isFacebookUrl(url)) {
    return "facebook";
  }

  return "video";
}

export function resolveVideoSource(endpoint?: RemoteVideoEndpoint | null): ResolvedVideoSource | null {
  const url = endpoint?.url ? normalizeUrl(endpoint.url) : "";
  if (!url) {
    return null;
  }

  const type = (endpoint?.type?.toLowerCase() as RemoteVideoPlatform | undefined) ?? inferPlatform(url);

  if (type === "youtube") {
    return {
      kind: "youtube",
      url,
      youtubeId: extractYouTubeId(url) ?? undefined,
      embedUrl: buildEmbedUrl("youtube", url, { autoPlay: true, controls: true }) ?? undefined,
    };
  }

  if (type === "facebook") {
    return {
      kind: "facebook",
      url,
      embedUrl: buildEmbedUrl("facebook", url, { autoPlay: true, controls: true }) ?? undefined,
    };
  }

  if (type === "instagram") {
    return {
      kind: "instagram",
      url,
      embedUrl: buildEmbedUrl("instagram", url, { autoPlay: true, controls: true }) ?? undefined,
    };
  }

  return {
    kind: "video",
    url,
  };
}
