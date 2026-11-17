
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Playground from './components/Playground'
import CodeReview from './components/CodeReview'
import ModelComparison from './components/ModelComparison'
import Projects from './components/Projects'

function Analytics() {
  return <h1 className="text-2xl font-bold text-white">Analytics</h1>
}

function SettingsPage() {
  return <h1 className="text-2xl font-bold text-white">Settings</h1>
}

function TestGeneration() {
  return <h1 className="text-2xl font-bold text-white">Test Generation</h1>
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0d14]">

      {/* Desktop Sidebar */}
      <div className="hidden h-full shrink-0 md:flex">
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">

        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation"
          className="fixed left-4 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#171925] text-white shadow-lg"
        >
          <Menu size={21} />
        </button>

        {isSidebarOpen && (
          <>
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 left-0 z-50 w-70 overflow-y-auto overscroll-contain bg-[#10121b] shadow-2xl">
              <Sidebar onNavigate={() => setIsSidebarOpen(false)} />

              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#242638] text-white transition hover:bg-violet-500"
              >
                <X size={19} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Application Pages */}
      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-6 md:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/code-review" element={<CodeReview />} />
          <Route path="/models" element={<ModelComparison />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/test-generation" element={<TestGeneration />} />

          {/* Redirect unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
