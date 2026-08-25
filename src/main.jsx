import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SitePage } from './SitePages.jsx'
import './styles.css'
import './expansion.css'
import './brand-refinement.css'
import './visual-hotfix.css'
import './brand-assets-v2.css'
import './pages.css'

const rawPath = window.location.pathname.replace(/\/+$/, '') || '/'
const content = rawPath === '/' ? <App /> : <SitePage path={rawPath} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{content}</React.StrictMode>,
)
