import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Mail,
  Github,
  MapPin,
  Calendar,
  Briefcase,
  Phone,
  Code2,
  Terminal,
  FileText,
  FileCheck,
  Eye,
  Printer,
  Copy,
  Check,
  ArrowUpRight,
  Activity,
  Layers,
  FolderCode,
  CheckCircle2,
  Sparkles,
  X,
  Maximize2,
  ExternalLink,
  Globe2,
  UserRound,
} from "lucide-react";

import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import "./ResumePremium.css";

const Resume = () => {
  const { t, dir } = useLanguage();
  const isFa = dir === "rtl";
  const tr = (en: string, fa: string) => isFa ? fa : en;

  const skills = {
    [t("resume.frameworks")]: ["React", "Next.js", "TypeScript", "JavaScript"],
    [t("resume.styling")]: [
      "Tailwind CSS",
      "CSS/SCSS",
      "Framer Motion",
      "Responsive Design",
    ],
    [t("resume.tools")]: [
      "Git",
      "GitHub",
      "Vite",
      "Webpack",
      "REST API",
      "React Query",
    ],
    [t("resume.other")]: ["Figma", "Vercel"],
  };

  const experience = [
    {
      role: t("resume.r1.role"),
      company: "Webcore",
      period: t("resume.r1.period"),
      points: [t("resume.r1.p1"), t("resume.r1.p2"), t("resume.r1.p3")],
    },
    {
      role: t("resume.r3.role"),
      company: "Webcore",
      period: t("resume.r3.period"),
      points: [t("resume.r3.p1"), t("resume.r3.p2"), t("resume.r3.p3")],
    },
  ];

  const projects = [
    {
      name: t("proj.arch.title"),
      tech: "React, TypeScript, Tailwind CSS",
      url: "architecture-blond-zeta.vercel.app",
    },
    {
      name: t("proj.digi.title"),
      tech: "Next.js, TypeScript, REST API",
      url: "digi-seda.vercel.app",
    },
    {
      name: t("proj.cine.title"),
      tech: "React, TypeScript, TMDB API",
      url: "cinemapedia-nu.vercel.app",
    },
  ];



  const rootRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [downloading, setDownloading] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [copied, setCopied] = useState("");
  const [pdfOpen, setPdfOpen] = useState(false);

  const copyTimer = useRef<number | undefined>(undefined);

  const pdfUrl = "/cv.pdf";

  const allProjects = [
    ...projects,
    ...(
      projects.some(p => p.url.includes("woodnest-nexa"))
      ? []
      : [{
          name: "WoodNest / Nexa Admin",
          tech: "React, TypeScript, Vite",
          url: "woodnest-nexa.vercel.app",
        }]
    ),
  ];

  const skillCount = Object.values(skills).reduce(
    (total, items) => total + items.length,
    0
  );

  const contacts = [
    {
      icon: Mail,
      label: tr("Email", "ایمیل"),
      value: "helenlangari@gmail.com",
      href: "mailto:helenlangari@gmail.com",
      copyable: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "https://github.com/thehelenlri",
      href: "https://github.com/thehelenlri",
      copyable: true,
    },
    {
      icon: Phone,
      label: tr("Phone", "شماره تماس"),
      value: "+98 0911-891-7493",
      href: "tel:+989118917493",
      copyable: true,
    },
    {
      icon: MapPin,
      label: tr("Location", "موقعیت مکانی"),
      value: tr(
        "Iran - Remote Available",
        "ایران - امکان همکاری دورکاری"
      ),
      href: "",
      copyable: false,
    },
    {
      icon: Calendar,
      label: tr("Age", "سن"),
      value: tr("18 y/o", "۱۸ سال"),
      href: "",
      copyable: false,
    },
  ];

  const stats = [
    {
      icon: Briefcase,
      value: experience.length,
      label: tr("Work experiences", "سوابق کاری"),
    },
    {
      icon: Code2,
      value: skillCount,
      label: tr("Technical skills", "مهارت های فنی"),
    },
    {
      icon: FolderCode,
      value: allProjects.length,
      label: tr("Projects", "نمونه کارها"),
    },
  ];

  const sections = [
    {
      id: "profile",
      icon: UserRound,
      label: tr("Profile", "پروفایل"),
    },
    {
      id: "experience",
      icon: Briefcase,
      label: t("resume.workExp"),
    },
    {
      id: "skills",
      icon: Code2,
      label: t("resume.techSkills"),
    },
    {
      id: "projects",
      icon: FolderCode,
      label: t("resume.notableProjects"),
    },
  ];

  const handleDownload = async () => {
    if (downloading) return;

    setDownloading(true);

    try {
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error("PDF unavailable");
      }

      const blob = await response.blob();

      if (
        blob.type.includes("text/html") ||
        !(await blob.slice(0, 5).text()).startsWith("%PDF-")
      ) {
        throw new Error("Invalid PDF");
      }

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "cv.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(
        () => URL.revokeObjectURL(url),
        10000
      );

      toast.success(
        tr("CV download started", "دانلود رزومه آغاز شد")
      );

    } catch {
      toast.error(
        tr("CV file not found", "فایل رزومه پیدا نشد")
      );
    } finally {
      setDownloading(false);
    }
  };

  const openPdf = () => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    setPdfOpen(true);

    if (!dialog.open) {
      dialog.showModal();
    }
  };

  const closePdf = () => {
    dialogRef.current?.close();
    setPdfOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const navigateTo = (id: string) => {
    setActiveSection(id);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById(`rp-${id}`)
      ?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
  };

  const copyValue = async (value: string) => {
    window.clearTimeout(copyTimer.current);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");

        field.value = value;
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

        if (!success) {
          throw new Error("Copy failed");
        }
      }

      setCopied(value);

      toast.success(tr("Copied!", "کپی شد"));

      copyTimer.current = window.setTimeout(
        () => setCopied(""),
        2000
      );

    } catch {
      toast.error(
        tr("Copy failed", "کپی ناموفق بود")
      );
    }
  };

  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const cleanups: Array<() => void> = [];

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(
                entry.target.id.replace("rp-", "")
              );
            }
          });
        },
        {
          rootMargin: "-20% 0px -45% 0px",
        }
      );

      root.querySelectorAll("[data-rp-section]")
        .forEach(el => sectionObserver.observe(el));

      cleanups.push(() => sectionObserver.disconnect());
    }

    if (!reduced && "IntersectionObserver" in window) {
      const elements = root.querySelectorAll<HTMLElement>(
        "[data-rp-reveal]"
      );

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("rp-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.05 }
      );

      elements.forEach((element, index) => {
        element.classList.add("rp-reveal");
        element.style.setProperty(
          "--rp-delay",
          `${(index % 4) * 65}ms`
        );
        observer.observe(element);
      });

      cleanups.push(() => {
        observer.disconnect();

        elements.forEach(element => {
          element.classList.remove(
            "rp-reveal",
            "rp-visible"
          );
        });
      });
    }

    if (!reduced && fine) {
      const move = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();

        root.style.setProperty(
          "--rp-mx",
          `${event.clientX - rect.left}px`
        );

        root.style.setProperty(
          "--rp-my",
          `${event.clientY - rect.top}px`
        );

        root.style.setProperty("--rp-light", "1");
      };

      const leave = () => {
        root.style.setProperty("--rp-light", "0");
      };

      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);

      cleanups.push(() => {
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", leave);
      });
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <main className="rp-root" dir={dir} ref={rootRef}>

      <div className="rp-grid-bg" aria-hidden="true" />
      <div className="rp-ambient" aria-hidden="true" />
      <div className="rp-spotlight" aria-hidden="true" />

      <div className="rp-container">

        <nav className="rp-breadcrumb">
          <Link to="/">{t("nav.home")}</Link>
          <span>/</span>
          <span aria-current="page">
            {t("nav.resume")}
          </span>

          <span className="rp-page-index" dir="ltr">
            07 / RESUME
          </span>
        </nav>

        <section className="rp-hero">

          <div className="rp-hero-intro">

            <div className="rp-eyebrow">
              <span className="rp-live-dot" />
              <FileText size={15} />
              {t("resume.badge")}
            </div>

            <h1>
              {t("resume.title")}{" "}
              <span className="rp-gradient">
                {t("resume.highlight")}
              </span>
              <span className="rp-accent">.</span>
            </h1>

            <p>{t("resume.subtitle")}</p>

            <div className="rp-actions">

              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="rp-button rp-primary"
              >
                <Download size={18} />

                {downloading
                  ? tr("Preparing...", "در حال آماده سازی...")
                  : t("resume.download")}

                <ArrowUpRight size={16} />
              </button>

              <button
                type="button"
                className="rp-button rp-secondary"
                onClick={openPdf}
              >
                <Eye size={18} />
                {tr("Preview PDF", "پیش نمایش PDF")}
              </button>

              <button
                type="button"
                className="rp-button rp-secondary"
                onClick={handlePrint}
              >
                <Printer size={17} />
                {tr("Print", "چاپ")}
              </button>

            </div>

          </div>

          <div className="rp-summary">

            <div className="rp-window-header">
              <div className="rp-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span dir="ltr">resume.overview</span>

              <Activity size={17} />
            </div>

            <div className="rp-summary-body">

              <div className="rp-document-card">

                <div className="rp-document-icon">
                  <FileCheck size={30} />
                </div>

                <div>
                  <span className="rp-small-label">
                    {tr("CURRICULUM VITAE", "رزومه حرفه ای")}
                  </span>

                  <h3>{t("resume.name")}</h3>

                  <p>{t("resume.jobTitle")}</p>
                </div>

                <span className="rp-pdf-tag">PDF</span>

              </div>

              <div className="rp-stat-grid">

                {stats.map(stat => (
                  <article
                    key={stat.label}
                    className="rp-stat"
                  >
                    <stat.icon size={21} />

                    <strong dir="ltr">
                      {String(stat.value).padStart(2, "0")}
                    </strong>

                    <span>{stat.label}</span>
                  </article>
                ))}

              </div>

              <button
                type="button"
                className="rp-summary-link"
                onClick={openPdf}
              >
                <Eye size={15} />

                {tr(
                  "Open original resume",
                  "مشاهده فایل اصلی رزومه"
                )}

                <ArrowUpRight size={15} />
              </button>

            </div>
          </div>

        </section>

        <div className="rp-workspace">

          <aside className="rp-sidebar">

            <div className="rp-sidebar-panel">

              <div className="rp-sidebar-heading">
                <Layers size={17} />

                {tr("RESUME SECTIONS", "بخش های رزومه")}
              </div>

              <nav className="rp-section-nav">

                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    aria-current={
                      activeSection === section.id
                        ? "location"
                        : undefined
                    }
                    className={`rp-nav-button${
                      activeSection === section.id
                        ? " rp-nav-active"
                        : ""
                    }`}
                    onClick={() => navigateTo(section.id)}
                  >
                    <section.icon size={17} />

                    <span>{section.label}</span>

                    <small>
                      {String(index + 1).padStart(2, "0")}
                    </small>
                  </button>
                ))}

              </nav>

              <div className="rp-sidebar-divider" />

              <div className="rp-sidebar-file">

                <div className="rp-file-icon">
                  <FileText size={22} />
                </div>

                <div>
                  <strong dir="ltr">cv.pdf</strong>
                  <span>PDF Document</span>
                </div>

              </div>

              <button
                type="button"
                className="rp-button rp-primary rp-full-width"
                onClick={handleDownload}
                disabled={downloading}
              >
                <Download size={17} />
                {t("resume.download")}
              </button>

              <button
                type="button"
                className="rp-sidebar-print"
                onClick={handlePrint}
              >
                <Printer size={16} />
                {tr("Print web resume", "چاپ نسخه آنلاین")}
              </button>

            </div>

          </aside>

          <article className="rp-document">

            <section
              className="rp-profile"
              id="rp-profile"
              data-rp-section
            >

              <div className="rp-profile-pattern" />

              <Code2
                size={230}
                strokeWidth={0.6}
                className="rp-profile-decoration"
                aria-hidden="true"
              />

              <div className="rp-profile-top">

                <div className="rp-avatar">
                  <span>H.</span>
                </div>

                <div className="rp-profile-identity">

                  <div className="rp-mini-label">
                    <FileCheck size={14} />

                    {tr("PROFESSIONAL PROFILE", "پروفایل حرفه ای")}
                  </div>

                  <h2>{t("resume.name")}</h2>

                  <p>{t("resume.jobTitle")}</p>

                </div>

              </div>

              <p className="rp-bio">
                {t("resume.bio")}
              </p>

              <div className="rp-contact-grid">

                {contacts.map(contact => (
                  <div
                    className="rp-contact"
                    key={contact.label}
                  >

                    <div className="rp-contact-icon">
                      <contact.icon size={18} />
                    </div>

                    <div className="rp-contact-content">

                      <span>{contact.label}</span>

                      {contact.href ? (
                        <a
                          href={contact.href}
                          target={
                            contact.href.startsWith("https")
                              ? "_blank"
                              : undefined
                          }
                          rel="noopener noreferrer"
                          dir="ltr"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <strong>{contact.value}</strong>
                      )}

                    </div>

                    {contact.copyable && (
                      <button
                        type="button"
                        className="rp-copy-button"
                        onClick={() =>
                          copyValue(contact.value)
                        }
                        title={tr("Copy", "کپی")}
                        aria-label={
                          tr("Copy", "کپی") + " " + contact.label
                        }
                      >
                        {copied === contact.value
                          ? <Check size={15} />
                          : <Copy size={15} />}
                      </button>
                    )}

                  </div>
                ))}

              </div>

            </section>

            <div className="rp-document-body">

              <section
                className="rp-document-section"
                id="rp-experience"
                data-rp-section
                data-rp-reveal
              >

                <div className="rp-section-heading">

                  <div className="rp-section-icon">
                    <Briefcase size={22} />
                  </div>

                  <div>
                    <span className="rp-mini-label">
                      01 / EXPERIENCE
                    </span>

                    <h2>{t("resume.workExp")}</h2>
                  </div>

                  <div className="rp-section-line" />

                </div>

                <div className="rp-timeline">

                  {experience.map((item, index) => (
                    <div
                      className="rp-timeline-row"
                      key={item.role}
                    >

                      <div className="rp-timeline-track">

                        <span className="rp-timeline-node">
                          <Briefcase size={15} />
                        </span>

                      </div>

                      <article className="rp-experience-card">

                        <div className="rp-experience-top">

                          <div className="rp-company">
                            <span className="rp-company-dot" />
                            {item.company}
                          </div>

                          <span className="rp-period">
                            <Calendar size={13} />
                            {item.period}
                          </span>

                        </div>

                        <h3>{item.role}</h3>

                        <ul className="rp-points">

                          {item.points.map(point => (
                            <li key={point}>

                              <CheckCircle2 size={16} />

                              <span>{point}</span>

                            </li>
                          ))}

                        </ul>

                        <div className="rp-experience-footer">

                          <span className="rp-experience-index">
                            EXPERIENCE / {
                              String(index + 1).padStart(2, "0")
                            }
                          </span>

                        </div>

                      </article>
                    </div>
                  ))}

                </div>
              </section>

              <section
                className="rp-document-section"
                id="rp-skills"
                data-rp-section
                data-rp-reveal
              >

                <div className="rp-section-heading">

                  <div className="rp-section-icon">
                    <Code2 size={22} />
                  </div>

                  <div>
                    <span className="rp-mini-label">
                      02 / EXPERTISE
                    </span>

                    <h2>{t("resume.techSkills")}</h2>
                  </div>

                  <div className="rp-section-line" />

                </div>

                <div className="rp-skill-grid">

                  {Object.entries(skills).map(
                    ([category, items], index) => {

                      const Icon = [
                        Code2,
                        Layers,
                        Terminal,
                        Sparkles,
                      ][index % 4];

                      return (
                        <article
                          className="rp-skill-card"
                          key={category}
                        >

                          <div className="rp-skill-top">

                            <div className="rp-skill-icon">
                              <Icon size={19} />
                            </div>

                            <span className="rp-skill-count">
                              {String(items.length).padStart(2, "0")}
                            </span>

                          </div>

                          <h3>{category}</h3>

                          <div className="rp-skill-tags">

                            {items.map(item => (
                              <span key={item} dir="ltr">
                                <span className="rp-tag-dot" />
                                {item}
                              </span>
                            ))}

                          </div>

                        </article>
                      );
                    }
                  )}

                </div>
              </section>

              <section
                className="rp-document-section"
                id="rp-projects"
                data-rp-section
                data-rp-reveal
              >

                <div className="rp-section-heading">

                  <div className="rp-section-icon">
                    <FolderCode size={22} />
                  </div>

                  <div>
                    <span className="rp-mini-label">
                      03 / PORTFOLIO
                    </span>

                    <h2>{t("resume.notableProjects")}</h2>
                  </div>

                  <div className="rp-section-line" />

                </div>

                <div className="rp-project-list">

                  {allProjects.map((project, index) => {

                    const url = project.url.startsWith("https://")
                      ? project.url
                      : `https://${project.url}`;

                    return (
                      <a
                        className="rp-project-card"
                        key={project.name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >

                        <div className="rp-project-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="rp-project-icon">
                          <Globe2 size={22} />
                        </div>

                        <div className="rp-project-info">

                          <h3>{project.name}</h3>

                          <p dir="ltr">{project.tech}</p>

                          <span
                            dir="ltr"
                            className="rp-project-url"
                          >
                            {project.url}
                          </span>

                        </div>

                        <div className="rp-project-arrow">
                          <ArrowUpRight size={20} />
                        </div>

                      </a>
                    );
                  })}

                </div>

              </section>

              <div className="rp-document-end">

                <div>
                  <FileCheck size={17} />
                  <span>{t("resume.name")}</span>
                </div>

                <span dir="ltr">CURRICULUM VITAE</span>

              </div>

            </div>

          </article>

        </div>

        <section className="rp-final" data-rp-reveal>

          <div className="rp-final-grid" />

          <FileText
            size={260}
            strokeWidth={0.6}
            className="rp-final-decoration"
            aria-hidden="true"
          />

          <div className="rp-final-icon">
            <Download size={33} />
          </div>

          <h2>
            {tr("Take my", "دانلود")}{" "}
            <span className="rp-gradient">
              {tr("Resume", "رزومه")}
            </span>
            {isFa ? "" : " with you."}
          </h2>

          <p>
            {tr(
              "Download the original CV or explore the online version.",
              "فایل اصلی رزومه را دانلود کنید یا نسخه آنلاین آن را مشاهده کنید."
            )}
          </p>

          <div className="rp-actions">

            <button
              type="button"
              onClick={handleDownload}
              className="rp-button rp-primary"
              disabled={downloading}
            >
              <Download size={19} />
              {t("resume.downloadFull")}
            </button>

            <Link
              to="/contact"
              className="rp-button rp-secondary"
            >
              <Mail size={18} />
              {t("nav.contact")}
              <ArrowUpRight size={17} />
            </Link>

          </div>

        </section>

      </div>

      <dialog
        ref={dialogRef}
        className="rp-pdf-dialog"
        aria-label={tr("PDF preview", "پیش نمایش رزومه")}
        onClose={() => setPdfOpen(false)}
        onClick={event => {
          if (event.target === event.currentTarget) {
            closePdf();
          }
        }}
      >

        <div className="rp-pdf-header">

          <div className="rp-pdf-heading">

            <div className="rp-section-icon">
              <FileText size={23} />
            </div>

            <div>
              <h2>{t("resume.name")}</h2>

              <span dir="ltr">cv.pdf</span>
            </div>

          </div>

          <div className="rp-pdf-actions">

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rp-copy-button"
              title={tr("Open in new tab", "باز کردن در تب جدید")}
              aria-label={tr("Open in new tab", "باز کردن در تب جدید")}
            >
              <ExternalLink size={19} />
            </a>

            <button
              type="button"
              className="rp-copy-button"
              onClick={handleDownload}
              disabled={downloading}
              aria-label={t("resume.download")}
            >
              <Download size={19} />
            </button>

            <button
              type="button"
              className="rp-copy-button"
              onClick={closePdf}
              aria-label={tr("Close", "بستن")}
            >
              <X size={22} />
            </button>

          </div>
        </div>

        {pdfOpen && (
          <iframe
            src={`${pdfUrl}#view=FitH`}
            title={tr("Resume PDF", "فایل PDF رزومه")}
            className="rp-pdf-frame"
          />
        )}

        <div className="rp-pdf-footer">

          <span>
            {tr(
              "Original PDF document",
              "فایل اصلی رزومه"
            )}
          </span>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tr("Open PDF", "باز کردن PDF")}
            <ArrowUpRight size={15} />
          </a>

        </div>

      </dialog>

    </main>
  );
};

export default Resume;
