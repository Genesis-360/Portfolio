# OREENZA Portfolio

Design agency portfolio for Oreenza — built with Next.js 16, Keystatic CMS, Framer Motion, and GSAP.

## Setup

```bash
npm install
cp .env.example .env   # fill in the values
npm run dev
```

### Environment variables

**Keystatic CMS** (see `.env.example` for documentation):
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` — the repo to commit CMS changes to
- `KEYSTATIC_GITHUB_CLIENT_ID` + `KEYSTATIC_GITHUB_CLIENT_SECRET` — from your GitHub App
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — your GitHub App's URL slug
- `KEYSTATIC_SECRET` — session signing key (generate with `openssl rand -base64 32`)

**Contact form** (Resend):
- `RESEND_API_KEY` — from [resend.com/api-keys](https://resend.com/api-keys)
- `CONTACT_TO_EMAIL` — where enquiries land
- `CONTACT_FROM_EMAIL` — the sending address (must be a verified domain in Resend)

**Site URL** (optional, falls back to `https://oreenza.com`):
- `NEXT_PUBLIC_SITE_URL` — use `https://localhost:3000` for local previews

## CMS

Admin UI at `/keystatic` — requires `NODE_ENV=development` to load (see `SECURITY.md`).

## Scripts

```bash
npm run dev     # development server
npm run build  # production build
npm run start  # production server
npm run lint   # ESLint
npm run typecheck  # TypeScript
```
