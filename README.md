# BattleReef Website

The production website for BattleReef, Ltd., built with React and Vite and deployed through Cloudflare Workers static assets.

## Production architecture

- React 18 user interface
- Vite 8 production build
- Cloudflare Workers static asset hosting
- Pre-generated HTML entry points for every public route
- True HTTP 404 handling for unknown routes
- Route-specific canonical, Open Graph, Twitter, and structured metadata
- CSP, HSTS, clickjacking, MIME-sniffing, referrer, permissions, COOP, and CORP headers
- Reproducible dependency installation through `package-lock.json`
- GitHub Actions quality gate with dependency audit, build, and production-output verification

## Public routes

`/`, `/brmc`, `/marine-automation`, `/research`, `/cybersecurity`, `/open-source`, `/about`, and `/contact`.

Legacy `/portfolio` and `/services` paths permanently redirect to their current destinations.

## Local development

```bash
npm ci
npm run dev
```

## Production verification

```bash
npm run build
npm run verify
```
