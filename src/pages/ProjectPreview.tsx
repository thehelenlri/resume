import { useEffect, useRef, useState } from "react";
import {
  Monitor,
  Smartphone,
  Maximize2,
  ArrowUpRight,
  Globe2,
  X,
  ImageOff,
  Layers,
} from "lucide-react";

import "./ProjectPreview.css";

type Props = {
  title: string;
  url: string;
  fallback?: string;
  large?: boolean;
  isFa: boolean;
};

const slugs: Record<string, string> = {
  "architecture-blond-zeta.vercel.app": "architecture",
  "digi-seda.vercel.app": "digiseda",
  "cinemapedia-nu.vercel.app": "cinemapedia",
  "woodnest-nexa.vercel.app": "woodnest",
};

export default function ProjectPreview({
  title,
  url,
  fallback,
  large = false,
  isFa,
}: Props) {
  const [device, setDevice] =
    useState<"desktop" | "mobile">("desktop");

  const [failed, setFailed] = useState<string[]>([]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const tr = (en: string, fa: string) => isFa ? fa : en;

  const host = new URL(url).hostname;
  const slug = slugs[host];

  const capture = slug
    ? `/projects/${slug}-${device}.jpg`
    : "";

  const candidates = [
    capture,
    ...(device === "desktop" && fallback ? [fallback] : []),
  ].filter(Boolean);

  const image = candidates.find(
    (candidate) => !failed.includes(candidate)
  );

  const markFailed = (src: string) => {
    setFailed(previous =>
      previous.includes(src)
        ? previous
        : [...previous, src]
    );
  };

  const openPreview = () => {
    if (image && dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closePreview = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <div className={`pv-root${large ? " pv-large" : ""}`}>

      <div className="pv-browser-bar">

        <div className="pv-browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="pv-address" dir="ltr">
          <Globe2 size={13} />
          <span>{host}</span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="pv-icon-button"
          aria-label={tr("Open website", "\u0645\u0634\u0627\u0647\u062f\u0647 \u0633\u0627\u06cc\u062a")}
        >
          <ArrowUpRight size={16} />
        </a>

      </div>

      <div
        className={`pv-stage pv-${device}`}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;

          const rect =
            event.currentTarget.getBoundingClientRect();

          event.currentTarget.style.setProperty(
            "--pv-x",
            `${event.clientX - rect.left}px`
          );

          event.currentTarget.style.setProperty(
            "--pv-y",
            `${event.clientY - rect.top}px`
          );
        }}
      >

        <div className="pv-stage-grid" />

        {image ? (
          <div className="pv-device-frame" key={device}>

            <img
              key={image}
              src={image}
              alt={`${title} - ${device}`}
              loading="lazy"
              decoding="async"
              onError={() => markFailed(image)}
            />

            {device === "mobile" && (
              <span className="pv-phone-notch" />
            )}

          </div>
        ) : (
          <div className="pv-no-image">
            <ImageOff size={32} />

            <strong>{title}</strong>

            <span>
              {tr(
                "Preview unavailable",
                "\u067e\u06cc\u0634 \u0646\u0645\u0627\u06cc\u0634 \u062f\u0631 \u062f\u0633\u062a\u0631\u0633 \u0646\u06cc\u0633\u062a"
              )}
            </span>

            <a href={url} target="_blank" rel="noopener noreferrer">
              {tr("View website", "\u0645\u0634\u0627\u0647\u062f\u0647 \u0633\u0627\u06cc\u062a")}
              <ArrowUpRight size={14} />
            </a>
          </div>
        )}

        {image && (
          <button
            type="button"
            className="pv-expand"
            onClick={openPreview}
            aria-label={tr("Enlarge preview", "\u0628\u0632\u0631\u06af\u0646\u0645\u0627\u06cc\u06cc \u062a\u0635\u0648\u06cc\u0631")}
            ref={openButtonRef}
          >
            <Maximize2 size={19} />
          </button>
        )}

      </div>

      <div className="pv-toolbar">

        <div className="pv-device-switcher">

          <button
            type="button"
            aria-pressed={device === "desktop"}
            onClick={() => setDevice("desktop")}
            className={device === "desktop" ? "pv-selected" : ""}
            title={tr("Desktop", "\u062f\u0633\u06a9\u062a\u0627\u067e")}
          >
            <Monitor size={16} />

            <span>
              {tr("Desktop", "\u062f\u0633\u06a9\u062a\u0627\u067e")}
            </span>
          </button>

          <button
            type="button"
            aria-pressed={device === "mobile"}
            onClick={() => setDevice("mobile")}
            className={device === "mobile" ? "pv-selected" : ""}
            title={tr("Mobile", "\u0645\u0648\u0628\u0627\u06cc\u0644")}
          >
            <Smartphone size={16} />

            <span>
              {tr("Mobile", "\u0645\u0648\u0628\u0627\u06cc\u0644")}
            </span>
          </button>

        </div>

        <div className="pv-preview-label">
          <Layers size={13} />
          <span>
            {device === "desktop" ? "1440" : "430"}
          </span>
        </div>

        <button
          type="button"
          className="pv-icon-button"
          onClick={openPreview}
          disabled={!image}
          aria-label={tr("Fullscreen preview", "\u0646\u0645\u0627\u06cc\u0634 \u0628\u0632\u0631\u06af")}
        >
          <Maximize2 size={16} />
        </button>

      </div>

      <dialog
        ref={dialogRef}
        className="pv-dialog"
        aria-label={`${title} preview`}
        dir={isFa ? "rtl" : "ltr"}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePreview();
          }
        }}
        onClose={() => openButtonRef.current?.focus()}
      >

        <div className="pv-dialog-content">

          <div className="pv-dialog-header">
            <div>
              <span>PROJECT PREVIEW</span>
              <h2>{title}</h2>
            </div>

            <button
              type="button"
              className="pv-icon-button"
              onClick={closePreview}
              aria-label={tr("Close", "\u0628\u0633\u062a\u0646")}
            >
              <X size={22} />
            </button>
          </div>

          {image && (
            <img
              className={`pv-dialog-image pv-dialog-${device}`}
              src={image}
              alt={`${title} - ${device}`}
            />
          )}

          <div className="pv-dialog-footer">

            <span>{host}</span>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tr("View live website", "\u0645\u0634\u0627\u0647\u062f\u0647 \u0633\u0627\u06cc\u062a")}
              <ArrowUpRight size={16} />
            </a>

          </div>

        </div>

      </dialog>

    </div>
  );
}
