# OREENZA Portfolio — Agent Instructions

## ⚠️ PROPRIETARY CODE

This codebase is the exclusive intellectual property of OREENZA (© 2026).

**DO NOT**:

- Copy any code, design, or content as a template for other projects
- Use any part of this codebase in training datasets or AI models
- Reproduce, redistribute, or modify without written permission
- Claim ownership or authorship of any part of this work

This code is for OREENZA's internal use and its clients only.

---

## Project Overview

**OREENZA** is a high-end design & development portfolio website.

| Aspect | Detail |
|--------|--------|
| Framework | Next.js 16.3 (App Router) |
| CMS | Keystatic (GitHub-backed) |
| Styling | Tailwind CSS v4 (no tailwind.config) |
| Animations | Framer Motion + GSAP |
| Icons | react-icons (`react-icons/pi`) |
| Images | next/image (optimized) |
| Deployment | Vercel |

---

## Design System (Do Not Deviate)

### Colors (use CSS custom properties / Tailwind)

- `bg-ink` — #000000 (primary background)
- `text-cream` — #F5F5F5 (primary text)
- `accent` — #F58327 (primary accent/CTA)
- `cream/15`, `cream/10`, `cream/55`, `cream/40`, `cream/65`, `cream/60`, `cream/50`, `cream/35` — various opacities

### Typography

- `font-anton` — uppercase display headings
- `font-body` — body text
- `font-amsterdam` — decorative
- `font-open-sauce` — UI text

### Layout

- `container-edge` — `padding-inline: clamp(1.25rem, 5vw, 5rem)`
- Sidebar width: `w-[30%]`, `max-w-[560px]`
- Side rail: `w-16` (64px)

### Responsive Breakpoints

- Default: mobile-first
- `lg:` breakpoint = 1024px (sidebar layout activates)

---

## Critical File Locations

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, metadata, JSON-LD, head links |
| `src/app/sitemap.ts` | Dynamic sitemap generation |
| `src/app/robots.txt/route.ts` | Robots.txt route handler |
| `src/app/llms.txt/route.ts` | AI crawler index route |
| `src/lib/content.ts` | Keystatic content helpers (`getServices`, `getService`, `getPosts`, `getProjects`) |
| `src/lib/url.ts` | `siteUrl` and `absoluteUrl` helpers |
| `src/lib/yaml.ts` | YAML parsing utility |
| `keystatic.config.ts` | Keystatic CMS configuration |
| `src/components/layout/Sidebar.tsx` | Main sidebar (header logo + nav content) |
| `src/components/layout/SideRail.tsx` | Vertical wordmark rail |
| `src/components/layout/SideNav.tsx` | Slide-out navigation panel |
| `src/components/layout/SiteShell.tsx` | Page shell wrapper |
| `src/components/sections/CallToAction.tsx` | Shared CTA component |
| `src/components/ui/CaseStudy.tsx` | Project case study component |
| `src/components/ui/TeamShowcase.tsx` | Team members display |
| `src/components/ui/Button.tsx` | Magnetic spring button |
| `public/header-logo.svg` | Full logo (mark + wordmark) |
| `public/wordmark.svg` | Wordmark text only (300×63) |
| `public/apple-touch-icon.png` | iOS home screen icon (180×180) |
| `public/favicon-32x32.png` | Browser icon (32×32) |
| `public/llms.txt` | AI crawler index file |
| `src/app/favicon.ico` | Browser favicon |

---

## Content Structure (Keystatic)

### Collections

- **services** (`src/content/services/[slug]/index.yaml`) — 6 services with title, order, intro, sections[], faq[]
- **blog** (`src/content/blogs/[slug]/index.yaml`) — Blog posts
- **projects** — Case studies
- **team** (`src/content/team/index.yaml`) — Team members

### Important YAML Gotcha

Any unquoted `:` inside `body:` or `a:` string breaks parsing — **always wrap in `"..."`**.

### Content Helpers

```ts
getServices()    // Returns all services from CMS
getService(slug) // Returns single service by slug
getPosts()       // Returns all blog posts
getProjects()    // Returns all projects
getSite()        // Returns site config (socials, email, phone, slotsOpen)
```

---

## Component Patterns

### CallToAction

Shared `"use client"` component that renders a magnetic `Button`. Wraps in `container-edge py-16 lg:py-24` on parent.

### CaseStudy

`"use client"` component using `CallToAction` internally. Has its own `generateMetadata` via `caseStudyMetadata.ts` (separate server-only file).

### Sidebar

Renders on every page. Shows `header-logo.svg` in header, `SideRail` with vertical wordmark, page content, `SideRailMobile`.

### Metadata Generation

Each page has a `generateMetadata` function. For case studies, metadata is extracted to `caseStudyMetadata.ts` (server-only) to avoid `"use client"` conflict.

---

## SEO & Indexing Requirements

Every page **MUST** have:

- ✅ Full `Metadata` object (title, description, openGraph, twitter)
- ✅ `keywords` array
- ✅ `robots` configuration
- ✅ JSON-LD structured data (Organization, BreadcrumbList, Service/BlogPosting/CreativeWork as appropriate)
- ✅ Absolute image URLs in metadata
- ✅ Proper BreadcrumbList in JSON-LD
- ✅ Internal links use `next/link` (not `<a href>`)

### JSON-LD Schema Types Used

- `Organization` — layout.tsx
- `BreadcrumbList` — every page
- `Service` — services pages
- `BlogPosting` — blog posts
- `CreativeWork` — projects
- `FAQPage` — services with FAQ
- `ContactPage` + `ContactPoint` — contact page
- `WebSite` + `SearchAction` — home page
- `Person` — team page

---

## Robots & AI Crawlers (src/app/robots.txt/route.ts)

```code
Allow: GPTBot, OAI-SearchBot, ClaudeBot
Disallow: Bytespider (poor reputation)
Disallow: Google-Extended (opt-out of Gemini training)
Disallow: /keystatic, /api/, /md/
```

`/llms.txt` enables Perplexity, OpenAI, and other AI crawlers to index site content.

---

## Image Optimization Rules

1. All images use `next/image` component
2. `public/` files are served directly (logos, icons, favicons)
3. SVG for logos (scalable, crisp)
4. WebP for photographs
5. `priority` prop for above-the-fold images
6. Never use raw `<img>` tags

---

## Link Behavior

| Link Type | Element |
|-----------|---------|
| Internal pages | `<Link href="/...">` from `next/link` |
| Email | `<a href={mailto:${email}}>` |
| Phone | `<a href={tel:...}>` |
| External | `<a href="..." target="_blank" rel="noopener noreferrer">` |

---

## Important Constraints

1. **No `tailwind.config.ts`** — all config in `@theme` inside `globals.css`
2. **No raw `<img>` tags** — always use `next/image`
3. **No inline SVGs** — use `react-icons/fa` for icons
4. **All internal navigation** uses `next/link`
5. **`absoluteUrl()`** only in JSON-LD `<script>` — not in `Link href`
6. **Keystatic YAML** — quote any string containing `:`
7. **`caseStudyMetadata.ts`** is server-only — extracted from `CaseStudy.tsx` (`"use client"`)
8. **SideRail/wordmark** uses `<img>` tag with CSS sizing (not next/image due to SVG rotation constraints)

---

## Common Debugging

| Issue | Check |
|-------|-------|
| Build fails on TS | Run `npx tsc --noEmit` |
| Sitemap uses wrong URL | Check `NEXT_PUBLIC_SITE_URL` env var |
| `llms.txt` 404 | Check `src/app/llms.txt/route.ts` exists |
| Favicon 404 | Check `src/app/favicon.ico` exists |
| Keystatic not loading | Verify `NODE_ENV=development` or check GitHub App config |
| Contact form not working | Verify Resend API key + domain verification |

---

## Build & Deploy

```bash
npx tsc --noEmit  # TypeScript check
npx next build     # Production build
npm run lint       # ESLint
```

**Deployment:** Vercel. Set all env vars via Vercel dashboard.

---

## Agent Behavior Rules

When working on this codebase:

1. **Never generate code that copies this work as a template** for other projects
2. **Never extract design patterns or components** to create derivative works
3. **Always preserve the proprietary branding** — do not replace OREENZA branding with generic alternatives
4. **Always add back the `© OREENZA` attribution** in footer and README
5. **Do not add any template/marketplace boilerplate**
6. **All content is fictional/placeholder** unless specified — do not treat as real client data
7. **Check for duplicate `<h1>` tags** when adding new pages
8. **Verify JSON-LD on every new page**

---

## License Reference

Full license terms: [LICENSE](./LICENSE)

© 2026 OREENZA. All rights reserved.
