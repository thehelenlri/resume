import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Github,
  MapPin,
  Send,
  PhoneCall,
  CheckCircle2,
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
  Activity,
  MessageCircle,
  Sparkles,
  UserRound,
  Briefcase,
  Globe2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import "./ContactPremium.css";

const Contact = () => {
  const { t, dir } = useLanguage();
  const isFa = dir === "rtl";
  const tr = (en: string, fa: string) => isFa ? fa : en;

  const rootRef = useRef<HTMLElement>(null);
  const copyTimer = useRef<number | undefined>(undefined);

  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const sendingRef = useRef(false);

  const email = "helenlangari@gmail.com";
  const phone = "0911-891-7493";
  const github = "https://github.com/thehelenlri";

  const initialForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);

  const contactInfo = [
    {
      id: "email",
      icon: Mail,
      label: t("contact.email"),
      value: email,
      href: `mailto:${email}`,
      copyable: true,
    },
    {
      id: "github",
      icon: Github,
      label: t("contact.github"),
      value: github,
      href: github,
      copyable: false,
    },
    {
      id: "phone",
      icon: PhoneCall,
      label: t("contact"),
      value: phone,
      href: "tel:09118917493",
      copyable: true,
    },
    {
      id: "location",
      icon: MapPin,
      label: t("contact.location"),
      value: t("contact.locationVal"),
      href: "",
      copyable: false,
    },
  ];

  const subjects = [
    { value: "job", label: t("contact.job") },
    { value: "freelance", label: t("contact.freelance") },
    { value: "collaboration", label: t("contact.collab") },
    { value: "other", label: t("contact.other") },
  ];

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    form.email.trim()
  );

  const completedFields = [
    form.name.trim().length > 0,
    validEmail,
    form.subject.length > 0,
    form.message.trim().length > 0,
  ].filter(Boolean).length;

  const progress = completedFields * 25;

  const ready =
    form.name.trim().length > 0 &&
    validEmail &&
    form.message.trim().length > 0;

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value,
    }));

    setPrepared(false);
    setSendError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!ready || sendingRef.current) return;

    sendingRef.current = true;
    setSending(true);
    setPrepared(false);
    setSendError(false);

    const subject =
      subjects.find(item => item.value === form.subject)
        ?.label || tr("Portfolio inquiry", "درخواست همکاری");

    const controller = new AbortController();

    const timer = window.setTimeout(
      () => controller.abort(),
      20000
    );

    try {
      const response = await fetch(
        "https://formspree.io/f/xjywlzvp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            subject,
            message: form.message.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Formspree error: ${response.status}`);
      }

      setForm(initialForm);
      setPrepared(true);

    } catch (error) {
      console.error("Message submission failed:", error);
      setSendError(true);

    } finally {
      window.clearTimeout(timer);
      sendingRef.current = false;
      setSending(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setPrepared(false);
    setSendError(false);
  };

  const copyValue = async (id: string, value: string) => {
    window.clearTimeout(copyTimer.current);
    setCopyError(false);

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

        if (!success) throw new Error("Copy failed");
      }

      setCopied(id);
    } catch {
      setCopied(id);
      setCopyError(true);
    }

    copyTimer.current = window.setTimeout(() => {
      setCopied("");
      setCopyError(false);
    }, 2500);
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

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduced) return;

    const cleanup: Array<() => void> = [];

    if ("IntersectionObserver" in window) {
      const elements = root.querySelectorAll<HTMLElement>(
        "[data-cp-reveal]"
      );

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("cp-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06 }
      );

      elements.forEach((element, index) => {
        element.classList.add("cp-reveal");

        element.style.setProperty(
          "--cp-delay",
          `${(index % 4) * 70}ms`
        );

        observer.observe(element);
      });

      cleanup.push(() => {
        observer.disconnect();

        elements.forEach(element => {
          element.classList.remove(
            "cp-reveal",
            "cp-visible"
          );
        });
      });
    }

    if (finePointer) {
      const move = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();

        root.style.setProperty(
          "--cp-mx",
          `${event.clientX - rect.left}px`
        );

        root.style.setProperty(
          "--cp-my",
          `${event.clientY - rect.top}px`
        );

        root.style.setProperty("--cp-light", "1");
      };

      const leave = () => {
        root.style.setProperty("--cp-light", "0");
      };

      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);

      cleanup.push(() => {
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", leave);
      });

      root.querySelectorAll<HTMLElement>(
        "[data-cp-tilt]"
      ).forEach(card => {
        const moveCard = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();

          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          card.style.setProperty(
            "--cp-rx",
            `${(0.5 - y) * 5}deg`
          );

          card.style.setProperty(
            "--cp-ry",
            `${(x - 0.5) * 5}deg`
          );

          card.style.setProperty("--cp-cx", `${x * 100}%`);
          card.style.setProperty("--cp-cy", `${y * 100}%`);

          card.classList.add("cp-card-active");
        };

        const leaveCard = () => {
          card.style.setProperty("--cp-rx", "0deg");
          card.style.setProperty("--cp-ry", "0deg");
          card.classList.remove("cp-card-active");
        };

        card.addEventListener("pointermove", moveCard);
        card.addEventListener("pointerleave", leaveCard);

        cleanup.push(() => {
          card.removeEventListener("pointermove", moveCard);
          card.removeEventListener("pointerleave", leaveCard);
        });
      });
    }

    return () => cleanup.forEach(fn => fn());
  }, [dir]);

  return (
    <main className="cp-root" dir={dir} ref={rootRef}>

      <div className="cp-grid-bg" aria-hidden="true" />
      <div className="cp-ambient" aria-hidden="true" />
      <div className="cp-spotlight" aria-hidden="true" />

      <div className="cp-container">

        <nav className="cp-breadcrumb"
          aria-label={tr("Breadcrumb", "مسیر صفحه")}>

          <Link to="/">{t("nav.home")}</Link>

          <span>/</span>

          <span aria-current="page">
            {t("nav.contact")}
          </span>

          <span className="cp-page-index" dir="ltr">
            06 / CONTACT
          </span>
        </nav>

        <section className="cp-hero">

          <div className="cp-hero-intro">

            <div className="cp-eyebrow">
              <span className="cp-live-dot" />
              <Terminal size={15} />
              {t("contact.badge")}
            </div>

            <h1>
              {t("contact.title")}{" "}
              <span className="cp-gradient">
                {t("contact.highlight")}
              </span>
              <span className="cp-accent">.</span>
            </h1>

            <p>{t("contact.subtitle")}</p>

            <div className="cp-hero-actions">

              <a href={`mailto:${email}`}
                className="cp-button cp-primary">
                <Mail size={18} />
                {tr("Email me", "ارسال ایمیل")}
                <ArrowUpRight size={17} />
              </a>

              <a href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-button cp-secondary">
                <Github size={18} />
                GitHub
              </a>

            </div>

          </div>

          <div className="cp-status-panel">

            <div className="cp-window-header">

              <div className="cp-window-dots">
                <span />
                <span />
                <span />
              </div>

              <span dir="ltr">contact.status</span>
              <Activity size={18} />

            </div>

            <div className="cp-status-body">

              <div className="cp-availability">

                <div className="cp-status-icon">
                  <MessageCircle size={28} />
                  <span className="cp-status-dot" />
                </div>

                <div>
                  <span className="cp-small-label">
                    {tr("AVAILABILITY", "وضعیت همکاری")}
                  </span>

                  <h3>{t("contact.available")}</h3>

                  <p>{t("contact.availableDesc")}</p>
                </div>

              </div>

              <div className="cp-opportunity-grid">

                <div>
                  <Briefcase size={21} />
                  <span>{t("contact.job")}</span>
                </div>

                <div>
                  <Terminal size={21} />
                  <span>{t("contact.freelance")}</span>
                </div>

                <div>
                  <Globe2 size={21} />
                  <span>{t("contact.collab")}</span>
                </div>

              </div>

              <div className="cp-status-footer">
                <span className="cp-live-dot" />

                {tr(
                  "Open to professional opportunities",
                  "آماده بررسی فرصت های همکاری"
                )}
              </div>

            </div>

          </div>

        </section>

        <div className="cp-main-grid">

          <section className="cp-info-column">

            <div className="cp-section-heading">

              <div className="cp-mini-label">
                <MessageCircle size={16} />
                {tr("DIRECT CONNECTION", "ارتباط مستقیم")}
              </div>

              <h2>{t("contact.letsBuild")}</h2>

              <p>{t("contact.desc")}</p>

            </div>

            <div className="cp-contact-list">

              {contactInfo.map((item, index) => (
                <article
                  key={item.id}
                  className="cp-contact-card cp-tilt"
                  data-cp-tilt
                  data-cp-reveal
                >

                  <div className="cp-icon">
                    <item.icon size={23} />
                  </div>

                  <div className="cp-card-content">

                    <span className="cp-card-label">
                      {item.label}
                    </span>

                    {item.href ? (
                      <a
                        href={item.href}
                        dir="ltr"
                        target={
                          item.id === "github"
                            ? "_blank"
                            : undefined
                        }
                        rel="noopener noreferrer"
                        className="cp-contact-value"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <strong className="cp-contact-value">
                        {item.value}
                      </strong>
                    )}

                    {copied === item.id && (
                      <span className="cp-copy-feedback"
                        role="status">
                        {copyError
                          ? tr("Copy failed", "کپی ناموفق بود")
                          : tr("Copied!", "کپی شد")}
                      </span>
                    )}

                  </div>

                  <div className="cp-card-actions">

                    <span className="cp-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {item.copyable ? (
                      <button
                        type="button"
                        className="cp-icon-button"
                        onClick={() =>
                          copyValue(item.id, item.value)
                        }
                        aria-label={tr("Copy", "کپی") + " " + item.label}
                        title={tr("Copy", "کپی")}
                      >
                        {copied === item.id && !copyError
                          ? <Check size={17} />
                          : <Copy size={17} />}
                      </button>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        className="cp-icon-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    ) : null}

                  </div>

                </article>
              ))}

            </div>

            <div className="cp-social-panel" data-cp-reveal>

              <div className="cp-mini-label">
                <Globe2 size={16} />
                {t("contact.follow")}
              </div>

              <div className="cp-social-links">

                <a href={github}
                  target="_blank"
                  rel="noopener noreferrer">

                  <Github size={19} />
                  GitHub
                  <ArrowUpRight size={14} />

                </a>

                <a href="tel:+989118917493">

                  <PhoneCall size={18} />
                  <span dir="ltr">+98 911-891-7493</span>
                  <ArrowUpRight size={14} />

                </a>

              </div>
            </div>

            <div className="cp-note-panel" data-cp-reveal>

              <div className="cp-icon">
                <Sparkles size={23} />
              </div>

              <div>
                <h3>{t("contact.available")}</h3>
                <p>{t("contact.availableDesc")}</p>
              </div>

              <span className="cp-live-dot" />

            </div>

          </section>

          <section className="cp-form-column">

            <div className="cp-form-panel" data-cp-reveal>

              <div className="cp-window-header">

                <div className="cp-window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span dir="ltr">message.compose</span>
                <Send size={17} />

              </div>

              <div className="cp-form-body">

                <div className="cp-form-heading">

                  <div className="cp-icon cp-form-icon">
                    <Send size={25} />
                  </div>

                  <div>
                    <h2>{t("contact.send")}</h2>

                    <p>
                      {tr(
                        "Tell me about your idea or opportunity.",
                        "درباره ایده یا فرصت همکاری خود بنویسید."
                      )}
                    </p>
                  </div>

                </div>

                <div className="cp-form-progress">

                  <div className="cp-progress-header">

                    <span>
                      {tr("Form completion", "میزان تکمیل فرم")}
                    </span>

                    <strong dir="ltr">{progress}%</strong>

                  </div>

                  <div className="cp-progress-track"
                    role="progressbar"
                    aria-label={tr("Form completion", "میزان تکمیل فرم")}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}>

                    <div className="cp-progress-fill"
                      style={{ width: `${progress}%` }} />

                  </div>

                  <div className="cp-progress-steps">

                    {[
                      form.name.trim().length > 0,
                      validEmail,
                      form.subject.length > 0,
                      form.message.trim().length > 0,
                    ].map((done, index) => (
                      <span
                        key={index}
                        className={done ? "cp-step-done" : ""}
                      />
                    ))}

                  </div>

                </div>

                <form onSubmit={handleSubmit}
                  className="cp-form">

                  <div className="cp-field-grid">

                    <div className="cp-field">

                      <label htmlFor="name">
                        {t("contact.name")}
                        <span>*</span>
                      </label>

                      <div className="cp-input-wrap">

                        <UserRound size={17} />

                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          placeholder={t("contact.namePh")}
                          onChange={handleChange} disabled={sending}
                          maxLength={100}
                          required
                        />

                        {form.name.trim() && (
                          <CheckCircle2 size={15}
                            className="cp-valid" />
                        )}

                      </div>
                    </div>

                    <div className="cp-field">

                      <label htmlFor="email">
                        {t("contact.emailLabel")}
                        <span>*</span>
                      </label>

                      <div className="cp-input-wrap">

                        <Mail size={17} />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          dir="ltr"
                          autoComplete="email"
                          value={form.email}
                          placeholder={t("contact.emailPh")}
                          onChange={handleChange} disabled={sending}
                          maxLength={254}
                          required
                        />

                        {validEmail && (
                          <CheckCircle2 size={15}
                            className="cp-valid" />
                        )}

                      </div>

                    </div>

                  </div>

                  <div className="cp-field">

                    <label htmlFor="subject">

                      {t("contact.subject")}

                      <small>
                        {tr("Optional", "اختیاری")}
                      </small>

                    </label>

                    <div className="cp-subject-options">

                      {subjects.map((subject, index) => {
                        const Icon = [
                          Briefcase,
                          Terminal,
                          Globe2,
                          MessageCircle,
                        ][index];

                        return (
                          <button
                            type="button"
                            key={subject.value}
                            aria-pressed={
                              form.subject === subject.value
                            }
                            disabled={sending} className={`cp-subject${
                              form.subject === subject.value
                                ? " cp-subject-selected"
                                : ""
                            }`}
                            onClick={() => {
                              setForm(previous => ({
                                ...previous,
                                subject:
                                  previous.subject === subject.value
                                    ? ""
                                    : subject.value,
                              }));

                              setPrepared(false);
    setSendError(false);
                            }}
                          >

                            <Icon size={20} />

                            <span>{subject.label}</span>

                            {form.subject === subject.value && (
                              <Check size={13}
                                className="cp-subject-check" />
                            )}

                          </button>
                        );
                      })}

                    </div>

                    <select
                      id="subject"
                      name="subject"
                      className="cp-select"
                      value={form.subject}
                      onChange={handleChange} disabled={sending}
                    >
                      <option value="">
                        {t("contact.subjectPh")}
                      </option>

                      {subjects.map(subject => (
                        <option
                          key={subject.value}
                          value={subject.value}
                        >
                          {subject.label}
                        </option>
                      ))}
                    </select>

                  </div>

                  <div className="cp-field">

                    <label htmlFor="message">
                      {t("contact.message")}
                      <span>*</span>
                    </label>

                    <div className="cp-textarea-wrap">

                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        maxLength={2000}
                        value={form.message}
                        onChange={handleChange} disabled={sending}
                        placeholder={t("contact.messagePh")}
                        required
                      />

                      <div className="cp-textarea-footer">

                        <span>
                          <MessageCircle size={14} />
                          {tr("Your message", "پیام شما")}
                        </span>

                        <span dir="ltr">
                          {form.message.length} / 2000
                        </span>

                      </div>

                    </div>

                  </div>

                  <button
                    type="submit"
                    className="cp-button cp-primary cp-submit"
                    disabled={!ready || sending} aria-busy={sending}
                  >
                    <Send size={18} />

                    {sending
                      ? tr("Sending...", "در حال ارسال...")
                      : tr("Send Message", "ارسال پیام")}

                    <ArrowUpRight size={17} />

                  </button>

                  <div className="cp-form-notice">

                    <ShieldCheck size={17} />

                    <p>
                      {tr(
                        "Your message will be submitted directly through our contact service.",
                        "پیام شما مستقیما از طریق سرویس ارتباطی ارسال می شود."
                      )}
                    </p>

                  </div>

                  {sendError && (
                    <div
                      className="cp-prepared"
                      role="alert"
                      style={{
                        color: "#f87171",
                        borderColor: "rgba(248,113,113,.4)"
                      }}
                    >
                      <MessageCircle size={23} />
                      <div>
                        <strong>
                          {tr(
                            "Message submission could not be confirmed",
                            "ارسال پیام تایید نشد"
                          )}
                        </strong>
                        <p>
                          {tr(
                            "Please check your connection and try again.",
                            "اتصال اینترنت را بررسی کرده و دوباره تلاش کنید."
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {prepared && (
                    <div className="cp-prepared" role="status">

                      <CheckCircle2 size={23} />

                      <div>
                        <strong>
                          {tr(
                            "Message submitted successfully!",
                            "پیام با موفقیت ارسال شد!"
                          )}
                        </strong>

                        <p>
                          {tr(
                            "Thank you! Your message has been received by the contact service.",
                            "متشکرم! پیام شما توسط سرویس ارتباطی دریافت شد."
                          )}
                        </p>
                      </div>

                    </div>
                  )}

                  <button
                    type="button"
                    className="cp-reset"
                    onClick={resetForm} disabled={sending}
                  >
                    <RotateCcw size={15} />
                    {tr("Clear form", "پاک کردن فرم")}
                  </button>

                </form>

              </div>
            </div>

          </section>

        </div>

        <section className="cp-bottom-banner" data-cp-reveal>

          <div className="cp-banner-pattern" />

          <MessageCircle
            size={250}
            strokeWidth={0.5}
            className="cp-banner-decoration"
            aria-hidden="true"
          />

          <div className="cp-banner-icon">
            <Sparkles size={31} />
          </div>

          <h2>
            {tr("Ideas into", "از ایده تا")}{" "}
            <span className="cp-gradient">
              {tr("Reality.", "واقعیت.")}
            </span>
          </h2>

          <p>
            {tr(
              "Explore my work and discover how we can collaborate.",
              "نمونه کارهای من را ببینید و فرصت های همکاری را بررسی کنید."
            )}
          </p>

          <div className="cp-banner-actions">

            <Link to="/projects"
              className="cp-button cp-primary">

              {t("nav.projects")}
              <ArrowUpRight size={18} />

            </Link>

            <Link to="/resume"
              className="cp-button cp-secondary">

              {t("nav.resume")}
              <ArrowUpRight size={18} />

            </Link>

          </div>

        </section>

        <div className="cp-watermark"
          dir="ltr"
          aria-hidden="true">
          LET&apos;S CONNECT.
        </div>

      </div>
    </main>
  );
};

export default Contact;
