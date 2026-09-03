# OREENZA Portfolio

> **Proprietary Property of OREENZA**
>
> This codebase is the exclusive intellectual property of OREENZA. All rights reserved. See [LICENSE](./LICENSE) for usage terms.

---

## Overview

OREENZA's official portfolio website — a performance-first creative agency showcasing our work, services, team, and insights.

**Tech Stack:**

- **Framework:** Next.js 16.3 (App Router)
- **CMS:** Keystatic (GitHub-backed)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion + GSAP
- **Icons:** react-icons
- **Email:** Resend
- **Deployment:** Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your values (see Environment Variables below)

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g., `https://oreenza.com`) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Email where contact form submissions land |
| `CONTACT_FROM_EMAIL` | Verified sending address in Resend |

### Keystatic CMS

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | Repository for CMS commits |
| `KEYSTATIC_GITHUB_CLIENT_ID` | From your GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | From your GitHub App |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Your GitHub App's URL slug |
| `KEYSTATIC_SECRET` | Session signing key (`openssl rand -base64 32`) |

### Development

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Use `http://localhost:3000` for local dev |

## Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint checks
npm run typecheck  # TypeScript validation
```

## Project Structure

```folder
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Main routes
│   ├── api/               # API routes
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── content/               # Keystatic CMS content
│   ├── blog/              # Blog posts
│   ├── projects/           # Project case studies
│   ├── services/           # Service pages
│   └── team/              # Team members
└── lib/                   # Utilities & config
```

## CMS Access

Admin UI: `/keystatic`

> ⚠️ **Security Note:** The CMS admin interface requires authentication. Do not expose the `/keystatic` route publicly in production without proper access controls.

## Deployment

This project is optimized for Vercel deployment:

```bash
# Set environment variables in Vercel dashboard
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add RESEND_API_KEY
vercel env add CONTACT_TO_EMAIL
vercel env add CONTACT_FROM_EMAIL
vercel env add KEYSTATIC_SECRET

# Deploy
vercel deploy
```

## SEO & Indexing

- **Sitemap:** `/sitemap.xml` — auto-generated from CMS content
- **Robots:** `/robots.txt` — crawler permissions
- **AI Indexing:** `/llms.txt` — optimized for AI crawlers (Perplexity, OpenAI, etc.)
- **JSON-LD:** Structured data on all pages (Organization, BreadcrumbList, Service, BlogPosting, etc.)
- **Open Graph:** Full OG metadata + custom images

## License

**All rights reserved.** This project and its contents are proprietary to OREENZA. Unauthorized copying, distribution, modification, or use of any part of this codebase is strictly prohibited.

See [LICENSE](./LICENSE) for the full legal text.

## Security

For security concerns, please review [SECURITY.md](./SECURITY.md).

---

© 2026 OREENZA. All rights reserved.
