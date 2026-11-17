
import {
  LayoutDashboard,
  Bot,
  Code2,
  GitCompareArrows,
  FolderKanban,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
  Sparkles,
  ChevronDown,
} from 'lucide-react'

const navigation = [
  {
    title: 'WORKSPACE',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, active: true },
      { name: 'AI Playground', icon: Bot },
      { name: 'Code Review', icon: Code2 },
      { name: 'Model Comparison', icon: GitCompareArrows },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { name: 'My Projects', icon: FolderKanban },
      { name: 'Analytics', icon: ChartNoAxesCombined },
    ],
  },
]

function Sidebar() {
  return (
    <aside className="flex h-full w-62.5 shrink-0 flex-col border-r border-white/[0.07] bg-[#10121b] px-4 py-5">

      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
          <Code2 size={22} className="text-white" />
        </div>

        <div>
          <h1 className="text-[15px] font-bold tracking-wide text-white">
            DevSpace<span className="text-violet-400"> AI</span>
          </h1>
          <p className="text-[10px] tracking-widest text-gray-500">
            DEVELOPER PLATFORM
          </p>
        </div>

      </div>

      {/* Workspace selector */}
      <button className="mb-8 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-left hover:bg-white/[0.06]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
          <Sparkles size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500">Current workspace</p>
          <p className="truncate text-sm font-medium text-white">
            Personal Workspace
          </p>
        </div>

        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-8">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.16em] text-gray-500">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.name}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-all ${
                      item.active
                        ? 'border border-violet-500/20 bg-violet-500/10 font-medium text-violet-300'
                        : 'text-gray-400 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <Icon size={17} />
                    {item.name}
                    {item.name === 'AI Playground' && (
                      <span className="ml-auto rounded bg-violet-500/15 px-1.5 py-0.5 text-[9px] text-violet-300">
                        NEW
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom links */}
      <div className="space-y-1 border-t border-white/[0.07] pt-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/[0.05] hover:text-white">
          <CircleHelp size={17} />
          Help & Support
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/[0.05] hover:text-white">
          <Settings size={17} />
          Settings
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
            B
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              Developer
            </p>
            <p className="text-[10px] text-gray-500">Free Plan</p>
          </div>

          <ChevronDown size={15} className="text-gray-500" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
