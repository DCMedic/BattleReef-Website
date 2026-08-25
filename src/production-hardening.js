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

const normalizePath = (path) => path.replace(/\/+$/, '') || '/'
const path = normalizePath(window.location.pathname)
const page = pages[path]
const canonical = `https://battlereef.com${path === '/' ? '/' : path}`

function ensureMeta(selector, attributes = {}) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    document.head.appendChild(node)
  }
  Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value))
  return node
}

function setContent(selector, identifyingAttributes, content) {
  ensureMeta(selector, identifyingAttributes).setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

function replacePageSchema(data) {
  document.getElementById('battlereef-page-schema')?.remove()
  const script = document.createElement('script')
  script.id = 'battlereef-page-schema'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

if (page) {
  document.title = page.title
  setCanonical(canonical)
  setContent('meta[name="description"]', { name: 'description' }, page.description)
  setContent('meta[name="robots"]', { name: 'robots' }, 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
  setContent('meta[name="googlebot"]', { name: 'googlebot' }, 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
  setContent('meta[property="og:title"]', { property: 'og:title' }, page.title)
  setContent('meta[property="og:description"]', { property: 'og:description' }, page.description)
  setContent('meta[property="og:url"]', { property: 'og:url' }, canonical)
  setContent('meta[property="og:type"]', { property: 'og:type' }, 'website')
  setContent('meta[name="twitter:title"]', { name: 'twitter:title' }, page.title)
  setContent('meta[name="twitter:description"]', { name: 'twitter:description' }, page.description)

  const schema = page.type === 'SoftwareApplication'
    ? {
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
    : {
        '@context': 'https://schema.org',
        '@type': page.type,
        '@id': `${canonical}#page`,
        url: canonical,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': 'https://battlereef.com/#website' },
        about: { '@id': 'https://battlereef.com/#organization' },
      }
  replacePageSchema(schema)
} else {
  document.title = 'Page Not Found | BattleReef'
  setCanonical(canonical)
  setContent('meta[name="description"]', { name: 'description' }, 'The requested BattleReef page could not be found.')
  setContent('meta[name="robots"]', { name: 'robots' }, 'noindex,nofollow,noarchive')
  setContent('meta[name="googlebot"]', { name: 'googlebot' }, 'noindex,nofollow,noarchive')
  setContent('meta[property="og:title"]', { property: 'og:title' }, 'Page Not Found | BattleReef')
  setContent('meta[property="og:url"]', { property: 'og:url' }, canonical)
  setContent('meta[name="twitter:title"]', { name: 'twitter:title' }, 'Page Not Found | BattleReef')
  replacePageSchema({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#page`,
    url: canonical,
    name: 'Page Not Found | BattleReef',
  })
}
