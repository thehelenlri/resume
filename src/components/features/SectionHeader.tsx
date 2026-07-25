interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeader = ({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeaderProps) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {badge && (
        <span className="tag font-mono text-xs">{badge}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
