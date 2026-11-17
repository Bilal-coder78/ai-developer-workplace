import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Clock3,
  Code2,
  Cpu,
  GitCompareArrows,
  GitPullRequest,
  Sparkles,
  Zap,
} from 'lucide-react'

const periods = {
  '7 days': {
    requests: '1,284', requestChange: '+18.2%', projects: '8', reviews: '24', timeSaved: '12.5h',
    chart: [42, 58, 38, 76, 54, 92, 68], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  '30 days': {
    requests: '5,642', requestChange: '+12.6%', projects: '18', reviews: '86', timeSaved: '32.5h',
    chart: [48, 62, 55, 78, 67, 84, 72, 95, 61, 76, 89, 70], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
  },
  '90 days': {
    requests: '16,408', requestChange: '+24.1%', projects: '31', reviews: '214', timeSaved: '91h',
    chart: [34, 42, 38, 56, 48, 64, 59, 72, 66, 84, 76, 95], labels: ['May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'Jun 5', 'Jun 12', 'Jun 19', 'Jun 26', 'Jul 3', 'Jul 10', 'Jul 17'],
  },
}

const toolData = {
  'All tools': [42, 58, 38, 76, 54, 92, 68],
  Playground: [56, 37, 63, 49, 82, 61, 73],
  'Code Review': [24, 52, 35, 63, 41, 74, 48],
  'Model Comparison': [18, 32, 23, 46, 38, 55, 42],
}

const models = [
  { name: 'Qwen 72B FP8', provider: 'Qwen', requests: '684', share: 53, latency: '1.2s', color: 'bg-violet-400' },
  { name: 'Qwen 32B DGX02', provider: 'Qwen', requests: '426', share: 33, latency: '0.8s', color: 'bg-blue-400' },
  { name: 'Other / unassigned', provider: 'Other', requests: '174', share: 14, latency: '--', color: 'bg-gray-500' },
]

const activity = [
  { icon: Bot, tool: 'AI Playground', detail: 'Explained async request handling', model: 'Qwen 72B FP8', time: '12 min ago', route: '/playground', status: 'Completed', type: 'Playground' },
  { icon: GitPullRequest, tool: 'Code Review', detail: 'Reviewed user service snippet', model: 'Qwen 32B DGX02', time: '48 min ago', route: '/code-review', status: 'Completed', type: 'Code Review' },
  { icon: GitCompareArrows, tool: 'Model Comparison', detail: 'Compared API design approaches', model: '2 models', time: '2 hours ago', route: '/models', status: 'Completed', type: 'Model Comparison' },
  { icon: Bot, tool: 'AI Playground', detail: 'Generated a debounce hook', model: 'Qwen 72B FP8', time: 'Yesterday', route: '/playground', status: 'Completed', type: 'Playground' },
]

function StatCard({ title, value, change, description, icon: Icon, tone }) {
  const iconTone = {
    violet: 'bg-violet-500/10 text-violet-300',
    blue: 'bg-blue-500/10 text-blue-300',
    emerald: 'bg-emerald-500/10 text-emerald-300',
    orange: 'bg-orange-500/10 text-orange-300',
  }[tone]

  return (
    <article className="rounded-2xl border border-white/[0.07] bg-[#121520] p-5 transition hover:border-violet-500/20">
      <div className="flex items-center justify-between"><p className="text-xs text-gray-400">{title}</p><span className={`rounded-xl p-2.5 ${iconTone}`}><Icon size={17} /></span></div>
      <p className="mt-5 text-2xl font-bold tracking-tight text-white">{value}</p>
      <div className="mt-2 flex items-center gap-1.5 text-[10px]"><ArrowUpRight size={13} className="text-emerald-400" /><span className="font-medium text-emerald-400">{change}</span><span className="text-gray-600">{description}</span></div>
    </article>
  )
}

function Analytics() {
  const [period, setPeriod] = useState('7 days')
  const [toolFilter, setToolFilter] = useState('All tools')
  const current = periods[period]
  const chartValues = period === '7 days' ? toolData[toolFilter] : current.chart.map((height, index) => {
    if (toolFilter === 'All tools') return height
    const factor = toolFilter === 'Playground' ? 1.08 : toolFilter === 'Code Review' ? 0.72 : 0.48
    return Math.min(100, Math.round(height * factor + (index % 3) * 4))
  })
  const chartLabels = current.labels
  const filteredActivity = useMemo(() => activity.filter((item) => toolFilter === 'All tools' || item.type === toolFilter), [toolFilter])

  return (
    <div className="mx-auto w-full max-w-350">
      <header className="flex min-h-19 items-center justify-between border-b border-white/[0.07] max-md:pl-12">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300"><ChartNoAxesCombined size={19} /></span><div><p className="text-sm font-semibold text-white">Analytics</p><p className="mt-0.5 text-xs text-gray-500">Understand your AI workspace activity</p></div></div>
        <span className="hidden items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-[10px] text-amber-200/80 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Sample data</span>
      </header>

      <div className="py-8 max-md:py-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-blue-300"><Activity size={14} /> Workspace insights</div><h1 className="text-3xl font-bold tracking-tight text-white max-sm:text-2xl">Your AI usage at a glance</h1><p className="mt-2 text-sm leading-6 text-gray-400">See how your workspace activity changes over time.</p></div>
          <label className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#121520] px-3 py-2.5 text-xs text-gray-400"><Clock3 size={14} /><span className="sr-only">Date range</span><select value={period} onChange={(event) => setPeriod(event.target.value)} className="bg-transparent text-xs font-medium text-gray-200 outline-none">{Object.keys(periods).map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          <StatCard title="AI requests" value={current.requests} change={current.requestChange} description="vs. previous period" icon={Activity} tone="violet" />
          <StatCard title="Projects touched" value={current.projects} change="+3" description="vs. previous period" icon={Code2} tone="blue" />
          <StatCard title="Code reviews" value={current.reviews} change="+8.4%" description="vs. previous period" icon={GitPullRequest} tone="emerald" />
          <StatCard title="Estimated time saved" value={current.timeSaved} change="+5.3%" description="vs. previous period" icon={Zap} tone="orange" />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.8fr)]">
          <article className="rounded-2xl border border-white/[0.07] bg-[#121520] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="text-sm font-semibold text-white">AI request activity</h2><p className="mt-1 text-xs text-gray-500">Requests over the last {period}</p></div>
              <label className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#0d0f17] px-2.5 py-2 text-[10px] text-gray-500"><span>Tool</span><select value={toolFilter} onChange={(event) => setToolFilter(event.target.value)} className="bg-transparent text-[10px] text-gray-200 outline-none">{Object.keys(toolData).map((tool) => <option key={tool}>{tool}</option>)}</select></label>
            </div>

            <div className="relative mt-7 h-52 border-b border-l border-white/[0.07] px-3 pb-7 pt-2" role="img" aria-label={`${toolFilter} request activity over ${period}`}>
              <div className="pointer-events-none absolute inset-x-0 top-[25%] border-t border-dashed border-white/[0.05]" /><div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-white/[0.05]" /><div className="pointer-events-none absolute inset-x-0 top-[75%] border-t border-dashed border-white/[0.05]" />
              <div className="relative z-[1] flex h-full items-end justify-between gap-1.5 sm:gap-2.5">
                {chartValues.map((height, index) => <div key={`${chartLabels[index]}-${index}`} className="group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <div className="flex w-full flex-1 items-end justify-center"><div title={`${chartLabels[index]}: ${height * 12} requests (sample)`} style={{ height: `${Math.max(8, height)}%` }} className={`w-full max-w-10 rounded-t-md bg-gradient-to-t from-violet-700/80 to-violet-400/90 transition-all group-hover:from-violet-500 group-hover:to-violet-300 ${index === chartValues.length - 1 ? 'opacity-100' : 'opacity-75'}`} /></div>
                  <span className="absolute -bottom-6 text-[9px] text-gray-600 sm:text-[10px]">{chartLabels[index]}</span>
                </div>)}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4"><span className="h-2 w-2 rounded-full bg-violet-400" /><span className="text-[10px] text-gray-500">AI requests</span><span className="ml-auto text-[10px] text-gray-500">Filtered by {toolFilter.toLowerCase()}</span></div>
          </article>

          <article className="rounded-2xl border border-white/[0.07] bg-[#121520] p-5 sm:p-6">
            <div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-white">Model usage</h2><p className="mt-1 text-xs text-gray-500">Request share by model</p></div><Cpu size={18} className="text-violet-300" /></div>
            <div className="mt-6 space-y-5">{models.map((model) => <div key={model.name}>
              <div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><span className={`h-2 w-2 shrink-0 rounded-full ${model.color}`} /><p className="truncate text-xs font-medium text-gray-200">{model.name}</p></div><span className="text-[10px] text-gray-500">{model.share}%</span></div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]"><div style={{ width: `${model.share}%` }} className={`h-full rounded-full ${model.color}`} /></div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-600"><span>{model.requests} requests</span><span>{model.latency} avg. response</span></div>
            </div>)}</div>
            <div className="mt-6 rounded-xl border border-white/[0.05] bg-[#0d0f17] p-3 text-[10px] leading-5 text-gray-500"><Sparkles size={13} className="mr-1 inline text-violet-300" /> Model usage breakdown will reflect real provider activity after integration.</div>
          </article>
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121520]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-5 sm:px-6"><div><h2 className="text-sm font-semibold text-white">Recent AI activity</h2><p className="mt-1 text-xs text-gray-500">A sample of recent workspace actions</p></div><span className="flex items-center gap-1.5 text-[10px] text-gray-500"><Activity size={13} /> {filteredActivity.length} events</span></div>
          {filteredActivity.length ? <div className="divide-y divide-white/[0.04]">
            {filteredActivity.map((item) => { const Icon = item.icon; return <Link key={`${item.tool}-${item.detail}`} to={item.route} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-white/[0.02] sm:px-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300"><Icon size={16} /></span>
              <div className="min-w-40 flex-1"><p className="text-xs font-medium text-gray-200">{item.detail}</p><p className="mt-1 text-[10px] text-gray-600">{item.tool} <span className="mx-1">·</span> {item.model}</p></div>
              <span className="text-[10px] text-gray-600">{item.time}</span><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] text-emerald-300">{item.status}</span>
            </Link> })}
          </div> : <div className="p-8 text-center text-xs text-gray-500">No activity for this tool in the sample history.</div>}
        </section>

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/[0.06] bg-[#121520]/70 px-4 py-3 text-[10px] leading-5 text-gray-600"><Sparkles size={13} className="mt-0.5 shrink-0 text-violet-400" /> All metrics, response times, and activity are illustrative sample data for this interface preview.</div>
        <footer className="pt-6 text-center text-[10px] text-gray-600">Estimated time savings are illustrative and should not be treated as measured results.</footer>
      </div>
    </div>
  )
}

export default Analytics
