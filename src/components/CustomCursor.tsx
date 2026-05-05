import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [onClickable, setOnClickable] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const animRef = useRef<number | null>(null);
  const movedRef = useRef(false);

  useEffect(() => {
    // Только для устройств с точным указателем (мышь), не для тач
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!movedRef.current) {
        movedRef.current = true;
        setActive(true);
        // Сразу прыгаем к позиции при первом движении
        ringPos.current = { x: e.clientX, y: e.clientY };
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const clickable = el
        ? el.closest("button, a, [role=button], input, label, select, textarea, [tabindex]") !== null
        : false;
      setOnClickable(clickable);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      if (movedRef.current) {
        ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12);
        ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12);
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
        }
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // На touch-устройствах — ничего не рендерим
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${active ? " cursor-active" : ""}${clicked ? " cursor-clicked" : ""}${onClickable ? " cursor-on-clickable" : ""}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring${active ? " cursor-active" : ""}${clicked ? " cursor-ring-clicked" : ""}${onClickable ? " cursor-ring-clickable" : ""}`}
      />
    </>
  );
}
