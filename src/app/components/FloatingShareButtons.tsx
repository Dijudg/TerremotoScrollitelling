import { useMemo } from "react";
import { Share2 } from "lucide-react";

const buttonClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/75 backdrop-blur-xl transition hover:border-white/40 hover:text-white";

export function FloatingShareButtons() {
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

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-2 md:hidden">
      <button type="button" onClick={handleNativeShare} aria-label="Compartir" className={buttonClassName}>
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
