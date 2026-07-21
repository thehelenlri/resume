interface TimelineItemProps {
  year: string;
  title: string;
  organization?: string;
  description: string;
  tags?: string[];
  isLast?: boolean;
  type?: "work" | "education" | "achievement";
}

const TimelineItem = ({
  year,
  title,
  organization,
  description,
  tags = [],
  isLast = false,
  type = "work",
}: TimelineItemProps) => {
  const dotColors = {
    work: "bg-[hsl(186_100%_42%)] shadow-[0_0_12px_hsl(186_100%_42%/0.6)]",
    education: "bg-[hsl(264_80%_60%)] shadow-[0_0_12px_hsl(264_80%_60%/0.6)]",
    achievement: "bg-[hsl(160_84%_39%)] shadow-[0_0_12px_hsl(160_84%_39%/0.6)]",
  };

  const tagColors = {
    work: "tag",
    education: "tag tag-purple",
    achievement: "tag tag-emerald",
  };

  return (
    <div className="relative flex gap-6">
      {/* Line and dot */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${dotColors[type]}`} />
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className={`pb-8 flex-1 ${isLast ? "" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-mono text-xs text-muted-foreground">{year}</span>
          {organization && (
            <>
              <span className="text-muted-foreground text-xs">·</span>
              <span className={`text-xs font-medium ${tagColors[type]}`}>{organization}</span>
            </>
          )}
        </div>
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="tag text-xs">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
