# Adak Safar Asia Landing Page

A high-performance, SEO-optimized landing page for **Adak Safar Asia (Hamsafar Jey)** — a specialist organizational transport and VIP bus charter company based in Isfahan, Iran.

---

## Overview

This is a single-page marketing website built with plain HTML, Tailwind CSS, and vanilla JavaScript. It is designed to convert industrial clients (factories, industrial zones) and travel agencies into leads through clear service presentation, trust signals, and multiple contact CTAs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | Tailwind CSS (utility-first) |
| Icons | Bootstrap Icons (self-hosted) |
| Animations | GSAP 3 + ScrollTrigger |
| Language | Persian (Farsi) |
| Script | Vanilla JS (ES Module) |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Serve locally

Since the script uses ES module imports, you need a local server (opening `index.html` directly via `file://` will block imports).

```bash
npm run dev
```
---

## Animations

Animations are powered by **GSAP 3** with the **ScrollTrigger** plugin, imported directly from npm. All animations respect `prefers-reduced-motion` — users with that setting enabled will see no animation.

---

## SEO Features

- Full Open Graph and Twitter Card meta tags
- Local SEO geo tags (Isfahan coordinates)
- `LocalBusiness` JSON-LD schema (`TravelAgency` type)
- `FAQPage` schema on all 7 FAQ items
- Canonical URL tag
- `robots` meta set to `index, follow`
- Semantic HTML5 (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<details>`)

---

## Sections

1. **Header** — Sticky navigation with mobile hamburger menu
2. **Hero** — Full-height banner with headline, description, and dual CTAs
3. **About** — Company background, 30-year history, and stat cards
4. **Services** — 6-card grid covering all service lines
5. **SEO Guide** — Industry-targeted content block for organic search
6. **Standards** — 4 VIP service quality pillars
7. **FAQ** — 7 accordion items with JSON-LD schema markup
8. **Footer** — Contact info, quick links, and social channels
9. **Mobile CTA Bar** — Fixed bottom bar (mobile only) with call and WhatsApp buttons

---

## Contact & Business Info

| | |
|---|---|
| Company | آداک سفر آسیا (Adak Safar Asia) |
| Brand | Hamsafar Jey |
| Location | Jey Passenger Terminal, Isfahan, Iran |
| Website | [adaksafarasia.ir](https://adaksafarasia.ir) |
