import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Award,
  TrendingUp,
  Users,
  Code2,
  Zap,
  Terminal,
  Activity,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Layers,
  Sparkles,
  Clock,
  ChevronDown,
  Search,
  X,
  GitBranch,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import "./ExperiencePremium.css";

const Experience = () => {
  const { t, dir } = useLanguage();

  const isFa = dir === "rtl";
  const tr = (en: string, fa: string) =>
    isFa ? fa : en;

  const rootRef = useRef<HTMLElement>(null);

  const highlights = [
    {
      icon: Code2,
      title: t("exp.h1.title"),
      desc: t("exp.h1.desc"),
      color: "text-[hsl(186_100%_42%)] bg-[hsl(186_100%_42%/0.1)]",
    },
    {
      icon: TrendingUp,
      title: t("exp.h2.title"),
      desc: t("exp.h2.desc"),
      color: "text-[hsl(107_11.4%_58.8%))] bg-[hsl(264_80%_60%/0.1)]",
    },
    {
      icon: Users,
      title: t("exp.h3.title"),
      desc: t("exp.h3.desc"),
      color: "text-[hsl(0_0.0%_79.6%)] bg-[hsl(160_84%_39%/0.1)]",
    },
    {
      icon: Zap,
      title: t("exp.h4.title"),
      desc: t("exp.h4.desc"),
      color: "text-[hsl(45_100%_60%)] bg-[hsl(45_100%_60%/0.1)]",
    },
  ];

  const responsibilities = [
    t("exp.r1"),
    t("exp.r2"),
    t("exp.r3"),
    t("exp.r4"),
    t("exp.r5"),
    t("exp.r6"),
    t("exp.r7"),
    t("exp.r8"),
  ];

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "SCSS",
    "Git",
    "GitHub",
    "REST API",
    "React Query",
    "Vite",
    "Webpack",
    "Figma",
    "Jira",
    "Vercel",
  ];

  const experiences = [
    {
      period: t("exp.y2022"),
      role: t("exp.role2022"),
      desc: t("exp.desc2022"),
    },
    {
      period: t("exp.y2023"),
      role: t("exp.role2023"),
      desc: t("exp.desc2023"),
    },
    {
      period: t("exp.y2024"),
      role: t("exp.role2024"),
      desc: t("exp.desc2024"),
    },
  ];



  const [activeYear, setActiveYear] =
    useState<number | null>(null);

  const [techQuery, setTechQuery] = useState("");

  const [showResponsibilities, setShowResponsibilities] =
    useState(true);

  const [showTechnologies, setShowTechnologies] =
    useState(true);

  const filteredTech = technologies.filter((tech) =>
    tech.toLowerCase().includes(
      techQuery.trim().toLowerCase()
    )
  );

  const stats = [
    {
      icon: GitBranch,
      value: experiences.length,
      label: tr("Career stages", "مراحل مسیر شغلی"),
    },
    {
      icon: CheckCircle2,
      value: responsibilities.length,
      label: tr("Responsibilities", "مسئولیت ها"),
    },
    {
      icon: Layers,
      value: technologies.length,
      label: tr("Technologies", "تکنولوژی ها"),
    },
  ];

  const navigateYear = (index: number) => {
    setActiveYear(index);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById(
      `ep-career-${index}`
    )?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const cleanup: Array<() => void> = [];

    if ("IntersectionObserver" in window) {
      const elements = root.querySelectorAll<HTMLElement>(
        "[data-ep-reveal]"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("ep-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.08 }
      );

      elements.forEach((element, index) => {
        element.classList.add("ep-reveal");

        element.style.setProperty(
          "--ep-delay",
          `${(index % 3) * 80}ms`
        );

        observer.observe(element);
      });

      cleanup.push(() => {
        observer.disconnect();

        elements.forEach((element) => {
          element.classList.remove(
            "ep-reveal",
            "ep-visible"
          );
        });
      });
    }

    if (
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches
    ) {
      let currentCard: HTMLElement | null = null;

      const reset = (card: HTMLElement | null) => {
        if (!card) return;

        card.style.setProperty("--ep-rx", "0deg");
        card.style.setProperty("--ep-ry", "0deg");
        card.classList.remove("ep-card-active");
      };

      const move = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();

        root.style.setProperty(
          "--ep-mx",
          `${event.clientX - rect.left}px`
        );

        root.style.setProperty(
          "--ep-my",
          `${event.clientY - rect.top}px`
        );

        root.style.setProperty("--ep-light", "1");

        const target = event.target;

        const card = target instanceof Element
          ? target.closest<HTMLElement>("[data-ep-tilt]")
          : null;

        if (card !== currentCard) {
          reset(currentCard);
          currentCard = card;
        }

        if (!card) return;

        const bounds = card.getBoundingClientRect();

        const x =
          (event.clientX - bounds.left) / bounds.width;

        const y =
          (event.clientY - bounds.top) / bounds.height;

        card.style.setProperty(
          "--ep-rx",
          `${(0.5 - y) * 4}deg`
        );

        card.style.setProperty(
          "--ep-ry",
          `${(x - 0.5) * 4}deg`
        );

        card.style.setProperty("--ep-cx", `${x * 100}%`);
        card.style.setProperty("--ep-cy", `${y * 100}%`);

        card.classList.add("ep-card-active");
      };

      const leave = () => {
        root.style.setProperty("--ep-light", "0");
        reset(currentCard);
        currentCard = null;
      };

      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);

      cleanup.push(() => {
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", leave);
        leave();
      });
    }

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, []);

  return (
    <main className="ep-root" dir={dir} ref={rootRef}>

      <div className="ep-grid-bg" aria-hidden="true" />
      <div className="ep-ambient" aria-hidden="true" />
      <div className="ep-spotlight" aria-hidden="true" />

      <div className="ep-container">

        <nav
          className="ep-breadcrumb"
          aria-label={tr("Breadcrumb", "مسیر صفحه")}
        >
          <Link to="/">{t("nav.home")}</Link>
          <span>/</span>
          <span aria-current="page">
            {t("nav.experience")}
          </span>

          <span className="ep-page-index" dir="ltr">
            05 / EXPERIENCE
          </span>
        </nav>

        <section className="ep-hero">

          <div className="ep-hero-intro">

            <div className="ep-eyebrow">
              <span className="ep-live-dot" />
              <Terminal size={15} />
              {t("exp.badge")}
            </div>

            <h1>
              {t("exp.title")}{" "}
              <span className="ep-gradient">
                {t("exp.highlight")}
              </span>
              <span className="ep-accent">.</span>
            </h1>

            <p>{t("exp.subtitle")}</p>

            <Link to="/resume" className="ep-button ep-secondary">
              {t("nav.resume")}
              <ArrowUpRight size={17} />
            </Link>

          </div>

          <div className="ep-summary">

            <div className="ep-window-header">

              <div className="ep-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span dir="ltr">career.overview</span>

              <Activity size={18} />
            </div>

            <div className="ep-summary-body">

              <div className="ep-company-mini">

                <div className="ep-icon">
                  <Building2 size={24} />
                </div>

                <div>
                  <span className="ep-muted-label">
                    {t("exp.type")}
                  </span>

                  <h3>{t("exp.company")}</h3>

                  <p>{t("exp.role")}</p>
                </div>

                <span className="ep-live-dot" />

              </div>

              <div className="ep-stat-grid">

                {stats.map((stat) => (
                  <article
                    className="ep-stat ep-tilt"
                    key={stat.label}
                    data-ep-tilt
                  >
                    <stat.icon size={20} />

                    <strong dir="ltr">
                      {String(stat.value).padStart(2, "0")}
                    </strong>

                    <span>{stat.label}</span>
                  </article>
                ))}

              </div>

              <div className="ep-summary-footer">
                <Clock size={14} />
                {t("exp.period")}
              </div>

            </div>
          </div>
        </section>

        <section className="ep-current" data-ep-reveal>

          <div className="ep-section-heading">

            <div>
              <div className="ep-mini-label">
                <Briefcase size={16} />
                {tr("PROFESSIONAL EXPERIENCE", "تجربه حرفه ای")}
              </div>

              <h2>
                {tr("Career", "تجربه")}{" "}
                <span className="ep-gradient">
                  {tr("Overview", "کاری")}
                </span>
              </h2>
            </div>

            <span className="ep-section-index" dir="ltr">
              01 / OVERVIEW
            </span>
          </div>

          <article className="ep-employment">

            <div className="ep-employment-bg" />

            <Building2
              className="ep-employment-decoration"
              size={240}
              strokeWidth={0.6}
              aria-hidden="true"
            />

            <div className="ep-employment-top">

              <div className="ep-company-logo">
                <span>
                  {t("exp.company").charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="ep-employment-identity">

                <div className="ep-company-name">
                  <Building2 size={15} />
                  {t("exp.company")}
                </div>

                <h2>{t("exp.role")}</h2>

                <p>{t("exp.type")}</p>

              </div>

              <div className="ep-employment-status">

                <span className="ep-status-badge">
                  <span className="ep-live-dot" />
                  {t("exp.active")}
                </span>

                <span className="ep-period">
                  <CalendarDays size={16} />
                  {t("exp.period")}
                </span>

              </div>

            </div>

            <div className="ep-employment-bottom">

              <div className="ep-meta-item">
                <GitBranch size={19} />

                <div>
                  <strong>{experiences.length}</strong>

                  <span>
                    {tr("Career stages", "مراحل مسیر شغلی")}
                  </span>
                </div>
              </div>

              <div className="ep-meta-item">
                <CheckCircle2 size={19} />

                <div>
                  <strong>{responsibilities.length}</strong>

                  <span>
                    {tr("Responsibilities", "مسئولیت ها")}
                  </span>
                </div>
              </div>

              <div className="ep-meta-item">
                <Code2 size={19} />

                <div>
                  <strong>{technologies.length}</strong>

                  <span>
                    {tr("Technologies", "تکنولوژی ها")}
                  </span>
                </div>
              </div>

            </div>
          </article>
        </section>

        <section className="ep-timeline-section">

          <div className="ep-section-heading" data-ep-reveal>

            <div>
              <div className="ep-mini-label">
                <GitBranch size={16} />
                {tr("CAREER PROGRESSION", "پیشرفت شغلی")}
              </div>

              <h2>
                {tr("Career", "مسیر")}{" "}
                <span className="ep-gradient">
                  {tr("Timeline", "حرفه ای")}
                </span>
              </h2>
            </div>

            <span className="ep-section-index" dir="ltr">
              02 / TIMELINE
            </span>
          </div>

          <div className="ep-timeline-nav">

            {experiences.map((item, index) => (
              <button
                type="button"
                key={index}
                className={`ep-year-button${
                  activeYear === index
                    ? " ep-year-active"
                    : ""
                }`}
                onClick={() => navigateYear(index)}
                aria-pressed={activeYear === index}
              >
                <span className="ep-year-dot" />

                <span>{item.period}</span>

                <ArrowUpRight size={15} />
              </button>
            ))}

          </div>

          <div className="ep-timeline">

            {experiences.map((item, index) => (
              <div
                className="ep-timeline-row"
                id={`ep-career-${index}`}
                key={index}
                data-ep-reveal
              >

                <div className="ep-timeline-date">

                  <span>{item.period}</span>
                  <div className="ep-date-line" />

                </div>

                <div className="ep-timeline-track">

                  <div className="ep-timeline-node">
                    {index === 0
                      ? <Code2 size={20} />
                      : index === 1
                      ? <TrendingUp size={20} />
                      : <Briefcase size={20} />}
                  </div>

                </div>

                <article
                  className={`ep-career-card ep-tilt${
                    activeYear === index
                      ? " ep-career-selected"
                      : ""
                  }`}
                  data-ep-tilt
                >

                  <div className="ep-career-top">

                    <span className="ep-career-label">
                      <CalendarDays size={13} />
                      {item.period}
                    </span>

                    <span
                      className="ep-career-number"
                      dir="ltr"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <h3>{item.role}</h3>

                  <p>{item.desc}</p>

                  <div className="ep-career-bottom">

                    <span className="ep-career-line" />

                    <span className="ep-career-caption">
                      <GitBranch size={14} />

                      {tr(
                        "Professional journey",
                        "مسیر حرفه ای"
                      )}
                    </span>

                  </div>
                </article>

              </div>
            ))}

          </div>
        </section>

        <section className="ep-responsibilities">

          <div className="ep-section-heading" data-ep-reveal>

            <div>
              <div className="ep-mini-label">
                <CheckCircle2 size={16} />
                {tr("ROLE & IMPACT", "نقش و مسئولیت")}
              </div>

              <h2>{t("exp.responsibilities")}</h2>
            </div>

            <span className="ep-section-index" dir="ltr">
              03 / RESPONSIBILITIES
            </span>

          </div>

          <div className="ep-expand-panel">

            <button
              type="button"
              className="ep-expand-header"
              aria-expanded={showResponsibilities}
              aria-controls="ep-responsibility-content"
              onClick={() =>
                setShowResponsibilities((value) => !value)
              }
            >

              <div className="ep-icon">
                <CheckCircle2 size={21} />
              </div>

              <div className="ep-expand-title">

                <strong>{t("exp.responsibilities")}</strong>

                <span>
                  {responsibilities.length}{" "}
                  {tr("items", "مورد")}
                </span>

              </div>

              <ChevronDown
                size={22}
                className={
                  showResponsibilities
                    ? "ep-chevron ep-chevron-open"
                    : "ep-chevron"
                }
              />
            </button>

            <div
              id="ep-responsibility-content"
              hidden={!showResponsibilities}
              className="ep-expand-content"
            >

              <div className="ep-responsibility-grid">

                {responsibilities.map((item, index) => (
                  <article
                    key={index}
                    className="ep-responsibility-card ep-tilt"
                    data-ep-tilt
                  >

                    <div className="ep-check">
                      <CheckCircle2 size={19} />
                    </div>

                    <p>{item}</p>

                    <span className="ep-small-number" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </article>
                ))}

              </div>
            </div>
          </div>
        </section>

        <section className="ep-technologies">

          <div className="ep-section-heading" data-ep-reveal>

            <div>
              <div className="ep-mini-label">
                <Layers size={16} />
                {tr("TECHNICAL ENVIRONMENT", "محیط فنی")}
              </div>

              <h2>{t("exp.technologies")}</h2>
            </div>

            <span className="ep-section-index" dir="ltr">
              04 / TECHNOLOGIES
            </span>
          </div>

          <div className="ep-expand-panel">

            <button
              type="button"
              className="ep-expand-header"
              aria-expanded={showTechnologies}
              aria-controls="ep-technologies-content"
              onClick={() =>
                setShowTechnologies((value) => !value)
              }
            >

              <div className="ep-icon">
                <Code2 size={22} />
              </div>

              <div className="ep-expand-title">

                <strong>{t("exp.technologies")}</strong>

                <span>
                  {technologies.length}{" "}
                  {tr("technologies", "تکنولوژی")}
                </span>

              </div>

              <ChevronDown
                size={22}
                className={
                  showTechnologies
                    ? "ep-chevron ep-chevron-open"
                    : "ep-chevron"
                }
              />

            </button>

            <div
              className="ep-expand-content"
              id="ep-technologies-content"
              hidden={!showTechnologies}
            >

              <div className="ep-tech-toolbar">

                <div className="ep-search">

                  <Search size={18} />

                  <input
                    type="search"
                    value={techQuery}
                    onChange={(event) =>
                      setTechQuery(event.target.value)
                    }
                    placeholder={tr(
                      "Search technologies...",
                      "جستجوی تکنولوژی ها..."
                    )}
                    aria-label={tr(
                      "Search technologies",
                      "جستجوی تکنولوژی ها"
                    )}
                  />

                  {techQuery && (
                    <button
                      type="button"
                      onClick={() => setTechQuery("")}
                      aria-label={tr("Clear", "پاک کردن")}
                    >
                      <X size={17} />
                    </button>
                  )}

                </div>

                <span
                  className="ep-tech-count"
                  aria-live="polite"
                  dir="ltr"
                >
                  {filteredTech.length} / {technologies.length}
                </span>

              </div>

              <div className="ep-tech-grid">

                {filteredTech.map((tech) => (
                  <article
                    key={tech}
                    className="ep-tech-card ep-tilt"
                    data-ep-tilt
                  >
                    <div className="ep-tech-icon">
                      <Code2 size={21} />
                    </div>

                    <span dir="ltr">{tech}</span>

                    <div className="ep-tech-dot" />
                  </article>
                ))}

              </div>

              {!filteredTech.length && (
                <div className="ep-empty">

                  <Search size={26} />

                  {tr(
                    "No matching technologies",
                    "تکنولوژی مورد نظر پیدا نشد"
                  )}

                </div>
              )}

            </div>
          </div>
        </section>

        <section className="ep-highlights">

          <div className="ep-section-heading" data-ep-reveal>

            <div>
              <div className="ep-mini-label">
                <Sparkles size={16} />
                {tr("PROFESSIONAL STRENGTHS", "توانمندی های حرفه ای")}
              </div>

              <h2>
                {tr("Career", "نقاط قوت")}{" "}
                <span className="ep-gradient">
                  {tr("Highlights", "حرفه ای")}
                </span>
              </h2>
            </div>

            <span className="ep-section-index" dir="ltr">
              05 / HIGHLIGHTS
            </span>
          </div>

          <div className="ep-highlight-grid">

            {highlights.map(({ icon: Icon, title, desc }, index) => (
              <article
                className="ep-highlight ep-tilt"
                key={index}
                data-ep-reveal
                data-ep-tilt
              >

                <div className="ep-highlight-top">

                  <div className="ep-icon">
                    <Icon size={25} />
                  </div>

                  <span className="ep-small-number" dir="ltr">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h3>{title}</h3>

                <p>{desc}</p>

                <div className="ep-highlight-line" />

              </article>
            ))}

          </div>
        </section>

        <section className="ep-award" data-ep-reveal>

          <div className="ep-award-grid" />

          <Award
            className="ep-award-decoration"
            size={280}
            strokeWidth={0.6}
            aria-hidden="true"
          />

          <div className="ep-award-icon">
            <div className="ep-award-ring" />
            <Award size={43} strokeWidth={1.5} />
          </div>

          <div className="ep-mini-label">
            <Sparkles size={14} />
            {tr("PROFESSIONAL RECOGNITION", "دستاورد حرفه ای")}
          </div>

          <h2>
            {t("exp.award.title")}{" "}
            <span className="ep-gradient">
              {t("exp.award.highlight")}
            </span>
          </h2>

          <p>{t("exp.award.desc")}</p>

          <div className="ep-award-line" />

        </section>

        <section className="ep-next" data-ep-reveal>

          <div className="ep-next-content">

            <div className="ep-icon">
              <Terminal size={25} />
            </div>

            <div>
              <h3>
                {tr(
                  "Explore my work",
                  "مشاهده نمونه کارهای من"
                )}
              </h3>

              <p>
                {tr(
                  "See my projects and technical expertise.",
                  "با پروژه ها و توانمندی های فنی من آشنا شوید."
                )}
              </p>
            </div>

          </div>

          <div className="ep-next-actions">

            <Link to="/projects" className="ep-button ep-primary">
              {t("nav.projects")}
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/resume" className="ep-button ep-secondary">
              {t("nav.resume")}
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Experience;
