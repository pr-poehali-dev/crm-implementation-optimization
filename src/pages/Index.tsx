import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Проблемы", href: "#проблемы" },
    { label: "Услуги", href: "#услуги" },
    { label: "Кейсы", href: "#кейсы" },
    { label: "Процесс", href: "#процесс" },
    { label: "Контакты", href: "#контакты" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06D6F5] flex items-center justify-center">
            <span className="text-white font-bold text-xs" style={{ fontFamily: "Oswald, sans-serif" }}>CRM</span>
          </div>
          <span className="font-semibold text-white text-lg tracking-wide" style={{ fontFamily: "Oswald, sans-serif" }}>
            Sales<span style={{ color: "#8B5CF6" }}>Pro</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <a key={link.label} href={link.href} className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#контакты"
          className="btn-shimmer text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-200"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #06D6F5)" }}
        >
          Консультация
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg noise pt-16">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-glow" style={{ background: "rgba(139,92,246,0.12)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] animate-pulse-glow" style={{ background: "rgba(6,214,245,0.08)", animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]" style={{ background: "rgba(247,37,133,0.04)" }} />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)" }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#06D6F5" }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#06D6F5" }}>Внедрение CRM • Рост продаж</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6" style={{ fontFamily: "Oswald, sans-serif" }}>
          <span className="text-white">Ваши продажи</span>
          <br />
          <span className="gradient-text">теряют деньги</span>
          <br />
          <span className="text-white">прямо сейчас</span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          Пока вы читаете это, ваши менеджеры теряют заявки, забывают о клиентах и работают в хаосе. CRM решает это за 2 недели.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#чек-лист"
            className="btn-shimmer group flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 text-base"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #06D6F5)", boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
          >
            Пройти диагностику бесплатно
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#кейсы"
            className="flex items-center gap-2 font-medium px-6 py-4 rounded-full transition-all duration-200 text-base"
            style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          >
            <Icon name="PlayCircle" size={18} />
            Смотреть кейсы
          </a>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20">
          {[
            { value: "+147%", label: "рост конверсии" },
            { value: "2 нед", label: "до результата" },
            { value: "85+", label: "проектов" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>{stat.value}</div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>листайте вниз</span>
        <Icon name="ChevronDown" size={16} className="text-white/25" />
      </div>
    </section>
  );
}

// ─── Problems ─────────────────────────────────────────────────────────────────
function Problems() {
  const ref = useScrollReveal();
  const problems = [
    { icon: "MessageSquareOff", title: "Заявки теряются", desc: "Клиент написал, менеджер не увидел, сделка ушла к конкуренту", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.2)", iconColor: "#f87171" },
    { icon: "ClockAlert", title: "Хаос в задачах", desc: "Никто не знает, кто должен позвонить и когда. Каждый день — тушение пожаров", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.2)", iconColor: "#fb923c" },
    { icon: "BarChart2", title: "Нет аналитики", desc: "Почему упали продажи? Неизвестно. Интуиция вместо цифр", bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.2)", iconColor: "#facc15" },
    { icon: "Users", title: "Зависимость от людей", desc: "Менеджер уходит — уходит и база клиентов. Бизнес как заложник", bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.2)", iconColor: "#f472b6" },
    { icon: "Repeat", title: "Ручная работа", desc: "Часы на копирование данных, заполнение таблиц, отправку однотипных писем", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.2)", iconColor: "#a78bfa" },
    { icon: "TrendingDown", title: "Деньги на ветер", desc: "Платите за рекламу, а конверсия низкая. Проблема не в трафике — в обработке", bg: "rgba(6,214,245,0.1)", border: "rgba(6,214,245,0.2)", iconColor: "#06D6F5" },
  ];

  return (
    <section id="проблемы" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-bg)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF6B2B" }}>Узнаёте себя?</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
            6 симптомов больного<br />
            <span className="gradient-text-orange">отдела продаж</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>Если хотя бы 3 из них про вас — вы теряете минимум 30% выручки каждый месяц</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProblemItem { icon: string; title: string; desc: string; bg: string; border: string; iconColor: string; }
function ProblemCard({ p, i }: { p: ProblemItem; i: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal gradient-border p-6 hover:scale-[1.02] transition-transform duration-300 cursor-default"
      style={{ transitionDelay: `${i * 0.08}s` }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
        <Icon name={p.icon} size={22} fallback="AlertCircle" style={{ color: p.iconColor }} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>{p.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{p.desc}</p>
    </div>
  );
}

// ─── Checklist ────────────────────────────────────────────────────────────────
function Checklist() {
  const titleRef = useScrollReveal();
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
    { id: 10, text: "Рутинные действия не автоматизированы (письма, смс, задачи)" },
  ];

  const count = Object.values(checked).filter(Boolean).length;
  const severity =
    count <= 2
      ? { label: "Норма", color: "#4ade80", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.25)", msg: "Небольшие улучшения увеличат продажи" }
      : count <= 5
      ? { label: "Зона риска", color: "#facc15", bg: "rgba(250,204,21,0.12)", border: "rgba(250,204,21,0.25)", msg: "Вы теряете до 20% выручки ежемесячно" }
      : count <= 8
      ? { label: "Критично", color: "#fb923c", bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.25)", msg: "Потери 30–40% выручки. Нужно действовать" }
      : { label: "Аварийная ситуация", color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)", msg: "Бизнес теряет деньги каждый день. Срочно!" };

  const toggle = (id: number) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="чек-лист" className="py-24 relative" style={{ background: "linear-gradient(180deg, var(--dark-bg) 0%, #0D0D1A 100%)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div ref={titleRef} className="reveal text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#06D6F5" }}>Диагностика</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
            Чек-лист: <span className="gradient-text">проблемы в продажах</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.48)" }}>Отметьте всё, что есть в вашем отделе продаж прямо сейчас</p>
        </div>

        <div className="gradient-border p-8 mb-6">
          <div className="space-y-3">
            {items.map((item) => (
              <label
                key={item.id}
                className="check-item flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: checked[item.id] ? "rgba(139,92,246,0.1)" : "transparent",
                  border: checked[item.id] ? "1px solid rgba(139,92,246,0.3)" : "1px solid transparent",
                }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: checked[item.id] ? "#8B5CF6" : "transparent",
                    border: checked[item.id] ? "2px solid #8B5CF6" : "2px solid rgba(255,255,255,0.2)",
                  }}
                  onClick={() => toggle(item.id)}
                >
                  {checked[item.id] && <Icon name="Check" size={14} className="text-white" />}
                </div>
                <span className="text-sm leading-relaxed transition-colors duration-200 flex-1" style={{ color: checked[item.id] ? "#fff" : "rgba(255,255,255,0.58)" }}>
                  {item.text}
                </span>
                {checked[item.id] && (
                  <span className="text-xs font-semibold shrink-0" style={{ color: "#8B5CF6" }}>⚠ проблема</span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="gradient-border p-6 transition-all duration-500" style={{ opacity: count === 0 ? 0.5 : 1 }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: severity.bg, border: `1px solid ${severity.border}` }}>
              <span className="text-3xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: severity.color }}>{count}</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>из 10</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xl font-bold mb-1" style={{ fontFamily: "Oswald, sans-serif", color: severity.color }}>{severity.label}</div>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>{severity.msg}</p>
              {count >= 3 && (
                <a
                  href="#контакты"
                  className="btn-shimmer inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200 text-sm"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #06D6F5)" }}
                >
                  Получить план исправления
                  <Icon name="ArrowRight" size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
interface ServiceItem { icon: string; title: string; desc: string; price: string; iconBg: string; iconBorder: string; iconColor: string; features: string[]; popular?: boolean; }
function ServiceCard({ s, i }: { s: ServiceItem; i: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal relative gradient-border p-7 hover:scale-[1.01] transition-all duration-300"
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      {s.popular && (
        <div className="absolute -top-3 left-6 text-white text-xs font-bold px-4 py-1 rounded-full" style={{ background: "linear-gradient(90deg, #06D6F5, #8B5CF6)" }}>
          Популярное
        </div>
      )}
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}` }}>
          <Icon name={s.icon} size={22} fallback="Star" style={{ color: s.iconColor }} />
        </div>
        <span className="text-xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{s.price}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>{s.title}</h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</p>
      <div className="flex flex-wrap gap-2">
        {s.features.map((f: string) => (
          <span key={f} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const ref = useScrollReveal();
  const services = [
    { icon: "Settings2", title: "Настройка amoCRM", desc: "Воронки, поля, автоматизации, интеграции с сайтом, мессенджерами и телефонией", price: "от 60 000 ₽", iconBg: "rgba(139,92,246,0.15)", iconBorder: "rgba(139,92,246,0.3)", iconColor: "#a78bfa", features: ["Настройка воронок", "Интеграции", "Автоматизация"] },
    { icon: "Zap", title: "Автоматизация продаж", desc: "Роботы, которые отправляют письма, ставят задачи и ведут клиента без участия менеджера", price: "от 40 000 ₽", iconBg: "rgba(6,214,245,0.12)", iconBorder: "rgba(6,214,245,0.25)", iconColor: "#06D6F5", features: ["Email-цепочки", "Чат-боты", "Авто-задачи"], popular: true },
    { icon: "GraduationCap", title: "Обучение команды", desc: "Менеджеры и РОП за 4 занятия начнут работать эффективнее, а не саботировать CRM", price: "от 20 000 ₽", iconBg: "rgba(255,107,43,0.12)", iconBorder: "rgba(255,107,43,0.25)", iconColor: "#FF6B2B", features: ["4 занятия", "Видеозаписи", "Поддержка 30 дней"] },
    { icon: "BarChart3", title: "Аналитика и отчёты", desc: "Дашборд с цифрами в реальном времени: конверсия, выручка, нагрузка на менеджеров", price: "от 30 000 ₽", iconBg: "rgba(247,37,133,0.12)", iconBorder: "rgba(247,37,133,0.25)", iconColor: "#F72585", features: ["KPI Dashboard", "Воронка аналитики", "Сравнение периодов"] },
  ];

  return (
    <section id="услуги" className="py-24" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#8B5CF6" }}>Что мы делаем</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5" style={{ fontFamily: "Oswald, sans-serif" }}>
            Услуги по внедрению <span className="gradient-text">CRM</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Cases ────────────────────────────────────────────────────────────────────
interface CaseItem { company: string; industry: string; result: string; time: string; desc: string; before: string; after: string; }
function CaseCard({ c, i }: { c: CaseItem; i: number }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal gradient-border p-6 flex flex-col" style={{ transitionDelay: `${i * 0.1}s` }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-white font-semibold text-sm">{c.company}</div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{c.industry}</div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}>{c.time}</span>
      </div>
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "rgba(255,255,255,0.58)" }}>{c.desc}</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <div className="text-xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "#f87171" }}>{c.before}</div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>До</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="text-xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "#4ade80" }}>{c.after}</div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>После</div>
        </div>
      </div>
      <div className="gradient-text text-2xl font-bold" style={{ fontFamily: "Oswald, sans-serif" }}>{c.result}</div>
    </div>
  );
}

function Cases() {
  const ref = useScrollReveal();
  const cases = [
    { company: "Строительная компания", industry: "Стройматериалы", result: "+213% конверсия", time: "3 недели", desc: "Хаос из WhatsApp и Excel → amoCRM с автоматической обработкой заявок. Менеджеры перестали терять клиентов.", before: "1.8%", after: "5.6%" },
    { company: "Агентство недвижимости", industry: "Недвижимость", result: "−40% времени на сделку", time: "2 недели", desc: "Автоматизировали рутину: письма, напоминания, формирование договоров. Риелторы занимаются продажами, а не бумагами.", before: "24 дня", after: "14 дней" },
    { company: "SaaS-стартап", industry: "IT / SaaS", result: "+87% выручка", time: "1 месяц", desc: "Внедрили триггерные письма и онбординг. Retention вырос с 34% до 61%. Продажи выросли без увеличения трафика.", before: "34%", after: "61%" },
  ];

  return (
    <section id="кейсы" className="py-24" style={{ background: "linear-gradient(180deg, var(--dark-bg) 0%, #0D0D1A 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#06D6F5" }}>Результаты клиентов</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3" style={{ fontFamily: "Oswald, sans-serif" }}>
            Реальные цифры, <span className="gradient-text">реальные компании</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => <CaseCard key={c.company} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
interface StepItem { n: string; title: string; desc: string; icon: string; dur: string; }
function ProcessCard({ s, i }: { s: StepItem; i: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal gradient-border p-6 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300"
      style={{ transitionDelay: `${i * 0.08}s` }}
    >
      <div className="absolute top-4 right-4 select-none" style={{ fontFamily: "Oswald, sans-serif", fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>{s.n}</div>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}>
        <Icon name={s.icon} size={20} fallback="Star" style={{ color: "#8B5CF6" }} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>{s.title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.48)" }}>{s.desc}</p>
      <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(6,214,245,0.08)", border: "1px solid rgba(6,214,245,0.2)", color: "#06D6F5" }}>{s.dur}</span>
    </div>
  );
}

function Process() {
  const ref = useScrollReveal();
  const steps = [
    { n: "01", title: "Диагностика", desc: "Анализируем ваш отдел продаж, текущие процессы и точки потерь. Бесплатно.", icon: "Search", dur: "1 день" },
    { n: "02", title: "Стратегия", desc: "Готовим техническое задание и план внедрения под ваш бизнес", icon: "Map", dur: "2 дня" },
    { n: "03", title: "Настройка", desc: "Разворачиваем CRM, настраиваем воронки, интеграции и автоматизации", icon: "Settings", dur: "5–7 дней" },
    { n: "04", title: "Обучение", desc: "Обучаем менеджеров и РОП работе в системе. Фиксируем регламенты", icon: "GraduationCap", dur: "2–3 дня" },
    { n: "05", title: "Запуск", desc: "Запускаем в боевой режим. Первые результаты — уже в первую неделю", icon: "Rocket", dur: "1 день" },
    { n: "06", title: "Поддержка", desc: "30 дней поддержки: правки, вопросы, обновления в режиме реального времени", icon: "HeartHandshake", dur: "30 дней" },
  ];

  return (
    <section id="процесс" className="py-24" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF6B2B" }}>Как мы работаем</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3" style={{ fontFamily: "Oswald, sans-serif" }}>
            От хаоса к системе <span className="gradient-text-orange">за 2 недели</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => <ProcessCard key={s.n} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: "", phone: "", company: "" });

  return (
    <section id="контакты" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--dark-bg) 0%, #090912 100%)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6,214,245,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "rgba(139,92,246,0.07)" }} />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(6,214,245,0.04)" }} />

      <div className="relative max-w-4xl mx-auto px-6">
        <div ref={ref} className="reveal text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#8B5CF6" }}>Начать сейчас</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
            Получите <span className="gradient-text">бесплатный аудит</span><br />отдела продаж
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.48)" }}>Разберём ваши процессы, найдём точки потерь и дадим конкретный план. Без обязательств.</p>
        </div>

        <div className="gradient-border p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Ваше имя</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Иван Иванов"
                className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Телефон</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+7 (999) 000-00-00"
                className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Компания и сфера деятельности</label>
            <input
              type="text"
              value={form.company}
              onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
              placeholder="ООО Ромашка, продажа стройматериалов"
              className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
          <button
            className="btn-shimmer w-full text-white font-semibold py-4 rounded-xl hover:scale-[1.01] transition-transform duration-200 text-base"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #06D6F5)", boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
          >
            Получить бесплатный аудит →
          </button>
          <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { icon: "Phone", label: "+7 (495) 000-00-00" },
            { icon: "Mail", label: "hello@salespro.ru" },
            { icon: "MessageCircle", label: "Telegram / WhatsApp" },
          ].map(c => (
            <div key={c.label} className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Icon name={c.icon} size={18} fallback="Info" style={{ color: "rgba(255,255,255,0.45)" }} />
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8" style={{ background: "#090912", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8B5CF6, #06D6F5)" }}>
            <span className="text-white font-bold text-xs" style={{ fontFamily: "Oswald, sans-serif" }}>CRM</span>
          </div>
          <span className="font-semibold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>Sales<span style={{ color: "#8B5CF6" }}>Pro</span></span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>© 2024 SalesPro. Все права защищены.</p>
        <div className="flex items-center gap-5 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
          <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white/60 transition-colors">Договор оферты</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div style={{ background: "var(--dark-bg)", fontFamily: "Golos Text, sans-serif" }}>
      <Nav />
      <Hero />
      <Problems />
      <Checklist />
      <Services />
      <Cases />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}