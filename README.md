# Amir Abid — Portfolio

Single-page futuristic portfolio built with **Svelte** and **Vite**. Dark theme by default with light mode toggle, glassmorphism navbar and contact modal, electric blue accents, and conversion-focused CTAs.

## Setup

```bash
npm install
npm run dev
```

Build for production: `npm run build`. Preview: `npm run preview`.

## Customization

- **Profile photo**: Add your image as `public/profile.jpg` (240×240 or larger). The hero currently uses a placeholder; replace the `src` in `src/lib/Hero.svelte` with `/profile.jpg` when ready.
- **CV**: Place your PDF at `public/cv.pdf` so “Download CV” works.
- **GitHub graph**: In `src/lib/Projects.svelte`, update the activity graph `username=` query param to your GitHub username (and adjust the image URL if you use another service).
- **Social links**: Edit `linkedInUrl` and `githubUrl` in `src/lib/Footer.svelte`.

## Stack

- Svelte 5 + Vite
- Lucide Svelte (icons)
- Plain CSS (design tokens, no Tailwind)

## Project structure

- `src/App.svelte` — layout, scroll container, modal state
- `src/lib/` — Navbar, Hero, About, Services, Skills, Projects, Footer, ContactModal, ThemeToggle
- `src/app.css` — design system (themes, typography, utilities)
