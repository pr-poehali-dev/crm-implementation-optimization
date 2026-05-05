import { useState, useEffect } from "react";
import PrivacyModal from "@/components/PrivacyModal";

const CONSENT_KEY = "nastroeno_pd_consent_v2";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "1");
    setVisible(false);
    setPrivacyOpen(false);
  };

  return (
    <>
      {visible && (
        <div className="consent-overlay" role="dialog" aria-modal="true">
          <div className="consent-banner">
            <div className="consent-icon">🔒</div>
            <div className="consent-body">
              <p className="consent-title">Согласие на обработку персональных данных</p>
              <p className="consent-text">
                Продолжая использовать сайт, вы соглашаетесь с обработкой персональных данных
                операторами: Романенко Д.С. и ИП Шумова В.Е.{" "}
                <button className="consent-link-btn" onClick={() => setPrivacyOpen(true)}>
                  Читать политику →
                </button>
              </p>
            </div>
            <button className="consent-btn" onClick={accept}>
              Принять
            </button>
          </div>
        </div>
      )}
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </>
  );
}
