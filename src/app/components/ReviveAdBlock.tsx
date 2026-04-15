import { useEffect, useRef } from "react";

const reviveScriptSrc = "//adserver.eltelegrafo.com.ec/www/delivery/asyncjs.php";

export function ReviveAdBlock() {
  const hostRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (scriptRef.current || !hostRef.current) return;

    const script = document.createElement("script");
    script.src = reviveScriptSrc;
    script.async = true;

    hostRef.current.appendChild(script);
    scriptRef.current = script;

    return () => {
      script.remove();
      scriptRef.current = null;
    };
  }, []);

  return (
    <section className="bg-black py-10 text-white">
      <div className="container mx-auto max-w-6xl px-6">
        <div ref={hostRef} className="flex justify-center">
          <div>
            <ins data-revive-zoneid="1" data-revive-id="60f0b66ffc0f4db66aaad1c14934c701" />
          </div>
        </div>
      </div>
    </section>
  );
}
