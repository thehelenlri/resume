import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Briefcase, GraduationCap, Heart } from "lucide-react";
import SectionHeader from "@/components/features/SectionHeader";
import TimelineItem from "@/components/features/TimelineItem";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const timeline = [
    {
      year: t("timeline.t1.year"),
      title: t("timeline.t1.title"),
      organization: t("timeline.t1.org"),
      description: t("timeline.t1.desc"),
      tags: ["React", "TypeScript", "Next.js", "Team Lead"],
      type: "work" as const,
    },
    {
      year: t("timeline.t2.year"),
      title: t("timeline.t2.title"),
      organization: t("timeline.t2.org"),
      description: t("timeline.t2.desc"),
      tags: ["React", "API Integration", "Tailwind CSS"],
      type: "work" as const,
    },
    {
      year: t("timeline.t3.year"),
      title: t("timeline.t3.title"),
      organization: t("timeline.t3.org"),
      description: t("timeline.t3.desc"),
      tags: ["HTML/CSS", "JavaScript", "React"],
      type: "work" as const,
    },
    {
      year: t("timeline.t4.year"),
      title: t("timeline.t4.title"),
      description: t("timeline.t4.desc"),
      tags: ["Self-learning", "React", "TypeScript"],
      type: "education" as const,
    },
    {
      year: t("timeline.t5.year"),
      title: t("timeline.t5.title"),
      description: t("timeline.t5.desc"),
      tags: ["HTML", "CSS", "JavaScript"],
      type: "education" as const,
    },
  ];

  const values = [
    { icon: Heart, label: t("about.passionDriven"), desc: t("about.passionDesc") },
    { icon: Briefcase, label: t("about.professional"), desc: t("about.professionalDesc") },
    { icon: GraduationCap, label: t("about.selfLearner"), desc: t("about.selfLearnerDesc") },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-6 animate-slide-up">
            <SectionHeader
              badge={t("about.badge")}
              title={t("about.title")}
              highlight={t("about.highlight")}
              align="left"
            />

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t("about.p1")} <span className="text-foreground font-semibold">{t("about.name")}</span>
                {t("about.p1tail")}
              </p>
              <p>
                {t("about.p2")} <span className="text-primary font-medium">{t("about.exp")}</span>{" "}
                {t("about.p2mid")}{" "}
                <span className="text-foreground font-semibold">{t("about.webcore")}</span>
                {t("about.p2tail")}
              </p>
              <p>{t("about.p3")}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: t("about.age"), value: t("about.ageVal") },
                { icon: MapPin, label: t("about.location"), value: t("about.locationVal") },
                { icon: Briefcase, label: t("about.company"), value: "Webcore" },
                { icon: GraduationCap, label: t("about.experience"), value: t("about.expVal") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-xl p-4 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Icon size={12} />
                    <span>{label}</span>
                  </div>
                  <div className="font-semibold text-foreground text-sm">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link
                to="/skills"
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-background"
              >
                {t("about.mySkills")} <ArrowRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="btn-outline flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground"
              >
                {t("about.viewProjects")}
              </Link>
            </div>
          </div>

          {/* Values card */}
          <div className="space-y-4 animate-slide-up stagger-3">
            <div className="glass rounded-2xl p-6 glow space-y-5">
              <h3 className="font-bold text-foreground font-mono text-sm">
                {t("about.devProfile")}
              </h3>
              <div className="space-y-4">
                {values.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{label}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-foreground font-mono text-sm">
                {t("about.interests")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "UI Design", "UX Research", "Web Performance",
                  "Open Source", "Component Libraries", "Animations", "Accessibility",
                ].map((interest) => (
                  <span key={interest} className="tag text-xs">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            badge={t("about.journey.badge")}
            title={t("about.journey.title")}
            highlight={t("about.journey.highlight")}
            subtitle={t("about.journey.subtitle")}
            align="left"
          />
          <div className="space-y-0">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year + item.title}
                {...item}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
