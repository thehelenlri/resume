import SectionHeader from "@/components/features/SectionHeader";
import SkillBar from "@/components/features/SkillBar";
import { Code2, GitBranch, Palette, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const colorMap = {
  cyan: "text-[hsl(186_100%_42%)] bg-[hsl(186_100%_42%/0.1)]",
  purple: "text-[hsl(107_11.4%_58.8%))] bg-[hsl(264_80%_60%/0.1)]",
  emerald: "text-[hsl(0_0.0%_79.6%)] bg-[hsl(160_84%_39%/0.1)]",
};

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Git", icon: "⎇" },
  { name: "Vite", icon: "⚡" },
  { name: "Node.js", icon: "🟢" },
  { name: "Figma", icon: "🎭" },
];

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      id: "frontend",
      icon: Code2,
      title: t("skills.frontend"),
      color: "cyan" as const,
      skills: [
        {
          name: "React",
          percentage: 90,
          description: t("skills.react.desc"),
          color: "cyan" as const,
        },
        {
          name: "Next.js",
          percentage: 85,
          description: t("skills.nextjs.desc"),
          color: "cyan" as const,
        },
        {
          name: "TypeScript",
          percentage: 85,
          description: t("skills.ts.desc"),
          color: "cyan" as const,
        },
      ],
    },
    {
      id: "styling",
      icon: Palette,
      title: t("skills.styling"),
      color: "purple" as const,
      skills: [
        {
          name: "Tailwind CSS",
          percentage: 95,
          description: t("skills.tailwind.desc"),
          color: "purple" as const,
        },
        {
          name: "CSS / SCSS",
          percentage: 88,
          description: t("skills.css.desc"),
          color: "purple" as const,
        },
        {
          name: "Framer Motion",
          percentage: 75,
          description: t("skills.framer.desc"),
          color: "purple" as const,
        },
      ],
    },
    {
      id: "tools",
      icon: GitBranch,
      title: t("skills.tools"),
      color: "emerald" as const,
      skills: [
        {
          name: "Git & GitHub",
          percentage: 85,
          description: t("skills.git.desc"),
          color: "emerald" as const,
        },
        {
          name: "API Integration",
          percentage: 80,
          description: t("skills.api.desc"),
          color: "emerald" as const,
        },
        {
          name: "Testing",
          percentage: 70,
          description: t("skills.testing.desc"),
          color: "emerald" as const,
        },
      ],
    },
  ];

  const softSkills = [
    { title: t("skills.ps"), desc: t("skills.ps.desc") },
    { title: t("skills.tc"), desc: t("skills.tc.desc") },
    { title: t("skills.fl"), desc: t("skills.fl.desc") },
    { title: t("skills.ad"), desc: t("skills.ad.desc") },
    { title: t("skills.sm"), desc: t("skills.sm.desc") },
    { title: t("skills.ue"), desc: t("skills.ue.desc") },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          badge={t("skills.badge")}
          title={t("skills.title")}
          highlight={t("skills.highlight")}
          subtitle={t("skills.subtitle")}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="glass rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[cat.color]}`}
                >
                  <cat.icon size={20} />
                </div>
                <h3 className="font-bold text-foreground">{cat.title}</h3>
              </div>
              <div className="space-y-5">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 150} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <SectionHeader
            badge={t("skills.stack.badge")}
            title={t("skills.stack.title")}
            highlight={t("skills.stack.highlight")}
            subtitle={t("skills.stack.subtitle")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="glass glass-hover rounded-xl p-5 text-center space-y-2"
              >
                <div className="text-3xl">{tech.icon}</div>
                <div className="font-semibold text-foreground text-sm">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="font-bold text-foreground text-xl mb-6 flex items-center gap-2">
            <Layers size={20} className="text-primary" />
            {t("skills.soft.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkills.map((skill) => (
              <div
                key={skill.title}
                className="p-4 rounded-xl bg-muted/30 space-y-1"
              >
                <div className="font-semibold text-foreground text-sm">
                  {skill.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {skill.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
