import { lazy, Suspense, useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { StickyChronicleNav } from "./components/StickyChronicleNav";
import { ScrollVideo } from "./components/ScrollVideo";
import { FloatingShareButtons } from "./components/FloatingShareButtons";
import { DeferredRender } from "./components/DeferredRender";
import { featuredPortraits, sitePosters, siteVideos } from "./content/siteMedia";
import {
  attachClickTracking,
  attachScrollTracking,
  attachTimeOnPageTracking,
  initAnalytics,
  trackPageView,
} from "../../analytics";

const IntroSection = lazy(() => import("./components/IntroSection").then((module) => ({ default: module.IntroSection })));
const EarthquakeSection = lazy(() => import("./components/EarthquakeSection").then((module) => ({ default: module.EarthquakeSection })));
const EndOfWorldSection = lazy(() => import("./components/EndOfWorldSection").then((module) => ({ default: module.EndOfWorldSection })));
const BuriedSection = lazy(() => import("./components/BuriedSection").then((module) => ({ default: module.BuriedSection })));
const HopeSection = lazy(() => import("./components/HopeSection").then((module) => ({ default: module.HopeSection })));
const RescueSection = lazy(() => import("./components/RescueSection").then((module) => ({ default: module.RescueSection })));
const JavierSection = lazy(() => import("./components/JavierSection").then((module) => ({ default: module.JavierSection })));
const LossSection = lazy(() => import("./components/LossSection").then((module) => ({ default: module.LossSection })));
const RebuildSection = lazy(() => import("./components/RebuildSection").then((module) => ({ default: module.RebuildSection })));
const DosTarquisSection = lazy(() => import("./components/DosTarquisSection").then((module) => ({ default: module.DosTarquisSection })));
const FantasmaMarketSection = lazy(() => import("./components/FantasmaMarketSection").then((module) => ({ default: module.FantasmaMarketSection })));
const MemorialSection = lazy(() => import("./components/MemorialSection").then((module) => ({ default: module.MemorialSection })));
const Chronicle1Panorama = lazy(() => import("./components/Chronicle1Panorama").then((module) => ({ default: module.Chronicle1Panorama })));

const deferredRootMargin = "1400px 0px";

function DeferredSection({
  children,
  minHeight = "100vh",
}: {
  children: ReactNode;
  minHeight?: string;
}) {
  return (
    <DeferredRender minHeight={minHeight} rootMargin={deferredRootMargin}>
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

      <DeferredSection>
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

      <DeferredSection>
        <ScrollVideo
          src={siteVideos.chronicle2Lead}
          poster={featuredPortraits.javier}
          analyticsLabel="cronica_2_video"
        />
      </DeferredSection>

      <DeferredSection minHeight="1100vh">
        <JavierSection />
      </DeferredSection>

      <DeferredSection>
        <LossSection />
      </DeferredSection>

      <DeferredSection>
        <RebuildSection />
      </DeferredSection>

      <DeferredSection minHeight="1300vh">
        <DosTarquisSection />
      </DeferredSection>

      <DeferredSection>
        <FantasmaMarketSection />
      </DeferredSection>

      <DeferredSection>
        <ScrollVideo
          src={siteVideos.chronicle3Lead}
          poster={featuredPortraits.betty}
          analyticsLabel="cronica_3_video"
        />
      </DeferredSection>

      <DeferredSection>
        <MemorialSection />
      </DeferredSection>
    </div>
  );
}
