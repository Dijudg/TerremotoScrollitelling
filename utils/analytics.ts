type GtagCommand =
  | ["event", string, Record<string, unknown>?]
  | ["config", string, Record<string, unknown>?]
  | ["js", Date];

type Cleanup = () => void;

type VideoTrackingOptions = {
  videoId: string;
  videoName?: string;
  placement?: string;
  watchedMilestones?: number[];
  progressMilestones?: number[];
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagCommand) => void;
  }
}

const GA_MEASUREMENT_ID = "G-SQ7Q0EWKTV";
const isDebugMode =
  typeof window !== "undefined" &&
  (import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const ensureAnalytics = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.gtag !== "function") {
    const scriptId = "ga-gtag";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      debug_mode: isDebugMode,
    });
  }

  return typeof window.gtag === "function";
};

const getPageContext = () => ({
  page_path: window.location.pathname,
  page_title: document.title,
  page_location: window.location.href,
});

const getScrollDepth = () => {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (documentHeight <= 0) {
    return 100;
  }

  return Math.max(0, Math.min(100, Math.round((window.scrollY / documentHeight) * 100)));
};

const getVisibleTimeSeconds = (startedAt: number | null, accumulatedMs: number) => {
  const liveMs = startedAt === null ? 0 : performance.now() - startedAt;
  return Math.round((accumulatedMs + liveMs) / 1000);
};

export const initAnalytics = () => {
  ensureAnalytics();
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (!ensureAnalytics()) return;

  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
    debug_mode: isDebugMode,
  });
};

export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (!ensureAnalytics()) return;

  window.gtag?.("event", eventName, {
    ...params,
    debug_mode: isDebugMode,
  });
};

export const attachClickTracking = (): Cleanup => {
  const handleClick = (event: MouseEvent) => {
    if (!ensureAnalytics()) return;

    const path = (event.composedPath ? event.composedPath() : []) as EventTarget[];
    let label = "";
    let element = "";
    let targetPath: string | undefined;

    for (const node of path) {
      if (!(node instanceof HTMLElement)) continue;

      const datasetLabel = node.dataset?.gaLabel;
      const ariaLabel = node.getAttribute("aria-label")?.trim();
      const title = node.getAttribute("title")?.trim();
      const text = (node.textContent || "").trim();

      if (datasetLabel) {
        label = datasetLabel;
      } else if (ariaLabel) {
        label = ariaLabel;
      } else if (title) {
        label = title;
      } else if (!label && text) {
        label = text.slice(0, 80);
      }

      if (!element) {
        element = node.tagName.toLowerCase();
      }

      if (!targetPath && node instanceof HTMLAnchorElement && node.href) {
        try {
          targetPath = new URL(node.href).pathname;
        } catch {
          targetPath = node.href;
        }
      }

      if (label) break;
    }

    if (!label) return;

    trackEvent("click", {
      event_category: "interaction",
      event_label: label,
      element,
      target_path: targetPath,
      ...getPageContext(),
    });
  };

  document.addEventListener("click", handleClick, true);
  return () => document.removeEventListener("click", handleClick, true);
};

export const attachScrollTracking = (
  milestones: number[] = [25, 50, 75, 90, 100],
): Cleanup => {
  const triggered = new Set<number>();

  const handleScroll = () => {
    const currentDepth = getScrollDepth();

    for (const milestone of milestones) {
      if (currentDepth >= milestone && !triggered.has(milestone)) {
        triggered.add(milestone);
        trackEvent("scroll_depth", {
          event_category: "engagement",
          scroll_depth: milestone,
          ...getPageContext(),
        });
      }
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
};

export const attachTimeOnPageTracking = (
  milestones: number[] = [30, 60, 120, 180],
): Cleanup => {
  let startedAt = document.visibilityState === "visible" ? performance.now() : null;
  let accumulatedMs = 0;
  const triggered = new Set<number>();

  const syncVisibleTime = () => {
    if (startedAt !== null) {
      accumulatedMs += performance.now() - startedAt;
      startedAt = performance.now();
    }
  };

  const emitMilestones = () => {
    const visibleSeconds = getVisibleTimeSeconds(startedAt, accumulatedMs);

    for (const milestone of milestones) {
      if (visibleSeconds >= milestone && !triggered.has(milestone)) {
        triggered.add(milestone);
        trackEvent("time_on_page_milestone", {
          event_category: "engagement",
          visible_seconds: milestone,
          scroll_depth: getScrollDepth(),
          ...getPageContext(),
        });
      }
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (startedAt !== null) {
        accumulatedMs += performance.now() - startedAt;
        startedAt = null;
      }
      emitMilestones();
      return;
    }

    startedAt = performance.now();
  };

  const interval = window.setInterval(() => {
    syncVisibleTime();
    emitMilestones();
  }, 15000);

  const handlePageHide = () => {
    if (startedAt !== null) {
      accumulatedMs += performance.now() - startedAt;
      startedAt = null;
    }

    trackEvent("page_time", {
      event_category: "engagement",
      visible_seconds: Math.round(accumulatedMs / 1000),
      scroll_depth: getScrollDepth(),
      ...getPageContext(),
    });
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", handlePageHide);

  return () => {
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", handlePageHide);
  };
};

export const bindVideoTracking = (
  video: HTMLVideoElement,
  {
    videoId,
    videoName,
    placement,
    watchedMilestones = [5, 10, 30, 60],
    progressMilestones = [25, 50, 75, 90],
  }: VideoTrackingOptions,
): Cleanup => {
  let playStartedAt: number | null = null;
  let accumulatedMs = 0;
  let hasStarted = false;
  const watchedTriggered = new Set<number>();
  const progressTriggered = new Set<number>();

  const getWatchedSeconds = () => {
    const liveMs = playStartedAt === null ? 0 : performance.now() - playStartedAt;
    return Math.round((accumulatedMs + liveMs) / 1000);
  };

  const getBasePayload = () => ({
    video_id: videoId,
    video_name: videoName ?? videoId,
    video_placement: placement,
    duration_seconds: Number.isFinite(video.duration) ? Math.round(video.duration) : undefined,
    current_time_seconds: Math.round(video.currentTime || 0),
  });

  const syncPlaybackTime = () => {
    if (playStartedAt !== null) {
      accumulatedMs += performance.now() - playStartedAt;
      playStartedAt = performance.now();
    }
  };

  const handlePlay = () => {
    if (playStartedAt === null) {
      playStartedAt = performance.now();
    }

    if (!hasStarted) {
      hasStarted = true;
      trackEvent("video_start", {
        event_category: "video",
        ...getBasePayload(),
      });
      return;
    }

    trackEvent("video_resume", {
      event_category: "video",
      watched_seconds: getWatchedSeconds(),
      ...getBasePayload(),
    });
  };

  const handlePause = () => {
    if (playStartedAt !== null) {
      accumulatedMs += performance.now() - playStartedAt;
      playStartedAt = null;
    }

    trackEvent("video_pause", {
      event_category: "video",
      watched_seconds: getWatchedSeconds(),
      ...getBasePayload(),
    });
  };

  const handleTimeUpdate = () => {
    syncPlaybackTime();

    const watchedSeconds = getWatchedSeconds();
    for (const milestone of watchedMilestones) {
      if (watchedSeconds >= milestone && !watchedTriggered.has(milestone)) {
        watchedTriggered.add(milestone);
        trackEvent("video_watch_time", {
          event_category: "video",
          watched_seconds: milestone,
          ...getBasePayload(),
        });
      }
    }

    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const progress = Math.round((video.currentTime / video.duration) * 100);
    for (const milestone of progressMilestones) {
      if (progress >= milestone && !progressTriggered.has(milestone)) {
        progressTriggered.add(milestone);
        trackEvent("video_progress", {
          event_category: "video",
          video_percent: milestone,
          watched_seconds: watchedSeconds,
          ...getBasePayload(),
        });
      }
    }
  };

  const handleEnded = () => {
    if (playStartedAt !== null) {
      accumulatedMs += performance.now() - playStartedAt;
      playStartedAt = null;
    }

    trackEvent("video_complete", {
      event_category: "video",
      watched_seconds: getWatchedSeconds(),
      ...getBasePayload(),
    });
  };

  video.addEventListener("play", handlePlay);
  video.addEventListener("pause", handlePause);
  video.addEventListener("timeupdate", handleTimeUpdate);
  video.addEventListener("ended", handleEnded);

  return () => {
    video.removeEventListener("play", handlePlay);
    video.removeEventListener("pause", handlePause);
    video.removeEventListener("timeupdate", handleTimeUpdate);
    video.removeEventListener("ended", handleEnded);
  };
};
