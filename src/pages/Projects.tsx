import SectionHeader from "@/components/features/SectionHeader";
import ProjectCard from "@/components/features/ProjectCard";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("proj.arch.title"),
      description: t("proj.arch.desc"),
      longDescription: t("proj.arch.long"),
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80&auto=format&fit=crop",
      techs: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      liveUrl: "https://architecture-blond-zeta.vercel.app/",
      githubUrl: "https://github.com",
      challenge: t("proj.arch.challenge"),
      outcome: t("proj.arch.outcome"),
      featured: true,
    },
    {
      title: t("proj.digi.title"),
      description: t("proj.digi.desc"),
      longDescription: t("proj.digi.long"),
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
      techs: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
      liveUrl: "https://digi-seda.vercel.app/",
      githubUrl: "https://github.com",
      challenge: t("proj.digi.challenge"),
      outcome: t("proj.digi.outcome"),
      featured: true,
    },
    {
      title: t("proj.cine.title"),
      description: t("proj.cine.desc"),
      longDescription: t("proj.cine.long"),
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80&auto=format&fit=crop",
      techs: ["React", "TypeScript", "TMDB API", "Tailwind CSS"],
      liveUrl: "https://cinemapedia-nu.vercel.app/",
      githubUrl: "https://github.com",
      challenge: t("proj.cine.challenge"),
      outcome: t("proj.cine.outcome"),
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeader
          badge={t("projects.badge")}
          title={t("projects.title")}
          highlight={t("projects.highlight")}
          subtitle={t("projects.subtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} featuredLabel={t("projects.featured")} />
          ))}
        </div>

        <div className="space-y-8">
          <SectionHeader
            badge={t("projects.details.badge")}
            title={t("projects.details.title")}
            highlight={t("projects.details.highlight")}
            subtitle={t("projects.details.subtitle")}
          />

          {projects.map((project, i) => (
            <div key={project.title} className="glass rounded-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent lg:block hidden" />
                </div>
                <div className="p-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.longDescription}</p>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-xs font-semibold text-primary mb-1 font-mono">
                        {t("projects.challenge")}
                      </div>
                      <p className="text-sm text-muted-foreground">{project.challenge}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="text-xs font-semibold text-[hsl(160_84%_50%)] mb-1 font-mono">
                        {t("projects.outcome")}
                      </div>
                      <p className="text-sm text-muted-foreground">{project.outcome}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span key={tech} className="tag text-xs">{tech}</span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-background"
                    >
                      <ExternalLink size={14} />
                      {t("projects.viewLive")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
