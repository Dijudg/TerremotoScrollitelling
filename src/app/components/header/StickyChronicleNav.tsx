import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Menu, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logoIcon from "../../../assets/fav-et.svg";
import logoHorizontal from "../../../assets/Logo-et-horizontal-blanco.svg";
import { chronicleMenu } from "../../content/siteMedia";

const watchedSections = ["hero", "cronica-1", "cronica-2", "cronica-3", "cronica-4", "nota-complemento-1"];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function StickyChronicleNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showHeroButton, setShowHeroButton] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

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
      <div className="mx-auto grid max-w-7xl grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 md:grid-cols-[13rem_minmax(0,1fr)_18rem] md:px-6">
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

        <div className="hidden overflow-x-auto md:block">
          <div className="mx-auto flex min-w-max max-w-md items-center justify-between gap-6">
            {chronicleMenu.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
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

        <div className="justify-self-center text-[10px] uppercase tracking-[0.24em] text-white/65 md:hidden">
          18:58
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

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="relative z-[90] flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/85 backdrop-blur-md transition hover:border-white/50 hover:text-white md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] min-h-[100svh] overflow-y-auto bg-black/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="relative flex min-h-[100svh] w-full flex-col px-5 pt-24 pb-8"
              initial={{ y: -32, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-7">
                <p className="text-xs uppercase tracking-[0.28em] text-sky-300/80">Menú</p>
                <p className="mt-3 text-4xl leading-none text-white">Crónicas y notas</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
                  Navega por las historias y la nota complementaria.
                </p>
              </div>

              <div className="grid flex-1 gap-3">
                {chronicleMenu.map((item, index) => {
                  const isActive = activeSection === item.id;
                  const isNoteItem = item.id === "nota-complemento-1";

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                      className={`group w-full rounded-[1.4rem] border p-2.5 text-left transition ${
                        isNoteItem
                          ? "border-amber-300/50 bg-gradient-to-br from-amber-200/20 via-white/[0.06] to-rose-300/10 text-white shadow-[0_0_0_1px_rgba(252,211,77,0.18),0_18px_50px_rgba(0,0,0,0.35)]"
                          : isActive
                            ? "border-sky-300/60 bg-sky-300/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                      }`}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 16, opacity: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                    >
                      {isNoteItem ? (
                        <span className="flex min-w-0 flex-col gap-3 p-3">
                          <span className="inline-flex w-fit items-center rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-100">
                            Nota final
                          </span>
                          <span className="block text-[11px] uppercase tracking-[0.22em] text-amber-100/80">
                            {item.label}
                          </span>
                          <span className="block text-2xl leading-tight text-white md:text-xl">
                            {item.title}
                          </span>
                          <span className="block text-sm leading-relaxed text-white/70">
                            Abre la lectura complementaria con otra voz y otro enfoque.
                          </span>
                        </span>
                      ) : (
                        <span className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-stretch gap-4">
                          <span className="min-h-[5.5rem] overflow-hidden rounded-[1.1rem] bg-white/10">
                            <img src={item.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                          </span>
                          <span className="flex min-w-0 flex-col justify-center py-2 pr-1">
                            <span className="block text-[11px] uppercase tracking-[0.22em] text-sky-200/70">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-lg leading-tight text-white">{item.title}</span>
                          </span>
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNativeShare}
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 px-5 py-4 text-sm uppercase tracking-[0.18em] text-white/75 transition hover:border-white/35 hover:text-white"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
