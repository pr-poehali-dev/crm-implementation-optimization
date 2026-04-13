import { useEffect, useRef } from "react";

export const AMO_FORM_URL = "https://forms.amocrm.ru/rcxdwxd";

export function openConsult() {
  window.open(AMO_FORM_URL, "_blank", "noopener,noreferrer");
}

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("vis"); },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function R({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`r${className ? " " + className : ""}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

export function Logo({ height = 44 }: { height?: number }) {
  const ratio = 4.2;
  const w = height * ratio;
  return (
    <svg width={w} height={height} viewBox="0 0 420 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Настроено">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4E000"/>
          <stop offset="100%" stopColor="#7AB51D"/>
        </linearGradient>
      </defs>
      {/* Power icon */}
      <path d="M50 18 L50 50" stroke="url(#lg)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M34 28 A26 26 0 1 0 66 28" stroke="url(#lg)" strokeWidth="8" strokeLinecap="round" fill="none"/>
      {/* НАСТРОЕНО */}
      <text x="105" y="68" fontFamily="Oswald, Arial, sans-serif" fontWeight="700" fontSize="52" letterSpacing="2" fill="white">НАСТРОЕНО</text>
    </svg>
  );
}