import {
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import SectionHeader from "@/components/features/SectionHeader";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Resume = () => {
  const { t } = useLanguage();

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

  const handleDownload = () => {
    toast.info(t("resume.toast"));

    const pdfUrl = "/cv.pdf";

    fetch(pdfUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("PDF not found");
        }

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "cv.pdf";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        toast.error("CV file not found");
        console.log("PDF not found:", pdfUrl);
      });
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-5xl mx-auto section-padding">
        <div className="flex items-start justify-between gap-4 mb-8">
          <SectionHeader
            badge={t("resume.badge")}
            title={t("resume.title")}
            highlight={t("resume.highlight")}
            subtitle={t("resume.subtitle")}
            align="left"
          />
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-background flex-shrink-0 mt-6"
          >
            <Download size={16} />
            {t("resume.download")}
          </button>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/15 to-secondary/10 p-8 border-b border-border/50">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-foreground">
                  {t("resume.name")}
                </h1>
                <p className="text-xl text-primary font-semibold">
                  {t("resume.jobTitle")}
                </p>
                <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                  {t("resume.bio")}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { icon: Mail, text: "helenlangari@gmail.com" },
                  { icon: Github, text: "https://github.com/thehelenlri" },
                  { icon: Linkedin, text: "+98 0911-891-7493" },
                  { icon: MapPin, text: "Iran · Remote Available" },
                  { icon: Calendar, text: "18 y/o" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon size={14} className="text-primary" />
                    <span className="font-mono text-xs">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* Experience */}
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                {t("resume.workExp")}
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div
                    key={exp.role}
                    className="pl-5 border-l-2 border-primary/30 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-foreground">
                          {exp.role}
                        </div>
                        <div className="text-primary font-medium text-sm">
                          {exp.company}
                        </div>
                      </div>
                      <span className="tag font-mono text-xs">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {exp.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-0.5">▸</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-foreground">
                {t("resume.techSkills")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span key={item} className="tag text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-foreground">
                {t("resume.notableProjects")}
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-muted/30"
                  >
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {project.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {project.tech}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-primary">
                      {project.url}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleDownload}
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-background text-lg"
          >
            <Download size={20} />
            {t("resume.downloadFull")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
