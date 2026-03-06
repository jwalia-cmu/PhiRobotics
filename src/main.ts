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
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  const contactCta = document.querySelector(".contact__cta") as HTMLAnchorElement | null;
  if (contactCta) {
    contactCta.href = `mailto:${SITE.email}`;
  }

  const footerEmail = document.querySelector(".footer__email") as HTMLAnchorElement | null;
  if (footerEmail) {
    footerEmail.href = `mailto:${SITE.email}`;
    footerEmail.textContent = SITE.email;
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
