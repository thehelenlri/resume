import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenge?: string;
  outcome?: string;
  featured?: boolean;
  featuredLabel?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  techs,
  liveUrl,
  githubUrl,
  featured = false,
  featuredLabel = "Featured",
}: ProjectCardProps) => {
  return (
    <div
      className={`glass glass-hover rounded-2xl overflow-hidden group ${featured ? "glow" : ""}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="tag text-xs font-mono">{featuredLabel}</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 glass rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <span key={tech} className="tag text-xs">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-background"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
