import { useEffect, useRef, useState, useCallback } from "react";
import { R } from "@/components/shared";

// ─── CRM Game ────────────────────────────────────────────────────────────────
type NodeId = "leads" | "amocrm" | "manager" | "deal" | "marketing" | "analytics";

interface NodeDef {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  color: string;
  icon: string;
}

const NODES: NodeDef[] = [
  { id: "leads",     label: "ЛИДЫ",      x: 230, y: 68,  color: "#B6E942", icon: "📥" },
  { id: "amocrm",    label: "amoCRM",    x: 370, y: 150, color: "#B6E942", icon: "⚡" },
  { id: "manager",   label: "МЕНЕДЖЕР",  x: 370, y: 310, color: "#D4E000", icon: "👤" },
  { id: "deal",      label: "СДЕЛКА",    x: 230, y: 390, color: "#7FAF2B", icon: "💰" },
  { id: "marketing", label: "МАРКЕТИНГ", x: 90,  y: 310, color: "#B6E942", icon: "📊" },
  { id: "analytics", label: "АНАЛИТИКА", x: 90,  y: 150, color: "#D4E000", icon: "📈" },
];

const EDGES: [NodeId, NodeId][] = [
  ["leads",     "amocrm"],
  ["amocrm",    "manager"],
  ["manager",   "deal"],
  ["deal",      "marketing"],
  ["marketing", "analytics"],
  ["analytics", "leads"],
];

const CHAOS_MESSAGES: Record<NodeId, string> = {
  leads:     "Лиды приходят — и пропадают никуда",
  amocrm:    "CRM выключена — ничего не фиксируется",
  manager:   "Менеджер ведёт клиентов в голове",
  deal:      "Сделки срываются незаметно",
  marketing: "Маркетолог не знает откуда звонки",
  analytics: "Аналитики нет — решения вслепую",
};

const ORDER_MESSAGES: Record<NodeId, string> = {
  leads:     "Каждый лид фиксируется автоматически",
  amocrm:    "CRM видит весь путь клиента",
  manager:   "Менеджер знает кому и когда звонить",
  deal:      "Сделки не теряются — система следит",
  marketing: "Маркетолог видит откуда деньги",
  analytics: "Данные есть — решения точные",
};

function CrmGame() {
  const [crmOn, setCrmOn] = useState(false);
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<{ id: number; edge: number; t: number }[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [shake, setShake] = useState(false);
  const animRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const revenueRef = useRef(0);
  const particleId = useRef(0);

  const toggleCrm = useCallback(() => {
    setCrmOn(prev => {
      const next = !prev;
      if (!next) {
        setParticles([]);
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!crmOn) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const loop = (ts: number) => {
      const dt = ts - lastRef.current;
      lastRef.current = ts;

      // spawn particles
      if (Math.random() < 0.04) {
        const edgeIdx = Math.floor(Math.random() * EDGES.length);
        setParticles(prev => [
          ...prev.filter(p => p.t < 1),
          { id: particleId.current++, edge: edgeIdx, t: 0 },
        ]);
      }

      // advance particles
      setParticles(prev =>
        prev
          .map(p => ({ ...p, t: p.t + dt * 0.0006 }))
          .filter(p => p.t < 1)
      );

      // revenue tick
      revenueRef.current += dt * 0.08;
      setRevenue(Math.floor(revenueRef.current));

      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [crmOn]);

  const handleNode = (node: NodeDef, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).closest(".crm-svg-wrap")?.getBoundingClientRect();
    const nx = node.x / 460;
    const ny = node.y / 460;
    setActiveNode(node.id === activeNode ? null : node.id);
    if (rect) {
      setTooltip({
        text: crmOn ? ORDER_MESSAGES[node.id] : CHAOS_MESSAGES[node.id],
        x: rect.left + rect.width * nx,
        y: rect.top + rect.height * ny - 60,
      });
    }
    setTimeout(() => setTooltip(null), 2200);
  };

  const getEdgePath = (edge: [NodeId, NodeId]) => {
    const a = NODES.find(n => n.id === edge[0])!;
    const b = NODES.find(n => n.id === edge[1])!;
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  };

  const getParticlePos = (p: { edge: number; t: number }) => {
    const edge = EDGES[p.edge];
    const a = NODES.find(n => n.id === edge[0])!;
    const b = NODES.find(n => n.id === edge[1])!;
    return {
      x: a.x + (b.x - a.x) * p.t,
      y: a.y + (b.y - a.y) * p.t,
    };
  };

  return (
    <div className={`crm-game${shake ? " crm-shake" : ""}`}>
      {/* Revenue counter */}
      <div className={`crm-revenue${crmOn ? " crm-revenue-on" : ""}`}>
        {crmOn ? (
          <>
            <span className="crm-rev-label">Выручка растёт</span>
            <span className="crm-rev-num">+{revenue.toLocaleString("ru")} ₽</span>
          </>
        ) : (
          <>
            <span className="crm-rev-label">Деньги теряются</span>
            <span className="crm-rev-num crm-rev-loss">–{Math.floor(revenue * 0.4).toLocaleString("ru")} ₽</span>
          </>
        )}
      </div>

      <div className="crm-svg-wrap" onClick={() => setActiveNode(null)}>
        <svg viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="crm-svg">
          <defs>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glowBig" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Grid dots */}
          <g opacity="0.07">
            {[60,120,180,240,300,360,420].flatMap(x =>
              [60,120,180,240,300,360,420].map(y => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#B6E942" />
              ))
            )}
          </g>

          {/* Edges */}
          {EDGES.map((edge, i) => {
            const { x1, y1, x2, y2 } = getEdgePath(edge);
            const len = Math.hypot(x2 - x1, y2 - y1);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={crmOn ? "#B6E942" : "#ff4444"}
                strokeWidth={crmOn ? "1.5" : "1"}
                strokeOpacity={crmOn ? "0.6" : "0.2"}
                strokeDasharray={crmOn ? "none" : `${len * 0.15} ${len * 0.1}`}
                className="crm-edge"
              />
            );
          })}

          {/* Particles */}
          {crmOn && particles.map(p => {
            const pos = getParticlePos(p);
            return (
              <circle
                key={p.id}
                cx={pos.x} cy={pos.y} r="4"
                fill="#F5E200"
                filter="url(#glow)"
                opacity={Math.sin(p.t * Math.PI)}
              />
            );
          })}

          {/* Chaos particles (crm off) */}
          {!crmOn && particles.map(p => {
            const pos = getParticlePos(p);
            return (
              <circle
                key={p.id}
                cx={pos.x + (Math.random() - 0.5) * 30}
                cy={pos.y + (Math.random() - 0.5) * 30}
                r="3"
                fill="#ff6b6b"
                opacity={0.4 * (1 - p.t)}
              />
            );
          })}

          {/* Center power button */}
          <circle
            cx="230" cy="230" r="52"
            fill={crmOn ? "rgba(182,233,66,0.08)" : "rgba(255,68,68,0.06)"}
            stroke={crmOn ? "rgba(182,233,66,0.25)" : "rgba(255,68,68,0.2)"}
            strokeWidth="1"
          />
          {crmOn && (
            <circle cx="230" cy="230" r="52" fill="rgba(182,233,66,0.06)" filter="url(#glowBig)" />
          )}

          {/* Power icon */}
          <path
            d="M220 208 L230 196 L240 208"
            stroke={crmOn ? "#B6E942" : "#ff6b6b"}
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
          <path
            d="M218 213 A18 18 0 1 0 242 213"
            stroke={crmOn ? "#B6E942" : "#ff6b6b"}
            strokeWidth="3" strokeLinecap="round" fill="none"
          />

          {/* Nodes */}
          {NODES.map(node => {
            const isActive = activeNode === node.id;
            const w = node.id === "analytics" || node.id === "marketing" || node.id === "manager" ? 100 : node.id === "amocrm" ? 88 : 80;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                className={`crm-node${crmOn ? " crm-node-on" : " crm-node-off"}${isActive ? " crm-node-active" : ""}`}
                onClick={e => handleNode(node, e)}
                onTouchEnd={e => handleNode(node, e as unknown as React.TouchEvent)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={-w / 2} y="-20" width={w} height="40" rx="10"
                  fill="#1a2018"
                  stroke={crmOn ? node.color : "#ff4444"}
                  strokeWidth={isActive ? "2.5" : "1.5"}
                  opacity={crmOn ? "1" : "0.5"}
                />
                {isActive && (
                  <rect x={-w / 2} y="-20" width={w} height="40" rx="10"
                    fill={node.color} opacity="0.12" />
                )}
                <text
                  x="0" y="-5" textAnchor="middle"
                  fontFamily="Oswald,sans-serif" fontSize="9" fontWeight="600"
                  fill={crmOn ? node.color : "#ff6666"} letterSpacing="0.8"
                  opacity={crmOn ? "1" : "0.5"}
                >
                  {node.icon}
                </text>
                <text
                  x="0" y="9" textAnchor="middle"
                  fontFamily="Oswald,sans-serif" fontSize="10" fontWeight="600"
                  fill={crmOn ? node.color : "#ff6666"} letterSpacing="1"
                  opacity={crmOn ? "1" : "0.5"}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="crm-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Power toggle */}
      <button
        className={`crm-toggle${crmOn ? " crm-toggle-on" : " crm-toggle-off"}`}
        onClick={toggleCrm}
        aria-label={crmOn ? "Выключить CRM" : "Включить CRM"}
      >
        <span className="crm-toggle-dot" />
        <span className="crm-toggle-label">
          {crmOn ? "amoCRM включена" : "Нажми — включи CRM"}
        </span>
      </button>

      {/* Status */}
      <div className={`crm-status${crmOn ? " crm-status-on" : " crm-status-off"}`}>
        {crmOn
          ? "Система работает — заявки фиксируются, деньги не теряются"
          : "Хаос в продажах — нажимай на узлы чтобы увидеть проблемы"
        }
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
          <CrmGame />
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
