import { R } from "@/components/shared";

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

// ─── Qual ─────────────────────────────────────────────────────────────────────
export function Qual() {
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
export function Challenge() {
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
export function Team() {
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
export function Process() {
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
export function Honesty() {
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
export function Pricing({ onConsult }: { onConsult: () => void }) {
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
