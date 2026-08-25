import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SitePage } from './SitePages.jsx'
import './production-hardening.js'
import './styles.css'
import './expansion.css'
import './brand-refinement.css'
import './visual-hotfix.css'
import './brand-assets-v2.css'
import './pages.css'
import './production-hardening.css'

function HomeNavigationUpgrade() {
  React.useEffect(() => {
    const upgrades = [
      ['.site-header a[href="#platform"]', '/brmc'],
      ['.site-header a[href="#engineering"]', '/marine-automation'],
      ['.site-header a[href="#applications"]', '/marine-automation'],
      ['.site-header a[href="#research"]', '/research'],
      ['.site-header a[href="#about"]', '/about'],
      ['.site-header a[href="#contact"]', '/contact'],
      ['.hero-actions a[href="#platform"]', '/brmc'],
      ['footer a[href="#platform"]', '/brmc'],
      ['footer a[href="#applications"]', '/marine-automation'],
      ['footer a[href="#research"]', '/research'],
      ['footer a[href="#about"]', '/about']
    ]
    upgrades.forEach(([selector, href]) => {
      document.querySelectorAll(selector).forEach((link) => link.setAttribute('href', href))
    })
  }, [])
  return null
}

const rawPath = window.location.pathname.replace(/\/+$/, '') || '/'
const content = rawPath === '/' ? <><App /><HomeNavigationUpgrade /></> : <SitePage path={rawPath} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{content}</React.StrictMode>,
)
