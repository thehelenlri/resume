import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Github,
  Mail,
  Code2,
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Terminal,
  Globe2,
  Heart,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import "./FooterPremium.css";

const Footer = () => {
  const { t, dir } = useLanguage();
  const isFa = dir === "rtl";
  const currentYear = new Date().getFullYear();
  const email = "helenlangari@gmail.com";

  const [copyStatus, setCopyStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  const quickLinks = [
    { href: "/", key: "nav.home" },
    { href: "/about", key: "nav.about" },
    { href: "/skills", key: "nav.skills" },
    { href: "/projects", key: "nav.projects" },
    { href: "/experience", key: "nav.experience" },
    { href: "/resume", key: "nav.resume" },
    { href: "/contact", key: "nav.contact" },
  ];

  const copyEmail = async () => {
    window.clearTimeout(timer.current);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement("textarea");
        field.value = email;
        field.style.position = "fixed";
        field.style.opacity = "0";
        field.setAttribute("readonly", "");
        document.body.appendChild(field);
        field.select();

        let success = false;

        try {
          success = document.execCommand("copy");
        } finally {
          field.remove();
        }

        if (!success) throw new Error("Copy failed");
      }

      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }

    timer.current = window.setTimeout(() => {
      setCopyStatus("idle");
    }, 2500);
  };

  const scrollToTop = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <footer
      className="pf-root"
      dir={dir}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;

        if (
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
        ) return;

        const rect = event.currentTarget.getBoundingClientRect();

        event.currentTarget.style.setProperty(
          "--pf-mx",
          `${event.clientX - rect.left}px`
        );

        event.currentTarget.style.setProperty(
          "--pf-my",
          `${event.clientY - rect.top}px`
        );

        event.currentTarget.style.setProperty(
          "--pf-light",
          "1"
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty(
          "--pf-light",
          "0"
        );
      }}
    >
      <div className="pf-top-line" />
      <div className="pf-grid-bg" />
      <div className="pf-ambient" />
      <div className="pf-spotlight" />

      <div className="pf-container">

        <section className="pf-cta">
          <div className="pf-cta-pattern" />

          <div className="pf-cta-content">
            <div className="pf-eyebrow">
              <Sparkles size={14} />
              {isFa
                ? "با هم بسازیم"
                : "LET'S WORK TOGETHER"}
            </div>

            <h2>
              {isFa
                ? "پروژه‌ای در ذهن دارید؟"
                : "Have a project in mind?"}
            </h2>

            <p>
              {isFa
                ? "بیایید با همکاری یکدیگر، چیزی ارزشمند خلق کنیم."
                : "Let's build something great together."}
            </p>
          </div>

          <Link to="/contact" className="pf-cta-button">
            {isFa ? "شروع همکاری" : "Get in touch"}
            <ArrowUpRight size={19} />
          </Link>

          <Code2
            className="pf-cta-decoration"
            size={210}
            strokeWidth={0.6}
            aria-hidden="true"
          />
        </section>

        <div className="pf-main-grid">

          <div className="pf-brand-section">

            <Link
              to="/"
              className="pf-brand"
              aria-label="Helen"
            >
              <div className="pf-logo">
                <Code2 size={25} strokeWidth={1.8} />
              </div>

              <div>
                <span className="pf-brand-name">
                  Helen<span>.</span>
                </span>

                <span className="pf-brand-role">
                  {t("home.role")}
                </span>
              </div>
            </Link>

            <p className="pf-tagline">
              {t("footer.tagline")}
            </p>

            <div className="pf-socials">

              <a
                href="https://github.com/thehelenlri"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-social-button"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={20} />
                <ArrowUpRight
                  size={10}
                  className="pf-social-arrow"
                />
              </a>

              <a
                href={`mailto:${email}`}
                className="pf-social-button"
                aria-label={isFa ? "ایمیل" : "Email"}
                title={isFa ? "ایمیل" : "Email"}
              >
                <Mail size={20} />
                <ArrowUpRight
                  size={10}
                  className="pf-social-arrow"
                />
              </a>

            </div>
          </div>

          <nav
            className="pf-navigation"
            aria-label={t("footer.quicklinks")}
          >
            <h3 className="pf-heading">
              <Terminal size={16} />
              {t("footer.quicklinks")}
            </h3>

            <div className="pf-links">
              {quickLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `pf-nav-link${isActive ? " pf-active" : ""}`
                  }
                >
                  <span className="pf-link-dot" />
                  <span>{t(link.key)}</span>
                  <ArrowUpRight
                    size={13}
                    className="pf-link-arrow"
                  />
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="pf-contact">
            <h3 className="pf-heading">
              <Globe2 size={16} />
              {t("footer.connect")}
            </h3>

            <p className="pf-contact-caption">
              {isFa
                ? "برای ارتباط مستقیم و همکاری"
                : "For inquiries and collaborations"}
            </p>

            <div className="pf-email-card">

              <div className="pf-email-header">
                <Mail size={15} />
                <span>
                  {isFa ? "آدرس ایمیل" : "EMAIL ADDRESS"}
                </span>
              </div>

              <a
                href={`mailto:${email}`}
                className="pf-email-address"
                dir="ltr"
              >
                {email}
              </a>

              <div className="pf-email-divider" />

              <button
                type="button"
                className="pf-copy-button"
                onClick={copyEmail}
                aria-label={
                  isFa ? "کپی ایمیل" : "Copy email"
                }
              >
                {copyStatus === "success" ? (
                  <Check size={15} />
                ) : (
                  <Copy size={15} />
                )}

                <span aria-live="polite">
                  {copyStatus === "success"
                    ? isFa ? "کپی شد" : "Copied!"
                    : copyStatus === "error"
                    ? isFa ? "کپی ناموفق بود" : "Copy failed"
                    : isFa ? "کپی ایمیل" : "Copy email"}
                </span>
              </button>
            </div>

            <Link to="/contact" className="pf-contact-link">
              {t("nav.contact")}
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>

        <div
          className="pf-watermark"
          aria-hidden="true"
          dir="ltr"
        >
          HELEN.
        </div>

        <div className="pf-bottom">

          <div className="pf-copyright">
            <span>© {currentYear}</span>
            <span>{t("footer.rights")}React</span>
            <Heart
              size={13}
              className="pf-heart"
              aria-hidden="true"
            />
          </div>

          <div className="pf-bottom-actions">
            <div className="pf-language-indicator">
              <Globe2 size={14} />
              {isFa ? "فارسی" : "English"}
            </div>

            <span className="pf-bottom-divider" />

            <button
              type="button"
              className="pf-back-top"
              onClick={scrollToTop}
              aria-label={
                isFa
                  ? "بازگشت به بالای صفحه"
                  : "Back to top"
              }
              title={
                isFa
                  ? "بازگشت به بالای صفحه"
                  : "Back to top"
              }
            >
              <span>
                {isFa ? "بازگشت به بالا" : "Back to top"}
              </span>

              <div className="pf-up-icon">
                <ArrowUp size={17} />
              </div>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
