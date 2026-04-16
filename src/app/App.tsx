import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { StickyChronicleNav } from "./components/header/StickyChronicleNav";
import { ScrollVideo } from "./components/ScrollVideo";
import { FloatingShareButtons } from "./components/FloatingShareButtons";
import { DeferredRender } from "./components/DeferredRender";
import { ReviveAdBlock } from "./components/ReviveAdBlock";
import { SiteFooter } from "./components/footer/SiteFooter";
import { featuredPortraits, sitePosters } from "./content/siteMedia";
import {
  fetchRemoteVideoManifest,
  getActiveChronicleVideo,
  resolveVideoSource,
  type RemoteVideoManifest,
} from "./content/videoManifest";
import {
  attachClickTracking,
  attachScrollTracking,
  attachTimeOnPageTracking,
  initAnalytics,
  trackPageView,
} from "../../analytics";

const IntroSection = lazy(() => import("./components/cronica1/IntroSection").then((module) => ({ default: module.IntroSection })));
const EarthquakeSection = lazy(() => import("./components/cronica1/EarthquakeSection").then((module) => ({ default: module.EarthquakeSection })));
const EndOfWorldSection = lazy(() => import("./components/cronica1/EndOfWorldSection").then((module) => ({ default: module.EndOfWorldSection })));
const BuriedSection = lazy(() => import("./components/cronica1/BuriedSection").then((module) => ({ default: module.BuriedSection })));
const HopeSection = lazy(() => import("./components/cronica1/HopeSection").then((module) => ({ default: module.HopeSection })));
const RescueSection = lazy(() => import("./components/cronica1/RescueSection").then((module) => ({ default: module.RescueSection })));
const JavierSection = lazy(() => import("./components/cronica2/JavierSection").then((module) => ({ default: module.JavierSection })));
const RebuildSection = lazy(() => import("./components/cronica2/RebuildSection").then((module) => ({ default: module.RebuildSection })));
const DosTarquisSection = lazy(() => import("./components/cronica3/DosTarquisSection").then((module) => ({ default: module.DosTarquisSection })));
const FantasmaMarketSection = lazy(() => import("./components/cronica3/FantasmaMarketSection").then((module) => ({ default: module.FantasmaMarketSection })));
const MemorialSection = lazy(() => import("./components/cronica3/MemorialSection").then((module) => ({ default: module.MemorialSection })));
const Cronica4Section = lazy(() => import("./components/cronica4/Cronica4Section").then((module) => ({ default: module.Cronica4Section })));
const Chronicle1Panorama = lazy(() => import("./components/cronica1/Chronicle1Panorama").then((module) => ({ default: module.Chronicle1Panorama })));

const chronicle2FallbackEmbedUrl = "https://www.youtube.com/embed/Yrx89yfG8eY?si=wuHiokKhre4i4Mhx";

const deferredRootMargin = "1400px 0px";

function DeferredSection({
  children,
  id,
  minHeight = "100vh",
}: {
  children: ReactNode;
  id?: string;
  minHeight?: string;
}) {
  return (
    <DeferredRender id={id} minHeight={minHeight} rootMargin={deferredRootMargin}>
      <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>
    </DeferredRender>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [remoteVideoManifest, setRemoteVideoManifest] = useState<RemoteVideoManifest | null>(null);
  const [remoteManifestChecked, setRemoteManifestChecked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    initAnalytics();
    trackPageView(window.location.pathname, document.title);

    const detachClickTracking = attachClickTracking();
    const detachScrollTracking = attachScrollTracking();
    const detachTimeOnPageTracking = attachTimeOnPageTracking();
    const controller = new AbortController();

    fetchRemoteVideoManifest(controller.signal)
      .then((manifest) => {
        setRemoteVideoManifest(manifest);
        setRemoteManifestChecked(true);
      })
      .catch((error) => {
        console.warn("No se pudo cargar el manifiesto remoto de videos, se usarán los archivos locales.", error);
        setRemoteManifestChecked(true);
      });

    return () => {
      controller.abort();
      detachClickTracking();
      detachScrollTracking();
      detachTimeOnPageTracking();
    };
  }, []);

  const remoteChronicle2 = getActiveChronicleVideo(remoteVideoManifest, "cronica2");
  const remoteChronicle3 = getActiveChronicleVideo(remoteVideoManifest, "cronica3");
  const remoteChronicle4 = getActiveChronicleVideo(remoteVideoManifest, "cronica4");

  const chronicle2LeadDesktopSource = resolveVideoSource(remoteChronicle2?.desktop);
  const chronicle2LeadMobileSource = resolveVideoSource(remoteChronicle2?.mobile);

  const chronicle3LeadDesktopSource = resolveVideoSource(remoteChronicle3?.desktop);
  const chronicle3LeadMobileSource = resolveVideoSource(remoteChronicle3?.mobile);

  const chronicle4LeadDesktopSource = resolveVideoSource(remoteChronicle4?.desktop);
  const chronicle4LeadMobileSource = resolveVideoSource(remoteChronicle4?.mobile);
  const hasChronicle3Video = remoteManifestChecked && Boolean(chronicle3LeadDesktopSource?.url || chronicle3LeadMobileSource?.url);
  const hasChronicle4Video = remoteManifestChecked && Boolean(chronicle4LeadDesktopSource?.url || chronicle4LeadMobileSource?.url);

  const normalizeHash = (hash: string) =>
    hash
      .toLowerCase()
      .replace(/^#/, "")
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/ú/g, "u")
      .replace(/ñ/g, "n")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const mapHashToSectionId = (hash: string) => {
    const key = normalizeHash(hash);
    switch (key) {
      case "hero":
        return "hero";
      case "cronica1":
      case "cronica-1":
        return "cronica-1";
      case "cronica2":
      case "cronica-2":
        return "cronica-2";
      case "cronica3":
      case "cronica-3":
        return "cronica-3";
      case "cronica4":
      case "cronica-4":
        return "cronica-4";
      case "nota-complemento1":
      case "nota-complemento-1":
      case "notacomplemento1":
      case "nota-complemento":
        return "nota-complemento-1";
      default:
        return "";
    }
  };

  useEffect(() => {
    const scrollToHashTarget = (hash: string) => {
      const targetId = mapHashToSectionId(hash);
      if (!targetId) return;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHashTarget(window.location.hash);
    const handleHashChange = () => scrollToHashTarget(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-clip bg-black text-white"
      style={{ position: "relative" }}
    >
      <StickyChronicleNav />
      <FloatingShareButtons />

      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-[#d72638]"
        style={{ scaleX: scrollYProgress }}
      />

      <HeroSection />

      <DeferredSection id="cronica-1">
        <IntroSection />
      </DeferredSection>

      <DeferredSection>
        <EarthquakeSection
          poster={sitePosters.earthquake}
          analyticsLabel="cronica_1_video_earthquake"
        />
      </DeferredSection>

      <DeferredSection>
        <EndOfWorldSection />
      </DeferredSection>

      <DeferredSection minHeight="900vh">
        <BuriedSection />
      </DeferredSection>

      <DeferredSection minHeight="200svh">
        <Chronicle1Panorama />
      </DeferredSection>

      <DeferredSection>
        <HopeSection />
      </DeferredSection>

      <DeferredSection>
        <RescueSection />
      </DeferredSection>

      <ReviveAdBlock />

      <DeferredSection>
        <ScrollVideo
          desktopSource={chronicle2LeadDesktopSource}
          mobileSource={chronicle2LeadMobileSource}
          poster={featuredPortraits.javier}
          analyticsLabel="cronica_2_video"
          preload="metadata"
          showControls
          fallbackEmbedUrl={chronicle2FallbackEmbedUrl}
          fallbackEmbedTitle="Video de respaldo de crónica 2"
          preferFallbackIframe
        />
      </DeferredSection>

      <DeferredSection id="cronica-2" minHeight="1100vh">
        <JavierSection />
      </DeferredSection>

      <DeferredSection>
        <RebuildSection />
      </DeferredSection>

      <ReviveAdBlock />

      <DeferredSection id="cronica-3" minHeight="1300vh">
        <DosTarquisSection />
      </DeferredSection>

      <DeferredSection>
        <FantasmaMarketSection />
      </DeferredSection>

      <ReviveAdBlock />

      {hasChronicle3Video && (
        <DeferredSection>
          <ScrollVideo
            desktopSource={chronicle3LeadDesktopSource}
            mobileSource={chronicle3LeadMobileSource}
            poster={featuredPortraits.chronicle4}
            analyticsLabel="cronica_4_video"
            showControls={chronicle3LeadDesktopSource?.kind !== "video" || chronicle3LeadMobileSource?.kind !== "video"}
          />
        </DeferredSection>
      )}

      <DeferredSection id="cronica-4" minHeight="1300vh">
        <Cronica4Section
          leadDesktopVideoSource={chronicle4LeadDesktopSource}
          leadMobileVideoSource={chronicle4LeadMobileSource}
          hideLeadVideo={!hasChronicle4Video}
        />
      </DeferredSection>

      <ReviveAdBlock />

      <DeferredSection id="nota-complemento-1">
        <MemorialSection />
      </DeferredSection>

      <SiteFooter />
    </div>
  );
}
