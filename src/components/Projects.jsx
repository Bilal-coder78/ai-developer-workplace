import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  FolderKanban,
  GitPullRequest,
  Layers3,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react'

const initialProjects = [
  {
    id: 1,
    name: 'E-Commerce API',
    description: 'A scalable REST API for products, carts, and checkout.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    status: 'Active',
    updated: '2 hours ago',
    color: 'emerald',
    activity: [
      { type: 'review', label: 'Reviewed cart service changes', time: '2 hours ago' },
      { type: 'chat', label: 'Discussed API pagination patterns', time: 'Yesterday' },
      { type: 'code', label: 'Created project workspace', time: 'May 18' },
    ],
  },
  {
    id: 2,
    name: 'AI Code Assistant',
    description: 'An AI-powered coding companion for everyday development.',
    stack: ['Python', 'FastAPI', 'React'],
    status: 'In progress',
    updated: 'Yesterday',
    color: 'blue',
    activity: [
      { type: 'chat', label: 'Designed provider adapter interface', time: 'Yesterday' },
      { type: 'review', label: 'Reviewed prompt validation logic', time: '2 days ago' },
      { type: 'code', label: 'Created project workspace', time: 'May 12' },
    ],
  },
  {
    id: 3,
    name: 'Portfolio Website',
    description: 'A personal portfolio to showcase selected work and writing.',
    stack: ['React', 'Tailwind CSS', 'Vite'],
    status: 'Completed',
    updated: '3 days ago',
    color: 'violet',
    activity: [
      { type: 'code', label: 'Generated responsive project gallery', time: '3 days ago' },
      { type: 'review', label: 'Reviewed accessibility improvements', time: '4 days ago' },
      { type: 'code', label: 'Created project workspace', time: 'May 3' },
    ],
  },
  {
    id: 4,
    name: 'Weather Dashboard',
    description: 'A simple dashboard for forecasts and saved locations.',
    stack: ['TypeScript', 'React', 'CSS'],
    status: 'Planning',
    updated: '1 week ago',
    color: 'orange',
    activity: [
      { type: 'chat', label: 'Outlined dashboard requirements', time: '1 week ago' },
      { type: 'code', label: 'Created project workspace', time: 'May 1' },
    ],
  },
]

const statusStyles = {
  Active: 'bg-emerald-400/10 text-emerald-300',
  'In progress': 'bg-blue-400/10 text-blue-300',
  Completed: 'bg-violet-400/10 text-violet-300',
  Planning: 'bg-orange-400/10 text-orange-300',
}

const activityIcons = { review: GitPullRequest, chat: Bot, code: Code2 }

function Projects() {
  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [stackFilter, setStackFilter] = useState('All technologies')
  const [showCreate, setShowCreate] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const technologies = useMemo(() => [...new Set(projects.flatMap((project) => project.stack))].sort(), [projects])
  const filteredProjects = projects.filter((project) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || `${project.name} ${project.description} ${project.stack.join(' ')}`.toLowerCase().includes(query)
    const matchesStatus = statusFilter === 'All statuses' || project.status === statusFilter
    const matchesStack = stackFilter === 'All technologies' || project.stack.includes(stackFilter)
    return matchesSearch && matchesStatus && matchesStack
  })

  function createProject(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const project = {
      id: Date.now(),
      name: formData.get('name').trim(),
      description: formData.get('description').trim() || 'A new project in your workspace.',
      stack: formData.get('stack').split(',').map((item) => item.trim()).filter(Boolean),
      status: 'Planning',
      updated: 'Just now',
      color: 'violet',
      activity: [{ type: 'code', label: 'Created project workspace', time: 'Just now' }],
    }
    setProjects((current) => [project, ...current])
    setShowCreate(false)
    setSearch('')
    setStatusFilter('All statuses')
    setStackFilter('All technologies')
  }

  if (selectedProject) {
    const project = projects.find((item) => item.id === selectedProject.id) ?? selectedProject
    return (
      <div className="mx-auto w-full max-w-350">
        <header className="flex min-h-19 items-center justify-between border-b border-white/[0.07] max-md:pl-12">
          <button type="button" onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-white"><ArrowLeft size={15} /> All projects</button>
          <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-[10px] text-amber-200">Sample project data</span>
        </header>

        <div className="py-8 max-md:py-6">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300"><FolderKanban size={22} /></span>
              <div>
                <div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold tracking-tight text-white">{project.name}</h1><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[project.status] ?? statusStyles.Planning}`}>{project.status}</span></div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">{project.description}</p>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-gray-500"><Clock3 size={14} /> Updated {project.updated}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.stack.map((technology) => <span key={technology} className="rounded-lg border border-white/[0.07] bg-[#121520] px-2.5 py-1.5 text-[11px] text-gray-300">{technology}</span>)}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="rounded-2xl border border-white/[0.08] bg-[#121520]">
              <div className="border-b border-white/[0.07] p-5"><h2 className="text-sm font-semibold text-white">Recent activity</h2><p className="mt-1 text-xs text-gray-500">AI work and updates for this project</p></div>
              <div className="divide-y divide-white/[0.05]">
                {project.activity.map((activity, index) => {
                  const Icon = activityIcons[activity.type] ?? Code2
                  return <div key={`${activity.label}-${index}`} className="flex items-center gap-3 px-5 py-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300"><Icon size={16} /></span><p className="min-w-0 flex-1 text-xs text-gray-300">{activity.label}</p><span className="whitespace-nowrap text-[10px] text-gray-600">{activity.time}</span></div>
                })}
              </div>
            </section>
            <section className="rounded-2xl border border-white/[0.08] bg-[#121520] p-5">
              <h2 className="text-sm font-semibold text-white">Continue working</h2>
              <p className="mt-1 text-xs leading-5 text-gray-500">Pick a tool to keep moving this project forward.</p>
              <div className="mt-4 space-y-2">
                <Link to="/playground" className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0d0f17] p-3 transition hover:border-violet-500/25"><Bot size={16} className="text-violet-300" /><span className="flex-1 text-xs text-gray-300">Ask AI Playground</span><ArrowRight size={14} className="text-gray-600" /></Link>
                <Link to="/code-review" className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0d0f17] p-3 transition hover:border-violet-500/25"><GitPullRequest size={16} className="text-emerald-300" /><span className="flex-1 text-xs text-gray-300">Review code</span><ArrowRight size={14} className="text-gray-600" /></Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-350">
      <header className="flex min-h-19 items-center justify-between border-b border-white/[0.07] max-md:pl-12">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300"><FolderKanban size={19} /></span><div><p className="text-sm font-semibold text-white">My Projects</p><p className="mt-0.5 text-xs text-gray-500">Your development work in one place</p></div></div>
        <span className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-[#121520] px-3 py-1.5 text-[10px] text-gray-400 sm:flex"><Layers3 size={13} /> {projects.length} projects</span>
      </header>

      <div className="py-8 max-md:py-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-violet-300"><Sparkles size={14} /> Project workspace</div><h1 className="text-3xl font-bold tracking-tight text-white max-sm:text-2xl">Your projects</h1><p className="mt-2 text-sm leading-6 text-gray-400">Pick up where you left off or start something new.</p></div>
          <button type="button" onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-600/15 transition hover:brightness-110"><Plus size={15} /> New project</button>
        </div>

        <section className="mb-5 grid gap-3 rounded-2xl border border-white/[0.08] bg-[#121520] p-4 md:grid-cols-[minmax(220px,1fr)_190px_210px]">
          <label className="relative block"><span className="sr-only">Search projects</span><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects..." className="w-full rounded-xl border border-white/[0.07] bg-[#0d0f17] py-2.5 pl-9 pr-3 text-xs text-gray-200 outline-none placeholder:text-gray-600 focus:border-violet-500/40" /></label>
          <label className="relative"><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full appearance-none rounded-xl border border-white/[0.07] bg-[#0d0f17] py-2.5 pl-3 pr-9 text-xs text-gray-300 outline-none focus:border-violet-500/40"><option>All statuses</option>{['Active', 'In progress', 'Planning', 'Completed'].map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" /></label>
          <label className="relative"><span className="sr-only">Filter by technology</span><select value={stackFilter} onChange={(event) => setStackFilter(event.target.value)} className="w-full appearance-none rounded-xl border border-white/[0.07] bg-[#0d0f17] py-2.5 pl-3 pr-9 text-xs text-gray-300 outline-none focus:border-violet-500/40"><option>All technologies</option>{technologies.map((technology) => <option key={technology}>{technology}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" /></label>
        </section>

        {filteredProjects.length ? <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredProjects.map((project) => <article key={project.id} className="group flex min-h-64 flex-col rounded-2xl border border-white/[0.07] bg-[#121520] p-5 transition hover:-translate-y-0.5 hover:border-violet-500/25">
            <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300"><Code2 size={18} /></span><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[project.status] ?? statusStyles.Planning}`}>{project.status}</span></div>
            <h2 className="mt-4 text-sm font-semibold text-white">{project.name}</h2><p className="mt-1.5 min-h-10 text-xs leading-5 text-gray-500">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{project.stack.map((technology) => <span key={technology} className="rounded-md border border-white/[0.05] bg-white/[0.025] px-2 py-1 text-[9px] text-gray-400">{technology}</span>)}</div>
            <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4"><span className="flex items-center gap-1.5 text-[10px] text-gray-600"><Clock3 size={12} /> {project.updated}</span><button type="button" onClick={() => setSelectedProject(project)} className="flex items-center gap-1.5 text-[11px] font-medium text-violet-300 transition hover:text-violet-200">Open project <ArrowRight size={13} /></button></div>
          </article>)}
        </section> : <section className="rounded-2xl border border-dashed border-white/[0.1] bg-[#121520]/60 px-5 py-14 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300"><Search size={20} /></span><h2 className="mt-4 text-sm font-semibold text-white">No projects found</h2><p className="mt-1 text-xs text-gray-500">Try another search or adjust your filters.</p><button type="button" onClick={() => { setSearch(''); setStatusFilter('All statuses'); setStackFilter('All technologies') }} className="mt-4 text-xs font-medium text-violet-300 hover:text-violet-200">Clear filters</button></section>}

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/[0.06] bg-[#121520]/70 px-4 py-3 text-[10px] leading-5 text-gray-600"><Sparkles size={13} className="mt-0.5 shrink-0 text-violet-400" /> Sample projects are shown for this UI preview. New projects are kept in local screen state until workspace storage is connected.</div>
      </div>

      {showCreate && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCreate(false) }}>
        <section role="dialog" aria-modal="true" aria-labelledby="create-project-title" className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#141722] p-5 shadow-2xl shadow-black/40 sm:p-6">
          <div className="mb-5 flex items-start justify-between"><div><div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300"><Plus size={18} /></div><h2 id="create-project-title" className="text-lg font-semibold text-white">Create a project</h2><p className="mt-1 text-xs text-gray-500">Set up a workspace for your next idea.</p></div><button type="button" onClick={() => setShowCreate(false)} aria-label="Close dialog" className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.05] hover:text-white"><X size={17} /></button></div>
          <form onSubmit={createProject} className="space-y-4">
            <label className="block text-xs font-medium text-gray-300">Project name<input name="name" required maxLength={60} autoFocus placeholder="e.g. Recipe Finder" className="mt-2 w-full rounded-xl border border-white/[0.08] bg-[#0d0f17] px-3.5 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/40" /></label>
            <label className="block text-xs font-medium text-gray-300">Description <span className="font-normal text-gray-600">(optional)</span><textarea name="description" maxLength={180} rows={3} placeholder="What are you building?" className="mt-2 w-full resize-y rounded-xl border border-white/[0.08] bg-[#0d0f17] px-3.5 py-3 text-sm leading-5 text-white outline-none placeholder:text-gray-600 focus:border-violet-500/40" /></label>
            <label className="block text-xs font-medium text-gray-300">Technologies <span className="font-normal text-gray-600">(comma separated)</span><input name="stack" placeholder="React, Node.js, MongoDB" className="mt-2 w-full rounded-xl border border-white/[0.08] bg-[#0d0f17] px-3.5 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500/40" /></label>
            <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-4"><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl px-4 py-2.5 text-xs text-gray-400 transition hover:bg-white/[0.04] hover:text-white">Cancel</button><button type="submit" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110"><Check size={14} /> Create project</button></div>
          </form>
        </section>
      </div>}
    </div>
  )
}

export default Projects
