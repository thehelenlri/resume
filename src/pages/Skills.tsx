import TechLogo from "./TechLogo";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  GitBranch,
  Palette,
  Layers,
  Terminal,
  Search,
  ArrowUpRight,
  Activity,
  Cpu,
  Sparkles,
  Brain,
  Users,
  BookOpen,
  Zap,
  Clock,
  Heart,
  X,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import "./SkillsPremium.css";

const techStack = [
  { name: "React", icon: "âš›ï¸" },
  { name: "Next.js", icon: "â–²" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "ðŸŽ¨" },
  { name: "Git", icon: "âŽ‡" },
  { name: "Vite", icon: "âš¡" },
  { name: "Node.js", icon: "ðŸŸ¢" },
  { name: "Figma", icon: "ðŸŽ­" },
];

const Skills = () => {
  const { t, dir } = useLanguage();

  const skillCategories = [
    {
      id: "frontend",
      icon: Code2,
      title: t("skills.frontend"),
      color: "cyan" as const,
      skills: [
        {
          name: "React",
          percentage: 90,
          description: t("skills.react.desc"),
          color: "cyan" as const,
        },
        {
          name: "Next.js",
          percentage: 85,
          description: t("skills.nextjs.desc"),
          color: "cyan" as const,
        },
        {
          name: "TypeScript",
          percentage: 85,
          description: t("skills.ts.desc"),
          color: "cyan" as const,
        },
      ],
    },
    {
      id: "styling",
      icon: Palette,
      title: t("skills.styling"),
      color: "purple" as const,
      skills: [
        {
          name: "Tailwind CSS",
          percentage: 95,
          description: t("skills.tailwind.desc"),
          color: "purple" as const,
        },
        {
          name: "CSS / SCSS",
          percentage: 88,
          description: t("skills.css.desc"),
          color: "purple" as const,
        },
        {
          name: "Framer Motion",
          percentage: 75,
          description: t("skills.framer.desc"),
          color: "purple" as const,
        },
      ],
    },
    {
      id: "tools",
      icon: GitBranch,
      title: t("skills.tools"),
      color: "emerald" as const,
      skills: [
        {
          name: "Git & GitHub",
          percentage: 85,
          description: t("skills.git.desc"),
          color: "emerald" as const,
        },
        {
          name: "API Integration",
          percentage: 80,
          description: t("skills.api.desc"),
          color: "emerald" as const,
        },
        {
          name: "Testing",
          percentage: 70,
          description: t("skills.testing.desc"),
          color: "emerald" as const,
        },
      ],
    },
  ];

  const softSkills = [
    { title: t("skills.ps"), desc: t("skills.ps.desc") },
    { title: t("skills.tc"), desc: t("skills.tc.desc") },
    { title: t("skills.fl"), desc: t("skills.fl.desc") },
    { title: t("skills.ad"), desc: t("skills.ad.desc") },
    { title: t("skills.sm"), desc: t("skills.sm.desc") },
    { title: t("skills.ue"), desc: t("skills.ue.desc") },
  ];



  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const rootRef = useRef<HTMLElement>(null);
  const isFa = dir === "rtl";

  const tr = (en: string, fa: string) => isFa ? fa : en;

  const normalizedQuery = query.trim().toLowerCase();

  const totalSkills = skillCategories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  const matches = (...values: string[]) =>
    values.some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    );

  const visibleCategories = skillCategories
    .filter((category) =>
      activeCategory === "all" ||
      activeCategory === category.id
    )
    .map((category) => {
      const skills = category.skills.filter((skill) =>
        matches(
          skill.name,
          skill.description,
          category.title
        )
      );

      if (sortBy === "highest") {
        skills.sort((a, b) => b.percentage - a.percentage);
      }

      if (sortBy === "lowest") {
        skills.sort((a, b) => a.percentage - b.percentage);
      }

      return { ...category, skills };
    })
    .filter((category) => category.skills.length > 0);

  const visibleTech = techStack.filter((tech) =>
    matches(tech.name)
  );

  const visibleSoft = softSkills.filter((skill) =>
    matches(skill.title, skill.desc)
  );

  const visibleCount = visibleCategories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  const softIcons = [
    Brain,
    Users,
    BookOpen,
    Zap,
    Clock,
    Heart,
  ];

  const stats = [
    {
      icon: Code2,
      value: totalSkills,
      label: tr("Technical skills", "مهارت های فنی"),
    },
    {
      icon: Cpu,
      value: techStack.length,
      label: tr("Technologies", "تکنولوژی ها"),
    },
    {
      icon: Layers,
      value: softSkills.length,
      label: tr("Soft skills", "مهارت های نرم"),
    },
  ];

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("all");
    setSortBy("default");
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = root.querySelectorAll<HTMLElement>(
      "[data-sp-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element, index) => {
      element.classList.add("sp-reveal");
      element.style.setProperty(
        "--sp-delay",
        `${(index % 4) * 70}ms`
      );
      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      elements.forEach((element) => {
        element.classList.remove("sp-reveal", "sp-visible");
      });
    };
  }, [query, activeCategory, sortBy, dir]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!fine || reduced) return;

    let lastCard: HTMLElement | null = null;

    const resetCard = (card: HTMLElement | null) => {
      if (!card) return;

      card.style.setProperty("--sp-rx", "0deg");
      card.style.setProperty("--sp-ry", "0deg");
      card.classList.remove("sp-card-active");
    };

    const move = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();

      root.style.setProperty(
        "--sp-mx",
        `${event.clientX - rect.left}px`
      );

      root.style.setProperty(
        "--sp-my",
        `${event.clientY - rect.top}px`
      );

      root.style.setProperty("--sp-light", "1");

      const target = event.target;

      const card = target instanceof Element
        ? target.closest<HTMLElement>("[data-sp-tilt]")
        : null;

      if (lastCard !== card) {
        resetCard(lastCard);
        lastCard = card;
      }

      if (!card) return;

      const bounds = card.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      card.style.setProperty("--sp-rx", `${(0.5 - y) * 5}deg`);
      card.style.setProperty("--sp-ry", `${(x - 0.5) * 5}deg`);
      card.style.setProperty("--sp-cx", `${x * 100}%`);
      card.style.setProperty("--sp-cy", `${y * 100}%`);

      card.classList.add("sp-card-active");
    };

    const leave = () => {
      root.style.setProperty("--sp-light", "0");
      resetCard(lastCard);
      lastCard = null;
    };

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);

    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      leave();
    };
  }, []);

  return (
    <main className="sp-root" dir={dir} ref={rootRef}>

      <div className="sp-grid-bg" aria-hidden="true" />
      <div className="sp-ambient" aria-hidden="true" />
      <div className="sp-spotlight" aria-hidden="true" />

      <div className="sp-container">

        <div className="sp-breadcrumb">
          <Link to="/">{t("nav.home")}</Link>
          <span>/</span>
          <span>{t("nav.skills")}</span>

          <span className="sp-page-index" dir="ltr">
            03 / SKILLS
          </span>
        </div>

        <section className="sp-hero">

          <div className="sp-hero-intro">

            <div className="sp-eyebrow">
              <span className="sp-live-dot" />
              <Terminal size={15} />
              {t("skills.badge")}
            </div>

            <h1>
              {t("skills.title")}{" "}
              <span className="sp-gradient">
                {t("skills.highlight")}
              </span>
              <span className="sp-accent">.</span>
            </h1>

            <p>{t("skills.subtitle")}</p>

          </div>

          <div className="sp-summary">

            <div className="sp-summary-header">
              <div className="sp-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span dir="ltr">skills.overview</span>
              <Activity size={17} />
            </div>

            <div className="sp-summary-grid">

              {stats.map((stat) => (
                <article
                  className="sp-stat sp-tilt"
                  key={stat.label}
                  data-sp-tilt
                >
                  <stat.icon size={21} />

                  <strong dir="ltr">
                    {String(stat.value).padStart(2, "0")}
                  </strong>

                  <span>{stat.label}</span>
                </article>
              ))}

            </div>

            <div className="sp-summary-bottom">
              <span className="sp-live-dot" />
              {tr(
                "Technical expertise & capabilities",
                "تخصص و توانمندی های فنی"
              )}
            </div>

          </div>

        </section>

        <section className="sp-technical">

          <div className="sp-section-heading">
            <div>
              <div className="sp-mini-label">
                <Code2 size={16} />
                {tr("EXPERTISE", "تخصص")}
              </div>

              <h2>
                {tr("Technical", "مهارت های")}{" "}
                <span className="sp-gradient">
                  {tr("Skills", "فنی")}
                </span>
              </h2>
            </div>

            <span className="sp-section-index" dir="ltr">
              01 / TECHNICAL
            </span>
          </div>

          <div className="sp-control-panel">

            <div className="sp-control-top">

              <div className="sp-search">
                <Search size={19} />

                <input
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder={tr(
                    "Search skills & technologies...",
                    "جستجوی مهارت ها و تکنولوژی ها..."
                  )}
                  aria-label={tr("Search skills", "جستجوی مهارت")}
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label={tr("Clear search", "پاک کردن جستجو")}
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <select
                className="sp-sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                aria-label={tr("Sort skills", "مرتب سازی مهارت ها")}
              >
                <option value="default">
                  {tr("Default order", "ترتیب پیش فرض")}
                </option>
                <option value="highest">
                  {tr("Highest proficiency", "بیشترین درصد تسلط")}
                </option>
                <option value="lowest">
                  {tr("Lowest proficiency", "کمترین درصد تسلط")}
                </option>
              </select>

            </div>

            <div className="sp-control-bottom">

              <div className="sp-filters">

                <button
                  type="button"
                  aria-pressed={activeCategory === "all"}
                  className={activeCategory === "all"
                    ? "sp-filter sp-filter-active"
                    : "sp-filter"}
                  onClick={() => setActiveCategory("all")}
                >
                  <Layers size={15} />
                  {tr("All skills", "همه مهارت ها")}
                </button>

                {skillCategories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    aria-pressed={activeCategory === category.id}
                    className={
                      activeCategory === category.id
                        ? "sp-filter sp-filter-active"
                        : "sp-filter"
                    }
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <category.icon size={15} />
                    {category.title}
                  </button>
                ))}

              </div>

              <span className="sp-result-count" aria-live="polite">
                {visibleCount} / {totalSkills}{" "}
                {tr("skills", "مهارت")}
              </span>

            </div>

          </div>

          <div className="sp-category-grid">

            {visibleCategories.map((category, index) => (
              <article
                key={category.id}
                className="sp-category"
                data-sp-reveal
              >

                <div className="sp-category-header">

                  <div className="sp-icon">
                    <category.icon size={24} />
                  </div>

                  <div className="sp-category-title">
                    <h3>{category.title}</h3>
                    <span>
                      {category.skills.length}{" "}
                      {tr("Skills", "مهارت")}
                    </span>
                  </div>

                  <span className="sp-card-number">
                    0{index + 1}
                  </span>

                </div>

                <div className="sp-skill-list">

                  {category.skills.map((skill) => (
                    <div
                      className="sp-skill sp-tilt"
                      key={skill.name}
                      data-sp-tilt
                    >

                      <div className="sp-skill-header">
                        <h4 dir="ltr">{skill.name}</h4>
                        <strong dir="ltr">
                          {skill.percentage}
                          <small>%</small>
                        </strong>
                      </div>

                      <div
                        className="sp-progress"
                        role="progressbar"
                        aria-label={skill.name}
                        aria-valuenow={skill.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="sp-progress-fill"
                          style={{
                            width: `${skill.percentage}%`
                          }}
                        />
                      </div>

                      <div
                        className="sp-progress-scale"
                        dir="ltr"
                        aria-hidden="true"
                      >
                        <span>0</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                      </div>

                      <p>{skill.description}</p>

                    </div>
                  ))}

                </div>
              </article>
            ))}

            {!visibleCategories.length && (
              <div className="sp-empty">
                <Search size={32} />

                <h3>
                  {tr(
                    "No matching skills",
                    "مهارتی پیدا نشد"
                  )}
                </h3>

                <button
                  type="button"
                  className="sp-reset"
                  onClick={resetFilters}
                >
                  {tr("Reset filters", "حذف فیلترها")}
                </button>
              </div>
            )}

          </div>

        </section>

        <section className="sp-stack">

          <div className="sp-section-heading" data-sp-reveal>
            <div>
              <div className="sp-mini-label">
                <Cpu size={16} />
                {t("skills.stack.badge")}
              </div>

              <h2>
                {t("skills.stack.title")}{" "}
                <span className="sp-gradient">
                  {t("skills.stack.highlight")}
                </span>
              </h2>

              <p>{t("skills.stack.subtitle")}</p>
            </div>

            <span className="sp-section-index" dir="ltr">
              02 / STACK
            </span>
          </div>

          <div className="sp-tech-grid">

            {visibleTech.map((tech, index) => (
              <article
                className="sp-tech sp-tilt"
                key={tech.name}
                data-sp-tilt
                data-sp-reveal
              >

                <div className="sp-tech-top">
                  <span className="sp-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight size={15} />
                </div>

                <div className="sp-tech-symbol">
                  <TechLogo name={tech.name} />
                </div>

                <h3 dir="ltr">{tech.name}</h3>

                <div className="sp-tech-line" />

              </article>
            ))}

            {!visibleTech.length && (
              <div className="sp-empty">
                {tr(
                  "No matching technologies",
                  "تکنولوژی مورد نظر پیدا نشد"
                )}
              </div>
            )}

          </div>

        </section>

        <section className="sp-soft">

          <div className="sp-section-heading" data-sp-reveal>
            <div>
              <div className="sp-mini-label">
                <Sparkles size={16} />
                {tr(
                  "PROFESSIONAL CAPABILITIES",
                  "توانمندی های حرفه ای"
                )}
              </div>

              <h2>{t("skills.soft.title")}</h2>
            </div>

            <span className="sp-section-index" dir="ltr">
              03 / SOFT SKILLS
            </span>
          </div>

          <div className="sp-soft-grid">

            {visibleSoft.map((skill) => {
              const Icon = softIcons[
                softSkills.indexOf(skill) % softIcons.length
              ];

              return (
                <article
                  className="sp-soft-card sp-tilt"
                  key={skill.title}
                  data-sp-tilt
                  data-sp-reveal
                >
                  <div className="sp-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                </article>
              );
            })}

            {!visibleSoft.length && (
              <div className="sp-empty">
                {tr(
                  "No matching soft skills",
                  "مهارت نرم مورد نظر پیدا نشد"
                )}
              </div>
            )}

          </div>
        </section>

        <section className="sp-final" data-sp-reveal>

          <Code2
            className="sp-final-decoration"
            size={250}
            strokeWidth={0.5}
            aria-hidden="true"
          />

          <div className="sp-final-icon">
            <Terminal size={30} />
          </div>

          <h2>
            {tr("Skills into", "از مهارت تا")}{" "}
            <span className="sp-gradient">
              {tr("Real Projects", "پروژه های واقعی")}
            </span>
          </h2>

          <p>
            {tr(
              "Explore how I apply these technologies in my projects.",
              "ببینید چگونه از این تکنولوژی ها در پروژه هایم استفاده می کنم."
            )}
          </p>

          <Link to="/projects" className="sp-primary">
            {t("nav.projects")}
            <ArrowUpRight size={19} />
          </Link>

        </section>

      </div>
    </main>
  );
};

export default Skills;

