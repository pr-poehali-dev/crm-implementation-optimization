import { useState, useEffect } from "react";

const CONSENT_KEY = "nastroeno_pd_consent";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-overlay" role="dialog" aria-modal="true" aria-label="Согласие на обработку персональных данных">
      <div className="consent-banner">
        <div className="consent-icon">🔒</div>
        <div className="consent-body">
          <p className="consent-title">Согласие на обработку персональных данных</p>
          <p className="consent-text">
            Продолжая использовать сайт, вы даёте согласие на обработку персональных данных
            операторами: самозанятая Романенко Д.С. (ИНН 253608343886) и ИП Шумова В.Е.
            (ИНН 253706137401) в целях обработки заявок и связи с вами.{" "}
            <a href="/privacy" className="consent-link">Политика конфиденциальности</a>
          </p>
        </div>
        <button className="consent-btn" onClick={accept} aria-label="Принять и продолжить">
          Принять
        </button>
      </div>
    </div>
  );
}
