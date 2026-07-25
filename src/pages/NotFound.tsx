import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Terminal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background mesh-gradient px-4 pt-16">
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float pointer-events-none" />
      <div
        className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 text-center space-y-8 max-w-lg">
        <div className="space-y-2">
          <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            {t("404.error")}
          </div>
          <h1 className="text-[10rem] font-black leading-none gradient-text select-none">
            404
          </h1>
        </div>

        <div className="glass rounded-2xl p-6 text-left space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
            <Terminal size={14} className="text-primary" />
            <span>{t("404.terminal")}</span>
          </div>
          <div className="text-primary">
            {t("404.navigate")}{" "}
            <span className="text-foreground">"{location.pathname}"</span>
          </div>
          <div className="text-destructive">{t("404.notFound")}</div>
          <div className="text-muted-foreground text-xs">{t("404.moved")}</div>
          <div className="text-[hsl(318_90%_90%)] animate-pulse">▋</div>
        </div>

        <p className="text-muted-foreground">{t("404.desc")}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-background"
          >
            <Home size={16} />
            {t("404.home")}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground"
          >
            <ArrowLeft size={16} />
            {t("404.goBack")}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: "/projects", key: "nav.projects" },
            { href: "/about", key: "nav.about" },
            { href: "/contact", key: "nav.contact" },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              ~/{t(link.key).toLowerCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
