import { lazy, Suspense, useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { StickyChronicleNav } from "./components/header/StickyChronicleNav";
import { ScrollVideo } from "./components/ScrollVideo";
import { FloatingShareButtons } from "./components/FloatingShareButtons";
import { DeferredRender } from "./components/DeferredRender";
import { ReviveAdBlock } from "./components/ReviveAdBlock";
import { SiteFooter } from "./components/footer/SiteFooter";
import { featuredPortraits, sitePosters, siteVideos } from "./content/siteMedia";
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

    return () => {
      detachClickTracking();
      detachScrollTracking();
      detachTimeOnPageTracking();
    };
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
          desktopVideoSrc={siteVideos.chronicle1LeadDesktop}
          mobileVideoSrc={siteVideos.chronicle1LeadMobile}
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
          src={siteVideos.chronicle2Lead}
          mobileSrc={siteVideos.chronicle2LeadMobile}
          poster={featuredPortraits.javier}
          analyticsLabel="cronica_2_video"
          preload="metadata"
          showControls
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

      <DeferredSection>
        <ScrollVideo
          src={siteVideos.chronicle4Lead}
          poster={featuredPortraits.chronicle4}
          analyticsLabel="cronica_4_video"
        />
      </DeferredSection>

      <DeferredSection id="cronica-4" minHeight="1300vh">
        <Cronica4Section />
      </DeferredSection>

      <ReviveAdBlock />

      <DeferredSection id="nota-complemento-1">
        <MemorialSection />
      </DeferredSection>

      <SiteFooter />
    </div>
  );
}
