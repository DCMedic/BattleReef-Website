# Deployment notes

Cloudflare Workers serves the Vite `dist` directory. `wrangler.jsonc` enables `single-page-application` fallback so direct requests to dedicated BattleReef content routes return the React application. This is required for `/brmc`, `/marine-automation`, `/research`, `/cybersecurity`, `/open-source`, `/about`, and `/contact`.
