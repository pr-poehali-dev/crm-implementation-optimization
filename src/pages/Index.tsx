import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── Theme toggle ─────────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");
  return { theme, toggle };
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="ds-header">
      <div className="ds-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "76px", gap: "1rem" }}>
        <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
          <span className="ds-brand-mark">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16.5V7.5L12 3l8 4.5v9L12 21l-8-4.5Z" />
              <path d="M8.5 10.2 12 8l3.5 2.2v3.7L12 16l-3.5-2.1z" />
            </svg>
          </span>
          <span style={{ display: "grid", gap: "2px" }}>
            <strong style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>amoCRM для бизнеса</strong>
            <span style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", color: "var(--color-text-muted)" }}>Внедрение, настройка, поддержка</span>
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a className="ds-btn ds-btn-secondary" href="#cta" style={{ minHeight: "40px", fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", display: "inline-flex" }}>
            Оставить заявку
          </a>
          <button className="ds-theme-toggle" onClick={toggle} aria-label="Переключить тему" type="button">
            {theme === "dark"
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="ds-section" style={{ paddingTop: "clamp(3rem, 8vw, 6rem)" }}>
      <div className="ds-container">
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(2rem, 4vw, 4rem)", alignItems: "center" }} className="hero-grid-responsive">
          <div>
            <div className="ds-eyebrow" style={{ marginBottom: "1.25rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Сертифицированные партнеры amoCRM
            </div>

            <h1 className="ds-h1" style={{ marginBottom: "1.5rem" }}>
              Внедрим amoCRM под ваш бизнес и свяжем маркетинг с продажами в одну рабочую систему
            </h1>

            <p className="ds-muted" style={{ margin: "1.5rem 0 0", maxWidth: "66ch", fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)" }}>
              Лиды есть, а ясности в продажах нет: маркетинг уверен, что даёт результат, отдел продаж жалуется на качество заявок, а руководитель не видит, где теряются деньги. amoCRM помогает прекратить споры и выстроить систему, в которой видно, что происходит на каждом этапе.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", marginTop: "2rem" }}>
              <a className="ds-btn ds-btn-primary" href="#cta">Получить консультацию</a>
              <a className="ds-btn ds-btn-secondary" href="#form">Оставить заявку</a>
            </div>

            <div className="ds-grid-3" style={{ marginTop: "2rem" }}>
              {["Сертифицированные партнеры amoCRM", "Настройка под ваш бизнес, а не по шаблону", "Поддержка и улучшения после внедрения"].map(text => (
                <div key={text} className="ds-card" style={{ padding: "1rem 1.1rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="ds-hero-visual">
            <div style={{ display: "grid", gap: "0.9rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.8rem", alignItems: "center" }}>
                <div className="ds-diagram-box">
                  <strong style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>Маркетинг</strong>
                  <span style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", color: "var(--color-text-muted)" }}>Реклама, каналы, лиды</span>
                </div>
                <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.3rem" }}>→</span>
                <div className="ds-diagram-box">
                  <strong style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>amoCRM</strong>
                  <span style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", color: "var(--color-text-muted)" }}>Единая логика, контроль, автоматизация</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.8rem", alignItems: "center" }}>
                <div className="ds-diagram-box">
                  <strong style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>Отдел продаж</strong>
                  <span style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", color: "var(--color-text-muted)" }}>Задачи, касания, этапы сделки</span>
                </div>
                <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.3rem" }}>→</span>
                <div className="ds-diagram-box">
                  <strong style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>Результат</strong>
                  <span style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", color: "var(--color-text-muted)" }}>Прозрачность, скорость, рост эффективности</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Approach ─────────────────────────────────────────────────────────────────
function Approach() {
  return (
    <section id="approach" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Мы не просто внедряем amoCRM — мы вникаем в бизнес, находим слабые места и постоянно улучшаем систему, чтобы она реально помогала продажам</h2>
          <div>
            <p className="ds-muted" style={{ marginTop: 0, marginBottom: "1rem" }}>
              Для нас CRM — это не просто карточки сделок, статусы и автоматизации. Это инструмент, который должен помогать бизнесу быстрее обрабатывать лиды, не терять клиентов, видеть реальные причины просадки продаж и выстраивать работу команды так, чтобы маркетинг и отдел продаж наконец начали работать в одной связке.
            </p>
            <p className="ds-muted" style={{ margin: 0 }}>
              Мы погружаемся в ваш процесс, разбираемся, как приходят заявки, как они обрабатываются, где теряется скорость, где не хватает контроля и почему часть лидов не доходит до сделки. После этого выстраиваем систему, которая помогает бизнесу работать точнее, быстрее и результативнее.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Problems ─────────────────────────────────────────────────────────────────
function Problems() {
  const items = [
    { title: "Лиды из разных каналов", desc: "Обращения распадаются между формами, мессенджерами, звонками и теряются по пути." },
    { title: "Неровная обработка", desc: "Менеджеры отвечают с разной скоростью и ведут клиентов без единой логики." },
    { title: "Нет прозрачности", desc: "Сложно понять, на каком этапе сделка тормозится и что влияет на конверсию." },
    { title: "Споры между отделами", desc: "Маркетинг и продажи спорят о качестве заявок вместо совместной работы на результат." },
    { title: "Потеря денег", desc: "Руководитель видит только последствия, но не видит, где именно уходит прибыль." },
    { title: "Нет единого механизма", desc: "Реклама, лиды и отдел продаж существуют отдельно и не дают системного эффекта." },
  ];

  return (
    <section id="problems" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Почему продажи не растут, даже когда лиды есть</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Очень часто проблема не в количестве заявок. Деньги уже вложены в рекламу, лиды приходят, но внутри компании нет единой системы: маркетинг оценивает результат по своим метрикам, отдел продаж — по своим, а руководитель не видит полной картины.
          </p>
        </div>
        <div className="ds-grid-3">
          {items.map(item => (
            <article key={item.title} className="ds-card">
              <strong style={{ display: "block", marginBottom: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item.title}</strong>
              <span className="ds-muted" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{item.desc}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Checklist ────────────────────────────────────────────────────────────────
function Checklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const items = [
    { id: 1, text: "Менеджеры ведут клиентов в Excel или записной книжке" },
    { id: 2, text: "Нет единой базы контактов с историей общения" },
    { id: 3, text: "Невозможно быстро узнать статус каждой сделки" },
    { id: 4, text: "Заявки поступают из разных каналов и теряются" },
    { id: 5, text: "Отсутствует автоматическое напоминание о задачах" },
    { id: 6, text: "Сложно построить воронку продаж и увидеть конверсию" },
    { id: 7, text: "Новый менеджер не знает историю клиента при передаче" },
    { id: 8, text: "Нет аналитики: кто лучший менеджер, откуда клиенты" },
    { id: 9, text: "Руководитель не видит реальную картину продаж онлайн" },
    { id: 10, text: "Рутинные действия не автоматизированы (письма, задачи, напоминания)" },
  ];

  const count = Object.values(checked).filter(Boolean).length;
  const severity =
    count <= 2 ? { label: "Всё в порядке", color: "var(--color-primary)", msg: "Небольшие улучшения помогут расти быстрее." }
    : count <= 5 ? { label: "Зона риска", color: "#c9720a", msg: "Вы теряете часть выручки. Стоит разобраться с процессами." }
    : count <= 8 ? { label: "Серьёзные потери", color: "#c94b0a", msg: "Значительная часть потенциала продаж уходит мимо." }
    : { label: "Критическая ситуация", color: "#b91c1c", msg: "Бизнес теряет деньги каждый день. Важно действовать сейчас." };

  const toggle = (id: number) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="checklist" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Диагностика: проверьте свой отдел продаж</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Отметьте всё, что сейчас происходит в вашей компании. Результат покажет, насколько срочно нужна CRM-система.
          </p>
        </div>

        <div className="ds-panel" style={{ marginBottom: "1rem" }}>
          <div style={{ display: "grid", gap: "0.35rem" }}>
            {items.map(item => (
              <label
                key={item.id}
                className={`ds-check-item ${checked[item.id] ? "checked" : ""}`}
                onClick={() => toggle(item.id)}
              >
                <div className={`ds-checkbox ${checked[item.id] ? "checked" : ""}`}>
                  {checked[item.id] && <Icon name="Check" size={13} style={{ color: "var(--color-text-inverse)" }} />}
                </div>
                <span style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: checked[item.id] ? "var(--color-text)" : "var(--color-text-muted)" }}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {count > 0 && (
          <div className="ds-panel" style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "color-mix(in srgb, var(--color-primary) 12%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: severity.color, fontWeight: 400 }}>{count}</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: severity.color, fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{severity.label}</div>
                <div className="ds-muted" style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)" }}>{severity.msg}</div>
              </div>
            </div>
            {count >= 3 && (
              <a className="ds-btn ds-btn-primary" href="#cta" style={{ marginLeft: "auto" }}>
                Обсудить решение
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const items = [
    { title: "Анализ продаж", desc: "Разбираем текущий процесс продаж и точки потери эффективности." },
    { title: "Слабые места", desc: "Находим, где теряются лиды, время и управляемость процесса." },
    { title: "Воронка под бизнес", desc: "Проектируем логику этапов под ваш путь клиента и вашу нишу." },
    { title: "Настройка amoCRM", desc: "Собираем систему под реальные задачи команды и руководителя." },
    { title: "Интеграции", desc: "Подключаем нужные каналы, формы, мессенджеры и инструменты." },
    { title: "Автоматизация", desc: "Убираем повторяющиеся действия и ускоряем обработку заявок." },
    { title: "Контроль сделок", desc: "Настраиваем понятную логику контроля по лидам и сделкам." },
    { title: "Запуск в работу", desc: "Помогаем команде начать использовать систему в ежедневной работе." },
  ];

  return (
    <section id="services" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Настраиваем amoCRM под реальный процесс вашего бизнеса</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Мы не используем шаблонный подход. Сначала разбираемся в специфике вашей компании, логике продаж, источниках лидов, скорости обработки и слабых местах воронки. И только потом настраиваем amoCRM так, чтобы она действительно решала задачи бизнеса.
          </p>
        </div>
        <div className="ds-grid-4">
          {items.map(item => (
            <article key={item.title} className="ds-card">
              <strong style={{ display: "block", marginBottom: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item.title}</strong>
              <span className="ds-muted" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{item.desc}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Difference ───────────────────────────────────────────────────────────────
function Difference() {
  const items = [
    { title: "Погружение в бизнес", desc: "Мы не работаем поверхностно, а вникаем в сферу, процессы и особенности именно вашей компании." },
    { title: "Связка маркетинга и продаж", desc: "Смотрим не только на CRM, но и на то, как лид превращается в сделку и где ломается путь клиента." },
    { title: "Поддержка с идеями", desc: "После внедрения не исчезаем, а продолжаем предлагать улучшения, которые усиливают систему и результат." },
  ];

  return (
    <section id="difference" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Чем мы отличаемся от типового внедрения CRM</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Многие подрядчики настраивают amoCRM как технический продукт: создают воронку, поля, статусы и передают доступ. Мы смотрим глубже — на путь лида, на стык маркетинга и продаж, на логику работы менеджеров и на то, где компания теряет деньги внутри процесса.
          </p>
        </div>
        <div className="ds-grid-3">
          {items.map(item => (
            <article key={item.title} className="ds-card">
              <strong style={{ display: "block", marginBottom: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item.title}</strong>
              <span className="ds-muted" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{item.desc}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  const items = [
    { title: "Все обращения в одной системе", desc: "Единая точка входа для лидов и коммуникаций." },
    { title: "Понятная воронка продаж", desc: "Прозрачный путь клиента и ясные этапы сделки." },
    { title: "Контроль по каждому лиду", desc: "Видно, что происходит с заявкой и кто за неё отвечает." },
    { title: "Более быстрая обработка", desc: "Меньше задержек, больше шансов довести клиента до сделки." },
    { title: "Меньше ручной работы", desc: "Автоматизация снимает повторяющиеся действия с команды." },
    { title: "Прозрачность между отделами", desc: "Маркетинг и продажи видят одну и ту же картину." },
    { title: "Понимание точек потерь", desc: "Можно увидеть, где теряются деньги и что улучшать." },
    { title: "Система для роста", desc: "CRM развивается вместе с бизнесом и не устаревает после запуска." },
  ];

  return (
    <section id="benefits" className="ds-section">
      <div className="ds-container">
        <div className="ds-split">
          <div>
            <h2 className="ds-h2" style={{ marginBottom: "1rem" }}>Что меняется после внедрения</h2>
            <p className="ds-muted">
              Когда amoCRM настроена правильно, бизнес получает не просто новую программу, а рабочую систему управления лидами и продажами.
            </p>
          </div>
          <div className="ds-grid-2">
            {items.map(item => (
              <article key={item.title} className="ds-card">
                <strong style={{ display: "block", marginBottom: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item.title}</strong>
                <span className="ds-muted" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{item.desc}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Fit ──────────────────────────────────────────────────────────────────────
function Fit() {
  const items = [
    "Бизнесу с потоком лидов",
    "Компаниям с разрозненными отделами",
    "Руководителям, которым нужна прозрачность",
    "Отделам продаж, которым нужна удобная система",
    "Тем, кому нужен инструмент для роста",
  ];

  return (
    <section id="fit" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Кому подойдёт наш подход</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Мы особенно полезны компаниям, у которых уже есть поток заявок, но нет прозрачной системы управления ими. Там, где лиды приходят, а внутри процесса не хватает контроля, скорости и единой логики работы, CRM начинает давать максимальную пользу.
          </p>
        </div>
        <div className="ds-grid-5">
          {items.map(item => (
            <article key={item} className="ds-card">
              <strong style={{ display: "block", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Niches ───────────────────────────────────────────────────────────────────
function Niches() {
  const items = [
    "Привоз автомобилей из-за рубежа",
    "Завод железобетонных опор",
    "Консалтинговая компания",
    "Event-агентство",
    "Туристическая фирма",
    "Строительный бизнес",
    "Медицинские центры",
  ];

  return (
    <section id="niches" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Есть опыт работы с разными сферами бизнеса</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Мы настраивали CRM и работали с задачами компаний из разных ниш, поэтому понимаем, что универсальных решений здесь не бывает. У каждой сферы — свои особенности цикла сделки, обработки заявок, работы менеджеров и логики принятия решения клиентом.
          </p>
        </div>
        <div className="ds-grid-4">
          {items.map(item => (
            <article key={item} className="ds-card" style={{ padding: "1.1rem 1.25rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>
              {item}
            </article>
          ))}
        </div>
        <p className="ds-muted" style={{ marginTop: "1.5rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>
          Этот опыт помогает нам быстрее находить рабочую логику и точнее выстраивать CRM под задачи бизнеса.
        </p>
      </div>
    </section>
  );
}

// ─── Support ──────────────────────────────────────────────────────────────────
function Support() {
  return (
    <section id="support" className="ds-section">
      <div className="ds-container">
        <div className="ds-panel">
          <div className="ds-section-head" style={{ marginBottom: 0 }}>
            <h2 className="ds-h2">Мы не просто запускаем систему — мы помогаем ей работать на результат</h2>
            <div>
              <p className="ds-muted" style={{ marginTop: 0, marginBottom: "1rem" }}>
                Одна из самых частых проблем после внедрения CRM в том, что система остаётся без развития. Меняется поток лидов, команда, задачи бизнеса, а CRM остаётся прежней и перестаёт помогать в полной мере.
              </p>
              <p className="ds-muted" style={{ margin: 0 }}>
                Поэтому для нас важна поддержка после запуска. Мы продолжаем смотреть, как система работает в реальной жизни, где можно усилить автоматизацию, что стоит упростить, какие действия помогут команде работать быстрее и как сделать CRM ещё полезнее для продаж.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust ────────────────────────────────────────────────────────────────────
function Trust() {
  const items = [
    { title: "Привлечение лидов", desc: "Смотрим на систему как на продолжение маркетинга, а не отдельно от него." },
    { title: "Работа отдела продаж", desc: "Учитываем логику менеджеров и реальную ежедневную нагрузку команды." },
    { title: "Путь клиента", desc: "Собираем путь от заявки до сделки как единый управляемый процесс." },
  ];

  return (
    <section id="trust" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Понятный подход, внимание к деталям и работа на результат</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Нам важно не просто выполнить настройку, а собрать систему, которой действительно будут пользоваться. Поэтому мы думаем не только о технической части, но и о том, как CRM встроится в ежедневную работу команды, насколько удобной она будет для менеджеров и какую пользу даст руководителю.
          </p>
        </div>
        <div className="ds-grid-3">
          {items.map(item => (
            <article key={item.title} className="ds-card">
              <strong style={{ display: "block", marginBottom: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item.title}</strong>
              <span className="ds-muted" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{item.desc}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────
function Steps() {
  const items = [
    { n: "1", title: "Изучаем бизнес", desc: "Разбираем текущий процесс продаж и реальную картину внутри компании." },
    { n: "2", title: "Находим точки потерь", desc: "Показываем, где теряются лиды, время и деньги." },
    { n: "3", title: "Предлагаем решение", desc: "Формируем понятную логику настройки под вашу задачу." },
    { n: "4", title: "Настраиваем amoCRM", desc: "Собираем систему под реальную работу команды." },
    { n: "5", title: "Запускаем в использование", desc: "Помогаем команде встроить CRM в ежедневный процесс." },
    { n: "6", title: "Улучшаем после внедрения", desc: "Сопровождаем и предлагаем идеи, которые усиливают результат." },
  ];

  return (
    <section id="steps" className="ds-section">
      <div className="ds-container">
        <div className="ds-section-head">
          <h2 className="ds-h2">Понятный путь от запроса до результата</h2>
          <p className="ds-muted" style={{ margin: 0 }}>
            Показываем, как будет строиться работа: от погружения в вашу задачу до запуска системы и дальнейшего улучшения.
          </p>
        </div>
        <div className="ds-grid-3">
          {items.map(item => (
            <article key={item.n} className="ds-card">
              <strong style={{ display: "block", marginBottom: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", color: "var(--color-text)" }}>{item.n}. {item.title}</strong>
              <span className="ds-muted" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>{item.desc}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA + Form ───────────────────────────────────────────────────────────────
function CtaForm() {
  const [form, setForm] = useState({ name: "", company: "", contact: "", task: "" });

  return (
    <section id="cta" className="ds-section">
      <div className="ds-container">
        <div className="ds-split">
          <div className="ds-panel" style={{ background: "linear-gradient(180deg, var(--color-surface), var(--color-surface-offset))" }}>
            <h2 className="ds-h2" style={{ marginBottom: "1rem" }}>Обсудим, как настроить amoCRM под ваш бизнес</h2>
            <p className="ds-muted" style={{ marginBottom: "0.75rem" }}>
              Оставьте заявку через форму обратной связи или напишите на почту:{" "}
              <strong style={{ color: "var(--color-text)" }}>neurocontent.wave@gmail.com</strong>
            </p>
            <p className="ds-muted">
              Также можно связаться через бота обратной связи.
            </p>
            <div style={{ display: "grid", gap: "0.8rem", marginTop: "1.5rem" }}>
              <a className="ds-contact-chip" href="mailto:neurocontent.wave@gmail.com">
                <Icon name="Mail" size={16} style={{ color: "var(--color-primary)" }} />
                neurocontent.wave@gmail.com
              </a>
              <a className="ds-contact-chip" href="#form">
                <Icon name="FileText" size={16} style={{ color: "var(--color-primary)" }} />
                Перейти к форме заявки
              </a>
            </div>
          </div>

          <div className="ds-panel" id="form">
            <h2 style={{ fontSize: "clamp(1.125rem, 1rem + 0.75vw, 1.5rem)", marginBottom: "0.5rem", color: "var(--color-text)" }}>Оставьте заявку</h2>
            <p className="ds-muted" style={{ marginTop: 0, marginBottom: "1.25rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>
              Коротко опишите задачу, и мы свяжемся с вами, чтобы предложить подходящее решение по внедрению amoCRM.
            </p>

            <form style={{ display: "grid", gap: "1rem" }} onSubmit={e => e.preventDefault()}>
              <label style={{ display: "grid", gap: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", fontWeight: 500, color: "var(--color-text)" }}>
                Имя
                <input
                  className="ds-input"
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </label>
              <label style={{ display: "grid", gap: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", fontWeight: 500, color: "var(--color-text)" }}>
                Компания
                <input
                  className="ds-input"
                  type="text"
                  placeholder="Название компании"
                  value={form.company}
                  onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                />
              </label>
              <label style={{ display: "grid", gap: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", fontWeight: 500, color: "var(--color-text)" }}>
                Контакт для связи
                <input
                  className="ds-input"
                  type="text"
                  placeholder="Telegram, email или другой удобный контакт"
                  value={form.contact}
                  onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                />
              </label>
              <label style={{ display: "grid", gap: "0.45rem", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)", fontWeight: 500, color: "var(--color-text)" }}>
                Коротко о задаче
                <textarea
                  className="ds-input ds-textarea"
                  placeholder="Опишите, что нужно настроить или улучшить"
                  value={form.task}
                  onChange={e => setForm(p => ({ ...p, task: e.target.value }))}
                />
              </label>
              <button className="ds-btn ds-btn-primary" type="submit" style={{ width: "100%" }}>
                Отправить заявку
              </button>
            </form>

            <p className="ds-muted" style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)", marginTop: "1rem" }}>
              Разберём вашу задачу, посмотрим, как сейчас устроены маркетинг и продажи, и предложим решение, которое поможет выстроить их в одну рабочую систему.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="ds-section">
      <div className="ds-container">
        <div className="ds-panel">
          <h2 className="ds-h2" style={{ marginBottom: "1rem" }}>О нас</h2>
          <p className="ds-muted" style={{ margin: 0, maxWidth: "72ch", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>
            Мы помогаем компаниям внедрять и развивать amoCRM так, чтобы маркетинг, лиды и продажи работали как единая система. Погружаемся в бизнес, находим слабые места, настраиваем CRM под реальные процессы и помогаем сделать её рабочим инструментом, который приносит пользу каждый день.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "0 0 4rem" }}>
      <div className="ds-container">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", paddingTop: "2rem", borderTop: "1px solid color-mix(in srgb, var(--color-text) 10%, transparent)", color: "var(--color-text-muted)", fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)" }}>
          <span>Сертифицированные партнеры amoCRM</span>
          <span>Почта: neurocontent.wave@gmail.com</span>
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
      <main id="content">
        <Hero />
        <Approach />
        <Problems />
        <Checklist />
        <Services />
        <Difference />
        <Benefits />
        <Fit />
        <Niches />
        <Support />
        <Trust />
        <Steps />
        <CtaForm />
        <About />
      </main>
      <Footer />
    </>
  );
}
