import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Code2, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:helen@example.com", label: "Email" },
  ];

  const quickLinks = [
    { href: "/about", key: "nav.about" },
    { href: "/skills", key: "nav.skills" },
    { href: "/projects", key: "nav.projects" },
    { href: "/experience", key: "nav.experience" },
    { href: "/resume", key: "nav.resume" },
    { href: "/contact", key: "nav.contact" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center">
                <Code2 size={16} className="text-background" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Helen</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t("footer.quicklinks")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t("footer.connect")}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              helenlangari@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} {t("footer.rights")}
            React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
