import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './brand-system.css'
import './production-hardening.css'

const rawPath = window.location.pathname.replace(/\/+$/, '') || '/'
const authorityPaths = new Set(['/brmc', '/research', '/cybersecurity', '/contact'])

async function renderSite() {
  let content

  if (rawPath === '/') {
    content = <App />
  } else {
    const [sitePagesModule] = await Promise.all([
      import('./SitePages.jsx'),
      import('./expansion.css'),
      import('./pages.css'),
    ])

    const SitePage = sitePagesModule.SitePage
    let authority = null

    if (authorityPaths.has(rawPath)) {
      const [authorityModule] = await Promise.all([
        import('./AuthorityPortal.jsx'),
        import('./authority.css'),
      ])
      const AuthorityPortal = authorityModule.default
      authority = <AuthorityPortal path={rawPath} />
    }

    content = <><SitePage path={rawPath}/>{authority}</>
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>{content}</React.StrictMode>,
  )
}

renderSite()
