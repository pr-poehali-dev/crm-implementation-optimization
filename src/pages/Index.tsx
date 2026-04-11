import { useState, useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("vis"); },
      { threshold: 0.12 }
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

// ─── Logo SVG ────────────────────────────────────────────────────────────────
function LogoSvg({ size = 40 }: { size?: number }) {
  const h = Math.round(size * 0.95);
  return (
    <svg width={size} height={h} viewBox="0 0 40 38" fill="none" aria-label="Настроено логотип">
      <defs>
        <linearGradient id="lgH" x1="20" y1="0" x2="20" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4E000" />
          <stop offset="40%" stopColor="#B6E942" />
          <stop offset="100%" stopColor="#7FAF2B" />
        </linearGradient>
      </defs>
      <path d="M9 13 A13 13 0 1 0 31 13" stroke="url(#lgH)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <line x1="20" y1="2" x2="20" y2="17" stroke="url(#lgH)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M15 8 L20 2 L25 8" stroke="url(#lgH)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
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
            <LogoSvg size={40} />
            <span className="brand-name">Настроено</span>
          </a>
          <nav className="hdr-nav">
            {navLinks.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          </nav>
          <div className="hdr-right">
            <a href="#pricing" className="hdr-cta">Получить консультацию</a>
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
        <a href="#pricing" className="mobile-cta" onClick={() => setOpen(false)}>Консультация</a>
      </nav>
    </>
  );
}

// ─── Power SVG (hero right) ──────────────────────────────────────────────────
function PowerScene() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.classList.add("on"), 600);
    return () => clearTimeout(t);
  }, []);

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

        {/* Grid dots */}
        <g opacity="0.12">
          {[80,160,240,320,400].map(x => [80,80,80,80,80].map((_, i) => (
            <circle key={`${x}-${i}`} cx={x} cy={[80,160,240,320,400][i] ?? 80} r="1.5" fill="#B6E942" />
          )))}
        </g>

        {/* Lines */}
        {[
          { id:"psl0", x1:230,y1:195,x2:230,y2:108, dash:90 },
          { id:"psl1", x1:268,y1:208,x2:348,y2:148, dash:100 },
          { id:"psl2", x1:268,y1:260,x2:348,y2:318, dash:100 },
          { id:"psl3", x1:230,y1:275,x2:230,y2:358, dash:85 },
          { id:"psl4", x1:192,y1:260,x2:112,y2:318, dash:100 },
          { id:"psl5", x1:192,y1:208,x2:112,y2:148, dash:100 },
        ].map(l => (
          <line key={l.id} className="ps-line" id={l.id}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#B6E942" strokeWidth="1.5"
            strokeDasharray={l.dash} strokeDashoffset={l.dash} opacity="0.6" />
        ))}

        {/* Travellers */}
        {[
          { path:"M230,195 L230,108", dur:"2s", begin:"3.5s" },
          { path:"M268,208 L348,148", dur:"2s", begin:"4s" },
          { path:"M268,260 L348,318", dur:"2.2s", begin:"4.3s" },
          { path:"M230,275 L230,358", dur:"2s", begin:"3.8s" },
          { path:"M192,260 L112,318", dur:"2.1s", begin:"4.5s" },
          { path:"M192,208 L112,148", dur:"1.9s", begin:"4.2s" },
        ].map((t, i) => (
          <circle key={i} className="ps-traveller" r="3" fill="#F5E200" filter="url(#pgGlow)" opacity="0">
            <animateMotion dur={t.dur} repeatCount="indefinite" begin={t.begin} path={t.path} />
          </circle>
        ))}

        {/* Nodes */}
        {[
          { id:"psn0", tx:230, ty:88, label:"ЛИДЫ", stroke:"#B6E942", w:76, fill:"#B6E942" },
          { id:"psn1", tx:370, ty:135, label:"amoCRM", stroke:"#B6E942", w:88, fill:"#B6E942" },
          { id:"psn2", tx:370, ty:332, label:"МЕНЕДЖЕР", stroke:"#D4E000", w:100, fill:"#D4E000" },
          { id:"psn3", tx:230, ty:376, label:"СДЕЛКА", stroke:"#7FAF2B", w:80, fill:"#7FAF2B" },
          { id:"psn4", tx:90, ty:332, label:"МАРКЕТИНГ", stroke:"#B6E942", w:100, fill:"#B6E942" },
          { id:"psn5", tx:90, ty:135, label:"АНАЛИТИКА", stroke:"#D4E000", w:100, fill:"#D4E000" },
        ].map(n => (
          <g key={n.id} className="ps-node" id={n.id} opacity="0" transform={`translate(${n.tx},${n.ty})`}>
            <rect x={-n.w/2} y="-18" width={n.w} height="36" rx="8" fill="#1E2420" stroke={n.stroke} strokeWidth="1.2" opacity="0.9" />
            <rect x={-n.w/2} y="-18" width={n.w} height="36" rx="8" fill={n.fill} opacity="0.06" />
            <text x="0" y="5" textAnchor="middle" fontFamily="Oswald,sans-serif" fontSize="11" fontWeight="600" fill={n.fill} letterSpacing="1">{n.label}</text>
          </g>
        ))}

        {/* Auras */}
        <circle className="ps-aura" cx="230" cy="230" r="85" stroke="#B6E942" strokeWidth="0.5" opacity="0" />
        <circle className="ps-aura2" cx="230" cy="230" r="105" stroke="#B6E942" strokeWidth="0.3" opacity="0" />

        {/* Center */}
        <circle cx="230" cy="230" r="68" fill="#1a1e1b" stroke="rgba(182,233,66,0.08)" strokeWidth="1" />
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

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
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
              <a href="#pricing" className="btn-lime">→ Получить консультацию</a>
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
    { ico: "📉", title: "Лиды есть — продажи не растут", text: "Заявки приходят, деньги на рекламу уходят, а где деньги теряются — непонятно." },
    { ico: "⚡", title: "Маркетинг и продажи — вечные споры", text: "Маркетологи дают трафик. Менеджеры говорят, что трафик не целевой. Крайних нет, проблема остаётся." },
    { ico: "📋", title: "CRM есть, но не работает", text: "Систему завели, деньги заплатили — а менеджеры всё равно ведут клиентов в голове или в блокноте." },
  ];
  return (
    <section className="sec sec-white" id="qual">
      <div className="wrap">
        <R><div className="sec-eye">Узнаёте себя?</div></R>
        <R delay={100}><h2 className="h2">Почему продажи не растут</h2></R>
        <div className="q-grid">
          {cards.map((c, i) => (
            <R key={c.title} delay={100 + i * 150}>
              <div className="q-card">
                <span className="q-ico">{c.ico}</span>
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
    { mark: "🚫", title: "Нет пачки отзывов", text: "Отзывы пишут в двух случаях: когда очень разозлились или когда попросили за деньги. Ни то ни другое нам не подходит." },
    { mark: "📞", title: "Вместо отзывов — живые контакты", text: "Мы дадим телефоны клиентов. Можно позвонить, поговорить, спросить всё что угодно. Это честнее любого скриншота с пятью звёздами." },
    { mark: "📊", title: "Не обещаем рост x2", text: "Результат зависит от вашей команды, продукта, рынка — и от нас тоже. Мы говорим об этом заранее, а не после." },
    { mark: "🎯", title: "Цена за погружение, не за скорость", text: "Мы не делаем 10 проектов в месяц. Каждый проект — отдельная история, в которую нужно вникнуть. Поэтому цена такая, какая есть." },
  ];
  return (
    <section className="sec sec-white" id="honesty">
      <div className="wrap">
        <R><div className="sec-eye">Честно о себе</div></R>
        <R delay={100}><h2 className="h2">Скажем прямо — у нас нет того,<br />что есть у всех</h2></R>
        <div className="hon-grid">
          {cards.map((c, i) => (
            <R key={c.title} delay={100 + i * 100}>
              <div className="hon-card">
                <span className="hon-mark">{c.mark}</span>
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
function Pricing() {
  const rows = [
    { what: "Базовая настройка: воронки, поля, права, сайт, почта", price: "от 40 000 ₽" },
    { what: "С автоматизациями, мессенджерами, телефонией", price: "от 50 000 ₽" },
    { what: "Комплексное внедрение под ключ", price: "от 100 000 ₽" },
  ];
  return (
    <section className="sec sec-pricing" id="pricing">
      <div className="wrap">
        <R><div className="sec-eye">Стоимость</div></R>
        <R delay={100}><h2 className="h2">Что и сколько стоит</h2></R>
        <R delay={200}><p className="sec-lead">Настройка — разово</p></R>
        <R delay={200}>
          <table className="pr-table">
            <thead>
              <tr>
                <th>Что делаем</th>
                <th>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.what}>
                  <td>{r.what}</td>
                  <td><span className="pr-price">{r.price}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </R>
        <R delay={350}>
          <div className="pr-note">
            <p>После: заявки не теряются, менеджеры работают по алгоритму, руководитель видит реальные цифры — не то, что ему говорят.</p>
          </div>
        </R>
        <R delay={350}>
          <div className="pr-cta">
            <a href="mailto:neurocontent.wave@gmail.com" className="btn-lime">→ Получить консультацию</a>
            <a href="mailto:neurocontent.wave@gmail.com" className="btn-ghost">Написать нам</a>
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
          <LogoSvg size={32} />
          <span className="ftr-name">Настроено</span>
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
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Qual />
        <Challenge />
        <Team />
        <Process />
        <Honesty />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
