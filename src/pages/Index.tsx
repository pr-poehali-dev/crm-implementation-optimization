import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Scroll reveal ─────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="n-header" style={{ boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,.06)" : "none" }}>
      <div className="n-wrap n-header-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px", gap: "1rem" }}>
        {/* Brand */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--clr-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="Settings2" size={20} style={{ color: "#fff" }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.02em", color: "var(--clr-text)" }}>Настроено</span>
        </a>
        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="hidden-mobile">
          {[["О нас","#approach"],["Услуги","#services"],["Клиентам","#fit"],["Процесс","#steps"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--clr-muted)", transition: "color 200ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--clr-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--clr-muted)")}
            >{l}</a>
          ))}
        </nav>
        <a className="n-btn n-btn-primary" href="#cta" style={{ height: 44, padding: "0 1.25rem", fontSize: "0.9375rem" }}>
          Обсудить проект
        </a>
      </div>
    </header>
  );
}

// ─── Hero Visual ─────────────────────────────────────────────────────────────
function HeroVisual() {
  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--clr-border)",
    borderRadius: 20,
    padding: "1.125rem 1.25rem",
    boxShadow: "0 2px 12px rgba(0,0,0,.05)",
    position: "relative",
  };
  const label: React.CSSProperties = {
    fontSize: "0.6875rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--clr-faint)",
    marginBottom: "0.75rem",
  };
  const iconWrap = (color: string, bg: string): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: 9,
    background: bg, color, display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  });

  return (
    <div style={{ position: "relative", padding: "0.5rem" }}>
      {/* Glow behind composition */}
      <div style={{ position: "absolute", top: "20%", right: "0", width: 260, height: 260, borderRadius: "50%", background: "var(--clr-glow-blue)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "var(--clr-glow-teal)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", zIndex: 1 }}>

        {/* Row 1: Sources → amoCRM */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.625rem", alignItems: "center" }}>
          {/* Sources */}
          <div style={card}>
            <div style={label}>Источники лидов</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {[
                { icon: "Globe", text: "Сайт / Форма", color: "var(--clr-blue)", bg: "var(--clr-blue-light)" },
                { icon: "Send", text: "Telegram", color: "var(--clr-teal)", bg: "var(--clr-teal-light)" },
                { icon: "Megaphone", text: "Реклама", color: "var(--clr-blue)", bg: "var(--clr-blue-light)" },
              ].map(s => (
                <div key={s.text} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={iconWrap(s.color, s.bg)}>
                    <Icon name={s.icon} size={14} fallback="Circle" />
                  </div>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--clr-text)" }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <div style={{ width: 28, height: 1.5, background: "linear-gradient(90deg, var(--clr-border), var(--clr-blue))", borderRadius: 1 }} />
            <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid var(--clr-blue)" }} />
          </div>

          {/* amoCRM central */}
          <div style={{ ...card, borderColor: "rgba(29,78,216,0.25)", boxShadow: "0 0 0 3px rgba(29,78,216,0.07), 0 2px 12px rgba(0,0,0,.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--clr-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="Settings2" size={14} style={{ color: "#fff" }} />
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--clr-text)" }}>amoCRM</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {["Новая заявка", "Квалификация", "Переговоры", "Сделка"].map((stage, i) => (
                <div key={stage} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "var(--clr-teal)" : i === 3 ? "#22C55E" : "var(--clr-blue)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", color: i === 3 ? "#22C55E" : "var(--clr-muted)", fontWeight: i === 3 ? 600 : 400 }}>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Marketing+Sales → Control */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.625rem", alignItems: "center" }}>
          {/* Marketing & Sales */}
          <div style={card}>
            <div style={label}>Связка отделов</div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div style={{ flex: 1, background: "var(--clr-blue-light)", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 12, padding: "0.625rem 0.75rem", textAlign: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--clr-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.375rem" }}>
                  <Icon name="Megaphone" size={14} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--clr-blue)" }}>Маркетинг</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", color: "var(--clr-faint)", fontSize: "1rem", fontWeight: 700 }}>↔</div>
              <div style={{ flex: 1, background: "var(--clr-teal-light)", border: "1px solid rgba(20,184,166,0.15)", borderRadius: 12, padding: "0.625rem 0.75rem", textAlign: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--clr-teal)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.375rem" }}>
                  <Icon name="Users" size={14} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--clr-teal)" }}>Продажи</span>
              </div>
            </div>
          </div>

          {/* Arrow down-right */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <div style={{ width: 28, height: 1.5, background: "linear-gradient(90deg, var(--clr-border), var(--clr-teal))", borderRadius: 1 }} />
            <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid var(--clr-teal)" }} />
          </div>

          {/* Control */}
          <div style={card}>
            <div style={label}>Контроль</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { metric: "Лидов сегодня", val: "12", color: "var(--clr-blue)" },
                { metric: "Конверсия", val: "31%", color: "var(--clr-teal)" },
                { metric: "В работе", val: "38", color: "var(--clr-text)" },
              ].map(m => (
                <div key={m.metric} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--clr-faint)" }}>{m.metric}</span>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: m.color }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Result */}
        <div style={{ ...card, background: "linear-gradient(135deg, var(--clr-blue-light), var(--clr-teal-light))", borderColor: "rgba(29,78,216,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#fff", border: "1px solid var(--clr-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="TrendingUp" size={16} style={{ color: "var(--clr-blue)" }} />
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--clr-text)" }}>Все заявки в одной системе. Прозрачно.</span>
            </div>
            <span className="n-tag n-tag-teal" style={{ fontSize: "0.6875rem" }}>Система работает</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Hero Visual Mobile ──────────────────────────────────────────────────────
function HeroVisualMobile() {
  return (
    <div style={{ display: "none" }} className="hero-visual-mobile">
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {/* Flow strip */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fff", border: "1px solid var(--clr-border)", borderRadius: 16, padding: "1rem 1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
          {[
            { icon: "GitBranch", label: "Лиды", color: "var(--clr-teal)" },
            { icon: "Settings2", label: "CRM", color: "var(--clr-blue)" },
            { icon: "Users", label: "Продажи", color: "var(--clr-blue)" },
            { icon: "CheckCircle2", label: "Сделка", color: "#22C55E" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.375rem", flex: 1, justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--clr-bg)", border: "1px solid var(--clr-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={s.icon} size={15} style={{ color: s.color }} fallback="Circle" />
                </div>
                <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--clr-faint)", textAlign: "center" }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <span style={{ color: "var(--clr-border)", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0, marginBottom: "1rem" }}>→</span>
              )}
            </div>
          ))}
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem" }}>
          {[
            { label: "Лидов сегодня", val: "12", color: "var(--clr-blue)" },
            { label: "Конверсия", val: "31%", color: "var(--clr-teal)" },
            { label: "В работе", val: "38", color: "var(--clr-text)" },
          ].map(m => (
            <div key={m.label} style={{ background: "#fff", border: "1px solid var(--clr-border)", borderRadius: 12, padding: "0.75rem", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: m.color }}>{m.val}</div>
              <div style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--clr-faint)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useReveal();
  return (
    <section id="hero" className="n-section" style={{ paddingTop: "clamp(4rem, 8vw, 7rem)", background: "var(--clr-bg)" }}>
      {/* Glows */}
      <div className="n-glow n-glow-blue-blob" style={{ top: "-100px", right: "-100px", opacity: 0.7 }} />
      <div className="n-glow n-glow-teal-blob" style={{ bottom: "-80px", left: "-80px", opacity: 0.6 }} />

      <div className="n-wrap">
        <div className="n-split-hero n-reveal" ref={ref}>
          {/* Left */}
          <div>
            <div className="n-label">Интеграция amoCRM с погружением в бизнес</div>
            <h1 className="n-h1" style={{ marginBottom: "1.5rem" }}>
              Внедряем. Настраиваем. Докручиваем{" "}
              <span style={{ color: "var(--clr-blue)" }}>до результата.</span>
            </h1>
            <p className="n-lead" style={{ maxWidth: "54ch", marginBottom: "2.25rem" }}>
              Связываем маркетинг с продажами в одну рабочую систему.
            </p>
            <div className="n-hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
              <a className="n-btn n-btn-primary" href="#cta">Получить консультацию</a>
              <a className="n-btn n-btn-secondary" href="#approach">Как мы работаем</a>
            </div>
            <div className="n-chips-row" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { icon: "BadgeCheck", text: "Сертифицированные партнёры amoCRM" },
                { icon: "Settings", text: "Настройка под процессы, не по шаблону" },
                { icon: "HeartHandshake", text: "Поддержка после запуска" },
              ].map(c => (
                <div key={c.text} className="n-chip">
                  <Icon name={c.icon} size={15} style={{ color: "var(--clr-blue)", flexShrink: 0 }} fallback="Check" />
                  <span style={{ fontSize: "0.8125rem" }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — System composition (desktop) */}
          <div className="hero-visual-desktop">
            <HeroVisual />
          </div>
          {/* Mobile simplified visual */}
          <HeroVisualMobile />
        </div>
      </div>
    </section>
  );
}

// ─── Approach ────────────────────────────────────────────────────────────────
function Approach() {
  const ref = useReveal();
  return (
    <section id="approach" className="n-section" style={{ background: "#fff", borderTop: "1px solid var(--clr-border)" }}>
      <div className="n-wrap">
        <div className="n-section-head n-reveal" ref={ref}>
          <div>
            <div className="n-label">Подход</div>
            <h2 className="n-h2">Мы не просто внедряем amoCRM — мы находим слабые места и улучшаем систему, чтобы она реально помогала продажам.</h2>
          </div>
          <div>
            <p className="n-muted">
              Для нас CRM — это не просто карточки сделок, статусы и автоматизации. Это инструмент, который должен помогать бизнесу быстрее обрабатывать лиды, не терять клиентов, видеть реальные причины просадки продаж и выстраивать работу команды так, чтобы маркетинг и отдел продаж наконец начали работать в одной связке.
            </p>
          </div>
        </div>

        {/* Flow diagram */}
        <RevealWrapper>
          <div className="n-flow">
            {[
              { icon: "GitBranch", label: "Лиды", desc: "Из всех источников" },
              { icon: "Settings2", label: "CRM", desc: "Единая логика и контроль" },
              { icon: "Users", label: "Отдел продаж", desc: "Задачи, касания, этапы" },
              { icon: "CheckCircle2", label: "Сделка", desc: "Прозрачный результат" },
            ].map((s, i, arr) => (
              <div key={s.label} className="n-flow-step">
                <div className="n-flow-icon">
                  <Icon name={s.icon} size={18} fallback="Circle" />
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--clr-text)", marginBottom: "0.2rem" }}>{s.label}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--clr-faint)" }}>{s.desc}</div>
                {i < arr.length - 1 && <div className="n-flow-arrow">→</div>}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Helper wrapper ───────────────────────────────────────────────────────────
function RevealWrapper({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal();
  return (
    <div className="n-reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Problems ────────────────────────────────────────────────────────────────
function Problems() {
  const problems = [
    { icon: "GitBranch", title: "Лиды из разных каналов", desc: "Обращения распадаются между формами, мессенджерами, звонками — и теряются по пути." },
    { icon: "Shuffle", title: "Неровная обработка", desc: "Менеджеры отвечают с разной скоростью и ведут клиентов без единой логики." },
    { icon: "EyeOff", title: "Нет прозрачности", desc: "Сложно понять, на каком этапе сделка тормозится и что влияет на конверсию." },
    { icon: "MessageSquareWarning", title: "Споры между отделами", desc: "Маркетинг и продажи спорят о качестве заявок вместо совместной работы на результат." },
    { icon: "TrendingDown", title: "Потеря денег", desc: "Руководитель видит только последствия, но не видит, где именно уходит прибыль." },
    { icon: "Unlink", title: "Нет единого механизма", desc: "Реклама, лиды и отдел продаж существуют отдельно и не дают системного эффекта." },
  ];
  return (
    <section id="problems" className="n-section" style={{ background: "var(--clr-bg)" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 3.5rem" }}>
            <div className="n-label" style={{ justifyContent: "center" }}>Почему продажи не растут</div>
            <h2 className="n-h2">Симптомы, которые узнают большинство наших клиентов</h2>
          </div>
        </RevealWrapper>
        <div className="n-grid-3">
          {problems.map((p, i) => (
            <RevealWrapper key={p.title} delay={i * 60}>
              <article className="n-card" style={{ height: "100%" }}>
                <div className="n-card-icon">
                  <Icon name={p.icon} size={20} fallback="AlertCircle" />
                </div>
                <h3 className="n-h3">{p.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--clr-muted)", lineHeight: 1.6 }}>{p.desc}</p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { n: "01", title: "Анализ продаж", desc: "Разбираем текущий процесс и точки потери эффективности." },
    { n: "02", title: "Поиск слабых мест", desc: "Находим, где теряются лиды, время и управляемость." },
    { n: "03", title: "Воронка под бизнес", desc: "Проектируем логику этапов под ваш путь клиента." },
    { n: "04", title: "Настройка amoCRM", desc: "Собираем систему под реальные задачи команды." },
    { n: "05", title: "Интеграции", desc: "Подключаем каналы, формы, мессенджеры и телефонию." },
    { n: "06", title: "Автоматизация", desc: "Убираем повторяющиеся действия, ускоряем обработку." },
    { n: "07", title: "Контроль сделок", desc: "Настраиваем понятную логику по лидам и сделкам." },
    { n: "08", title: "Запуск в работу", desc: "Помогаем команде встроить CRM в ежедневный процесс." },
  ];
  return (
    <section id="services" className="n-section" style={{ background: "#fff", borderTop: "1px solid var(--clr-border)" }}>
      <div className="n-wrap">
        <div className="n-section-head">
          <RevealWrapper>
            <div>
              <div className="n-label">Что мы делаем</div>
              <h2 className="n-h2">Настраиваем amoCRM под реальный процесс вашего бизнеса</h2>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <p className="n-muted" style={{ marginTop: "0.5rem" }}>
              Сначала разбираемся в специфике вашей компании, логике продаж, источниках лидов и слабых местах воронки. И только потом настраиваем amoCRM так, чтобы она действительно решала задачи бизнеса.
            </p>
          </RevealWrapper>
        </div>
        <div className="n-grid-4">
          {services.map((s, i) => (
            <RevealWrapper key={s.n} delay={i * 50}>
              <article className="n-card" style={{ height: "100%" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--clr-blue)", letterSpacing: "0.06em", marginBottom: "0.75rem", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
                <h3 className="n-h3">{s.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--clr-muted)", lineHeight: 1.55 }}>{s.desc}</p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Difference ───────────────────────────────────────────────────────────────
function Difference() {
  const cards = [
    { icon: "Search", title: "Погружение в бизнес", desc: "Не работаем поверхностно — вникаем в сферу, процессы и особенности именно вашей компании.", teal: false },
    { icon: "Link2", title: "Связка маркетинга и продаж", desc: "Смотрим не только на CRM, но и на то, как лид превращается в сделку и где ломается путь клиента.", teal: true },
    { icon: "RefreshCw", title: "Поддержка с улучшениями", desc: "После внедрения не исчезаем — продолжаем предлагать улучшения, которые усиливают систему и результат.", teal: false },
  ];
  return (
    <section id="difference" className="n-section" style={{ background: "var(--clr-bg)" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 3.5rem" }}>
            <div className="n-label" style={{ justifyContent: "center" }}>Отстройка</div>
            <h2 className="n-h2">Чем мы отличаемся от типового внедрения CRM</h2>
          </div>
        </RevealWrapper>
        <div className="n-grid-3">
          {cards.map((c, i) => (
            <RevealWrapper key={c.title} delay={i * 80}>
              <article className="n-card" style={{ height: "100%", position: "relative", overflow: "hidden" }}>
                {c.teal && (
                  <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "var(--clr-glow-teal)", filter: "blur(40px)", pointerEvents: "none" }} />
                )}
                <div className={`n-card-icon ${c.teal ? "teal" : ""}`}>
                  <Icon name={c.icon} size={20} fallback="Star" />
                </div>
                <h3 className="n-h3" style={{ fontSize: "1.125rem", marginBottom: "0.6rem" }}>{c.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--clr-muted)", lineHeight: 1.6 }}>{c.desc}</p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  const benefits = [
    { icon: "Inbox", text: "Все обращения в одной системе" },
    { icon: "Filter", text: "Понятная воронка продаж" },
    { icon: "Eye", text: "Контроль по каждому лиду" },
    { icon: "Zap", text: "Более быстрая обработка заявок" },
    { icon: "Bot", text: "Меньше ручной рутины" },
    { icon: "BarChart2", text: "Прозрачность между отделами" },
    { icon: "Target", text: "Видны точки потерь" },
    { icon: "Rocket", text: "Система растёт вместе с бизнесом" },
  ];
  return (
    <section id="benefits" className="n-section" style={{ background: "#fff", borderTop: "1px solid var(--clr-border)" }}>
      <div className="n-wrap">
        <div className="n-split" style={{ alignItems: "center" }}>
          <RevealWrapper>
            <div>
              <div className="n-label">Результат</div>
              <h2 className="n-h2" style={{ marginBottom: "1.25rem" }}>Что меняется после внедрения</h2>
              <p className="n-muted" style={{ marginBottom: "2rem" }}>
                Когда amoCRM настроена правильно, бизнес получает не просто программу — а рабочую систему управления лидами и продажами.
              </p>
              <a className="n-btn n-btn-primary" href="#cta">Обсудить внедрение</a>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {benefits.map(b => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.75rem 1rem", background: "var(--clr-bg)", border: "1px solid var(--clr-border)", borderRadius: "12px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--clr-blue-light)", color: "var(--clr-blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={b.icon} size={16} fallback="Check" />
                  </div>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--clr-text)" }}>{b.text}</span>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

// ─── Fit ──────────────────────────────────────────────────────────────────────
function Fit() {
  const items = [
    { icon: "TrendingUp", title: "Бизнесу с потоком лидов", desc: "Есть заявки, но нет системы их обработки" },
    { icon: "Building2", title: "Разрозненным отделам", desc: "Маркетинг и продажи работают отдельно" },
    { icon: "Layers", title: "Руководителям", desc: "Нужна прозрачность и контроль в реальном времени" },
    { icon: "Users2", title: "Отделам продаж", desc: "Нужна удобная, понятная CRM-система" },
    { icon: "ArrowUpRight", title: "Тем, кто хочет расти", desc: "CRM как инструмент масштабирования" },
  ];
  return (
    <section id="fit" className="n-section" style={{ background: "var(--clr-bg)" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3.5rem" }}>
            <div className="n-label" style={{ justifyContent: "center" }}>Для кого</div>
            <h2 className="n-h2">Кому подойдёт наш подход</h2>
          </div>
        </RevealWrapper>
        <div className="n-grid-5">
          {items.map((item, i) => (
            <RevealWrapper key={item.title} delay={i * 60}>
              <article className="n-card" style={{ textAlign: "center", height: "100%" }}>
                <div className="n-card-icon" style={{ margin: "0 auto 1rem" }}>
                  <Icon name={item.icon} size={20} fallback="CheckCircle" />
                </div>
                <h3 className="n-h3" style={{ marginBottom: "0.35rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--clr-muted)" }}>{item.desc}</p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Niches ──────────────────────────────────────────────────────────────────
function Niches() {
  const niches = [
    { icon: "Car", label: "Привоз авто из-за рубежа" },
    { icon: "Factory", label: "Производственные компании" },
    { icon: "Briefcase", label: "Консалтинг и услуги" },
    { icon: "PartyPopper", label: "Event-агентства" },
    { icon: "Plane", label: "Туристические компании" },
    { icon: "HardHat", label: "Строительный бизнес" },
    { icon: "Stethoscope", label: "Медицинские центры" },
  ];
  return (
    <section className="n-section" style={{ background: "#fff", borderTop: "1px solid var(--clr-border)" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3.5rem" }}>
            <div className="n-label" style={{ justifyContent: "center" }}>Опыт по нишам</div>
            <h2 className="n-h2">Работаем с разными сферами бизнеса</h2>
          </div>
        </RevealWrapper>
        <div className="n-grid-4">
          {niches.map((n, i) => (
            <RevealWrapper key={n.label} delay={i * 50}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", background: "var(--clr-bg)", border: "1px solid var(--clr-border)", borderRadius: 14, transition: "all 200ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-blue)"; (e.currentTarget as HTMLElement).style.background = "var(--clr-blue-light)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-border)"; (e.currentTarget as HTMLElement).style.background = "var(--clr-bg)"; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--clr-card)", border: "1px solid var(--clr-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={n.icon} size={18} style={{ color: "var(--clr-blue)" }} fallback="Briefcase" />
                </div>
                <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--clr-text)" }}>{n.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
        <RevealWrapper delay={200}>
          <p className="n-muted" style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9375rem" }}>
            Этот опыт помогает быстрее находить рабочую логику и точнее выстраивать CRM под задачи бизнеса.
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Support (dark) ──────────────────────────────────────────────────────────
function Support() {
  return (
    <section id="support" className="n-section n-dark">
      {/* Glows on dark bg */}
      <div className="n-glow n-glow-blue-blob" style={{ top: "10%", right: "5%", opacity: 0.5 }} />
      <div className="n-glow n-glow-teal-blob" style={{ bottom: "10%", left: "5%", opacity: 0.4 }} />
      <div className="n-wrap" style={{ position: "relative", zIndex: 1 }}>
        <RevealWrapper>
          <div className="n-split" style={{ alignItems: "center" }}>
            <div>
              <div className="n-label">Поддержка</div>
              <h2 className="n-h2" style={{ marginBottom: "1.25rem" }}>
                Не просто запускаем — помогаем системе работать на результат
              </h2>
              <p className="n-muted" style={{ marginBottom: "1rem" }}>
                Одна из самых частых проблем после внедрения CRM — система остаётся без развития. Меняется поток лидов, команда, задачи бизнеса, а CRM остаётся прежней.
              </p>
              <p className="n-muted">
                Поэтому для нас важна поддержка после запуска. Мы смотрим, как система работает в реальной жизни, где усилить автоматизацию и как сделать CRM ещё полезнее для продаж.
              </p>
            </div>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {[
                { icon: "Activity", title: "Мониторинг системы", desc: "Следим за тем, как CRM работает в реальной жизни" },
                { icon: "Lightbulb", title: "Предлагаем улучшения", desc: "Инициативно предлагаем идеи, которые усиливают результат" },
                { icon: "Zap", title: "Быстрые правки", desc: "Оперативно вносим изменения без лишней бюрократии" },
              ].map(item => (
                <div key={item.title} className="n-card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div className="n-card-icon" style={{ flexShrink: 0, marginBottom: 0 }}>
                    <Icon name={item.icon} size={18} fallback="Star" />
                  </div>
                  <div>
                    <h3 className="n-h3" style={{ marginBottom: "0.25rem" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--clr-muted)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Trust ────────────────────────────────────────────────────────────────────
function Trust() {
  const items = [
    { icon: "ShieldCheck", val: "85+", label: "проектов внедрения", desc: "Разные ниши, разные бизнес-модели, разные команды." },
    { icon: "GitMerge", val: "100%", label: "погружение в процесс", desc: "Никаких шаблонных решений — только под ваши задачи." },
    { icon: "HeartHandshake", val: "30 дней", label: "поддержка после запуска", desc: "Мы остаёмся на связи и помогаем, если что-то нужно улучшить." },
    { icon: "BadgeCheck", val: "AMO", label: "сертифицированный партнёр", desc: "Официальный статус и профессиональный уровень работы." },
  ];
  return (
    <section className="n-section" style={{ background: "var(--clr-bg)" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3.5rem" }}>
            <div className="n-label" style={{ justifyContent: "center" }}>Почему нам доверяют</div>
            <h2 className="n-h2">Зрелый подход без пафоса</h2>
          </div>
        </RevealWrapper>
        <div className="n-grid-4">
          {items.map((item, i) => (
            <RevealWrapper key={item.label} delay={i * 70}>
              <article className="n-card" style={{ textAlign: "center", height: "100%" }}>
                <div className="n-card-icon" style={{ margin: "0 auto 1rem" }}>
                  <Icon name={item.icon} size={20} fallback="Star" />
                </div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--clr-blue)", letterSpacing: "-0.03em", marginBottom: "0.2rem" }}>{item.val}</div>
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--clr-text)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                <p style={{ fontSize: "0.875rem", color: "var(--clr-muted)" }}>{item.desc}</p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cert ─────────────────────────────────────────────────────────────────────
function Cert() {
  return (
    <section className="n-section" style={{ background: "#fff", borderTop: "1px solid var(--clr-border)", paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", padding: "2rem 2.5rem", background: "var(--clr-bg)", border: "1px solid var(--clr-border)", borderRadius: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "var(--clr-blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="BadgeCheck" size={32} style={{ color: "#fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--clr-text)", marginBottom: "0.25rem" }}>Сертифицированные партнёры amoCRM</div>
              <p style={{ fontSize: "0.9375rem", color: "var(--clr-muted)", margin: 0 }}>
                Работаем с системой профессионально и помогаем внедрить amoCRM так, чтобы она была понятной, удобной и полезной для бизнеса.
              </p>
            </div>
            <div className="n-chip" style={{ flexShrink: 0 }}>Профессиональное внедрение · Настройка · Поддержка</div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────
function Steps() {
  const steps = [
    { n: "1", title: "Изучаем бизнес", desc: "Разбираем текущий процесс продаж и реальную картину внутри компании." },
    { n: "2", title: "Находим потери", desc: "Показываем, где теряются лиды, время и деньги." },
    { n: "3", title: "Формируем решение", desc: "Составляем понятный план настройки под вашу задачу." },
    { n: "4", title: "Настраиваем CRM", desc: "Собираем систему под реальную работу команды." },
    { n: "5", title: "Запускаем", desc: "Помогаем команде встроить CRM в ежедневный процесс." },
    { n: "6", title: "Улучшаем", desc: "Сопровождаем и предлагаем идеи для роста результата." },
  ];
  return (
    <section id="steps" className="n-section" style={{ background: "var(--clr-bg)" }}>
      <div className="n-wrap">
        <RevealWrapper>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 4rem" }}>
            <div className="n-label" style={{ justifyContent: "center" }}>Как мы работаем</div>
            <h2 className="n-h2">Понятный путь от запроса до результата</h2>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={100}>
          <div className="n-steps-row">
            {steps.map((s, i) => (
              <div key={s.n} className="n-step-item">
                <div className={`n-step-num ${i >= 4 ? "teal" : ""}`}>{s.n}</div>
                <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--clr-text)", marginBottom: "0.375rem" }}>{s.title}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--clr-faint)", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── CTA + Form ───────────────────────────────────────────────────────────────
function CtaForm() {
  const [form, setForm] = useState({ name: "", company: "", contact: "", task: "" });

  return (
    <section id="cta" className="n-section" style={{ background: "#fff", borderTop: "1px solid var(--clr-border)" }}>
      <div className="n-glow n-glow-blue-blob" style={{ bottom: 0, right: "10%", opacity: 0.7 }} />
      <div className="n-wrap">
        <div className="n-split" style={{ position: "relative", zIndex: 1 }}>
          {/* Left */}
          <RevealWrapper>
            <div>
              <div className="n-label">Начать</div>
              <h2 className="n-h2" style={{ marginBottom: "1.25rem" }}>
                Обсудим, как настроить amoCRM под ваш бизнес
              </h2>
              <p className="n-muted" style={{ marginBottom: "0.875rem" }}>
                Оставьте заявку — разберём вашу ситуацию, посмотрим на процессы и предложим решение.
              </p>
              <p className="n-muted" style={{ marginBottom: "2rem" }}>
                Или напишите напрямую:{" "}
                <a href="mailto:neurocontent.wave@gmail.com" style={{ color: "var(--clr-blue)", fontWeight: 500 }}>neurocontent.wave@gmail.com</a>
              </p>
              <div style={{ display: "grid", gap: "0.625rem" }}>
                <a href="mailto:neurocontent.wave@gmail.com" className="n-chip" style={{ width: "fit-content" }}>
                  <Icon name="Mail" size={15} style={{ color: "var(--clr-blue)" }} />
                  neurocontent.wave@gmail.com
                </a>
              </div>
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper delay={120}>
            <div id="form" className="n-form-card" style={{ background: "var(--clr-card)", border: "1px solid var(--clr-border)", borderRadius: 24, padding: "2.25rem", boxShadow: "var(--shadow-lg)" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--clr-text)", marginBottom: "1.5rem" }}>Оставить заявку</h3>
              <form style={{ display: "grid", gap: "1rem" }} onSubmit={e => e.preventDefault()}>
                <div className="n-form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                  <label style={{ display: "grid", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--clr-text)" }}>Имя</span>
                    <input className="n-input" type="text" placeholder="Иван Иванов" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </label>
                  <label style={{ display: "grid", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--clr-text)" }}>Компания</span>
                    <input className="n-input" type="text" placeholder="ООО Ромашка" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                  </label>
                </div>
                <label style={{ display: "grid", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--clr-text)" }}>Контакт для связи</span>
                  <input className="n-input" type="text" placeholder="Telegram, email или телефон" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} />
                </label>
                <label style={{ display: "grid", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--clr-text)" }}>Коротко о задаче</span>
                  <textarea className="n-input n-textarea" placeholder="Опишите, что нужно настроить или улучшить" value={form.task} onChange={e => setForm(p => ({ ...p, task: e.target.value }))} />
                </label>
                <button className="n-btn n-btn-primary" type="submit" style={{ width: "100%", height: 56, fontSize: "1.0625rem" }}>
                  Отправить заявку
                </button>
              </form>
              <p style={{ fontSize: "0.8125rem", color: "var(--clr-faint)", marginTop: "1rem", textAlign: "center" }}>
                Свяжемся в течение рабочего дня
              </p>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--clr-dark)", color: "#9CA3AF", padding: "3rem 0" }}>
      <div className="n-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(29,78,216,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Settings2" size={18} style={{ color: "#fff" }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#F9FAFB", letterSpacing: "-0.02em" }}>Настроено</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[["О нас","#approach"],["Услуги","#services"],["Процесс","#steps"],["Контакты","#cta"]].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: "0.9375rem", color: "#9CA3AF", transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F9FAFB")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
              >{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", fontSize: "0.875rem" }}>
          <span>Интеграция amoCRM с погружением в бизнес</span>
          <span>neurocontent.wave@gmail.com</span>
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
        <Approach />
        <Problems />
        <Services />
        <Difference />
        <Benefits />
        <Fit />
        <Niches />
        <Support />
        <Trust />
        <Cert />
        <Steps />
        <CtaForm />
      </main>
      <Footer />
    </>
  );
}