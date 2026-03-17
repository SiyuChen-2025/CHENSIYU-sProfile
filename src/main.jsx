import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import WorkDetail from './components/WorkDetail.jsx'
import ProfileDetail from './components/ProfileDetail.jsx'
import './index.css'
import './App.css'

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') // e.g. '' or 'CHENSIYU-sProfile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basePath ? `/${basePath}` : undefined}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<ProfileDetail />} />
        <Route path="/work/:id" element={<WorkDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
