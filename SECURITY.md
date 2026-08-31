# Security

This document tracks known security issues in the codebase, the steps already taken, and the manual actions required to fully close them.

## 1. Live GitHub App credentials staged in `.env.example`

**Status:** Reverted 2026-08-31 — `.env.example` is now back to the empty-placeholder state from the last clean commit. Nothing was pushed.

**Risk that remains:** The four values in the working `.env` (which is untracked) were created at different times. There may be additional live client secrets issued for the same GitHub App that are still valid.

**Manual action required (do this now, in this order):**

1. Go to https://github.com/settings/apps/oreenza-portfolio (or whichever slug you used)
2. Under **Client secrets**, click **Generate new client secret** for each old secret listed, then **Delete** the old one
3. In the local `.env`, replace the four `KEYSTATIC_GITHUB_*` values with the new ones
4. Regenerate `KEYSTATIC_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(40).toString('hex'))"
   ```
   Paste the output as the value of `KEYSTATIC_SECRET` in `.env`
5. Restart `npm run dev` — Keystatic will issue a new session-cookie key derived from the new `KEYSTATIC_SECRET`, invalidating any existing admin sessions
6. Rotate any other secrets that may have been co-located: Cal.com API key, Vercel deployment token, etc.

**Why this happened:** The Keystatic setup wizard writes its four values to `.env` on disk, and the same values were mirrored into `.env.example` for documentation. The `.gitignore` rule `.env*` does not protect already-tracked files, so once `.env.example` was committed, any local edit to that file ships with the next push.

**Prevention going forward:** Treat `.env.example` as a documentation file with empty placeholders only. If you need to share real values during onboarding, use a password manager or a private channel — never the repo.

## 2. `/keystatic` and `/api/keystatic/*` are open in production

**Status:** Hardened 2026-08-31 — both paths are now excluded from the proxy matcher and an explicit `requireAdmin` gate is enforced at the route handler level. See `src/middleware.ts` (renamed `src/proxy.ts` in the Next 16 migration) and `src/app/api/keystatic/[[...params]]/route.ts`.

**Residual:** If `KEYSTATIC_GITHUB_CLIENT_ID` and `KEYSTATIC_GITHUB_CLIENT_SECRET` are leaked (see issue 1) the GitHub App is still exploitable. Rotating per the steps above is the only complete fix.

**What the gate does:** When `NODE_ENV === 'production'`, the keystatic routes return 404 unless the request carries a valid Keystatic session cookie. In development the gate is permissive so the local editor flow still works.

## 3. Silent fallback to local storage

**Status:** Fixed 2026-08-31 — `keystatic.config.ts` now throws on missing `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` in production. This prevents the silent degradation to `local` storage that would expose an unauthenticated write primitive at `POST /api/keystatic/update`.

## 4. Missing security response headers

**Status:** Fixed 2026-08-31 — `next.config.ts` now sets a baseline of `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Strict-Transport-Security` (the last is only emitted in production, since HSTS on a dev origin is a footgun).

**Tuning required:** The CSP currently allows the Cal.com embed (`https://cal.com`, `https://app.cal.com`) and inline scripts (no nonce yet). If you add new third-party embeds, update the `script-src` and `frame-src` directives.

## 5. Personal phone number in JSON-LD

**Status:** Acknowledged — `src/app/layout.tsx` publishes a personal mobile number as `Organization.telephone`. The Keystatic `site` singleton has no `phone` field, so this is hardcoded in source. If you'd rather not have it indexed, remove the `telephone` key from `orgJsonLd` (or move it to the CMS).
