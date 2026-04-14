import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Copy, MessageCircle, Share2 } from "lucide-react";
import { motion } from "motion/react";
import logoIcon from "../../../assets/fav-et.svg";
import logoHorizontal from "../../../assets/Logo-et-horizontal-blanco.svg";
import { chronicleMenu } from "../../content/siteMedia";

const watchedSections = ["hero", "cronica-1", "cronica-2", "cronica-3", "cronica-4"];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function StickyChronicleNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showHeroButton, setShowHeroButton] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = useMemo(
    () => ({
      url: window.location.href,
      title: "18:58 | Mas alla del tiempo",
      text: "Historias del terremoto de Manabi a 10 anos del 16 de abril de 2016.",
    }),
    [],
  );

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleWhatsApp = () => {
    const message = `${shareData.title} ${shareData.url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  useEffect(() => {
    const observedSections = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    const observeExistingSections = () => {
      watchedSections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && !observedSections.has(element)) {
          observedSections.add(element);
          observer.observe(element);
        }
      });
    };

    observeExistingSections();

    const mutationObserver = new MutationObserver(observeExistingSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const handleScroll = () => {
      setShowHeroButton(window.scrollY > window.innerHeight * 0.6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/75 via-black/45 to-transparent backdrop-blur-[2px]"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-4 px-4 py-4 md:grid-cols-[13rem_minmax(0,1fr)_18rem] md:px-6">
        <div className="flex justify-start">
          <a
            href="https://www.eltelegrafo.com.ec"
            target="_blank"
            rel="noreferrer"
            aria-label="Ir a El Telegrafo"
            className="opacity-80 transition hover:opacity-100"
          >
            <img src={logoIcon} alt="El Telegrafo" className="h-6 w-6 md:hidden" />
            <img src={logoHorizontal} alt="El Telegrafo" className="hidden w-36 max-w-full md:block lg:w-30" />
          </a>
        </div>

        <div className="hide-scrollbar overflow-x-auto">
          <div className="mx-auto flex min-w-max max-w-md items-center justify-between gap-6">
            {chronicleMenu.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative pb-1 text-[11px] uppercase tracking-[0.24em] transition ${
                    isActive
                      ? "text-white"
                      : "text-white/55 hover:text-white/85"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute right-0 bottom-0 left-0 h-px bg-[#d72638] transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={handleNativeShare}
              aria-label="Compartir"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:border-white/50 hover:text-white"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              aria-label="Compartir por WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:border-white/50 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copiar enlace"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:border-white/50 hover:text-white"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            {copied && <span className="text-[10px] uppercase tracking-[0.2em] text-white/75">Copiado</span>}
          </div>

          {showHeroButton ? (
            <button
              type="button"
              aria-label="Volver a la portada"
              onClick={() => scrollToSection("hero")}
              className="rounded-full border border-sky-300/70 bg-sky-400/20 p-1.5 text-sky-200 shadow-[0_0_16px_rgba(56,189,248,0.45)] transition hover:bg-sky-300/30 hover:text-sky-100"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.8} />
            </button>
          ) : (
            <div aria-hidden="true" className="h-4 w-4" />
          )}
        </div>
      </div>
    </motion.nav>
  );
}
