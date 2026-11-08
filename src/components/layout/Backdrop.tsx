"use client";

import { useEffect, useRef } from "react";

/** Fixed background: technical grid, edge rulers, grain and a cursor-following light (desktop only). */
export function Backdrop() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lightRef.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    let raf = 0;
    let x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
          el.style.opacity = "1";
          raf = 0;
        });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#101624_0%,#080B12_60%)]" />
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_80%)] motion-safe:animate-grid-drift" />
      <div
        ref={lightRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700"
        style={{ background: "radial-gradient(circle, rgba(77,141,255,0.07), transparent 60%)" }}
      />
      {/* Edge rulers (wide screens) */}
      <div className="absolute inset-y-0 left-0 hidden w-6 border-r border-line/60 2xl:block">
        <Ruler />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-6 border-l border-line/60 2xl:block">
        <Ruler flip />
      </div>
      <div className="grain" />
    </div>
  );
}

function Ruler({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(137,149,170,0.25) 0 1px, transparent 1px 16px), repeating-linear-gradient(to bottom, rgba(137,149,170,0.45) 0 1px, transparent 1px 80px)",
        backgroundSize: flip ? "8px 100%, 14px 100%" : "8px 100%, 14px 100%",
        backgroundPosition: flip ? "right top, right top" : "left top, left top",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
