# Portfolio
Oreenza 

## Managing content (Keystatic CMS)

All site content lives in `src/content/` and is editable at **/admin**:

- **Projects** — add/edit case studies (name, industry, year, intro, description, services, cover + mockups)
- **Site settings** — email, Cal.com links, socials, trusted-by clients, services

### Local editing

```bash
npm run dev
# admin at http://localhost:3000/admin (local mode)
```

### Editing from anywhere (production)

1. Create a GitHub OAuth app at https://github.com/settings/developers
   - Homepage URL: `https://your-domain.com`
   - Callback URL: `https://your-domain.com/admin/api/github/login`
2. Add env vars (see `.env.example`): `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `KEYSTATIC_GITHUB_REPO`
3. Deploy — saving in `/admin` commits to the repo, which redeploys the site automatically.
