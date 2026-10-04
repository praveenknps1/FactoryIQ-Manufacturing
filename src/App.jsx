import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Production from './pages/Production.jsx'
import Quality from './pages/Quality.jsx'
import SupplyChain from './pages/SupplyChain.jsx'
import AfterSales from './pages/AfterSales.jsx'
import Documents from './pages/Documents.jsx'
import Analytics from './pages/Analytics.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState('Manager')
  const [search, setSearch] = useState('')

  if (!loggedIn) {
    return <Login onLogin={(r) => { setRole(r); setLoggedIn(true) }} />
  }

  return (
    <div className="flex min-h-screen bg-base text-ink">
      <Sidebar role={role} onSignOut={() => setLoggedIn(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar role={role} setRole={setRole} search={search} setSearch={setSearch} />
        <main className="flex-1 min-w-0 px-3 py-5 sm:px-6 sm:py-7 lg:px-8 max-w-[1600px]">
          <Routes>
            <Route path="/" element={<Dashboard role={role} />} />
            <Route path="/projects" element={<Projects role={role} />} />
            <Route path="/production" element={<Production />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/after-sales" element={<AfterSales />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
