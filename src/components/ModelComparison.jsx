import { useState } from 'react'
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Cpu,
  Gauge,
  GitCompareArrows,
  Info,
  LoaderCircle,
  MessageSquareText,
  Plus,
  Sparkles,
  Target,
} from 'lucide-react'

const models = [
  { id: 'qwen-72b', name: 'Qwen 72B FP8', provider: 'Qwen', latency: '1.2s', color: 'violet', available: true },
  { id: 'qwen-32b', name: 'Qwen 32B DGX02', provider: 'Qwen', latency: '0.8s', color: 'emerald', available: true },
  { id: 'gpt', name: 'GPT Model', provider: 'OpenAI', latency: '--', color: 'blue', available: false },
]

const starters = [
  'Explain the tradeoffs between SQL and NoSQL databases for a new product.',
  'Write a Python function to find duplicate values in a list.',
  'How would you structure error handling in a REST API?',
]

function buildDemoResponse(prompt, variant) {
  if (variant === 'detailed') {
    return `Here is a structured way to approach your question:\n\n**Understand the goal**\nStart by defining the expected behavior and the constraints that matter for this use case.\n\n**Break it into steps**\n1. Identify the inputs and expected output.\n2. Handle edge cases explicitly.\n3. Keep each part small and easy to verify.\n\n**Apply it to your prompt**\nYou asked: “${prompt}”\n\nWith those details clarified, implement the simplest approach that meets the requirements, then add tests for the normal path and important edge cases.\n\n*Demo output — connect a model provider for a real response.*`
  }

  return `A practical approach is to keep the solution focused:\n\n- Clarify the expected input and output.\n- Choose the simplest design that handles the important edge cases.\n- Add a small test so future changes do not break it.\n\nFor your prompt — “${prompt}” — I would start with a small working version, then refine it based on the requirements.\n\n*Demo output — connect a model provider for a real response.*`
}

function ModelSelect({ label, value, onChange, accent }) {
  return (
    <div className="relative">
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</label>
      <select value={value} onChange={onChange} className={`w-full appearance-none rounded-xl border bg-[#0f111a] py-3 pl-3 pr-9 text-xs font-medium text-gray-200 outline-none transition ${accent === 'blue' ? 'focus:border-blue-500/40' : 'focus:border-violet-500/40'}`}>
        {models.map((model) => (
          <option key={model.id} value={model.id} disabled={!model.available}>{model.name}{model.available ? '' : ' · Not connected'}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute bottom-3.5 right-3 text-gray-500" />
    </div>
  )
}

function ModelComparison() {
  const [prompt, setPrompt] = useState('')
  const [leftModelId, setLeftModelId] = useState('qwen-72b')
  const [rightModelId, setRightModelId] = useState('qwen-32b')
  const [isComparing, setIsComparing] = useState(false)
  const [comparison, setComparison] = useState(null)

  const leftModel = models.find((model) => model.id === leftModelId)
  const rightModel = models.find((model) => model.id === rightModelId)

  function compareResponses(event) {
    event.preventDefault()
    if (!prompt.trim() || leftModelId === rightModelId || isComparing) return
    setIsComparing(true)
    setComparison(null)
    const submittedPrompt = prompt.trim()
    window.setTimeout(() => {
      setComparison({
        prompt: submittedPrompt,
        left: buildDemoResponse(submittedPrompt, 'detailed'),
        right: buildDemoResponse(submittedPrompt, 'concise'),
      })
      setIsComparing(false)
    }, 900)
  }

  function swapModels() {
    setLeftModelId(rightModelId)
    setRightModelId(leftModelId)
    setComparison(null)
  }

  return (
    <div className="mx-auto w-full max-w-350">
      <header className="flex min-h-19 items-center justify-between border-b border-white/[0.07] max-md:pl-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-300"><GitCompareArrows size={19} /></div>
          <div>
            <p className="text-sm font-semibold text-white">Model Comparison</p>
            <p className="mt-0.5 text-xs text-gray-500">Compare model responses side by side</p>
          </div>
        </div>
        {comparison && <button type="button" onClick={() => { setPrompt(''); setComparison(null) }} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2.5 text-xs text-gray-300 transition hover:bg-white/[0.04] hover:text-white"><Plus size={14} /> New comparison</button>}
      </header>

      <div className="py-8 max-md:py-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-blue-300"><ArrowLeftRight size={14} /> Compare models</div>
            <h1 className="text-3xl font-bold tracking-tight text-white max-sm:text-2xl">One prompt. Two perspectives.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">Send the same prompt to two models and compare their answers, speed, and style.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-[11px] text-amber-200/80"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Demo mode · providers not connected</div>
        </div>

        <form onSubmit={compareResponses} className="rounded-2xl border border-white/[0.08] bg-[#121520] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-300"><MessageSquareText size={15} className="text-violet-300" /> Your prompt</div>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Enter one prompt to send to both models…" rows={3} className="w-full resize-y rounded-xl border border-white/[0.06] bg-[#0d0f17] p-4 text-sm leading-6 text-gray-100 outline-none placeholder:text-gray-600 focus:border-violet-500/40" />

          <div className="mt-4 grid items-end gap-3 md:grid-cols-[1fr_auto_1fr_auto]">
            <ModelSelect label="Model A" value={leftModelId} onChange={(event) => { setLeftModelId(event.target.value); setComparison(null) }} accent="violet" />
            <button type="button" onClick={swapModels} aria-label="Swap models" className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-gray-400 transition hover:border-violet-500/30 hover:text-white max-md:justify-self-center"><ArrowLeftRight size={16} /></button>
            <ModelSelect label="Model B" value={rightModelId} onChange={(event) => { setRightModelId(event.target.value); setComparison(null) }} accent="blue" />
            <button type="submit" disabled={!prompt.trim() || isComparing || leftModelId === rightModelId} className="mb-0.5 flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-xs font-semibold text-white shadow-lg shadow-violet-600/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 max-md:col-span-full">
              {isComparing ? <><LoaderCircle size={14} className="animate-spin" /> Comparing…</> : <>Compare responses <ArrowRight size={14} /></>}
            </button>
          </div>
          {leftModelId === rightModelId && <p className="mt-3 text-[11px] text-amber-300">Choose two different models to compare their responses.</p>}
        </form>

        {!comparison && !isComparing && (
          <section className="mt-6">
            <p className="mb-3 text-xs font-medium text-gray-400">Try a prompt</p>
            <div className="flex flex-wrap gap-2">
              {starters.map((starter) => <button key={starter} type="button" onClick={() => setPrompt(starter)} className="rounded-full border border-white/[0.07] bg-[#121520] px-3 py-2 text-left text-[11px] text-gray-400 transition hover:border-violet-500/30 hover:text-gray-200">{starter}</button>)}
            </div>
          </section>
        )}

        {isComparing && <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-[#121520] py-10 text-xs text-gray-400" aria-live="polite"><LoaderCircle size={16} className="animate-spin text-violet-300" /> Preparing demo responses…</div>}

        {comparison && (
          <section className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-200"><Sparkles size={14} className="text-violet-300" /> Side-by-side responses <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[9px] font-medium text-amber-300">Demo results</span></div>
              <p className="text-[10px] text-gray-600">The outputs below are illustrative placeholders, not model-generated answers.</p>
            </div>
            <div className="grid items-stretch gap-4 xl:grid-cols-2">
              {[{ model: leftModel, response: comparison.left, letter: 'A' }, { model: rightModel, response: comparison.right, letter: 'B' }].map(({ model, response, letter }) => (
                <article key={letter} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121520]">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${model.color === 'violet' ? 'bg-violet-500/10 text-violet-300' : 'bg-emerald-500/10 text-emerald-300'}`}><Cpu size={15} /></span>
                      <div><p className="text-xs font-semibold text-gray-100">{model.name}</p><p className="mt-0.5 text-[10px] text-gray-500">{model.provider} <span className="mx-1">·</span> Model {letter}</p></div>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] text-gray-400"><Clock3 size={12} /> {model.latency} <span className="text-gray-600">demo</span></span>
                  </div>
                  <div className="min-h-65 whitespace-pre-wrap p-5 text-xs leading-6 text-gray-300">{response}</div>
                  <div className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3 text-[10px] text-gray-600"><Info size={12} /> Demo response for interface preview</div>
                </article>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#121520] p-5">
              <div className="mb-4 flex items-center gap-2"><Gauge size={16} className="text-violet-300" /><h2 className="text-xs font-semibold text-gray-200">Quick comparison</h2></div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[#0d0f17] p-3.5"><div className="flex items-center gap-2 text-[10px] text-gray-500"><Target size={13} /> Response style</div><p className="mt-2 text-xs text-gray-200">A is more detailed <span className="text-gray-600">·</span> B is more concise</p></div>
                <div className="rounded-xl bg-[#0d0f17] p-3.5"><div className="flex items-center gap-2 text-[10px] text-gray-500"><Clock3 size={13} /> Sample latency</div><p className="mt-2 text-xs text-gray-200">{leftModel.latency} <span className="text-gray-600">vs</span> {rightModel.latency}</p></div>
                <div className="rounded-xl bg-[#0d0f17] p-3.5"><div className="flex items-center gap-2 text-[10px] text-gray-500"><Check size={13} /> Your choice</div><p className="mt-2 text-xs text-gray-200">Compare based on your task and priorities</p></div>
              </div>
            </div>
          </section>
        )}

        <footer className="pt-7 text-center text-[10px] text-gray-600">Compare real outputs after connecting your model providers.</footer>
      </div>
    </div>
  )
}

export default ModelComparison
