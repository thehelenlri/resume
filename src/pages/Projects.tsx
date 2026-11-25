import ProjectPreview from "./ProjectPreview";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Search,
  FolderCode,
  Layers,
  Monitor,
  Globe2,
  Star,
  Terminal,
  Code2,
  Activity,
  CheckCircle2,
  Target,
  X,
  Sparkles,
  Trees,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

import architectureImage from "@/assets/proj-architecture.jpg";
import DigisedaImage from "@/assets/proj-digiseda.jpg";
import cinemapediaImage from "@/assets/project-cinemapedia.jpg";

import "./ProjectsPremium.css";

const Projects = () => {
  const { t, dir } = useLanguage();
  const isFa = dir === "rtl";

  const tr = (en: string, fa: string) =>
    isFa ? fa : en;

const projects = [
    {
      title: t("proj.arch.title"),
      description: t("proj.arch.desc"),
      longDescription: t("proj.arch.long"),
      image: architectureImage,
      techs: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      liveUrl: "https://architecture-blond-zeta.vercel.app/",
      challenge: t("proj.arch.challenge"),
      outcome: t("proj.arch.outcome"),
      featured: true,
    },
    {
      title: t("proj.digi.title"),
      description: t("proj.digi.desc"),
      longDescription: t("proj.digi.long"),
      image: DigisedaImage,
      techs: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
      liveUrl: "https://digi-seda.vercel.app/",
      challenge: t("proj.digi.challenge"),
      outcome: t("proj.digi.outcome"),
      featured: true,
    },
    {
      title: t("proj.cine.title"),
      description: t("proj.cine.desc"),
      longDescription: t("proj.cine.long"),
      image: cinemapediaImage,
      techs: ["React", "TypeScript", "TMDB API", "Tailwind CSS"],
      liveUrl: "https://cinemapedia-nu.vercel.app/",
      challenge: t("proj.cine.challenge"),
      outcome: t("proj.cine.outcome"),
      featured: false,
    },
  ];



  const woodnest = {
    title: "WoodNest / Nexa Admin",

    description: tr(
      "A modern accommodation website with a dedicated administration dashboard.",
      "وب سایت مدرن معرفی اقامتگاه ها همراه با پنل مدیریت اختصاصی."
    ),

    longDescription: tr(
      "WoodNest combines an accommodation-focused public website with Nexa Admin, a dedicated administrative interface. The project brings together responsive layouts, reusable components, and modern frontend development with React and TypeScript.",
      "WoodNest یک وب سایت عمومی با محوریت اقامتگاه ها است که در کنار پنل مدیریت اختصاصی Nexa Admin توسعه داده شده است. این پروژه ترکیبی از طراحی واکنش گرا، کامپوننت های قابل استفاده مجدد و توسعه مدرن فرانت اند با React و TypeScript است."
    ),

    image: "/projects/woodnest-preview.jpg",

    techs: ["React", "TypeScript", "Vite"],

    liveUrl: "https://woodnest-nexa.vercel.app/",

    challenge: tr(
      "Designing a consistent interface for both the public website and the administration dashboard.",
      "طراحی رابط کاربری هماهنگ برای وب سایت عمومی و پنل مدیریت."
    ),

    outcome: tr(
      "A deployed project combining a public-facing website and an administrative interface.",
      "یک پروژه منتشر شده شامل وب سایت عمومی و رابط کاربری مدیریت."
    ),

    featured: true,
  };

  const allProjects = [...projects, woodnest];

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string[]>([]);


  const rootRef = useRef<HTMLElement>(null);

  const technologies = Array.from(
    new Set(allProjects.flatMap((project) => project.techs))
  );

  const featuredCount = allProjects.filter(
    (project) => project.featured
  ).length;

  const liveCount = allProjects.filter(
    (project) => project.liveUrl
  ).length;

  const stats = [
    {
      icon: FolderCode,
      value: allProjects.length,
      label: tr("Projects", "پروژه ها"),
    },
    {
      icon: Star,
      value: featuredCount,
      label: tr("Featured", "پروژه های ویژه"),
    },
    {
      icon: Globe2,
      value: liveCount,
      label: tr("Live websites", "وب سایت های آنلاین"),
    },
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const visibleProjects = allProjects.filter((project) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "featured" && project.featured) ||
      project.techs.includes(filter);

    const matchesQuery = [
      project.title,
      project.description,
      project.longDescription,
      ...project.techs,
    ].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    );

    return matchesFilter && matchesQuery;
  });

  const openDetails = (title: string) => {
    setExpanded((previous) =>
      previous.includes(title)
        ? previous.filter((item) => item !== title)
        : [...previous, title]
    );
  };

  const showDetails = (title: string) => {
    setExpanded((previous) =>
      previous.includes(title)
        ? previous
        : [...previous, title]
    );

    const index = allProjects.findIndex(
      (project) => project.title === title
    );

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    requestAnimationFrame(() => {
      document.getElementById(
        `pp-project-detail-${index}`
      )?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) return;

    if (!("IntersectionObserver" in window)) return;

    const elements = root.querySelectorAll<HTMLElement>(
      "[data-pp-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    elements.forEach((element, index) => {
      element.classList.add("pp-reveal");

      element.style.setProperty(
        "--pp-delay",
        `${(index % 4) * 65}ms`
      );

      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      elements.forEach((element) => {
        element.classList.remove(
          "pp-reveal",
          "pp-visible"
        );
      });
    };
  }, [query, filter, dir]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ||
      !window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches
    ) return;

    let activeCard: HTMLElement | null = null;

    const reset = (card: HTMLElement | null) => {
      if (!card) return;

      card.style.setProperty("--pp-rx", "0deg");
      card.style.setProperty("--pp-ry", "0deg");
      card.classList.remove("pp-card-active");
    };

    const move = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();

      root.style.setProperty(
        "--pp-mx",
        `${event.clientX - rect.left}px`
      );

      root.style.setProperty(
        "--pp-my",
        `${event.clientY - rect.top}px`
      );

      root.style.setProperty("--pp-light", "1");

      const target = event.target;

      const card = target instanceof Element
        ? target.closest<HTMLElement>("[data-pp-tilt]")
        : null;

      if (card !== activeCard) {
        reset(activeCard);
        activeCard = card;
      }

      if (!card) return;

      const bounds = card.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      card.style.setProperty("--pp-rx", `${(0.5 - y) * 3}deg`);
      card.style.setProperty("--pp-ry", `${(x - 0.5) * 3}deg`);
      card.style.setProperty("--pp-cx", `${x * 100}%`);
      card.style.setProperty("--pp-cy", `${y * 100}%`);

      card.classList.add("pp-card-active");
    };

    const leave = () => {
      root.style.setProperty("--pp-light", "0");
      reset(activeCard);
      activeCard = null;
    };

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);

    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      leave();
    };
  }, []);

  const renderPreview = (
    project: typeof allProjects[number],
    large = false
  ) => (
    <ProjectPreview
      title={project.title}
      url={project.liveUrl}
      fallback={
        project.liveUrl === woodnest.liveUrl
          ? undefined
          : project.image
      }
      large={large}
      isFa={isFa}
    />
  );

  const renderTechs = (techs: string[]) => (
    <div className="pp-techs">
      {techs.map((tech) => (
        <span key={tech} dir="ltr">
          <span className="pp-tech-dot" />
          {tech}
        </span>
      ))}
    </div>
  );

  return (
    <main className="pp-root" dir={dir} ref={rootRef}>

      <div className="pp-grid-bg" aria-hidden="true" />
      <div className="pp-ambient" aria-hidden="true" />
      <div className="pp-spotlight" aria-hidden="true" />

      <div className="pp-container">

        <div className="pp-breadcrumb">
          <Link to="/">{t("nav.home")}</Link>
          <span>/</span>
          <span>{t("nav.projects")}</span>

          <span className="pp-page-index" dir="ltr">
            04 / PROJECTS
          </span>
        </div>

        <section className="pp-hero">

          <div className="pp-hero-intro">

            <div className="pp-eyebrow">
              <span className="pp-live-dot" />
              <Terminal size={14} />
              {t("projects.badge")}
            </div>

            <h1>
              {t("projects.title")}{" "}
              <span className="pp-gradient">
                {t("projects.highlight")}
              </span>
              <span className="pp-accent">.</span>
            </h1>

            <p>{t("projects.subtitle")}</p>

          </div>

          <div className="pp-summary">

            <div className="pp-summary-header">
              <div className="pp-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span dir="ltr">portfolio.overview</span>
              <Activity size={17} />
            </div>

            <div className="pp-summary-grid">

              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="pp-stat pp-tilt"
                  data-pp-tilt
                >
                  <stat.icon size={22} />

                  <strong dir="ltr">
                    {String(stat.value).padStart(2, "0")}
                  </strong>

                  <span>{stat.label}</span>
                </article>
              ))}

            </div>

            <div className="pp-summary-bottom">
              <span className="pp-live-dot" />

              {tr(
                "Selected portfolio projects",
                "مجموعه نمونه کارهای منتخب"
              )}
            </div>
          </div>
        </section>

        <section className="pp-showcase" data-pp-reveal>

          <div className="pp-section-heading">

            <div>
              <div className="pp-mini-label">
                <Sparkles size={16} />
                {tr("PROJECT SPOTLIGHT", "پروژه شاخص")}
              </div>

              <h2>
                {tr("Featured", "نمونه کار")}{" "}
                <span className="pp-gradient">
                  {tr("Showcase", "ویژه")}
                </span>
              </h2>
            </div>

            <span className="pp-section-index" dir="ltr">
              01 / SPOTLIGHT
            </span>
          </div>

          <article className="pp-spotlight-card">

            <div className="pp-spotlight-media">
              {renderPreview(woodnest, true)}
            </div>

            <div className="pp-spotlight-content">

              <div className="pp-featured-badge">
                <Star size={13} />
                {t("projects.featured")}
              </div>

              <span className="pp-project-number" dir="ltr">
                PROJECT / 04
              </span>

              <h2>WoodNest<span>.</span></h2>

              <div className="pp-spotlight-subtitle">
                <LayoutDashboard size={17} />
                Nexa Admin
              </div>

              <p>{woodnest.description}</p>

              <div className="pp-woodnest-capabilities">

                <div>
                  <Monitor size={20} />

                  <span>
                    {tr("Public website", "وب سایت عمومی")}
                  </span>
                </div>

                <div>
                  <LayoutDashboard size={20} />

                  <span>
                    {tr("Admin panel", "پنل مدیریت")}
                  </span>
                </div>

              </div>

              {renderTechs(woodnest.techs)}

              <div className="pp-actions">

                <a
                  className="pp-button pp-primary"
                  href={woodnest.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("projects.viewLive")}
                  <ArrowUpRight size={18} />
                </a>

                <button
                  className="pp-button pp-secondary"
                  type="button"
                  onClick={() => showDetails(woodnest.title)}
                >
                  {tr("Project details", "جزئیات پروژه")}
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>

          </article>
        </section>

        <section className="pp-projects">

          <div className="pp-section-heading" data-pp-reveal>

            <div>
              <div className="pp-mini-label">
                <FolderCode size={16} />
                {tr("PROJECT COLLECTION", "مجموعه نمونه کارها")}
              </div>

              <h2>
                {tr("Explore", "مشاهده")}{" "}
                <span className="pp-gradient">
                  {tr("My Work", "پروژه ها")}
                </span>
              </h2>
            </div>

            <span className="pp-section-index" dir="ltr">
              02 / COLLECTION
            </span>
          </div>

          <div className="pp-filter-panel">

            <div className="pp-search">
              <Search size={19} />

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder={tr(
                  "Search projects or technologies...",
                  "جستجوی پروژه ها یا تکنولوژی ها..."
                )}
                aria-label={tr(
                  "Search projects",
                  "جستجوی پروژه ها"
                )}
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={tr("Clear", "پاک کردن")}
                >
                  <X size={17} />
                </button>
              )}

              <span className="pp-search-shortcut" dir="ltr">
                SEARCH
              </span>
            </div>

            <div className="pp-filter-bottom">

              <div className="pp-filters">

                {[
                  {
                    value: "all",
                    label: tr("All projects", "همه پروژه ها"),
                  },
                  {
                    value: "featured",
                    label: t("projects.featured"),
                  },
                  ...technologies.map((tech) => ({
                    value: tech,
                    label: tech,
                  })),
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={filter === item.value}
                    className={`pp-filter${
                      filter === item.value
                        ? " pp-filter-active"
                        : ""
                    }`}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.value === "all" && <Layers size={14} />}
                    {item.value === "featured" && <Star size={14} />}
                    {item.label}
                  </button>
                ))}

              </div>

              <span
                className="pp-result-count"
                aria-live="polite"
              >
                {visibleProjects.length} / {allProjects.length}
              </span>
            </div>
          </div>

          <div className="pp-card-grid">

            {visibleProjects.map((project) => (
              <article
                key={project.title}
                className="pp-card pp-tilt"
                data-pp-tilt
                data-pp-reveal
              >
                <div className="pp-card-top">

                  <span dir="ltr">
                    PROJECT / {
                      String(allProjects.indexOf(project) + 1)
                        .padStart(2, "0")
                    }
                  </span>

                  {project.featured && (
                    <span className="pp-featured-small">
                      <Star size={12} />
                      {t("projects.featured")}
                    </span>
                  )}
                </div>

                {renderPreview(project)}

                <div className="pp-card-content">

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  {renderTechs(project.techs)}

                  <div className="pp-card-actions">

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-card-live"
                    >
                      <Globe2 size={15} />
                      {t("projects.viewLive")}
                      <ArrowUpRight size={15} />
                    </a>

                    <button
                      type="button"
                      className="pp-detail-button"
                      onClick={() => showDetails(project.title)}
                      aria-label={tr(
                        "Project details",
                        "جزئیات پروژه"
                      )}
                      title={tr(
                        "Project details",
                        "جزئیات پروژه"
                      )}
                    >
                      <Layers size={17} />
                    </button>
                  </div>

                </div>
              </article>
            ))}

            {!visibleProjects.length && (
              <div className="pp-empty">

                <Search size={34} />

                <h3>
                  {tr(
                    "No matching projects",
                    "پروژه ای پیدا نشد"
                  )}
                </h3>

                <button
                  type="button"
                  className="pp-button pp-secondary"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                >
                  {tr("Reset filters", "حذف فیلترها")}
                </button>

              </div>
            )}

          </div>
        </section>

        <section className="pp-deep-dives">

          <div className="pp-section-heading" data-pp-reveal>

            <div>
              <div className="pp-mini-label">
                <Terminal size={16} />
                {t("projects.details.badge")}
              </div>

              <h2>
                {t("projects.details.title")}{" "}
                <span className="pp-gradient">
                  {t("projects.details.highlight")}
                </span>
              </h2>

              <p>{t("projects.details.subtitle")}</p>
            </div>

            <span className="pp-section-index" dir="ltr">
              03 / CASE STUDIES
            </span>
          </div>

          <div className="pp-case-list">

            {allProjects.map((project, index) => {
              const isOpen = expanded.includes(project.title);

              return (
                <article
                  key={project.title}
                  id={`pp-project-detail-${index}`}
                  className={`pp-case${isOpen ? " pp-case-open" : ""}`}
                  data-pp-reveal
                >

                  <button
                    type="button"
                    className="pp-case-header"
                    onClick={() => openDetails(project.title)}
                    aria-expanded={isOpen}
                    aria-controls={`pp-case-content-${index}`}
                  >
                    <span className="pp-case-number" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="pp-case-icon">
                      <Code2 size={21} />
                    </div>

                    <div className="pp-case-title">
                      <h3>{project.title}</h3>
                      <span dir="ltr">
                        {project.techs.join(" / ")}
                      </span>
                    </div>

                    <div className="pp-case-chevron">
                      <ChevronDown size={21} />
                    </div>

                  </button>

                  <div
                    id={`pp-case-content-${index}`}
                    className="pp-case-expand"

                    hidden={!isOpen}
                  >

                    <div className="pp-case-inner">

                      <div className="pp-case-media">
                        {renderPreview(project)}
                        {renderTechs(project.techs)}
                      </div>

                      <div className="pp-case-info">

                        <p className="pp-case-description">
                          {project.longDescription}
                        </p>

                        <div className="pp-case-block">
                          <div className="pp-case-block-title">
                            <Target size={17} />
                            {t("projects.challenge")}
                          </div>

                          <p>{project.challenge}</p>
                        </div>

                        <div className="pp-case-block">
                          <div className="pp-case-block-title">
                            <CheckCircle2 size={17} />
                            {t("projects.outcome")}
                          </div>

                          <p>{project.outcome}</p>
                        </div>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pp-button pp-primary"
                        >
                          {t("projects.viewLive")}
                          <ExternalLink size={17} />
                        </a>

                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

          </div>
        </section>

        <section className="pp-final" data-pp-reveal>

          <Code2
            size={250}
            strokeWidth={0.5}
            className="pp-final-decoration"
            aria-hidden="true"
          />

          <div className="pp-final-icon">
            <Sparkles size={31} />
          </div>

          <h2>
            {t("home.cta")}{" "}
            <span className="pp-gradient">
              {t("home.ctaHighlight")}
            </span>{" "}
            {t("home.ctaTail")}
          </h2>

          <p>{t("home.ctaDesc")}</p>

          <Link
            to="/contact"
            className="pp-button pp-primary"
          >
            {t("home.ctaBtn")}
            <ArrowUpRight size={18} />
          </Link>

        </section>

      </div>
    </main>
  );
};

export default Projects;

