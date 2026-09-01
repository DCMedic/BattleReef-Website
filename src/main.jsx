import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SitePage } from './SitePages.jsx'
import AuthorityPortal from './AuthorityPortal.jsx'
import './production-hardening.js'
import './styles.css'
import './expansion.css'
import './pages.css'
import './production-hardening.css'
import './authority.css'
import './brand-system.css'

function EnhancedSitePage({ path }) {
  return <><SitePage path={path}/><AuthorityPortal path={path}/></>
}

const rawPath = window.location.pathname.replace(/\/+$/, '') || '/'
const content = rawPath === '/' ? <App /> : <EnhancedSitePage path={rawPath} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{content}</React.StrictMode>,
)
