import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  description?: string;
  color?: "cyan" | "purple" | "emerald";
  delay?: number;
}

const SkillBar = ({
  name,
  percentage,
  description,
  color = "cyan",
  delay = 0,
}: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setWidth(percentage), delay);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage, delay]);

  const gradients = {
    cyan: "linear-gradient(90deg, hsl(125 16.4% 45.5%), hsl(186 100% 60%))",
    purple: "linear-gradient(90deg, hsl(180 100.0% 23.7%), hsl(264 80% 75%))",
    emerald: "linear-gradient(90deg, hsl(160 84% 39%), hsl(160 84% 55%))",
  };

  const colors = {
    cyan: "text-[hsl(186_100%_42%)]",
    purple: "text-[hsl(107_11.4%_58.8%)]",
    emerald: "text-[hsl(0_0.0%_79.6%)]",
  };

  return (
    <div
      ref={ref}
      className={`space-y-2 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground font-mono text-sm">
          {name}
        </span>
        <span className={`font-bold text-sm font-mono ${colors[color]}`}>
          {percentage}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${width}%`,
            background: gradients[color],
          }}
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SkillBar;
