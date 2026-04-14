import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import logoIcon from "../../../assets/fav-et.svg";
import logoHorizontal from "../../../assets/Logo-et-horizontal-blanco.svg";
import { chronicleMenu } from "../../content/siteMedia";

const watchedSections = ["hero", "cronica-1", "cronica-2", "cronica-3"];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function StickyChronicleNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showHeroButton, setShowHeroButton] = useState(false);

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
      <div className="mx-auto grid max-w-7xl grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-4 px-4 py-4 md:grid-cols-[13rem_minmax(0,1fr)_13rem] md:px-6">
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

        <div className="flex justify-end">
          {showHeroButton ? (
            <button
              type="button"
              aria-label="Volver a la portada"
              onClick={() => scrollToSection("hero")}
              className="text-white/55 transition hover:text-white/90"
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
