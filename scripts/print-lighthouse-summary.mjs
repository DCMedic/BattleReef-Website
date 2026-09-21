import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || '.lighthouseci'

function findJsonFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? findJsonFiles(full) : entry.name.endsWith('.json') ? [full] : []
  })
}

const reportMap = new Map()
for (const file of findJsonFiles(root)) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (!data?.categories || !data?.audits) continue
    const key = `${data.fetchTime ?? ''}|${data.finalUrl ?? data.requestedUrl ?? ''}`
    if (!reportMap.has(key)) reportMap.set(key, { file, data })
  } catch {
    // Ignore non-Lighthouse JSON files.
  }
}
const reports = [...reportMap.values()]

if (!reports.length) {
  console.log('LIGHTHOUSE_SUMMARY no LHR JSON reports found')
  process.exit(0)
}

const metrics = [
  ['FCP', 'first-contentful-paint'],
  ['LCP', 'largest-contentful-paint'],
  ['TBT', 'total-blocking-time'],
  ['CLS', 'cumulative-layout-shift'],
  ['SpeedIndex', 'speed-index'],
]

for (const [index, { data }] of reports.entries()) {
  const scores = Object.fromEntries(
    ['performance', 'accessibility', 'best-practices', 'seo'].map((name) => [
      name,
      Math.round((data.categories[name]?.score ?? 0) * 100),
    ]),
  )
  const values = Object.fromEntries(
    metrics.map(([label, id]) => [label, data.audits[id]?.displayValue ?? data.audits[id]?.numericValue ?? null]),
  )
  console.log(`LIGHTHOUSE_RUN ${index + 1} scores=${JSON.stringify(scores)} metrics=${JSON.stringify(values)}`)
}

const sorted = [...reports].sort(
  (a, b) => (a.data.categories.performance?.score ?? 0) - (b.data.categories.performance?.score ?? 0),
)
const median = sorted[Math.floor(sorted.length / 2)].data
console.log('LIGHTHOUSE_MEDIAN', JSON.stringify({
  scores: Object.fromEntries(
    ['performance', 'accessibility', 'best-practices', 'seo'].map((name) => [
      name,
      Math.round((median.categories[name]?.score ?? 0) * 100),
    ]),
  ),
  metrics: Object.fromEntries(
    metrics.map(([label, id]) => [label, median.audits[id]?.displayValue ?? median.audits[id]?.numericValue ?? null]),
  ),
}))

for (const id of [
  'image-delivery-insight',
  'uses-responsive-images',
  'unused-javascript',
  'render-blocking-insight',
  'network-dependency-tree-insight',
]) {
  const audit = median.audits[id]
  if (!audit) continue
  console.log(`LIGHTHOUSE_AUDIT ${id} score=${audit.score} display=${JSON.stringify(audit.displayValue ?? '')}`)
  const items = audit.details?.items
  if (Array.isArray(items)) {
    for (const item of items.slice(0, 12)) {
      const compact = {}
      for (const key of ['url', 'source', 'totalBytes', 'wastedBytes', 'wastedMs', 'transferSize', 'resourceSize']) {
        if (item[key] !== undefined) compact[key] = item[key]
      }
      if (Object.keys(compact).length) console.log(`LIGHTHOUSE_ITEM ${id} ${JSON.stringify(compact)}`)
    }
  }
}
