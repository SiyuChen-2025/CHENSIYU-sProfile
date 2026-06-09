import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import WorkDetail from './components/WorkDetail.jsx'
import ProfileDetail from './components/ProfileDetail.jsx'
import WorksPage from './components/WorksPage.jsx'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<ProfileDetail />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/work/:id" element={<WorkDetail />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
