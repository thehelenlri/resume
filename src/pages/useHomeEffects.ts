import { useEffect } from "react";

export function useHomeEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hp-root");

    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const cleanups: Array<() => void> = [];
    const frames = new Set<number>();

    root.classList.add("hp-v2");

    const progress = document.createElement("div");
    progress.className = "hp-page-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const ratio = max > 0
        ? Math.min(1, Math.max(0, window.scrollY / max))
        : 0;

      progress.style.transform = `scaleX(${ratio})`;
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);
    onScroll();

    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      progress.remove();
    });

    if (!reducedMotion && finePointer) {
      const hero =
        root.querySelector<HTMLElement>(".hp-hero");

      if (hero) {
        const onMove = (event: PointerEvent) => {
          const rect = hero.getBoundingClientRect();

          hero.style.setProperty(
            "--hp-mx",
            `${event.clientX - rect.left}px`
          );

          hero.style.setProperty(
            "--hp-my",
            `${event.clientY - rect.top}px`
          );

          hero.style.setProperty("--hp-light", "1");
        };

        const onLeave = () => {
          hero.style.setProperty("--hp-light", "0");
        };

        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);

        cleanups.push(() => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
        });
      }

      root.querySelectorAll<HTMLElement>(
        ".hp-skill-card, .hp-stat-card, .hp-feature-card"
      ).forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();

          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          card.style.setProperty("--hp-rx", `${(0.5 - y) * 8}deg`);
          card.style.setProperty("--hp-ry", `${(x - 0.5) * 8}deg`);
          card.style.setProperty("--hp-cx", `${x * 100}%`);
          card.style.setProperty("--hp-cy", `${y * 100}%`);

          card.classList.add("hp-card-active");
        };

        const leave = () => {
          card.style.setProperty("--hp-rx", "0deg");
          card.style.setProperty("--hp-ry", "0deg");
          card.classList.remove("hp-card-active");
        };

        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);

        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          leave();
        });
      });

      root.querySelectorAll<HTMLElement>(
        ".hp-button"
      ).forEach((button) => {
        const move = (event: PointerEvent) => {
          const rect = button.getBoundingClientRect();

          const x =
            event.clientX - rect.left - rect.width / 2;

          const y =
            event.clientY - rect.top - rect.height / 2;

          button.style.setProperty("--hp-bx", `${x * 0.07}px`);
          button.style.setProperty("--hp-by", `${y * 0.12}px`);
        };

        const leave = () => {
          button.style.setProperty("--hp-bx", "0px");
          button.style.setProperty("--hp-by", "0px");
        };

        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", leave);

        cleanups.push(() => {
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", leave);
          leave();
        });
      });
    }

    if (!reducedMotion && "IntersectionObserver" in window) {
      const revealItems = root.querySelectorAll<HTMLElement>(
        ".hp-section-heading, .hp-skill-card, .hp-cta"
      );

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("hp-revealed");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
        }
      );

      revealItems.forEach((item, index) => {
        item.classList.add("hp-reveal");
        item.style.setProperty(
          "--hp-reveal-delay",
          `${(index % 4) * 75}ms`
        );

        revealObserver.observe(item);
      });

      cleanups.push(() => {
        revealObserver.disconnect();

        revealItems.forEach((item) => {
          item.classList.remove("hp-reveal", "hp-revealed");
        });
      });

      const originals = new Map<HTMLElement, string>();

      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target as HTMLElement;
            const original = originals.get(el) || "";
            const match = original.match(/^(\d+)(.*)$/);

            counterObserver.unobserve(el);

            if (!match) return;

            const target = Number(match[1]);
            const suffix = match[2];
            const start = performance.now();

            const animate = (time: number) => {
              const t = Math.min((time - start) / 1100, 1);
              const eased = 1 - Math.pow(1 - t, 4);

              el.textContent =
                Math.round(target * eased) + suffix;

              if (t < 1) {
                schedule();
              } else {
                el.textContent = original;
              }
            };

            const schedule = () => {
              const id = requestAnimationFrame((time) => {
                frames.delete(id);
                animate(time);
              });

              frames.add(id);
            };

            schedule();
          });
        },
        { threshold: 0.35 }
      );

      root.querySelectorAll<HTMLElement>(
        ".hp-stat-card strong, .hp-skill-info strong"
      ).forEach((item) => {
        originals.set(item, item.textContent || "");
        counterObserver.observe(item);
      });

      cleanups.push(() => {
        counterObserver.disconnect();

        originals.forEach((value, item) => {
          item.textContent = value;
        });
      });
    }

    return () => {
      frames.forEach((id) => cancelAnimationFrame(id));
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove("hp-v2");
    };
  }, []);
}
