import { useEffect } from "react";
import Privacy from "@/pages/Privacy";

interface Props {
  onClose: () => void;
}

export default function PrivacyModal({ onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal" onClick={e => e.stopPropagation()}>
        <button className="privacy-modal-close" onClick={onClose} aria-label="Закрыть политику">
          ✕
        </button>
        <div className="privacy-modal-body">
          <Privacy modal />
        </div>
      </div>
    </div>
  );
}
