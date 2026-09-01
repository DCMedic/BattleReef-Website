import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public', 'route-manifest.json'), 'utf8'))
const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8')
const redirects = fs.readFileSync(path.join(root, 'public', '_redirects'), 'utf8')
const headers = fs.readFileSync(path.join(root, 'public', '_headers'), 'utf8')

const fail = (message) => {
  console.error(`VERIFY FAILED: ${message}`)
  process.exitCode = 1
}

for (const route of manifest.routes) {
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html')
  if (!fs.existsSync(file)) {
    fail(`missing generated entry point for ${route}`)
    continue
  }
  const html = fs.readFileSync(file, 'utf8')
  const canonical = `https://battlereef.com${route === '/' ? '/' : route}`
  if (!html.includes(`rel="canonical" href="${canonical}"`)) fail(`canonical mismatch for ${route}`)
  if (!html.includes(`property="og:url" content="${canonical}"`)) fail(`Open Graph URL mismatch for ${route}`)
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`sitemap missing ${route}`)
  if (!html.includes('id="battlereef-page-schema"')) fail(`structured page schema missing for ${route}`)
}

if (!fs.existsSync(path.join(dist, '404.html'))) fail('dist/404.html missing')
if (!redirects.includes('/portfolio /brmc 301')) fail('portfolio redirect missing')
if (!redirects.includes('/services /marine-automation 301')) fail('services redirect missing')
if (!headers.includes('Content-Security-Policy:')) fail('Content-Security-Policy missing')
if (!headers.includes('Strict-Transport-Security:')) fail('HSTS missing')
if (!headers.includes('/brand/*\n  Cache-Control: public, max-age=31536000, immutable')) fail('immutable brand caching missing')

const builtHome = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!builtHome.includes('rel="preload" as="image"')) fail('critical brand image preload missing')
if (builtHome.includes('fonts.googleapis.com')) fail('render-blocking external font request remains')

for (const asset of [
  'battlereef-logo-mark-320.webp',
  'battlereef-logo-mark-640.webp',
  'battlereef-logo-mark-1024.webp',
  'battlereef-logo-full-480.webp',
  'battlereef-logo-full-960.webp',
  'battlereef-logo-full-1536.webp',
]) {
  if (!fs.existsSync(path.join(dist, 'brand', asset))) fail(`optimized brand asset missing: ${asset}`)
}

const brandComponent = fs.readFileSync(path.join(root, 'src', 'BrandLogo.jsx'), 'utf8')
if (!brandComponent.includes('battlereef-logo-full-960.webp')) fail('canonical circular-wave full logo is not configured')
if (brandComponent.includes('battlereef-wordmark-960.webp')) fail('obsolete non-wave wordmark is still configured')

const brandAssetModule = path.join(root, 'src', 'brandAssets.js')
if (fs.existsSync(brandAssetModule)) fail('obsolete src/brandAssets.js is still present')

const brandCss = fs.readFileSync(path.join(root, 'src', 'brand-system.css'), 'utf8')
for (const requiredLayer of [
  '.hero-visual::before',
  '.hero-mark',
  '.hero-visual .orbital',
  '.hero-visual .visual-card',
]) {
  if (!brandCss.includes(requiredLayer)) fail(`explicit hero layer missing: ${requiredLayer}`)
}
if (!brandCss.includes('backdrop-filter: none')) fail('hero card opacity protection missing')

if (!process.exitCode) console.log('Production verification passed.')
