import { useLayoutEffect } from "react";
import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";

type RGBA = [number, number, number, number];

function readColor(value: string): RGBA | null {
  if (value === "transparent") {
    return [0, 0, 0, 0];
  }

  if (!/^rgba?\(/i.test(value)) return null;

  const values = value.match(/[\d.]+/g)?.map(Number);

  if (!values || values.length < 3) return null;

  return [
    values[0],
    values[1],
    values[2],
    values[3] ?? 1,
  ];
}

function luminance(c: RGBA) {
  return c[0] * 0.2126
    + c[1] * 0.7152
    + c[2] * 0.0722;
}

function rgba(gray: number, alpha = 1) {
  return `rgba(${gray},${gray},${gray},${alpha})`;
}

function lightSurface(value: string) {
  const c = readColor(value);

  if (!c || c[3] === 0) {
    return "transparent";
  }

  const l = luminance(c);

  const gray = l < 65
    ? 245
    : l < 150
      ? 238
      : l < 225
        ? 242
        : 250;

  return rgba(gray, c[3]);
}

function neutralColor(
  value: string,
  mode: "text" | "background"
) {
  const c = readColor(value);

  if (!c) return value;

  if (c[3] === 0) return "transparent";

  if (mode === "background") {
    return lightSurface(value);
  }

  return rgba(64, Math.max(c[3], 0.85));
}

function neutralGradient(
  value: string,
  mode: "text" | "background"
) {
  if (value === "none") return "none";

  return value.replace(
    /rgba?\([^)]*\)/gi,
    color => neutralColor(color, mode)
  );
}

const properties = [
  "color",
  "background",
  "image",
  "border",
  "shadow",
  "fill",
  "stroke",
  "before",
  "after",
  "action",
  "nav",
];

function reset() {
  for (const name of properties) {
    document
      .querySelectorAll(`[data-mono-${name}]`)
      .forEach(el => {
        el.removeAttribute(`data-mono-${name}`);
      });
  }
}

function applyMonochrome() {
  reset();

  const root = document.getElementById("root");

  if (!root) return;

  const elements = [
    root,
    ...Array.from(root.querySelectorAll("*")),
  ].filter(
    (el): el is HTMLElement | SVGElement =>
      el instanceof HTMLElement ||
      el instanceof SVGElement
  );

  // Read original styles before writing new styles.
  const snapshots = elements.map(el => {
    const s = getComputedStyle(el);
    const before = getComputedStyle(el, "::before");
    const after = getComputedStyle(el, "::after");

    return {
      el,
      color: s.color,
      background: s.backgroundColor,
      image: s.backgroundImage,
      border: s.borderTopColor,
      borderWidth: s.borderTopWidth,
      clip: s.backgroundClip,
      shadow: s.boxShadow,
      fill: s.fill,
      stroke: s.stroke,
      position: s.position,
      fontSize: parseFloat(s.fontSize),
      fontWeight: parseInt(s.fontWeight, 10),
      before: {
        content: before.content,
        background: before.backgroundColor,
        image: before.backgroundImage,
      },
      after: {
        content: after.content,
        background: after.backgroundColor,
        image: after.backgroundImage,
      },
    };
  });

  for (const item of snapshots) {
    const { el } = item;

    if (
      el.closest(".resume-theme-toggle") ||
      el.closest("img, video, canvas, picture") ||
      el.closest("svg defs")
    ) {
      continue;
    }

    const write = (
      name: string,
      variable: string,
      value: string
    ) => {
      el.setAttribute(`data-mono-${name}`, "");
      el.style.setProperty(variable, value);
    };

    const tag = el.tagName.toLowerCase();
    const text = (el.textContent || "").trim();

    const clickable =
      tag === "button" ||
      tag === "a" ||
      el.getAttribute("role") === "button";

    const bg = readColor(item.background);

    const solidBackground =
      !!bg && bg[3] > 0.75;

    const chromatic =
      !!bg &&
      Math.max(bg[0], bg[1], bg[2]) -
      Math.min(bg[0], bg[1], bg[2]) > 15;

    const label = el.getAttribute("class") || "";

    const primaryAction =
      clickable &&
      (
        /(?:^|[\s-])primary(?:$|[\s-])/.test(label) ||
        (
          text.length > 1 &&
          text.length < 90 &&
          !el.closest("nav") &&
          (
            (solidBackground && chromatic) ||
            (
              item.image.includes("gradient") &&
              !item.image.includes("url(")
            )
          )
        )
      );

    if (primaryAction) {
      el.setAttribute("data-mono-action", "");
    }

    // Use actual calculated text colors.
    const heading =
      /^h[1-6]$/.test(tag) ||
      item.fontSize >= 25 ||
      item.fontWeight >= 700;

    write(
      "color",
      "--mono-element-color",
      heading ? "#111111" : "#404040"
    );

    // Preserve original transparent containers.
    if (bg && bg[3] > 0) {
      write(
        "background",
        "--mono-element-background",
        lightSurface(item.background)
      );
    }

    // Convert gradients without changing real photos.
    if (
      item.image !== "none" &&
      !item.image.includes("url(")
    ) {
      write(
        "image",
        "--mono-element-image",
        neutralGradient(
          item.image,
          item.clip.includes("text")
            ? "text"
            : "background"
        )
      );
    }

    // Remove colored borders.
    const border = readColor(item.border);

    if (
      border &&
      border[3] > 0 &&
      parseFloat(item.borderWidth) > 0
    ) {
      write(
        "border",
        "--mono-element-border",
        rgba(215, Math.max(border[3], 0.65))
      );
    }

    // Preserve shadow dimensions, remove colored glow.
    if (item.shadow !== "none") {
      write(
        "shadow",
        "--mono-element-shadow",
        item.shadow.replace(
          /rgba?\([^)]*\)/gi,
          color => {
            const c = readColor(color);
            return rgba(
              0,
              Math.min(c?.[3] ?? 0.06, 0.09)
            );
          }
        )
      );
    }

    // Convert SVG icons, not photographic images.
    if (el instanceof SVGElement) {
      if (
        item.fill &&
        item.fill !== "none" &&
        readColor(item.fill)
      ) {
        write(
          "fill",
          "--mono-element-fill",
          "#404040"
        );
      }

      if (
        item.stroke &&
        item.stroke !== "none" &&
        readColor(item.stroke)
      ) {
        write(
          "stroke",
          "--mono-element-stroke",
          "#404040"
        );
      }
    }

    // Remove dark decorative gradient overlays.
    for (const side of ["before", "after"] as const) {
      const pseudo = item[side];

      if (
        pseudo.content !== "none" &&
        pseudo.content !== "normal" &&
        (
          pseudo.image.includes("gradient") ||
          (readColor(pseudo.background)?.[3] ?? 0) > 0
        )
      ) {
        write(
          side,
          `--mono-${side}-bg`,
          pseudo.image.includes("gradient")
            ? "transparent"
            : lightSurface(pseudo.background)
        );
      }
    }

    // Find navigation using its real DOM position.
    if (
      !el.closest("main") &&
      (
        tag === "nav" ||
        tag === "header" ||
        (
          ["fixed", "sticky"].includes(item.position) &&
          !!el.querySelector("nav")
        )
      )
    ) {
      el.setAttribute("data-mono-nav", "");
    }
  }
}

export default function MonochromeTheme() {
  const { resolvedTheme } = useTheme();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    let frame = 0;
    let observer: MutationObserver | undefined;

    if (resolvedTheme !== "light") {
      reset();
      return;
    }

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyMonochrome);
    };

    applyMonochrome();
    update();

    const root = document.getElementById("root");

    if (root) {
      observer = new MutationObserver(update);

      observer.observe(root, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", update);
      reset();
    };
  }, [resolvedTheme, pathname]);

  return null;
}