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
  return (
    <img
      src="https://cdn.poehali.dev/projects/8c1b8994-87b1-4169-a832-cc876fc4eb40/bucket/5266d917-8967-40e9-a1d8-abfc7a1bf513.png"
      alt="Настроено"
      style={{ height, width: "auto", display: "block", objectFit: "contain", filter: "invert(1) brightness(2)" }}
    />
  );
}