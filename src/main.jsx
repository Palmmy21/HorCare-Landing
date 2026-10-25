import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { languageOf } from './i18n/locale.js'

const rootEl = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (rootEl.hasChildNodes() && document.documentElement.lang === languageOf(window.location.pathname)) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
