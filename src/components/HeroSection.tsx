import { useEffect, useRef } from "react";
import { R } from "@/components/shared";

// ─── Power SVG ───────────────────────────────────────────────────────────────
function PowerScene() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.classList.add("on"), 600);
    return () => clearTimeout(t);
  }, []);

  const lines = [
    { id:"psl0", x1:230,y1:195,x2:230,y2:108, dash:90 },
    { id:"psl1", x1:268,y1:208,x2:348,y2:148, dash:100 },
    { id:"psl2", x1:268,y1:260,x2:348,y2:318, dash:100 },
    { id:"psl3", x1:230,y1:275,x2:230,y2:358, dash:85 },
    { id:"psl4", x1:192,y1:260,x2:112,y2:318, dash:100 },
    { id:"psl5", x1:192,y1:208,x2:112,y2:148, dash:100 },
  ];
  const travellers = [
    { path:"M230,195 L230,108", dur:"2s", begin:"3.5s" },
    { path:"M268,208 L348,148", dur:"2s", begin:"4s" },
    { path:"M268,260 L348,318", dur:"2.2s", begin:"4.3s" },
    { path:"M230,275 L230,358", dur:"2s", begin:"3.8s" },
    { path:"M192,260 L112,318", dur:"2.1s", begin:"4.5s" },
    { path:"M192,208 L112,148", dur:"1.9s", begin:"4.2s" },
  ];
  const nodes = [
    { id:"psn0", tx:230, ty:88, label:"ЛИДЫ", stroke:"#B6E942", w:76, fill:"#B6E942" },
    { id:"psn1", tx:370, ty:135, label:"amoCRM", stroke:"#B6E942", w:88, fill:"#B6E942" },
    { id:"psn2", tx:370, ty:332, label:"МЕНЕДЖЕР", stroke:"#D4E000", w:100, fill:"#D4E000" },
    { id:"psn3", tx:230, ty:376, label:"СДЕЛКА", stroke:"#7FAF2B", w:80, fill:"#7FAF2B" },
    { id:"psn4", tx:90, ty:332, label:"МАРКЕТИНГ", stroke:"#B6E942", w:100, fill:"#B6E942" },
    { id:"psn5", tx:90, ty:135, label:"АНАЛИТИКА", stroke:"#D4E000", w:100, fill:"#D4E000" },
  ];

  return (
    <div className="ps-wrap" ref={ref}>
      <svg className="ps-svg" viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pgGrad" x1="230" y1="100" x2="230" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4E000" />
            <stop offset="50%" stopColor="#B6E942" />
            <stop offset="100%" stopColor="#7FAF2B" />
          </linearGradient>
          <filter id="pgGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="pgGlowBig" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g opacity="0.12">
          {[80,160,240,320,400].flatMap(x =>
            [80,160,240,320,400].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#B6E942" />
            ))
          )}
        </g>
        {lines.map(l => (
          <line key={l.id} className="ps-line" id={l.id}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#B6E942" strokeWidth="1.5"
            strokeDasharray={l.dash} strokeDashoffset={l.dash} opacity="0.6" />
        ))}
        {travellers.map((t, i) => (
          <circle key={i} className="ps-traveller" r="3" fill="#F5E200" filter="url(#pgGlow)" opacity="0">
            <animateMotion dur={t.dur} repeatCount="indefinite" begin={t.begin} path={t.path} />
          </circle>
        ))}
        {nodes.map(n => (
          <g key={n.id} className="ps-node" id={n.id} opacity="0" transform={`translate(${n.tx},${n.ty})`}>
            <rect x={-n.w/2} y="-18" width={n.w} height="36" rx="8" fill="#1E2420" stroke={n.stroke} strokeWidth="1.2" opacity="0.9" />
            <rect x={-n.w/2} y="-18" width={n.w} height="36" rx="8" fill={n.fill} opacity="0.06" />
            <text x="0" y="5" textAnchor="middle" fontFamily="Oswald,sans-serif" fontSize="11" fontWeight="600" fill={n.fill} letterSpacing="1">{n.label}</text>
          </g>
        ))}
        <circle className="ps-aura" cx="230" cy="230" r="85" stroke="#B6E942" strokeWidth="0.5" opacity="0" />
        <circle className="ps-aura2" cx="230" cy="230" r="105" stroke="#B6E942" strokeWidth="0.3" opacity="0" />
        <circle cx="230" cy="230" r="68" fill="#0e1210" stroke="rgba(182,233,66,0.08)" strokeWidth="1" />
        <circle className="ps-ring-draw" cx="230" cy="240" r="44" stroke="url(#pgGrad)" strokeWidth="4" strokeLinecap="round" filter="url(#pgGlow)" strokeDasharray="198 88" strokeDashoffset="286" transform="rotate(-90 230 240)" />
        <line className="ps-vline-draw" x1="230" y1="196" x2="230" y2="240" stroke="url(#pgGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="44" strokeDashoffset="44" filter="url(#pgGlow)" />
        <path className="ps-arrow-draw" d="M218 213 L230 199 L242 213" stroke="url(#pgGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset="30" fill="none" filter="url(#pgGlow)" />
        <circle className="ps-center-glow" cx="230" cy="230" r="68" fill="url(#pgGrad)" opacity="0" filter="url(#pgGlowBig)" />
      </svg>
      <div className="ps-status">
        <span className="ps-sdot" />
        ВКЛЮЧЕНО
      </div>
    </div>
  );
}

declare global { interface Window { ym?: (id: number, action: string, goal: string) => void } }

function trackYm(goal: string) {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(108514146, "reachGoal", goal);
  }
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export function Hero({ onConsult }: { onConsult: () => void }) {
  function handleConsult() {
    trackYm("click_consult");
    onConsult();
  }

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <R><div className="hero-tag">Сертифицированные партнёры amoCRM</div></R>
          <R delay={100}>
            <h1 className="h1">Маркетинг.<br />CRM.<br /><span className="accent">Результат.</span></h1>
          </R>
          <R delay={200}>
            <p className="hero-sub">Настраиваем amoCRM так, чтобы продажи перестали зависеть от памяти и настроения менеджера.</p>
          </R>
          <R delay={200}>
            <div className="hero-btns">
              <button onClick={handleConsult} className="btn-lime" aria-label="Получить бесплатную консультацию по внедрению amoCRM">→ Получить консультацию</button>
              <a href="#pricing" className="btn-ghost" aria-label="Посмотреть стоимость услуг">Узнать стоимость</a>
            </div>
          </R>
          <R delay={350}>
            <div className="hero-badges">
              <span className="hbadge">✦ <b>Маркетологи + интеграторы</b> в одной команде</span>
              <span className="hbadge">✦ <b>15 лет</b> в маркетинге и продажах</span>
            </div>
          </R>
        </div>
        <div className="hero-right">
          <PowerScene />
        </div>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
export function Ticker() {
  const items = [
    "amoCRM под ваш бизнес",
    "Маркетинг и продажи — одна система",
    "Настраиваем. Запускаем. Остаёмся рядом",
    "Сертифицированные партнёры amoCRM",
    "15 лет в продажах",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        {doubled.map((t, i) => <span key={i} className="ti">{t}</span>)}
      </div>
    </div>
  );
}