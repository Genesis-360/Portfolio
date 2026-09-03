# Security Policy — OREENZA Portfolio

## Reporting Security Issues

If you discover a security vulnerability, please report it to us immediately:

- **Email:** `hello@oreenza.com`
- **Response time:** Within 48 hours

Do **NOT** publicly disclose vulnerabilities without prior coordination.

---

## Known Security Considerations

### Environment Variables

- **`.env` file contains secrets** — must never be committed to version control
- **`.env.example`** contains placeholders — commit this file only
- **Production secrets** must be set via deployment platform environment variables

### CMS Admin Access

- The `/keystatic` admin interface requires authentication
- Do not expose in public environments without access controls
- GitHub App credentials must be kept confidential

### Email Sending

- The `RESEND_API_KEY` controls who can send emails via the contact form
- Rate-limit the `/api/contact` endpoint to prevent abuse/spam
- The `CONTACT_FROM_EMAIL` must be a verified domain in Resend

### Dependencies

- All dependencies are regularly audited via npm audit
- Run `npm audit` before deploying to production
- Monitor [GitHub Dependabot alerts](https://github.com/oreenza/portfolio/dependabot)

---

## Security Checklist for Deployment

- [ ] `.env` file has been removed from version control
- [ ] `NEXT_PUBLIC_SITE_URL` points to production domain
- [ ] All API keys set in deployment platform (not in `.env`)
- [ ] Keystatic GitHub App callback URL includes production domain
- [ ] `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` configured
- [ ] `npm audit` passes without critical/high vulnerabilities
- [ ] `/keystatic` route has authentication enabled in production
- [ ] Rate limiting applied to `/api/contact` endpoint

---

## Contact

For security concerns: `hello@oreenza.com`

© 2026 OREENZA. All rights reserved.
