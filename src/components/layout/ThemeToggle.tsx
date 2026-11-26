import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { dir } = useLanguage();

  const dark = resolvedTheme === "dark";
  const fa = dir === "rtl";

  const label = dark
    ? fa ? "حالت روز" : "Light mode"
    : fa ? "حالت شب" : "Dark mode";

  return (
    <button
      type="button"
      className="resume-theme-toggle"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      <span className="resume-theme-icon">
        {dark
          ? <Sun size={19} strokeWidth={1.7}/>
          : <Moon size={19} strokeWidth={1.7}/>}
      </span>

      <span className="resume-theme-label">
        {label}
      </span>
    </button>
  );
}