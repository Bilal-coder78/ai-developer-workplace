import { useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clipboard,
  Code2,
  FileCode2,
  GitPullRequest,
  Info,
  LoaderCircle,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react'

const initialCode = `async function fetchUser(id) {
  const response = await fetch('/api/users/' + id)
  const user = await response.json()

  return user
}`

const reviewOptions = [
  { id: 'bugs', label: 'Bugs & logic', icon: CircleHelp },
  { id: 'security', label: 'Security', icon: ShieldAlert },
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'style', label: 'Code quality', icon: Sparkles },
]

const demoFindings = [
  {
    severity: 'warning',
    category: 'Error handling',
    line: 3,
    title: 'Check the response status before parsing JSON',
    description: 'fetch() only rejects on network failures. A 404 or 500 response still reaches response.json(), so callers may receive an unexpected payload.',
    suggestion: "if (!response.ok) {\n  throw new Error(`Request failed: ${response.status}`)\n}",
  },
  {
    severity: 'suggestion',
    category: 'Security',
    line: 2,
    title: 'Encode the user ID before adding it to the URL',
    description: 'If id contains reserved URL characters, the request path can be interpreted differently than intended.',
    suggestion: "const response = await fetch(`/api/users/${encodeURIComponent(id)}`)",
  },
]

function CodeReview() {
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState('JavaScript')
  const [selectedChecks, setSelectedChecks] = useState(['bugs', 'security', 'performance', 'style'])
  const [isReviewing, setIsReviewing] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [copied, setCopied] = useState(false)
  const lineNumbersRef = useRef(null)
  const lineCount = Math.max(1, code.split('\n').length)

  function toggleCheck(id) {
    setSelectedChecks((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  function runReview() {
    if (!code.trim() || selectedChecks.length === 0 || isReviewing) return
    setIsReviewing(true)
    setHasReviewed(false)
    window.setTimeout(() => {
      setHasReviewed(true)
      setIsReviewing(false)
    }, 850)
  }

  function resetReview() {
    setCode('')
    setHasReviewed(false)
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const findings = demoFindings.filter((finding) => (
    (finding.category === 'Security' && selectedChecks.includes('security')) ||
    (finding.category !== 'Security' && selectedChecks.includes('bugs'))
  ))

  return (
    <div className="mx-auto w-full max-w-350">
      <header className="flex min-h-19 items-center justify-between border-b border-white/[0.07] max-md:pl-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
            <GitPullRequest size={19} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Code Review</p>
            <p className="mt-0.5 text-xs text-gray-500">Find issues and improve your code</p>
          </div>
        </div>
        {hasReviewed && (
          <button type="button" onClick={resetReview} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2.5 text-xs text-gray-300 transition hover:bg-white/[0.04] hover:text-white">
            <RotateCcw size={14} />
            New review
          </button>
        )}
      </header>

      <div className="py-8 max-md:py-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-emerald-300">
              <Code2 size={14} />
              Code quality assistant
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white max-sm:text-2xl">Review your code</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">Paste a snippet, choose what to check, and get actionable feedback.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-[11px] text-amber-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Demo mode · AI provider not connected
          </div>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(270px,0.75fr)]">
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121520]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300"><FileCode2 size={16} /></span>
                <div>
                  <p className="text-xs font-medium text-gray-200">Review snippet</p>
                  <p className="mt-0.5 text-[10px] text-gray-500">Paste or edit code below</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Programming language" className="appearance-none rounded-lg border border-white/[0.08] bg-[#191c29] py-2 pl-3 pr-8 text-xs text-gray-300 outline-none focus:border-violet-500/50">
                    {['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Other'].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                <button type="button" onClick={copyCode} disabled={!code} aria-label="Copy code" className="rounded-lg p-2 text-gray-500 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-40">
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Clipboard size={15} />}
                </button>
              </div>
            </div>

            <div className="flex min-h-80 bg-[#0d0f17] py-4 font-mono text-[12px] leading-6">
              <div ref={lineNumbersRef} aria-hidden="true" className="w-12 shrink-0 overflow-hidden pr-3 text-right text-gray-600 select-none">
                {Array.from({ length: lineCount }, (_, index) => <div key={index}>{index + 1}</div>)}
              </div>
              <textarea
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onScroll={(event) => { if (lineNumbersRef.current) lineNumbersRef.current.scrollTop = event.currentTarget.scrollTop }}
                spellCheck="false"
                aria-label="Code to review"
                placeholder="Paste your code here..."
                className="min-h-72 min-w-0 flex-1 resize-y border-l border-white/[0.05] bg-transparent px-4 text-gray-200 outline-none placeholder:text-gray-600"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3">
              <p className="text-[10px] text-gray-600">{lineCount} lines <span className="mx-1.5 text-gray-700">·</span> {code.length} characters</p>
              <button type="button" onClick={runReview} disabled={!code.trim() || selectedChecks.length === 0 || isReviewing} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">
                {isReviewing ? <><LoaderCircle size={15} className="animate-spin" /> Reviewing…</> : <>Review code <ArrowRight size={15} /></>}
              </button>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-white/[0.08] bg-[#121520] p-5">
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-white">Review focus</h2>
                <p className="mt-1 text-xs leading-5 text-gray-500">Choose the areas to include in your review.</p>
              </div>
              <div className="space-y-1">
                {reviewOptions.map(({ id, label, icon: Icon }) => {
                  const checked = selectedChecks.includes(id)
                  return (
                    <label key={id} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-white/[0.03]">
                      <input type="checkbox" checked={checked} onChange={() => toggleCheck(id)} className="peer sr-only" />
                      <span className={`flex h-4 w-4 items-center justify-center rounded border transition ${checked ? 'border-violet-500 bg-violet-500 text-white' : 'border-gray-600 bg-transparent text-transparent'}`}><Check size={11} strokeWidth={3} /></span>
                      <Icon size={15} className={checked ? 'text-violet-300' : 'text-gray-500'} />
                      <span className="text-xs text-gray-300">{label}</span>
                    </label>
                  )
                })}
              </div>
              {selectedChecks.length === 0 && <p className="mt-2 text-[11px] text-amber-300">Select at least one review focus.</p>}
            </section>

            <section className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-950/35 to-[#121520] p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300"><Info size={16} /></span>
                <div>
                  <h2 className="text-xs font-semibold text-gray-200">Demo review</h2>
                  <p className="mt-1.5 text-xs leading-5 text-gray-500">This preview uses sample findings. Connect an AI provider to review your actual code.</p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {isReviewing && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#121520] px-5 py-4 text-xs text-gray-400" aria-live="polite">
            <LoaderCircle size={16} className="animate-spin text-violet-300" /> Preparing demo findings…
          </div>
        )}

        {hasReviewed && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121520]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-white">Review findings</h2>
                  <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">Demo results</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Sample feedback for {language} · not an AI analysis</p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-300"><AlertTriangle size={13} /> {findings.filter((item) => item.severity === 'warning').length} warnings</span>
                <span className="flex items-center gap-1.5 text-blue-300"><Info size={13} /> {findings.filter((item) => item.severity === 'suggestion').length} suggestions</span>
              </div>
            </div>

            {findings.length ? (
              <div className="divide-y divide-white/[0.06]">
                {findings.map((finding) => (
                  <article key={finding.title} className="p-5">
                    <div className="flex gap-3">
                      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${finding.severity === 'warning' ? 'bg-amber-400/10 text-amber-300' : 'bg-blue-400/10 text-blue-300'}`}>
                        {finding.severity === 'warning' ? <AlertTriangle size={16} /> : <Info size={16} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xs font-semibold text-gray-100">{finding.title}</h3>
                          <span className="rounded bg-white/[0.05] px-2 py-0.5 text-[9px] text-gray-400">{finding.category}</span>
                          <span className="ml-auto text-[10px] text-gray-600">Line {finding.line}</span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-gray-400">{finding.description}</p>
                        <div className="mt-3 overflow-x-auto rounded-lg border border-white/[0.05] bg-[#0d0f17] p-3">
                          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-gray-600">Suggested fix</p>
                          <pre className="font-mono text-[11px] leading-5 text-emerald-200/80">{finding.suggestion}</pre>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 p-6 text-xs text-gray-400"><CheckCircle2 size={18} className="text-emerald-400" /> No sample findings for the selected review focus.</div>
            )}
          </section>
        )}

        <footer className="pt-7 text-center text-[10px] text-gray-600">Review generated suggestions before applying them to your code.</footer>
      </div>
    </div>
  )
}

export default CodeReview
