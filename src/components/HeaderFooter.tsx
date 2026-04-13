import { useState, useEffect } from "react";
import { Logo, R } from "@/components/shared";

// ─── Header ──────────────────────────────────────────────────────────────────
export function Header({ onConsult }: { onConsult: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) {
      document.addEventListener("click", close);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("click", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    ["Проблемы", "#qual"],
    ["О нас", "#team"],
    ["Как работаем", "#process"],
    ["Цены", "#pricing"],
  ] as const;

  return (
    <>
      <header className="site-header">
        <div className="hdr">
          <a href="#" className="brand">
            <Logo height={76} />
          </a>
          <nav className="hdr-nav">
            {navLinks.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          </nav>
          <div className="hdr-right">
            <button onClick={onConsult} className="hdr-cta">Получить консультацию</button>
          </div>
          <button
            className={`burger${open ? " open" : ""}`}
            onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`mobile-nav${open ? " open" : ""}`} onClick={e => e.stopPropagation()}>
        {navLinks.map(([l, h]) => (
          <a key={l} href={h} onClick={() => setOpen(false)}>{l}</a>
        ))}
        <button className="mobile-cta" onClick={() => { setOpen(false); onConsult(); }}>Консультация</button>
      </nav>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="ftr">
        <div className="ftr-brand">
          <Logo height={60} />
        </div>
        <div className="ftr-links">
          {[["Проблемы","#qual"],["О нас","#team"],["Как работаем","#process"],["Цены","#pricing"]].map(([l,h]) => (
            <a key={l} href={h}>{l}</a>
          ))}
        </div>
        <div className="ftr-contact">
          <a href="mailto:neurocontent.wave@gmail.com" className="ftr-mail">neurocontent.wave@gmail.com</a>
          <span className="ftr-legal">© 2025 Настроено. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}

export { R };