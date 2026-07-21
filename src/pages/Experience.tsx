import SectionHeader from "@/components/features/SectionHeader";
import { Briefcase, Award, TrendingUp, Users, Code2, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

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
      color: "text-[hsl(264_80%_70%)] bg-[hsl(264_80%_60%/0.1)]",
    },
    {
      icon: Users,
      title: t("exp.h3.title"),
      desc: t("exp.h3.desc"),
      color: "text-[hsl(160_84%_50%)] bg-[hsl(160_84%_39%/0.1)]",
    },
    {
      icon: Zap,
      title: t("exp.h4.title"),
      desc: t("exp.h4.desc"),
      color: "text-[hsl(45_100%_60%)] bg-[hsl(45_100%_60%/0.1)]",
    },
  ];

  const responsibilities = [
    t("exp.r1"), t("exp.r2"), t("exp.r3"), t("exp.r4"),
    t("exp.r5"), t("exp.r6"), t("exp.r7"), t("exp.r8"),
  ];

  const technologies = [
    "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
    "SCSS", "Git", "GitHub", "REST API", "React Query", "Vite",
    "Webpack", "Figma", "Jira", "Vercel",
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          badge={t("exp.badge")}
          title={t("exp.title")}
          highlight={t("exp.highlight")}
          subtitle={t("exp.subtitle")}
        />

        <div className="glass rounded-2xl overflow-hidden mb-12 glow">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/5 px-8 py-6 border-b border-border/50">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <Briefcase size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{t("exp.role")}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="text-primary font-semibold">{t("exp.company")}</span>
                      <span>·</span>
                      <span>{t("exp.type")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="tag font-mono text-xs">{t("exp.period")}</span>
                <span className="tag tag-emerald font-mono text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  {t("exp.active")}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { period: t("exp.y2022"), role: t("exp.role2022"), desc: t("exp.desc2022") },
                { period: t("exp.y2023"), role: t("exp.role2023"), desc: t("exp.desc2023") },
                { period: t("exp.y2024"), role: t("exp.role2024"), desc: t("exp.desc2024") },
              ].map((item) => (
                <div key={item.period} className="p-5 rounded-xl bg-muted/30 space-y-2">
                  <div className="font-mono text-xs text-primary">{item.period}</div>
                  <div className="font-bold text-foreground text-sm">{item.role}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-foreground font-mono text-sm">{t("exp.responsibilities")}</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {responsibilities.map((resp) => (
                  <div key={resp} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-foreground font-mono text-sm">{t("exp.technologies")}</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span key={tech} className="tag text-xs">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {highlights.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass glass-hover rounded-xl p-5 space-y-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="font-bold text-foreground text-sm">{title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 text-center space-y-4">
          <Award size={40} className="text-primary mx-auto" />
          <h3 className="text-2xl font-bold text-foreground">
            {t("exp.award.title")}{" "}
            <span className="gradient-text">{t("exp.award.highlight")}</span>
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("exp.award.desc")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
