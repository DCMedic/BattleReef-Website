import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './production-hardening.js'
import './styles.css'
import './brand-system.css'
import './production-hardening.css'

const rawPath = window.location.pathname.replace(/\/+$/, '') || '/'

async function renderSite() {
  let content

  if (rawPath === '/') {
    content = <App />
  } else {
    const [sitePagesModule, authorityModule] = await Promise.all([
      import('./SitePages.jsx'),
      import('./AuthorityPortal.jsx'),
      import('./expansion.css'),
      import('./pages.css'),
      import('./authority.css'),
    ])

    const SitePage = sitePagesModule.SitePage
    const AuthorityPortal = authorityModule.default
    content = <><SitePage path={rawPath}/><AuthorityPortal path={rawPath}/></>
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>{content}</React.StrictMode>,
  )
}

renderSite()
