import { useEffect, useRef, useState, useCallback } from "react";
import { R } from "@/components/shared";

// ─── SVG node icons ───────────────────────────────────────────────────────────
function IcoLeads() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20 4L12 12M20 4H14M20 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20L12 12M4 20H10M4 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  );
}
function IcoCrm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="14" r="2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}
function IcoManager() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2"/>
      <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IcoDeal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IcoMarketing() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <polyline points="4,17 9,11 13,14 20,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16,6 20,6 20,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoAnalytics() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="14" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="10.5" y="9" width="3" height="11" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="17" y="4" width="3" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

// ─── CRM Game ────────────────────────────────────────────────────────────────
type NodeId = "leads" | "amocrm" | "manager" | "deal" | "marketing" | "analytics";

interface NodeDef {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  color: string;
}

const NODES: NodeDef[] = [
  { id: "leads",     label: "ЛИДЫ",      x: 230, y: 68,  color: "#B6E942" },
  { id: "amocrm",    label: "amoCRM",    x: 370, y: 155, color: "#F5E200" },
  { id: "manager",   label: "МЕНЕДЖЕР",  x: 370, y: 305, color: "#D4E000" },
  { id: "deal",      label: "СДЕЛКА",    x: 230, y: 390, color: "#B6E942" },
  { id: "marketing", label: "МАРКЕТИНГ", x: 90,  y: 305, color: "#D4E000" },
  { id: "analytics", label: "АНАЛИТИКА", x: 90,  y: 155, color: "#F5E200" },
];

const EDGES: [NodeId, NodeId][] = [
  ["leads", "amocrm"], ["amocrm", "manager"], ["manager", "deal"],
  ["deal", "marketing"], ["marketing", "analytics"], ["analytics", "leads"],
];

const CHAOS_MSG: Record<NodeId, string> = {
  leads:     "Лиды приходят — и пропадают неизвестно куда",
  amocrm:    "CRM выключена — ничего не фиксируется",
  manager:   "Менеджер ведёт клиентов в голове или блокноте",
  deal:      "Сделки срываются незаметно для руководителя",
  marketing: "Маркетолог не знает откуда приходят звонки",
  analytics: "Данных нет — решения принимаются вслепую",
};
const ORDER_MSG: Record<NodeId, string> = {
  leads:     "Каждый лид автоматически фиксируется в CRM",
  amocrm:    "CRM видит полный путь клиента до оплаты",
  manager:   "Менеджер знает кому, когда и что говорить",
  deal:      "Ни одна сделка не потеряется — система следит",
  marketing: "Маркетолог видит какой канал приносит деньги",
  analytics: "Данные есть — руководитель принимает точные решения",
};

// Дефолтные цитаты (когда ни один узел не выбран)
const DEFAULT_OFF = "Нажми на любой узел — увидишь где теряются деньги";
const DEFAULT_ON  = "Нажми на любой узел — увидишь как работает система";

function CrmGame() {
  const [crmOn, setCrmOn] = useState(false);
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const [quote, setQuote] = useState(DEFAULT_OFF);
  const [particles, setParticles] = useState<{ id: number; edge: number; t: number }[]>([]);
  const [revenue, setRevenue] = useState(0);
  const animRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const revenueRef = useRef(0);
  const particleId = useRef(0);

  const toggleCrm = useCallback(() => {
    setCrmOn(prev => {
      const next = !prev;
      if (!next) { setParticles([]); revenueRef.current = 0; setRevenue(0); }
      setActiveNode(null);
      setQuote(next ? DEFAULT_ON : DEFAULT_OFF);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!crmOn) { if (animRef.current) cancelAnimationFrame(animRef.current); return; }
    const loop = (ts: number) => {
      const dt = Math.min(ts - lastRef.current, 80);
      lastRef.current = ts;
      if (Math.random() < 0.05) {
        const edgeIdx = Math.floor(Math.random() * EDGES.length);
        setParticles(prev => [...prev.slice(-20), { id: particleId.current++, edge: edgeIdx, t: 0 }]);
      }
      setParticles(prev => prev.map(p => ({ ...p, t: p.t + dt * 0.00055 })).filter(p => p.t < 1));
      revenueRef.current += dt * 0.09;
      setRevenue(Math.floor(revenueRef.current));
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [crmOn]);

  const handleNode = (node: NodeDef, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const newNode = node.id === activeNode ? null : node.id;
    setActiveNode(newNode);
    if (newNode) {
      setQuote(crmOn ? ORDER_MSG[node.id] : CHAOS_MSG[node.id]);
    } else {
      setQuote(crmOn ? DEFAULT_ON : DEFAULT_OFF);
    }
  };

  const getParticlePos = (p: { edge: number; t: number }) => {
    const [aId, bId] = EDGES[p.edge];
    const a = NODES.find(n => n.id === aId)!;
    const b = NODES.find(n => n.id === bId)!;
    return { x: a.x + (b.x - a.x) * p.t, y: a.y + (b.y - a.y) * p.t };
  };

  const activeNodeDef = activeNode ? NODES.find(n => n.id === activeNode) : null;

  return (
    <div className="crm-game">
      {/* Счётчик */}
      <div className={`crm-revenue${crmOn ? " crm-revenue-on" : ""}`}>
        <span className={`crm-rev-dot${crmOn ? "" : " crm-rev-dot-off"}`}/>
        {crmOn ? (
          <>
            <span className="crm-rev-label">Выручка растёт</span>
            <span className="crm-rev-num">+{revenue.toLocaleString("ru")} ₽</span>
          </>
        ) : (
          <>
            <span className="crm-rev-label">Нет продаж?</span>
            <span className="crm-rev-num crm-rev-muted">Включи CRM →</span>
          </>
        )}
      </div>

      {/* SVG схема */}
      <div className="crm-svg-wrap" onClick={() => { setActiveNode(null); setQuote(crmOn ? DEFAULT_ON : DEFAULT_OFF); }}>
        <svg viewBox="0 0 460 460" fill="none" className="crm-svg">
          <defs>
            <filter id="cglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="cglowBig" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="16" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Grid dots */}
          <g opacity="0.06">
            {[60,120,180,240,300,360,420].flatMap(x =>
              [60,120,180,240,300,360,420].map(y => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#B6E942"/>
              ))
            )}
          </g>

          {/* Edges */}
          {EDGES.map(([aId, bId], i) => {
            const a = NODES.find(n => n.id === aId)!;
            const b = NODES.find(n => n.id === bId)!;
            const len = Math.hypot(b.x - a.x, b.y - a.y);
            return (
              <line key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={crmOn ? "rgba(182,233,66,0.55)" : "rgba(182,233,66,0.15)"}
                strokeWidth={crmOn ? "1.8" : "1"}
                strokeDasharray={crmOn ? "0" : `${len * 0.12} ${len * 0.1}`}
                className="crm-edge"
              />
            );
          })}

          {/* Particles */}
          {crmOn && particles.map(p => {
            const pos = getParticlePos(p);
            return (
              <circle key={p.id} cx={pos.x} cy={pos.y} r="4"
                fill="#F5E200" filter="url(#cglow)"
                opacity={Math.sin(p.t * Math.PI)}
              />
            );
          })}

          {/* Center glow */}
          {crmOn && <circle cx="230" cy="230" r="54" fill="rgba(182,233,66,0.04)" filter="url(#cglowBig)" className="crm-center-glow"/>}
          <circle cx="230" cy="230" r="48"
            fill="#111814"
            stroke={crmOn ? "rgba(182,233,66,0.35)" : "rgba(182,233,66,0.12)"}
            strokeWidth="1.5"
            className="crm-center-ring"
          />
          {/* Power icon */}
          <line x1="230" y1="208" x2="230" y2="222"
            stroke={crmOn ? "#B6E942" : "#66706a"} strokeWidth="3" strokeLinecap="round" className="crm-edge"
          />
          <path d="M218 215 A16 16 0 1 0 242 215"
            stroke={crmOn ? "#B6E942" : "#66706a"} strokeWidth="3" strokeLinecap="round" fill="none" className="crm-edge"
          />

          {/* Nodes */}
          {NODES.map(node => {
            const isActive = activeNode === node.id;
            const w = node.label.length > 7 ? 100 : 84;
            const col = crmOn ? node.color : "#66706a";
            return (
              <g key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onClick={e => handleNode(node, e)}
                onTouchEnd={e => { e.preventDefault(); handleNode(node, e); }}
                style={{ cursor: "pointer" }}
                className="crm-node"
              >
                {isActive && (
                  <rect x={-w/2 - 4} y="-24" width={w + 8} height="48" rx="13"
                    fill={node.color} opacity={crmOn ? "0.12" : "0.05"} filter="url(#cglow)"
                  />
                )}
                <rect x={-w/2} y="-20" width={w} height="40" rx="10"
                  fill={isActive ? "#222e1e" : "#1a2118"}
                  stroke={isActive ? node.color : col}
                  strokeWidth={isActive ? "2.2" : "1.2"}
                  opacity={crmOn ? "1" : "0.55"}
                />
                <text x="0" y="5" textAnchor="middle"
                  fontFamily="Oswald,sans-serif" fontSize="11" fontWeight="700"
                  fill={isActive ? "#ffffff" : (crmOn ? "#ffffff" : "rgba(255,255,255,0.35)")}
                  letterSpacing="1"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Цитата — постоянная, не исчезает */}
      <div className={`crm-quote${activeNodeDef ? " crm-quote-active" : ""}`}
        style={{ borderColor: activeNodeDef ? activeNodeDef.color : undefined }}
      >
        <span className="crm-quote-icon">
          {activeNodeDef ? "→" : "↑"}
        </span>
        <span className="crm-quote-text" key={quote}>
          {quote}
        </span>
      </div>

      {/* Toggle button */}
      <button
        className={`crm-toggle${crmOn ? " crm-toggle-on" : " crm-toggle-off"}`}
        onClick={toggleCrm}
      >
        <span className="crm-toggle-dot"/>
        <span>{crmOn ? "amoCRM включена — всё работает" : "↑ Нажми — включи CRM"}</span>
      </button>
    </div>
  );
}

declare global { interface Window { ym?: (id: number, action: string, goal: string) => void } }
function trackYm(goal: string) {
  if (typeof window !== "undefined" && window.ym) window.ym(108514146, "reachGoal", goal);
}

export function Hero({ onConsult }: { onConsult: () => void }) {
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
              <button onClick={() => { trackYm("click_consult"); onConsult(); }} className="btn-lime">
                → Получить консультацию
              </button>
              <a href="#pricing" className="btn-ghost">Узнать стоимость</a>
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
          <CrmGame />
        </div>
      </div>
    </section>
  );
}

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
