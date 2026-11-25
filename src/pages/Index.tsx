import { useHomeEffects } from "./useHomeEffects";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Download,
  Github,
  Code2,
  Layers,
  Zap,
  Terminal,
  Activity,
  Globe2,
  Sparkles,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import "./HomePremium.css";

const Index = () => {
  useHomeEffects();
  const { t, dir } = useLanguage();

  const stats = [
    { value: "3+", label: t("home.yearsExp") },
    { value: "10+", label: t("home.projects") },
    { value: "100%", label: t("home.passion") },
  ];

  const features = [
    {
      icon: Code2,
      title: t("home.cleanCode"),
      desc: t("home.cleanCodeDesc"),
    },
    {
      icon: Layers,
      title: t("home.modernStack"),
      desc: t("home.modernStackDesc"),
    },
    {
      icon: Zap,
      title: t("home.performance"),
      desc: t("home.performanceDesc"),
    },
  ];

  const technologies = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Git",
  ];

  const skills = [
    {
      name: "React / Next.js",
      level: t("home.advanced"),
      percent: 90,
    },
    {
      name: "TypeScript",
      level: t("home.advanced"),
      percent: 85,
    },
    {
      name: "Tailwind CSS",
      level: t("home.expert"),
      percent: 95,
    },
    {
      name: "API Integration",
      level: t("home.intermediate"),
      percent: 80,
    },
  ];

  const name = t("home.name").split(" ");
  const firstName = name.shift();

  return (
    <main className="hp-root" dir={dir}>
      <section className="hp-hero">
        <div
          className="hp-hero-image"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div className="hp-grid-bg" />
        <div className="hp-orb hp-orb-one" />
        <div className="hp-orb hp-orb-two" />

        <div className="hp-container hp-hero-layout">
          <div className="hp-intro hp-enter">

            <div className="hp-availability">
              <span className="hp-live-dot" />
              {t("home.available")}
            </div>

            <p className="hp-hello">
              <span className="hp-small-line" />
              {t("home.hello")}
            </p>

            <h1 className="hp-name">
              <span>{firstName}</span>
              <span className="hp-gradient">
                {name.join(" ")}
                <span className="hp-name-dot">.</span>
              </span>
            </h1>

            <div className="hp-role">
              <Terminal size={23} />
              <h2>{t("home.role")}</h2>
            </div>

            <p className="hp-description">
              {t("home.intro")}{" "}
              <strong>React</strong>,{" "}
              <strong>Next.js</strong>{" "}
              {t("home.intro2")}{" "}
              <strong>TypeScript</strong>
              {t("home.intro3")}{" "}
              <strong>Webcore</strong>.
            </p>

            <div className="hp-technologies">
              {technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="hp-actions">
              <Link
                className="hp-button hp-primary"
                to="/projects"
              >
                {t("home.viewProjects")}
                <ArrowUpRight size={18} />
              </Link>

              <Link
                className="hp-button hp-secondary"
                to="/contact"
              >
                {t("home.getInTouch")}
                <ArrowRight
                  size={17}
                  className="hp-directional"
                />
              </Link>
            </div>

            <div className="hp-social">
              <a
                href="https://github.com/thehelenlri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hp-icon-button"
              >
                <Github size={21} />
              </a>

              <span className="hp-social-divider" />

              <Link to="/resume" className="hp-resume-link">
                <Download size={17} />
                {t("home.resume")}
              </Link>
            </div>
          </div>

          <div className="hp-dashboard hp-enter hp-delay">

            <div className="hp-dashboard-header">
              <div className="hp-window-dots">
                <span />
                <span />
                <span />
              </div>
              <Activity size={18} />
            </div>

            <div className="hp-dashboard-body">

              <div className="hp-status-card">
                <div className="hp-status-top">
                  <div className="hp-status-icon">
                    <Terminal size={23} />
                  </div>
                  <span className="hp-live-dot" />
                </div>

                <span className="hp-label">
                  {t("home.currentStatus")}
                </span>

                <h3>{t("home.currentRole")}</h3>
                <p>{t("home.ageExp")}</p>

                <div className="hp-status-decoration">
                  <Code2 size={140} strokeWidth={0.7} />
                </div>
              </div>

              <div className="hp-stat-grid">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="hp-stat-card"
                  >
                    <strong dir="ltr">{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="hp-feature-list">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="hp-feature-card"
                  >
                    <div className="hp-feature-icon">
                      <feature.icon size={22} />
                    </div>

                    <div className="hp-feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.desc}</p>
                    </div>

                    <span className="hp-feature-number">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <a
          href="#home-skills"
          className="hp-scroll"
          aria-label={t("home.scroll")}
        >
          <span>{t("home.scroll")}</span>
          <ArrowDown size={17} />
        </a>
      </section>

      <section className="hp-skills" id="home-skills">
        <div className="hp-container">

          <div className="hp-section-heading">
            <div>
              <div className="hp-section-icon">
                <Code2 size={20} />
              </div>

              <h2>
                {t("skills.title")}{" "}
                <span className="hp-gradient">
                  {t("skills.highlight")}
                </span>
              </h2>

              <p>{t("skills.subtitle")}</p>
            </div>

            <Link to="/skills" className="hp-text-link">
              {t("nav.skills")}
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="hp-skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.name} className="hp-skill-card">

                <div className="hp-skill-top">
                  <div className="hp-skill-icon">
                    <Code2 size={20} />
                  </div>
                  <span className="hp-feature-number">
                    0{index + 1}
                  </span>
                </div>

                <h3 dir="ltr">{skill.name}</h3>

                <div className="hp-skill-info">
                  <strong dir="ltr">{skill.percent}%</strong>
                  <span>{skill.level}</span>
                </div>

                <div
                  className="hp-progress"
                  role="progressbar"
                  aria-label={skill.name}
                  aria-valuenow={skill.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="hp-cta-section">
        <div className="hp-container">
          <div className="hp-cta">

            <div className="hp-cta-glow" />

            <div className="hp-cta-icon">
              <Globe2 size={34} strokeWidth={1.5} />
            </div>

            <div className="hp-cta-content">
              <h2>
                {t("home.cta")}{" "}
                <span className="hp-gradient">
                  {t("home.ctaHighlight")}
                </span>{" "}
                {t("home.ctaTail")}
              </h2>

              <p>{t("home.ctaDesc")}</p>

              <Link
                to="/contact"
                className="hp-button hp-primary"
              >
                <Sparkles size={17} />
                {t("home.ctaBtn")}
                <ArrowUpRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;

