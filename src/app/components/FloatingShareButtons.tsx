import { useMemo, useState } from "react";
import { Copy, MessageCircle, Share2 } from "lucide-react";
import { motion } from "motion/react";

const buttonClassName =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/75 backdrop-blur-xl transition hover:border-white/40 hover:text-white";

export function FloatingShareButtons() {
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

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-2 md:hidden">
      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-full border border-white/15 bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70"
        >
          Copiado
        </motion.span>
      )}

      <button type="button" onClick={handleNativeShare} aria-label="Compartir" className={buttonClassName}>
        <Share2 className="h-4 w-4" />
      </button>

      <button type="button" onClick={handleWhatsApp} aria-label="Compartir por WhatsApp" className={buttonClassName}>
        <MessageCircle className="h-4 w-4" />
      </button>

      <button type="button" onClick={handleCopy} aria-label="Copiar enlace" className={buttonClassName}>
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
