import React, { useEffect, useRef, useState } from "react"
import {
  LuArrowRight,
  LuTimer,
  LuScale,
  LuActivity,
  LuWifiOff,
  LuUsers,
} from "react-icons/lu"
import { landing } from "../landingContent"
import "../styles/Landing.css"

/**
 * Hero clock: the brand lemniscate doubles as an orbit; a live mm:ss
 * mono clock ticks at its crossing point. This is the page's signature —
 * the contest is governed by the clock, so the clock is the hero.
 */
function HeroClock() {
  const [seconds, setSeconds] = useState(0)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced.current) {
      setSeconds(90) // show a static, meaningful 1:30 instead of ticking
      return
    }
    const id = setInterval(() => setSeconds((s) => (s + 1) % 3600), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return (
    <div className="hero-clock" aria-hidden="true">
      <svg viewBox="0 0 240 160" className="hero-clock-orbit" role="presentation">
        <defs>
          <linearGradient id="agon-orbit" x1="20" y1="40" x2="220" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e0a85e" />
            <stop offset="0.5" stopColor="#b8873a" />
            <stop offset="1" stopColor="#43b5a6" />
          </linearGradient>
        </defs>
        {/* Figure-eight phase orbit (the lemniscate at scale) */}
        <path
          className="hero-orbit-path"
          d="M120 80 C 88 44, 32 50, 32 80 C 32 110, 88 116, 120 80 C 152 44, 208 50, 208 80 C 208 110, 152 116, 120 80 Z"
          fill="none"
          stroke="url(#agon-orbit)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle className="hero-node hero-node-teal" cx="208" cy="80" r="4.5" />
        <circle className="hero-node hero-node-rust" cx="32" cy="80" r="3.5" />
      </svg>
      <div className="hero-clock-face">
        <span className="hero-clock-time">{mm}:{ss}</span>
      </div>
    </div>
  )
}

const FEATURE_ICONS = {
  timer: LuTimer,
  fallacies: LuScale,
  simulator: LuActivity,
  offline: LuWifiOff,
}

export default function Landing({ language, onEnter, onToggleLanguage }) {
  const c = landing[language]

  return (
    <div className="landing" data-theme="dark">
      {/* Top bar */}
      <header className="landing-topbar">
        <a
          href="https://stevenvallejo.com"
          className="landing-wordmark"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mouseîon portal"
        >
          <img src="/icon.svg" alt="" aria-hidden="true" width="30" height="30" />
          <span className="landing-wordmark-name">Agón</span>
          <span className="landing-wordmark-badge">Mouseîon</span>
        </a>
        <button
          type="button"
          className="landing-lang"
          onClick={onToggleLanguage}
          aria-label={c.langSwitch}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </header>

      {/* Hero */}
      <main className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">{c.eyebrow}</p>
          <h1 className="landing-title">
            {c.titleLead}
            <span className="landing-title-mark">{c.titleMark}</span>
          </h1>
          <p className="landing-lede">{c.lede}</p>
          <div className="landing-cta-row">
            <button type="button" className="landing-cta-primary" onClick={onEnter}>
              <LuUsers aria-hidden="true" />
              <span>{c.ctaPrimary}</span>
              <LuArrowRight aria-hidden="true" className="landing-cta-arrow" />
            </button>
            <span className="landing-cta-note">{c.ctaNote}</span>
          </div>
        </div>
        <HeroClock />
      </main>

      {/* Fallacy marquee — the actual catalog the tool ships, as structure */}
      <section className="landing-marquee" aria-label={c.marqueeLabel}>
        <div className="landing-marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="landing-marquee-list" aria-hidden={dup === 1}>
              {c.fallacies.map((f) => (
                <li key={`${dup}-${f}`} className="landing-marquee-item">{f}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" aria-label={c.featuresLabel}>
        {c.features.map((feat) => {
          const Icon = FEATURE_ICONS[feat.key]
          return (
            <article key={feat.key} className="landing-feature">
              <span className="landing-feature-icon"><Icon aria-hidden="true" /></span>
              <h2 className="landing-feature-title">{feat.title}</h2>
              <p className="landing-feature-body">{feat.body}</p>
            </article>
          )
        })}
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <span className="landing-footer-label">{c.footerLabel}</span>
        <nav className="landing-footer-links" aria-label="Mouseîon">
          <a href="https://stevenvallejo.com/es#gallery-filosofia" target="_blank" rel="noopener noreferrer">{c.frentes.filosofia}</a>
          <a href="https://stevenvallejo.com/es#gallery-ciencias" target="_blank" rel="noopener noreferrer">{c.frentes.ciencias}</a>
          <a href="https://stevenvallejo.com/es#gallery-informatica" target="_blank" rel="noopener noreferrer">{c.frentes.informatica}</a>
          <a href="https://stevenvallejo.com/es#gallery-ingenieria" target="_blank" rel="noopener noreferrer">{c.frentes.ingenieria}</a>
        </nav>
        <span className="landing-footer-by">{c.footerBy}</span>
      </footer>
    </div>
  )
}
