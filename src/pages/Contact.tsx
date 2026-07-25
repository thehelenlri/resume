import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "@/components/features/SectionHeader";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "helenlangari@gmail.com",
      href: "mailto:helenlangari@gmail.com",
      color: "text-[hsl(186_100%_42%)]",
    },
    {
      icon: Github,
      label: t("contact.github"),
      value: "https://github.com/thehelenlri",
      href: "https://github.com/thehelenlri",
      color: "text-[hsl(264_80%_70%)]",
    },
    {
      icon: Linkedin,
      label: t("contact"),
      value: "0911-891-7493",
      color: "text-[hsl(318_90%_90%)]",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("contact.locationVal"),
      color: "text-[hsl(45_100%_60%)]",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t("contact.required"));
      return;
    }
    console.log("Form submitted:", form);
    setSubmitted(true);
    toast.success(t("contact.success"));
  };

  const inputClass =
    "w-full bg-muted/40 border border-border/60 rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200";

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          badge={t("contact.badge")}
          title={t("contact.title")}
          highlight={t("contact.highlight")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold text-foreground text-xl">
                {t("contact.letsBuild")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("contact.desc")}
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <div
                  key={label}
                  className="glass glass-hover rounded-xl p-4 flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${color}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="font-medium text-foreground text-sm">
                        {value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl p-5 space-y-3">
              <div className="font-mono text-xs text-muted-foreground">
                {t("contact.follow")}
              </div>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 glass rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="font-semibold text-foreground text-sm">
                  {t("contact.available")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("contact.availableDesc")}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass rounded-2xl p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <CheckCircle2 size={48} className="text-[hsl(318_90%_90%)]" />
                <h3 className="text-xl font-bold text-foreground">
                  {t("contact.sent")}
                </h3>
                <p className="text-muted-foreground">{t("contact.sentDesc")}</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="btn-outline px-6 py-3 rounded-xl text-sm font-medium text-foreground"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-bold text-foreground font-mono text-sm">
                  {t("contact.send")}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-medium text-muted-foreground"
                      htmlFor="name"
                    >
                      {t("contact.name")} *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t("contact.namePh")}
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-medium text-muted-foreground"
                      htmlFor="email"
                    >
                      {t("contact.emailLabel")} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("contact.emailPh")}
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-xs font-medium text-muted-foreground"
                    htmlFor="subject"
                  >
                    {t("contact.subject")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">{t("contact.subjectPh")}</option>
                    <option value="job">{t("contact.job")}</option>
                    <option value="freelance">{t("contact.freelance")}</option>
                    <option value="collaboration">{t("contact.collab")}</option>
                    <option value="other">{t("contact.other")}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-xs font-medium text-muted-foreground"
                    htmlFor="message"
                  >
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t("contact.messagePh")}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-background"
                >
                  <Send size={16} />
                  {t("contact.sendBtn")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
