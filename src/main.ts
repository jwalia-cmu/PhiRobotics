import "./styles.css";
import { DOMAINS, HERO, SITE, VIDEO } from "./config";
import { startTypewriter } from "./typing";
import { initVideoBackground } from "./video";

function $(sel: string) {
  return document.querySelector(sel);
}

function setText(el: Element | null, text: string) {
  if (!el) return;
  el.textContent = text;
}

function setupBranding() {
  const kicker = document.querySelector(".hero__kicker");
  setText(kicker, SITE.brand);

  const footerBrand = document.querySelector(".footer__inner > div");
  if (footerBrand) {
    // footerBrand currently contains © YEAR BRAND. Keep structure but update brand.
    const yearSpan = footerBrand.querySelector("#year") as HTMLSpanElement | null;
    const year = new Date().getFullYear().toString();
    if (yearSpan) yearSpan.textContent = year;
    footerBrand.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        // noop
      }
    });
    // Replace brand text after year.
    const textNodes = Array.from(footerBrand.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE);
    if (textNodes.length) {
      textNodes[textNodes.length - 1]!.textContent = ` ${SITE.brand}`;
    }
  } else {
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  }

  const contactEmail = document.querySelector(".contact__email") as HTMLAnchorElement | null;
  if (contactEmail) {
    contactEmail.href = `mailto:${SITE.email}`;
    contactEmail.textContent = SITE.email;
  }
}

function setupTypewriter() {
  const el = $("#typingTarget") as HTMLElement | null;
  if (!el) return;

  // If user prefers reduced motion, just show a single word.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = DOMAINS[0] ?? "Robots";
    return;
  }

  startTypewriter(el, {
    words: DOMAINS,
    typingSpeedMs: HERO.typingSpeedMs,
    backspaceSpeedMs: HERO.backspaceSpeedMs,
    pauseMs: HERO.typingPauseMs,
  });
}

async function setupVideo() {
  const videoA = $("#videoA") as HTMLVideoElement | null;
  const videoB = $("#videoB") as HTMLVideoElement | null;
  if (!videoA || !videoB) return;

  const statusEl = $("#videoStatus") as HTMLElement | null;

  await initVideoBackground({
    videoA,
    videoB,
    manifestUrl: VIDEO.manifestUrl,
    swapEveryMs: VIDEO.swapEveryMs,
    fadeMs: VIDEO.fadeMs,
    statusEl,
  });
}

setupBranding();
setupTypewriter();
setupVideo();

// Keep the year correct even if the footer markup changes.
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
