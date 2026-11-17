
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Prevent background scrolling while mobile navigation is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  return (
    <div className="flex min-h-screen bg-[#0b0d14]">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">

        {/* Hamburger Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation"
          className="fixed left-4 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#171925] text-white shadow-lg"
        >
          <Menu size={21} />
        </button>

        {isSidebarOpen && (
          <>
            {/* Dark Background Overlay */}
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            {/* Navigation Drawer */}
            <div className="fixed inset-y-0 left-0 z-50 w-70 overflow-y-auto overscroll-contain bg-[#10121b] shadow-2xl">
              <Sidebar />

              {/* Close Button */}
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

      {/* Dashboard */}
      <Dashboard />

    </div>
  )
}

export default App
