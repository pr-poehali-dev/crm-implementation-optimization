import { useState, useEffect } from "react";
import { R } from "@/components/shared";

const TG_BOT = "https://t.me/Nastroeno_bot";

function TgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#229ED9" />
      <path d="M17.64 8.2l-1.68 7.92c-.12.56-.46.7-.92.43l-2.56-1.88-1.23 1.19c-.14.14-.26.26-.52.26l.18-2.6 4.74-4.28c.2-.18-.04-.28-.32-.1L7.34 13.7l-2.52-.79c-.55-.17-.56-.55.12-.81l9.86-3.8c.45-.17.85.11.84.8z" fill="white" />
    </svg>
  );
}

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
            <img
              src="https://cdn.poehali.dev/projects/8c1b8994-87b1-4169-a832-cc876fc4eb40/bucket/0e7f628c-ddff-44da-a743-3f664874f9c7.png"
              alt="Настроено"
              style={{ height: 40, width: "auto", display: "block", objectFit: "contain" }}
            />
          </a>
          <nav className="hdr-nav">
            {navLinks.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          </nav>
          <div className="hdr-right">
            <a href={TG_BOT} target="_blank" rel="noopener noreferrer" className="hdr-tg" aria-label="Написать в Telegram">
              <TgIcon />
              <span>Telegram</span>
            </a>
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
        <a href={TG_BOT} target="_blank" rel="noopener noreferrer" className="mobile-tg-link" onClick={() => setOpen(false)}>
          <TgIcon /> Написать в Telegram
        </a>
        <button className="mobile-cta" onClick={() => { setOpen(false); onConsult(); }}>Консультация</button>
      </nav>

      {/* Floating TG button */}
      <a
        href={TG_BOT}
        target="_blank"
        rel="noopener noreferrer"
        className="tg-float"
        aria-label="Написать нам в Telegram"
        title="Написать в Telegram"
      >
        <TgIcon />
        <span className="tg-float-label">Написать в Telegram</span>
      </a>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="ftr">
        <div className="ftr-links">
          {[["Проблемы","#qual"],["О нас","#team"],["Как работаем","#process"],["Цены","#pricing"]].map(([l,h]) => (
            <a key={l} href={h}>{l}</a>
          ))}
        </div>
        <div className="ftr-contact">
          <a href="mailto:neurocontent.wave@gmail.com" className="ftr-mail">neurocontent.wave@gmail.com</a>
          <a href={TG_BOT} target="_blank" rel="noopener noreferrer" className="ftr-tg">
            <TgIcon /> Написать в Telegram
          </a>
          <a href="/privacy" className="ftr-privacy">Политика конфиденциальности</a>
          <span className="ftr-legal">© 2026 Настроено. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}

export { R };
