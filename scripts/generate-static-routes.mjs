import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const templatePath = path.join(dist, 'index.html')

const pages = {
  '/': {
    title: 'BattleReef | Marine Automation & Ocean Technology',
    description: 'BattleReef develops secure marine automation, telemetry, and cyber-physical systems for aquariums, aquaculture, research, and ocean operations.',
    type: 'WebPage',
  },
  '/brmc': {
    title: 'BattleReef Marine Controller | BattleReef',
    description: 'A secure, event-driven marine automation platform designed to observe, coordinate, and protect complex aquatic environments.',
    type: 'SoftwareApplication',
  },
  '/marine-automation': {
    title: 'Marine Automation | BattleReef',
    description: 'BattleReef engineers sensors, life-support equipment, networks, software, telemetry, and operators as one coordinated aquatic cyber-physical system.',
    type: 'WebPage',
  },
  '/research': {
    title: 'Marine Research & Engineering | BattleReef',
    description: 'Research-ready marine telemetry for forecasting, anomaly detection, resilient edge operation, and evidence-driven aquatic system decisions.',
    type: 'WebPage',
  },
  '/cybersecurity': {
    title: 'Marine Cybersecurity | BattleReef',
    description: 'Security architecture for connected marine infrastructure with explicit trust, authenticated control, segmentation, auditability, and physical verification.',
    type: 'WebPage',
  },
  '/open-source': {
    title: 'Open Source Marine Engineering | BattleReef',
    description: 'Open, inspectable marine automation architecture designed for interoperability, experimentation, operator-owned data, and extensibility.',
    type: 'WebPage',
  },
  '/about': {
    title: 'About BattleReef | Marine Systems Engineering',
    description: 'BattleReef develops secure, observable, open marine infrastructure where software, telemetry, cybersecurity, and aquatic operations meet.',
    type: 'AboutPage',
  },
  '/contact': {
    title: 'Contact & Collaboration | BattleReef',
    description: 'Collaborate with BattleReef on marine automation, public aquarium systems, aquaculture, research platforms, open-source engineering, and ocean technology.',
    type: 'ContactPage',
  },
}

if (!fs.existsSync(templatePath)) throw new Error('Vite output missing dist/index.html')
const base = fs.readFileSync(templatePath, 'utf8')

const escapeAttr = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')

function pageSchema(route, page) {
  const canonical = `https://battlereef.com${route === '/' ? '/' : route}`
  if (page.type === 'SoftwareApplication') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${canonical}#software`,
      name: 'BattleReef Marine Controller',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Linux',
      url: canonical,
      description: page.description,
      isAccessibleForFree: true,
      codeRepository: 'https://github.com/DCMedic/BattleReef-Marine-Controller',
      publisher: { '@id': 'https://battlereef.com/#organization' },
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': page.type,
    '@id': `${canonical}#page`,
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': 'https://battlereef.com/#website' },
    about: { '@id': 'https://battlereef.com/#organization' },
  }
}

function render(route, page) {
  const canonical = `https://battlereef.com${route === '/' ? '/' : route}`
  let html = base
    .replace(/<title>.*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)

  const schema = JSON.stringify(pageSchema(route, page)).replaceAll('<', '\\u003c')
  html = html.replace('</head>', `    <script id="battlereef-page-schema" type="application/ld+json">${schema}</script>\n  </head>`)
  return html
}

for (const [route, page] of Object.entries(pages)) {
  if (route === '/') {
    fs.writeFileSync(templatePath, render(route, page))
    continue
  }
  const directory = path.join(dist, route.slice(1))
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, 'index.html'), render(route, page))
}

console.log(`Generated ${Object.keys(pages).length} route-specific HTML entry points.`)
