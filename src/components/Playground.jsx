import { useState } from 'react'
import {
  ArrowUp,
  Bot,
  Check,
  ChevronDown,
  Clipboard,
  Code2,
  FileCode2,
  MessageSquareText,
  Plus,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from 'lucide-react'

const models = [
  { name: 'Qwen 72B FP8', provider: 'Qwen', available: true },
  { name: 'Qwen 32B DGX02', provider: 'Qwen', available: true },
  { name: 'GPT Model', provider: 'OpenAI', available: false },
]

const examples = [
  {
    icon: Code2,
    title: 'Generate code',
    prompt: 'Write a reusable React hook that debounces a value.',
  },
  {
    icon: MessageSquareText,
    title: 'Explain code',
    prompt: 'Explain how async/await works in JavaScript, with a short example.',
  },
  {
    icon: FileCode2,
    title: 'Debug an issue',
    prompt: 'Why can a React effect run more than once, and how should I handle it?',
  },
]

function createDemoResponse(prompt) {
  const normalized = prompt.toLowerCase()

  if (normalized.includes('react') && (normalized.includes('hook') || normalized.includes('deboun'))) {
    return `Here is a reusable hook that delays updating the returned value until the input has stayed unchanged for the specified time:\n\n\`\`\`jsx\nimport { useEffect, useState } from 'react'\n\nfunction useDebouncedValue(value, delay = 300) {\n  const [debouncedValue, setDebouncedValue] = useState(value)\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay)\n    return () => clearTimeout(timer)\n  }, [value, delay])\n\n  return debouncedValue\n}\n\nexport default useDebouncedValue\n\`\`\`\n\nUse it with a search field to avoid running a request on every keystroke. The effect cleanup cancels the previous timer whenever the value changes.`
  }

  if (normalized.includes('explain') || normalized.includes('why')) {
    return `A useful way to think about this is to separate the trigger from the result:\n\n1. Identify what starts the operation.\n2. Track the state that changes while it runs.\n3. Handle the success and error paths explicitly.\n\nFor example, in JavaScript you can use an async function and await a Promise:\n\n\`\`\`js\nasync function loadUser(id) {\n  const response = await fetch(\`/api/users/\${id}\`)\n  if (!response.ok) throw new Error('Request failed')\n  return response.json()\n}\n\`\`\`\n\nThis is a demo response. Connect a model provider to get an answer tailored to your prompt.`
  }

  return `I've received your prompt:\n\n> ${prompt}\n\nA good implementation plan is to clarify the expected inputs and output, handle edge cases, and add a small example before integrating the result into your project.\n\nThis is a demo response to preview the Playground experience. Connect an AI provider to generate a real, prompt-specific answer.`
}

function Playground() {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState(models[0].name)
  const [isGenerating, setIsGenerating] = useState(false)
  const [response, setResponse] = useState('')
  const [responsePrompt, setResponsePrompt] = useState('')
  const [copied, setCopied] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt || isGenerating) return

    setIsGenerating(true)
    setResponse('')
    setResponsePrompt(trimmedPrompt)

    window.setTimeout(() => {
      setResponse(createDemoResponse(trimmedPrompt))
      setIsGenerating(false)
    }, 700)
  }

  function startNewChat() {
    setPrompt('')
    setResponse('')
    setResponsePrompt('')
  }

  async function copyResponse() {
    if (!response) return
    await navigator.clipboard.writeText(response)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const model = models.find((item) => item.name === selectedModel)

  return (
    <div className="mx-auto flex min-h-full w-full max-w-350 flex-col">
      <header className="flex min-h-19 items-center justify-between border-b border-white/[0.07] max-md:pl-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
            <WandSparkles size={19} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AI Playground</p>
            <p className="mt-0.5 text-xs text-gray-500">Explore ideas with your AI models</p>
          </div>
        </div>

        <button
          type="button"
          onClick={startNewChat}
          className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#141722] px-3.5 py-2.5 text-xs font-medium text-gray-300 transition hover:border-violet-500/30 hover:text-white"
        >
          <Plus size={15} />
          <span className="max-sm:hidden">New chat</span>
        </button>
      </header>

      <div className="flex flex-1 flex-col py-8 max-md:py-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-violet-300">
              <Sparkles size={14} />
              Your AI workspace
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white max-sm:text-2xl">What are we building today?</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Ask a question, generate code, or work through a tricky problem with your selected model.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-[11px] text-amber-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Demo mode · provider not connected
          </div>
        </div>

        <section className="rounded-2xl border border-white/[0.08] bg-[#121520] p-4 shadow-2xl shadow-black/10 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <label htmlFor="model-select" className="text-xs font-medium text-gray-400">Model</label>
            <div className="relative">
              <select
                id="model-select"
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value)}
                className="min-w-48 appearance-none rounded-lg border border-white/[0.08] bg-[#191c29] py-2 pl-3 pr-9 text-xs font-medium text-gray-200 outline-none transition focus:border-violet-500/50"
              >
                {models.map((item) => (
                  <option key={item.name} value={item.name} disabled={!item.available}>
                    {item.name}{item.available ? '' : ' · Not connected'}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form.requestSubmit()
                }
              }}
              placeholder="Ask anything about your code… (Enter to send, Shift + Enter for a new line)"
              rows={5}
              className="min-h-35 w-full resize-y rounded-xl border border-white/[0.06] bg-[#0d0f17] p-4 text-sm leading-6 text-gray-100 outline-none placeholder:text-gray-600 focus:border-violet-500/40"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] text-gray-600">Be specific for better results · Shift + Enter for a new line</p>
              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating || !model?.available}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isGenerating ? 'Generating…' : 'Generate response'}
                <ArrowUp size={15} />
              </button>
            </div>
          </form>
        </section>

        {!response && !isGenerating && (
          <section className="mt-7">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">
              <Sparkles size={14} className="text-violet-400" />
              Try a starter prompt
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {examples.map(({ icon: Icon, title, prompt: examplePrompt }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setPrompt(examplePrompt)}
                  className="group rounded-xl border border-white/[0.07] bg-[#121520] p-4 text-left transition hover:border-violet-500/30 hover:bg-[#151827]"
                >
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/15">
                    <Icon size={16} />
                  </span>
                  <span className="block text-xs font-semibold text-gray-200">{title}</span>
                  <span className="mt-1.5 block text-xs leading-5 text-gray-500">{examplePrompt}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {(isGenerating || response) && (
          <section className="mt-7 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121520]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-300">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">{model?.name} <span className="font-normal text-gray-500">· {model?.provider}</span></p>
                  <p className="mt-1 text-[10px] text-gray-500">Demo response · Connect a provider for live AI</p>
                </div>
              </div>
              {response && (
                <button type="button" onClick={copyResponse} className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] text-gray-400 transition hover:bg-white/[0.05] hover:text-white">
                  {copied ? <Check size={14} /> : <Clipboard size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-xl border border-white/[0.05] bg-[#0d0f17] px-4 py-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-600">Your prompt</p>
                <p className="whitespace-pre-wrap text-xs leading-5 text-gray-300">{responsePrompt}</p>
              </div>
              {isGenerating ? (
                <div className="flex items-center gap-3 py-3 text-xs text-gray-400" aria-live="polite">
                  <span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:120ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:240ms]" /></span>
                  Preparing a demo response…
                </div>
              ) : (
                <div className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-300">{response}</div>
              )}
            </div>

            {response && (
              <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-3 text-[10px] text-gray-600">
                <RotateCcw size={12} />
                Demo output for interface preview. Real model responses will be available after provider setup.
              </div>
            )}
          </section>
        )}

        <footer className="mt-auto pt-8 text-center text-[10px] text-gray-600">
          <span className="inline-flex items-center gap-1.5"><Sparkles size={12} /> AI can make mistakes. Review generated code before using it.</span>
        </footer>
      </div>
    </div>
  )
}

export default Playground
