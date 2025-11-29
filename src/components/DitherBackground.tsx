import { useEffect, useState } from "react";

export function DitherBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <div className="bg-noise fixed inset-0 z-0 pointer-events-none opacity-[0.03]" />
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
        {/* Simplified static blobs with CSS animations instead of framer-motion */}
        <div
          className={`absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-brand-orange/15 blur-[120px] ${
            prefersReducedMotion ? "" : "animate-blob"
          }`}
          style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
        />
        <div
          className={`absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-gold/15 blur-[120px] ${
            prefersReducedMotion ? "" : "animate-blob animation-delay-2000"
          }`}
          style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
        />
        <div
          className={`absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-brand-green/10 blur-[120px] ${
            prefersReducedMotion ? "" : "animate-blob animation-delay-4000"
          }`}
          style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
        />
      </div>
    </>
  );
}


