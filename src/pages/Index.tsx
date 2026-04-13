import { useState, useEffect, useRef } from "react";
// useState used in Header

function useReveal() {
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

function R({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`r${className ? " " + className : ""}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

const AMO_FORM_URL = "https://forms.amocrm.ru/rcxdwxd";

function openConsult() {
  window.open(AMO_FORM_URL, "_blank", "noopener,noreferrer");
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ height = 44 }: { height?: number }) {
  return (
    <img
      src="https://cdn.poehali.dev/projects/8c1b8994-87b1-4169-a832-cc876fc4eb40/bucket/31238491-e26c-466e-a7bb-506e730ecdc8.png"
      alt="Настроено"
      style={{ height, width: "auto", display: "block", objectFit: "contain", mixBlendMode: "lighten" }}
    />
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ onConsult }: { onConsult: () => void }) {
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
            <Logo height={38} />
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

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
function IcoTrend() {
  return (
    <svg className="q-svg-ico" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.08)" />
      <polyline points="8,34 18,22 26,28 40,14" stroke="#B6E942" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="32,14 40,14 40,22" stroke="#B6E942" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="38" x2="40" y2="38" stroke="rgba(182,233,66,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="40" cy="14" r="3" fill="#B6E942" />
      <circle cx="18" cy="22" r="2.5" fill="#D4E000" opacity="0.7" />
      <circle cx="26" cy="28" r="2.5" fill="#D4E000" opacity="0.7" />
      <circle cx="8" cy="34" r="2.5" fill="#7FAF2B" opacity="0.7" />
    </svg>
  );
}
function IcoConflict() {
  return (
    <svg className="q-svg-ico" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.08)" />
      <circle cx="15" cy="20" r="6" stroke="#B6E942" strokeWidth="2" fill="none" />
      <circle cx="33" cy="20" r="6" stroke="#D4E000" strokeWidth="2" fill="none" />
      <path d="M9 32 C9 28 12 26 15 26" stroke="#B6E942" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M39 32 C39 28 36 26 33 26" stroke="#D4E000" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="24" y1="14" x2="24" y2="34" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M21 24 L24 27 L27 24" stroke="#7FAF2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function IcoCrm() {
  return (
    <svg className="q-svg-ico" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.08)" />
      <rect x="10" y="12" width="28" height="24" rx="4" stroke="#B6E942" strokeWidth="2" fill="none" />
      <line x1="10" y1="18" x2="38" y2="18" stroke="#B6E942" strokeWidth="1.5" opacity="0.5" />
      <rect x="15" y="22" width="8" height="2.5" rx="1" fill="rgba(182,233,66,0.4)" />
      <rect x="15" y="27" width="14" height="2.5" rx="1" fill="rgba(182,233,66,0.25)" />
      <rect x="15" y="32" width="5" height="2.5" rx="1" fill="rgba(182,233,66,0.15)" />
      <circle cx="35" cy="30" r="4" stroke="#D4E000" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <line x1="35" y1="27" x2="35" y2="30" stroke="#D4E000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="30" x2="37" y2="32" stroke="#D4E000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Honesty icons
function IcoNoReviews() {
  return (
    <svg className="hon-svg-ico" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.06)" />
      <path d="M14 18 L34 18 L34 34 L24 30 L14 34 Z" stroke="#B6E942" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <line x1="16" y1="16" x2="32" y2="36" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="16" x2="16" y2="36" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IcoPhone() {
  return (
    <svg className="hon-svg-ico" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.06)" />
      <path d="M16 14 C16 14 18 14 19 16 L21 20 C21.5 21.5 21 22.5 20 23.5 C19 24.5 21 27 23.5 29.5 C26 32 28.5 34 29.5 33 C30.5 32 31.5 31.5 33 32 L37 34 C39 35 39 37 39 37" stroke="#B6E942" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="33" cy="17" r="5" stroke="#D4E000" strokeWidth="1.5" fill="none" />
      <line x1="33" y1="15" x2="33" y2="17" stroke="#D4E000" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="33" cy="18.5" r="0.8" fill="#D4E000" />
    </svg>
  );
}
function IcoNoPromise() {
  return (
    <svg className="hon-svg-ico" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.06)" />
      <polyline points="10,34 17,25 23,30 38,13" stroke="#B6E942" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="36" y1="13" x2="42" y2="19" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="13" x2="36" y2="19" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IcoTarget() {
  return (
    <svg className="hon-svg-ico" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="rgba(182,233,66,0.06)" />
      <circle cx="24" cy="24" r="13" stroke="rgba(182,233,66,0.3)" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="8" stroke="rgba(182,233,66,0.6)" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="3.5" fill="#B6E942" />
      <line x1="24" y1="8" x2="24" y2="11" stroke="#B6E942" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="37" x2="24" y2="40" stroke="#B6E942" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="24" x2="11" y2="24" stroke="#B6E942" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="24" x2="40" y2="24" stroke="#B6E942" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ onConsult }: { onConsult: () => void }) {
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
              <button onClick={onConsult} className="btn-lime" aria-label="Получить бесплатную консультацию по внедрению amoCRM">→ Получить консультацию</button>
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
function Ticker() {
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

// ─── Qual ─────────────────────────────────────────────────────────────────────
function Qual() {
  const cards = [
    { ico: <IcoTrend />, title: "Лиды есть — продажи не растут", text: "Заявки приходят, деньги на рекламу уходят, а где деньги теряются — непонятно." },
    { ico: <IcoConflict />, title: "Маркетинг и продажи — вечные споры", text: "Маркетологи дают трафик. Менеджеры говорят, что трафик не целевой. Крайних нет, проблема остаётся." },
    { ico: <IcoCrm />, title: "CRM есть, но не работает", text: "Систему завели, деньги заплатили — а менеджеры всё равно ведут клиентов в голове или в блокноте." },
  ];
  return (
    <section className="sec sec-white" id="qual">
      <div className="wrap">
        <R><div className="sec-eye">Узнаёте себя?</div></R>
        <R delay={100}><h2 className="h2">Почему продажи не растут</h2></R>
        <div className="q-grid">
          {cards.map((c, i) => (
            <R key={i} delay={100 + i * 150}>
              <div className="q-card">
                {c.ico}
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Challenge ────────────────────────────────────────────────────────────────
function Challenge() {
  return (
    <section className="sec sec-dark" id="challenge">
      <div className="wrap">
        <div className="dark-grid">
          <div className="dark-txt">
            <R><div className="sec-eye">Почему так происходит</div></R>
            <R delay={100}><h2 className="h2">CRM не виновата.<br />Дело не в программе.</h2></R>
            <R delay={200}>
              <div className="dark-quote">
                <p>Маркетолог в команде видит, где теряется клиент. Интегратор настраивает так, чтобы этого не повторялось.</p>
              </div>
            </R>
          </div>
          <R delay={200}>
            <div className="dark-txt">
              <p>Большинство подрядчиков приходят, настраивают воронку, добавляют поля и уходят. Формально — сделали. По факту — менеджеры не понимают зачем, руководитель не видит картины, заявки всё равно теряются.</p>
              <p>Мы начинаем с другого вопроса: почему у вас сейчас так, и что нужно изменить, чтобы стало по-другому. Потому что CRM — это слепок вашего процесса продаж. Если процесс не выстроен, CRM просто зафиксирует это.</p>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function Team() {
  const cards = [
    { big: "15", title: "лет в продажах и маркетинге", text: "Мы видели, как строятся и ломаются отделы продаж. Знаем, где обычно всё идёт не так." },
    { big: "1", title: "Маркетинг и интеграция — одна команда", text: "Мы одновременно думаем о рекламе, пути клиента и о том, как всё это должно работать внутри CRM. Это меняет результат." },
    { big: "≠10", title: "Не берём всё подряд", text: "Проектов немного, потому что в каждый нужно реально вникнуть. Это сознательный выбор." },
    { big: "∞", title: "Мы всегда рядом", text: "После запуска остаёмся рядом. CRM нужно дорабатывать под реальную жизнь, а не просто запустить и забыть." },
  ];
  return (
    <section className="sec sec-surface" id="team">
      <div className="wrap">
        <R><div className="sec-eye">Кто мы</div></R>
        <R delay={100}><h2 className="h2">Небольшая команда.<br />Без громких обещаний.</h2></R>
        <R delay={200}><p className="sec-lead">Нас немного. Маркетологи и интеграторы — одна команда, которая работает над каждым проектом вместе. Не передают задачи друг другу по цепочке, а думают над ней сразу с двух сторон. На рынке CRM это встречается редко.</p></R>
        <div className="team-grid">
          {cards.map((c, i) => (
            <R key={c.title} delay={100 + i * 100}>
              <div className="t-card">
                <div className="t-big">{c.big}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: "01", title: "Сначала разбираемся", text: "Смотрим, как устроены продажи, откуда приходят заявки, где они пропадают и почему менеджеры делают так, а не иначе." },
    { n: "02", title: "Проектируем под вас", text: "Описываем, как должна работать система: воронка, автоматизации, интеграции. Не по шаблону, а под вашу логику." },
    { n: "03", title: "Настраиваем и запускаем", text: "Внедряем amoCRM, подключаем всё, что нужно, обучаем команду — чтобы менеджеры понимали зачем, а не просто нажимали кнопки." },
    { n: "04", title: "Остаёмся рядом", text: "Следим, чтобы ничего не сломалось, данные были чистые, заявки не терялись. Берём на себя общение с поддержкой сторонних сервисов вместо вас." },
  ];
  return (
    <section className="sec sec-process" id="process">
      <div className="wrap">
        <R><div className="sec-eye">Как мы работаем</div></R>
        <R delay={100}><h2 className="h2">Как это устроено</h2></R>
        <div className="pr-grid">
          {steps.map((s, i) => (
            <R key={s.n} delay={100 + i * 100}>
              <div className="p-card">
                <div className="p-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Honesty ──────────────────────────────────────────────────────────────────
function Honesty() {
  const cards = [
    { ico: <IcoNoReviews />, title: "Нет пачки отзывов", text: "Отзывы пишут в двух случаях: когда очень разозлились или когда попросили за деньги. Ни то ни другое нам не подходит." },
    { ico: <IcoPhone />, title: "Вместо отзывов — живые контакты", text: "Мы дадим телефоны клиентов. Можно позвонить, поговорить, спросить всё что угодно. Это честнее любого скриншота с пятью звёздами." },
    { ico: <IcoNoPromise />, title: "Не обещаем рост x2", text: "Результат зависит от вашей команды, продукта, рынка — и от нас тоже. Мы говорим об этом заранее, а не после." },
    { ico: <IcoTarget />, title: "Цена за погружение, не за скорость", text: "Мы не делаем 10 проектов в месяц. Каждый проект — отдельная история, в которую нужно вникнуть. Поэтому цена такая, какая есть." },
  ];
  return (
    <section className="sec sec-white" id="honesty">
      <div className="wrap">
        <R><div className="sec-eye">Честно о себе</div></R>
        <R delay={100}><h2 className="h2">Скажем прямо — у нас нет того,<br />что есть у всех</h2></R>
        <div className="hon-grid">
          {cards.map((c, i) => (
            <R key={i} delay={100 + i * 100}>
              <div className="hon-card">
                {c.ico}
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing({ onConsult }: { onConsult: () => void }) {
  const plans = [
    {
      tag: "Базовая",
      title: "Базовая настройка",
      desc: "Воронки, поля, права, подключение сайта и почты. Всё для старта.",
      price: "от 40 000 ₽",
    },
    {
      tag: "Стандарт",
      title: "С автоматизациями",
      desc: "Автоматизации, мессенджеры, телефония, интеграции. Система начинает работать сама.",
      price: "от 50 000 ₽",
    },
    {
      tag: "Под ключ",
      title: "Комплексное внедрение",
      desc: "Полный аудит процессов, проектирование, настройка, обучение команды, поддержка после запуска.",
      price: "от 100 000 ₽",
    },
  ];
  return (
    <section className="sec sec-pricing" id="pricing">
      <div className="wrap">
        <R><div className="sec-eye">Услуги и цены</div></R>
        <R delay={100}><h2 className="h2">Что и сколько стоит</h2></R>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <R key={p.tag} delay={100 + i * 120}>
              <div className="pr-card">
                <div className="pr-card-tag">{p.tag}</div>
                <h3 className="pr-card-title">{p.title}</h3>
                <p className="pr-card-desc">{p.desc}</p>
                <div className="pr-card-price">{p.price}</div>
                <button onClick={onConsult} className="pr-card-btn" aria-label={`Обсудить тариф: ${p.title}`}>Обсудить</button>
              </div>
            </R>
          ))}
        </div>
        <R delay={400}>
          <div className="pr-note">
            <p>После: заявки не теряются, менеджеры работают по алгоритму, руководитель видит реальные цифры — не то, что ему говорят.</p>
          </div>
        </R>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="ftr">
        <div className="ftr-brand">
          <Logo height={30} />
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <>
      <Header onConsult={openConsult} />
      <main>
        <Hero onConsult={openConsult} />
        <Ticker />
        <Qual />
        <Challenge />
        <Team />
        <Process />
        <Honesty />
        <Pricing onConsult={openConsult} />
      </main>
      <Footer />
    </>
  );
}