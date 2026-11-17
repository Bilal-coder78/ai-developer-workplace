
import {
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Cpu,
  Code2,
  FolderKanban,
  Clock3,
  MoreHorizontal,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const stats = [
  {
    title: 'Total Projects',
    value: '24',
    change: '+12.5%',
    description: 'vs. last month',
    icon: FolderKanban,
    color: 'violet',
    positive: true,
  },
  {
    title: 'AI Requests',
    value: '1,284',
    change: '+18.2%',
    description: 'vs. last month',
    icon: Activity,
    color: 'blue',
    positive: true,
  },
  {
    title: 'Code Reviews',
    value: '86',
    change: '+8.4%',
    description: 'vs. last month',
    icon: Code2,
    color: 'emerald',
    positive: true,
  },
  {
    title: 'Time Saved',
    value: '32.5h',
    change: '+5.3%',
    description: 'vs. last month',
    icon: Clock3,
    color: 'orange',
    positive: true,
  },
]

const models = [
  {
    name: 'Qwen 72B FP8',
    provider: 'Qwen',
    status: 'Operational',
    color: 'bg-violet-400',
    latency: '1.2s',
  },
  {
    name: 'Qwen 32B DGX02',
    provider: 'Qwen',
    status: 'Operational',
    color: 'bg-emerald-400',
    latency: '0.8s',
  },
  {
    name: 'GPT Model',
    provider: 'OpenAI',
    status: 'Not connected',
    color: 'bg-gray-500',
    latency: '--',
  },
]

const projects = [
  {
    name: 'E-Commerce API',
    type: 'Backend Development',
    language: 'Node.js',
    updated: '2 hours ago',
    status: 'Active',
    color: 'bg-emerald-500/10 text-emerald-400',
    icon: Code2,
  },
  {
    name: 'AI Code Assistant',
    type: 'AI Integration',
    language: 'Python',
    updated: 'Yesterday',
    status: 'In Progress',
    color: 'bg-blue-500/10 text-blue-400',
    icon: Sparkles,
  },
  {
    name: 'Portfolio Website',
    type: 'Frontend Development',
    language: 'React',
    updated: '2 days ago',
    status: 'Completed',
    color: 'bg-violet-500/10 text-violet-400',
    icon: FolderKanban,
  },
]

function Dashboard() {
  return (
    <main className="min-w-0 flex-1 overflow-y-auto bg-[#0b0d14]">

      {/* Top Header */}
      <header className="sticky top-0 z-10 flex h-19 items-center justify-between border-b border-white/[0.07] bg-[#0b0d14]/90 px-8 backdrop-blur-xl max-md:pl-16 max-md:pr-5">
        <div className="relative w-full max-w-85">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-xl border border-white/[0.08] bg-[#141722] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500/50"
          />
        </div>

        <div className="ml-4 flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-xs text-emerald-400">All systems operational</span>
          </div>

          <button className="relative rounded-xl border border-white/[0.08] bg-[#141722] p-2.5 text-gray-400 hover:text-white">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
            B
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-400 space-y-8 p-8 max-md:p-5">

        {/* Welcome Section */}
        <section className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-violet-400">
              <Sparkles size={14} />
              YOUR DEVELOPMENT OVERVIEW
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white max-sm:text-2xl">
              Welcome back, Developers
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Here's what's happening with your workspace today.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-600/30">
            <Plus size={17} />
            New Project
          </button>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {stats.map((stat) => {
            const Icon = stat.icon

            const colors = {
              violet: 'bg-violet-500/10 text-violet-400',
              blue: 'bg-blue-500/10 text-blue-400',
              emerald: 'bg-emerald-500/10 text-emerald-400',
              orange: 'bg-orange-500/10 text-orange-400',
            }

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/[0.07] bg-[#121520] p-5 transition hover:-translate-y-1 hover:border-violet-500/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <div className={`rounded-xl p-2.5 ${colors[stat.color]}`}>
                    <Icon size={19} />
                  </div>
                </div>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </h2>

                <div className="mt-3 flex items-center gap-1.5 text-xs">
                  {stat.positive ? (
                    <ArrowUpRight size={15} className="text-emerald-400" />
                  ) : (
                    <ArrowDownRight size={15} className="text-red-400" />
                  )}
                  <span className="font-semibold text-emerald-400">
                    {stat.change}
                  </span>
                  <span className="text-gray-500">{stat.description}</span>
                </div>
              </div>
            )
          })}
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-3 gap-5 max-xl:grid-cols-1">

          {/* AI Activity */}
          <div className="col-span-2 rounded-2xl border border-white/[0.07] bg-[#121520] p-6 max-xl:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">AI Workspace Activity</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Overview of your AI usage
                </p>
              </div>

              <button className="rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-gray-400 hover:text-white">
                Last 7 days
              </button>
            </div>

            <div className="mt-8 flex h-45 items-end justify-between gap-3 px-2">
              {[42, 65, 48, 82, 57, 94, 72].map((height, index) => (
                <div
                  key={index}
                  className="group flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="relative flex w-full flex-1 items-end justify-center">
                    <div
                      style={{ height: `${height}%` }}
                      className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-violet-700 to-violet-400 opacity-80 transition-all group-hover:opacity-100"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <span className="text-xs text-gray-400">AI requests</span>
              <span className="ml-auto text-xs font-medium text-white">
                1,284 total requests
              </span>
            </div>
          </div>

          {/* Model Status */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#121520] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">AI Models</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Connected providers
                </p>
              </div>
              <Cpu size={19} className="text-violet-400" />
            </div>

            <div className="mt-6 space-y-5">
              {models.map((model) => (
                <div key={model.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${model.color}`} />
                    <p className="text-sm font-medium text-gray-200">
                      {model.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pl-4">
                    <span className="text-xs text-gray-500">
                      {model.provider}
                    </span>
                    <span className={`text-[11px] ${
                      model.status === 'Operational'
                        ? 'text-emerald-400'
                        : 'text-gray-500'
                    }`}>
                      {model.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pl-4">
                    <span className="text-[11px] text-gray-500">Latency</span>
                    <span className="text-[11px] text-gray-300">
                      {model.latency}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] py-2.5 text-xs font-medium text-violet-300 transition hover:bg-violet-500/15">
              Manage AI Models
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121520]">
          <div className="flex items-center justify-between border-b border-white/[0.07] p-6">
            <div>
              <h2 className="font-semibold text-white">Recent Projects</h2>
              <p className="mt-1 text-xs text-gray-500">
                Continue where you left off
              </p>
            </div>

            <button className="text-xs font-medium text-violet-400 hover:text-violet-300">
              View all projects
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left">
              <thead>
                <tr className="border-b border-white/[0.05] text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Technology</th>
                  <th className="px-6 py-4 font-medium">Last Updated</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => {
                  const Icon = project.icon

                  return (
                    <tr
                      key={project.name}
                      className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-lg p-2 ${project.color}`}>
                            <Icon size={17} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">
                              {project.name}
                            </p>
                            <p className="mt-1 text-[11px] text-gray-500">
                              {project.type}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-400">
                        {project.language}
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-400">
                        {project.updated}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${project.color}`}>
                          {project.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button className="text-gray-500 hover:text-white">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/70 to-indigo-950/40 p-6">
          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-violet-300">
                <Zap size={16} />
                <span className="text-xs font-semibold">LEVEL UP YOUR WORKFLOW</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Ready to build something amazing?
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Start a new AI-powered development session.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-violet-100">
              Open AI Playground
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        <footer className="pb-3 text-center text-[11px] text-gray-600">
          DevSpace AI · Built for developers, powered by intelligence.
        </footer>

      </div>
    </main>
  )
}

export default Dashboard
