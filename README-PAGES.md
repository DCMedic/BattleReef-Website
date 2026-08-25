# BattleReef Website Routes

The production site now includes dedicated indexable routes for major BattleReef topics:

- `/brmc` — BattleReef Marine Controller
- `/marine-automation` — marine automation and cyber-physical systems
- `/research` — research and engineering
- `/cybersecurity` — secure control architecture
- `/open-source` — open engineering
- `/about` — BattleReef company and mission
- `/contact` — collaboration and contact

Cloudflare Workers static assets are configured with SPA fallback in `wrangler.jsonc`, allowing direct requests to these paths to resolve to the React application. The sitemap lists all production routes and legacy `/portfolio` and `/services` URLs permanently redirect to relevant new pages.
