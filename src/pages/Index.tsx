import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Zap,
  Code2,
  Layers,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "3+", label: t("home.yearsExp") },
    { value: "10+", label: t("home.projects") },
    { value: "100%", label: t("home.passion") },
  ];

  const featuredCards = [
    {
      icon: Code2,
      title: t("home.cleanCode"),
      desc: t("home.cleanCodeDesc"),
      color: "text-[hsl(186_100%_42%)]",
    },
    {
      icon: Layers,
      title: t("home.modernStack"),
      desc: t("home.modernStackDesc"),
      color: "text-[hsl(107_11.4%_58.8%))]",
    },
    {
      icon: Zap,
      title: t("home.performance"),
      desc: t("home.performanceDesc"),
      color: "text-[hsl(0_0.0%_79.6%)]",
    },
  ];

  const techBadges = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git"];

  const quickSkills = [
    { tech: "React / Next.js", level: t("home.advanced"), pct: "90%" },
    { tech: "TypeScript", level: t("home.advanced"), pct: "85%" },
    { tech: "Tailwind CSS", level: t("home.expert"), pct: "95%" },
    { tech: "API Integration", level: t("home.intermediate"), pct: "80%" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 mesh-gradient" />

        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-slide-up">
              <div className="flex items-center gap-2">
                <span className="tag flex items-center gap-1.5">
                  <Sparkles size={10} />
                  {t("home.available")}
                </span>
              </div>

              <div className="space-y-3">
                <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
                  {t("home.hello")}
                </p>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                  <span className="text-foreground">
                    {t("home.name").split(" ")[0]}
                  </span>
                  <br />
                  <span className="gradient-text">
                    {t("home.name").split(" ")[1]}
                  </span>
                </h1>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-12" />

                  <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
                    {t("home.role")}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg max-w-lg">
                {t("home.intro")}{" "}
                <span className="text-primary font-medium">React</span>,{" "}
                <span className="text-secondary font-medium">Next.js</span>{" "}
                {t("home.intro2")}{" "}
                <span className="text-primary font-medium">TypeScript</span>
                {t("home.intro3")}{" "}
                <span className="text-foreground font-semibold">Webcore</span>.
              </p>

              <div className="flex flex-wrap gap-2">
                {techBadges.map((tech) => (
                  <span key={tech} className="tag font-mono text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-background"
                >
                  {t("home.viewProjects")}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground"
                >
                  {t("home.getInTouch")}
                </Link>
                <Link
                  to="/resume"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download size={16} />
                  {t("home.resume")}
                </Link>
              </div>

              <div className="flex items-center gap-4">
                {[{ icon: Github, href: "https://github.com/thehelenlri" }].map(
                  ({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-1"
                    >
                      <Icon size={20} />
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Right — Stats + Cards */}
            <div className="space-y-6 animate-slide-up stagger-3">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl p-4 text-center glass-hover"
                  >
                    <div className="text-3xl font-black gradient-text">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {featuredCards.map((card) => (
                  <div
                    key={card.title}
                    className="glass glass-hover rounded-xl p-4 flex items-center gap-4"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${card.color}`}
                    >
                      <card.icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {card.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {card.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-5 glow animate-pulse-glow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">
                      {t("home.currentStatus")}
                    </div>
                    <div className="font-bold text-foreground">
                      {t("home.currentRole")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t("home.ageExp")}
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-mono">{t("home.scroll")}</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>

      {/* Quick Skills Section */}
      <section className="section-padding mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickSkills.map((s) => (
              <div
                key={s.tech}
                className="glass glass-hover rounded-xl p-4 text-center space-y-2"
              >
                <div className="font-bold text-foreground text-sm">
                  {s.tech}
                </div>
                <div className="text-2xl font-black gradient-text">{s.pct}</div>
                <div className="text-xs text-muted-foreground">{s.level}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("home.cta")}{" "}
            <span className="gradient-text">{t("home.ctaHighlight")}</span>{" "}
            {t("home.ctaTail")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("home.ctaDesc")}</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-background text-lg"
            >
              {t("home.ctaBtn")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
