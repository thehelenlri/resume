import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Code2,
  Terminal,
  Sparkles,
  Layers,
  Activity,
  Fingerprint,
  Compass,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import "./AboutPremium.css";

const About = () => {
  const { t, dir } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const isFa = dir === "rtl";

  const timeline = [
    {
      year: t("timeline.t1.year"),
      title: t("timeline.t1.title"),
      organization: t("timeline.t1.org"),
      description: t("timeline.t1.desc"),
      tags: ["React", "TypeScript", "Next.js", "Team Lead"],
    },
    {
      year: t("timeline.t2.year"),
      title: t("timeline.t2.title"),
      organization: t("timeline.t2.org"),
      description: t("timeline.t2.desc"),
      tags: ["React", "API Integration", "Tailwind CSS"],
    },
    {
      year: t("timeline.t3.year"),
      title: t("timeline.t3.title"),
      organization: t("timeline.t3.org"),
      description: t("timeline.t3.desc"),
      tags: ["HTML/CSS", "JavaScript", "React"],
    },
  ];

  const values = [
    {
      icon: Heart,
      label: t("about.passionDriven"),
      desc: t("about.passionDesc"),
    },
    {
      icon: Briefcase,
      label: t("about.professional"),
      desc: t("about.professionalDesc"),
    },
    {
      icon: GraduationCap,
      label: t("about.selfLearner"),
      desc: t("about.selfLearnerDesc"),
    },
  ];

  const facts = [
    {
      icon: Calendar,
      label: t("about.age"),
      value: t("about.ageVal"),
    },
    {
      icon: MapPin,
      label: t("about.location"),
      value: t("about.locationVal"),
    },
    {
      icon: Briefcase,
      label: t("about.company"),
      value: "Webcore",
    },
    {
      icon: GraduationCap,
      label: t("about.experience"),
      value: t("about.expVal"),
    },
  ];

  const interests = [
    ["UI Design", "طراحی رابط کاربری"],
    ["UX Research", "تحقیق تجربه کاربری"],
    ["Web Performance", "عملکرد وب"],
    ["Open Source", "متن باز"],
    ["Component Libraries", "کتابخانه کامپوننت ها"],
    ["Animations", "انیمیشن"],
    ["Accessibility", "دسترس پذیری"],
  ];

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduced) return;

    const cleanup: Array<() => void> = [];

    if ("IntersectionObserver" in window) {
      const elements = root.querySelectorAll<HTMLElement>(
        "[data-ap-reveal]"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("ap-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.07 }
      );

      elements.forEach((element, index) => {
        element.classList.add("ap-reveal");
        element.style.setProperty(
          "--ap-delay",
          `${(index % 3) * 75}ms`
        );
        observer.observe(element);
      });

      cleanup.push(() => {
        observer.disconnect();

        elements.forEach((element) => {
          element.classList.remove(
            "ap-reveal",
            "ap-visible"
          );
        });
      });
    }

    if (finePointer) {
      const moveRoot = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();

        root.style.setProperty(
          "--ap-mx",
          `${event.clientX - rect.left}px`
        );

        root.style.setProperty(
          "--ap-my",
          `${event.clientY - rect.top}px`
        );

        root.style.setProperty("--ap-light", "1");
      };

      const leaveRoot = () => {
        root.style.setProperty("--ap-light", "0");
      };

      root.addEventListener("pointermove", moveRoot);
      root.addEventListener("pointerleave", leaveRoot);

      cleanup.push(() => {
        root.removeEventListener("pointermove", moveRoot);
        root.removeEventListener("pointerleave", leaveRoot);
      });

      root.querySelectorAll<HTMLElement>(
        "[data-ap-tilt]"
      ).forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) / rect.width;

          const y =
            (event.clientY - rect.top) / rect.height;

          card.style.setProperty(
            "--ap-rx",
            `${(0.5 - y) * 5}deg`
          );

          card.style.setProperty(
            "--ap-ry",
            `${(x - 0.5) * 5}deg`
          );

          card.style.setProperty(
            "--ap-cx",
            `${x * 100}%`
          );

          card.style.setProperty(
            "--ap-cy",
            `${y * 100}%`
          );

          card.classList.add("ap-card-active");
        };

        const leave = () => {
          card.style.setProperty("--ap-rx", "0deg");
          card.style.setProperty("--ap-ry", "0deg");
          card.classList.remove("ap-card-active");
        };

        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);

        cleanup.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          leave();
        });
      });
    }

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [dir]);

  return (
    <main
      className="ap-root"
      dir={dir}
      ref={rootRef}
    >
      <div className="ap-grid-bg" aria-hidden="true" />
      <div className="ap-ambient" aria-hidden="true" />
      <div className="ap-spotlight" aria-hidden="true" />

      <div className="ap-container">

        <div className="ap-page-label">
          <Link to="/">{t("nav.home")}</Link>
          <span>/</span>
          <span>{t("nav.about")}</span>

          <div className="ap-page-index" dir="ltr">
            01 / PROFILE
          </div>
        </div>

        <section className="ap-hero">

          <div className="ap-intro">

            <div className="ap-eyebrow">
              <span className="ap-live-dot" />
              <Terminal size={14} />
              {t("about.badge")}
            </div>

            <h1 className="ap-title">
              {t("about.title")}{" "}
              <span className="ap-gradient">
                {t("about.highlight")}
              </span>
              <span className="ap-title-dot">.</span>
            </h1>

            <div className="ap-role">
              <Code2 size={20} />
              {t("home.role")}
            </div>

            <div className="ap-bio">
              <p>
                {t("about.p1")}{" "}
                <strong>{t("about.name")}</strong>
                {t("about.p1tail")}
              </p>

              <p>
                {t("about.p2")}{" "}
                <strong className="ap-accent">
                  {t("about.exp")}
                </strong>{" "}
                {t("about.p2mid")}{" "}
                <strong>{t("about.webcore")}</strong>
                {t("about.p2tail")}
              </p>

              <p>{t("about.p3")}</p>
            </div>

            <div className="ap-facts">

              {facts.map((fact, index) => (
                <article
                  key={fact.label}
                  className="ap-fact ap-tilt-card"
                  data-ap-tilt
                >
                  <div className="ap-fact-top">
                    <div className="ap-icon">
                      <fact.icon size={20} />
                    </div>

                    <span className="ap-card-number">
                      0{index + 1}
                    </span>
                  </div>

                  <p>{fact.label}</p>
                  <h3>{fact.value}</h3>
                </article>
              ))}

            </div>

            <div className="ap-actions">

              <Link
                to="/skills"
                className="ap-button ap-primary"
              >
                {t("about.mySkills")}
                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/projects"
                className="ap-button ap-secondary"
              >
                {t("about.viewProjects")}
                <ArrowRight
                  size={17}
                  className="ap-directional"
                />
              </Link>

            </div>
          </div>

          <div className="ap-profile-column">

            <div className="ap-profile-panel">

              <div className="ap-window-header">
                <div className="ap-window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span dir="ltr">developer.profile</span>

                <Activity size={17} />
              </div>

              <div className="ap-profile-body">

                <div className="ap-identity">
                  <div className="ap-identity-pattern" />

                  <div className="ap-avatar">
                    <Fingerprint
                      size={45}
                      strokeWidth={1.3}
                    />
                    <span className="ap-avatar-dot" />
                  </div>

                  <div className="ap-identity-content">
                    <span className="ap-small-label">
                      {t("about.devProfile")}
                    </span>

                    <h2>{t("about.name")}</h2>

                    <p>{t("home.role")}</p>
                  </div>

                  <Code2
                    size={170}
                    strokeWidth={0.6}
                    className="ap-identity-decoration"
                    aria-hidden="true"
                  />
                </div>

                <div className="ap-availability">
                  <span className="ap-live-dot" />
                  {t("home.available")}
                </div>

                <div className="ap-panel-heading">
                  <Sparkles size={16} />

                  <h3>
                    {t("about.devProfile")}
                  </h3>
                </div>

                <div className="ap-values">

                  {values.map((value, index) => (
                    <article
                      className="ap-value ap-tilt-card"
                      key={value.label}
                      data-ap-tilt
                    >
                      <div className="ap-icon">
                        <value.icon size={22} />
                      </div>

                      <div className="ap-value-text">
                        <h3>{value.label}</h3>
                        <p>{value.desc}</p>
                      </div>

                      <span className="ap-card-number">
                        0{index + 1}
                      </span>
                    </article>
                  ))}

                </div>

              </div>
            </div>

            <div
              className="ap-interests-panel"
              data-ap-reveal
            >
              <div className="ap-panel-heading">
                <Compass size={19} />
                <h3>{t("about.interests")}</h3>
              </div>

              <div className="ap-interest-grid">
                {interests.map(([en, fa]) => (
                  <span key={en} className="ap-interest">
                    <span className="ap-interest-dot" />
                    {isFa ? fa : en}
                  </span>
                ))}
              </div>

              <div className="ap-interests-footer">
                <Layers size={14} />
                <span dir="ltr">Design × Engineering</span>
              </div>
            </div>

          </div>

        </section>

        <section className="ap-journey">

          <div
            className="ap-journey-heading"
            data-ap-reveal
          >
            <div>
              <div className="ap-eyebrow">
                <Terminal size={14} />
                {t("about.journey.badge")}
              </div>

              <h2>
                {t("about.journey.title")}{" "}
                <span className="ap-gradient">
                  {t("about.journey.highlight")}
                </span>
                <span className="ap-title-dot">.</span>
              </h2>

              <p>{t("about.journey.subtitle")}</p>
            </div>

            <span
              className="ap-section-index"
              dir="ltr"
            >
              02 / JOURNEY
            </span>
          </div>

          <div className="ap-timeline">

            {timeline.map((item, index) => (
              <div
                className="ap-timeline-row"
                key={item.year + item.title}
                data-ap-reveal
              >
                <div className="ap-timeline-date">
                  <span className="ap-year">
                    {item.year}
                  </span>

                  <span className="ap-date-decoration" />
                </div>

                <div className="ap-timeline-track">
                  <div className="ap-timeline-node">
                    <Briefcase size={17} />
                  </div>
                </div>

                <article
                  className="ap-timeline-card ap-tilt-card"
                  data-ap-tilt
                >
                  <div className="ap-timeline-card-top">

                    <div className="ap-company">
                      <span className="ap-company-dot" />
                      {item.organization}
                    </div>

                    <span
                      className="ap-timeline-number"
                      dir="ltr"
                    >
                      0{index + 1}
                    </span>

                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="ap-timeline-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} dir="ltr">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            ))}

          </div>

          <div
            className="ap-journey-footer"
            data-ap-reveal
          >
            <div className="ap-journey-footer-text">
              <div className="ap-icon">
                <Briefcase size={21} />
              </div>

              <div>
                <h3>{t("nav.experience")}</h3>
                <p>
                  {isFa
                    ? "مشاهده جزئیات مسیر حرفه ای"
                    : "Explore my professional experience"}
                </p>
              </div>
            </div>

            <Link
              to="/experience"
              className="ap-button ap-secondary"
            >
              {t("nav.experience")}
              <ArrowUpRight size={17} />
            </Link>
          </div>

        </section>

        <section className="ap-final" data-ap-reveal>

          <div className="ap-final-pattern" />

          <div className="ap-final-icon">
            <Code2 size={33} strokeWidth={1.5} />
          </div>

          <h2>
            {t("home.cta")}{" "}
            <span className="ap-gradient">
              {t("home.ctaHighlight")}
            </span>{" "}
            {t("home.ctaTail")}
          </h2>

          <p>{t("home.ctaDesc")}</p>

          <Link
            to="/contact"
            className="ap-button ap-primary"
          >
            {t("home.ctaBtn")}
            <ArrowUpRight size={18} />
          </Link>

        </section>

      </div>
    </main>
  );
};

export default About;
