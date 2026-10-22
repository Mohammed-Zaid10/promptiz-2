import React, { useState } from 'react';
import { PromptCategory, GeneratedPrompt } from '../types';
import {
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Code2,
  FileText,
  Briefcase,
  Video,
  Search,
  Wand2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Terminal,
} from 'lucide-react';

interface PromptArchitectProps {
  onPromptGenerated: (prompt: GeneratedPrompt) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const PromptArchitect: React.FC<PromptArchitectProps> = ({
  onPromptGenerated,
  isLoading,
  setIsLoading,
}) => {
  const [rawIdea, setRawIdea] = useState('');
  const [category, setCategory] = useState<PromptCategory>('image');
  const [targetAi, setTargetAi] = useState('Midjourney / Flux / SD');
  const [depth, setDepth] = useState('Senior Principal');
  const [tone, setTone] = useState('Authoritative & Hyper-detailed');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customSpecs, setCustomSpecs] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories: Array<{
    id: PromptCategory;
    label: string;
    icon: React.ElementType;
    desc: string;
    placeholder: string;
    defaultTarget: string;
  }> = [
    {
      id: 'image' as PromptCategory,
      label: 'Image & Diffusion',
      icon: ImageIcon,
      desc: 'Photorealism, lighting, lenses, 8K medium format & 3D render engine semantics',
      placeholder:
        'e.g. A hyper-realistic editorial portrait of an elderly watchmaker in a vintage Swiss atelier, natural window lighting, dust motes in air, macro gear mechanics',
      defaultTarget: 'Midjourney / Flux / SD',
    },
    {
      id: 'code' as PromptCategory,
      label: 'Code & Architecture',
      icon: Code2,
      desc: 'Staff systems engineering, zero-allocation algorithms, typing & concurrency',
      placeholder:
        'e.g. A distributed event stream processor in Rust with backpressure, ring buffer memory management, and zero GC pause',
      defaultTarget: 'Claude 3.7 / Cursor / Copilot',
    },
    {
      id: 'writing' as PromptCategory,
      label: 'Copy & Editorial',
      icon: FileText,
      desc: 'High-conversion sales copy, thought leadership essays, executive narratives',
      placeholder:
        'e.g. A provocative thought-leadership essay analyzing why enterprise AI adoption stalls at pilot phase, targeting Fortune 500 CEOs',
      defaultTarget: 'ChatGPT-4o / Claude 3.7',
    },
    {
      id: 'business' as PromptCategory,
      label: 'Strategy & Advisory',
      icon: Briefcase,
      desc: 'Board memos, enterprise GTM, economic moats, pricing architecture',
      placeholder:
        'e.g. Comprehensive 3-year Go-To-Market and defensible pricing model for a B2B cybersecurity startup targeting financial institutions',
      defaultTarget: 'ChatGPT-4o / Claude / Gemini',
    },
    {
      id: 'video' as PromptCategory,
      label: 'Cinematic Video',
      icon: Video,
      desc: 'Camera vectors, continuous tracking shots, optical flaring, frame consistency',
      placeholder:
        'e.g. An 8-second slow-motion continuous drone tracking shot over an obsidian volcanic beach in Iceland at dusk, waves crashing on black sand',
      defaultTarget: 'Runway Gen-3 / Sora / Kling',
    },
    {
      id: 'research' as PromptCategory,
      label: 'Deep Research',
      icon: Search,
      desc: 'Multi-step synthesis, scientific literature breakdown, rigorous dialectic',
      placeholder:
        'e.g. Deep comparative analysis of frontier LLM attention architectures, kv-cache quantization, and memory wall bottlenecks',
      defaultTarget: 'Gemini 3.1 Pro / Claude 3.7',
    },
  ];

  const targetAiOptions = [
    'Midjourney / Flux / SD',
    'Claude 3.7 / Sonnet',
    'ChatGPT-4o / o3-mini',
    'Cursor / Copilot (Code)',
    'Runway Gen-3 / Sora / Kling',
    'Gemini 3.8 / Pro',
    'Universal LLM Directive',
  ];

  const presetsByCat: Record<PromptCategory, string[]> = {
    image: [
      'Haute couture editorial portrait in brutalist architecture',
      'Macro photograph of an iridescent titanium watch movement',
      'Hyper-detailed interior of a modern Japanese tea house in Kyoto rain',
      'Cinematic 35mm street photography in Tokyo alleyway at 3AM',
    ],
    code: [
      'Zero-allocation lock-free ring buffer queue in Go/Rust',
      'Scalable multi-tenant Row-Level Security schema in PostgreSQL',
      'Resilient Webhook delivery engine with exponential retry & idempotency',
      'High-performance full-text search engine index in TypeScript',
    ],
    writing: [
      'Contrarian manifesto on the death of traditional SaaS pricing',
      'High-ticket B2B cold email sequence for Fortune 500 CISOs',
      'Viral LinkedIn essay breaking down unit economics of AI agents',
      'Keynote script for a Series B founder unveiling a quantum product',
    ],
    business: [
      'Defensible GTM playbook and moat strategy for enterprise AI',
      'McKinsey 7S organizational redesign for remote engineering org',
      'Series A pitch deck narrative and unit economic financial model',
      'Executive board memo explaining data sovereignty risk mitigation',
    ],
    video: [
      'Continuous 8-second anamorphic drone shot of misty mountain pass',
      'Low-angle tracking shot following a runner through rainy neon streets',
      'Macro pull-focus sequence inside a mechanical clockwork heart',
      'Slow-motion 120fps water droplet collision with surface ripple',
    ],
    research: [
      'Systematic literature review of speculative decoding in LLM inference',
      'Game-theoretic analysis of multi-agent negotiation frameworks',
      'Thermodynamic limits of neuromorphic computing substrates',
      'Comparative audit of post-quantum cryptographic standards',
    ],
    custom: [
      'Senior prompt for autonomous multi-agent task execution',
      'Executive prompt for cross-cultural negotiation prep',
    ],
  };

  const handleCategorySelect = (catId: PromptCategory) => {
    setCategory(catId);
    const catObj = categories.find((c) => c.id === catId);
    if (catObj) {
      setTargetAi(catObj.defaultTarget);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!rawIdea.trim()) {
      setErrorMessage('Please describe what kind of prompt you want to create.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawIdea: rawIdea.trim(),
          category,
          targetAi,
          depth,
          tone,
          customSpecifications: customSpecs.trim(),
          includeVariables: true,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with status: ${res.status}`
        );
      }

      const data = await res.json();
      const generatedPrompt: GeneratedPrompt = {
        id: `prompt-${Date.now()}`,
        title: data.title || 'Engineered Senior Directive',
        category: (data.category as PromptCategory) || category,
        rolePersona: data.rolePersona || 'Senior Principal Prompt Engineer',
        fullPrompt: data.fullPrompt,
        breakdown: data.breakdown,
        recommendedSettings: data.recommendedSettings || '',
        variables: data.variables || [],
        engineeringNotes: data.engineeringNotes || '',
        targetAi,
        createdAt: Date.now(),
      };

      onPromptGenerated(generatedPrompt);
    } catch (err: any) {
      console.error('Prompt generation failed:', err);
      setErrorMessage(
        err?.message ||
          'Failed to engineer prompt. Verify connection or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Segmented Control */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
          01. Select Domain Architecture
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-white bg-zinc-900 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                    : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                <span className="text-xs font-medium font-sans">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Prompt Input Box */}
      <div className="p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl relative">
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="prompt-raw-idea"
            className="text-xs font-mono uppercase tracking-widest text-zinc-300 flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>02. What do you want your prompt to create?</span>
          </label>
          <span className="text-[11px] font-mono text-zinc-400">
            NATURAL LANGUAGE INTAKE
          </span>
        </div>

        <textarea
          id="prompt-raw-idea"
          value={rawIdea}
          onChange={(e) => setRawIdea(e.target.value)}
          placeholder={
            categories.find((c) => c.id === category)?.placeholder ||
            'Describe the scene, code task, strategic challenge, or outcome...'
          }
          rows={4}
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all font-sans leading-relaxed resize-y"
        />

        {/* Quick Inspiration Pills */}
        <div className="mt-3">
          <span className="text-[11px] font-mono text-zinc-400 block mb-1.5">
            PROMPT INSPIRATION BENCHMARKS:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetsByCat[category]?.slice(0, 3).map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setRawIdea(preset)}
                className="text-xs px-2.5 py-1 rounded-md border border-zinc-800/90 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Row: Target AI, Depth, Tone */}
        <div className="mt-6 pt-5 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
              Target AI Model
            </label>
            <select
              value={targetAi}
              onChange={(e) => setTargetAi(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
            >
              {targetAiOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
              Prompt Rigor / Depth
            </label>
            <select
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
            >
              <option value="Senior Principal">Senior Principal (Recommended)</option>
              <option value="Executive Architect">Executive Architect (High Precision)</option>
              <option value="Exhaustive Enterprise">Exhaustive Enterprise (Max Granularity)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
              Aesthetic / Tone Matrix
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
            >
              <option value="Authoritative & Hyper-detailed">Authoritative &amp; Hyper-detailed</option>
              <option value="Technical & Algorithmic">Technical &amp; Algorithmic</option>
              <option value="Cinematic & Visceral">Cinematic &amp; Visceral</option>
              <option value="Minimalist Precision">Minimalist Precision</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Specifications */}
        <div className="mt-4 pt-4 border-t border-zinc-900">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>
              {showAdvanced ? 'Hide Specific Parameters' : 'Add Custom Specifications (Optional)'}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5 ml-1" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-3 space-y-2">
              <label
                htmlFor="custom-specs"
                className="text-[11px] font-mono text-zinc-400 block"
              >
                Inject explicit optical, algorithmic, or domain parameters (e.g. 50mm f/1.8,
                Postgres RLS, 16:9 ratio, Volumetric smoke):
              </label>
              <input
                id="custom-specs"
                type="text"
                value={customSpecs}
                onChange={(e) => setCustomSpecs(e.target.value)}
                placeholder="e.g. Hasselblad 100mm, chiaroscuro lighting, desaturated charcoal tone, 8k resolution"
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400"
              />
            </div>
          )}
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-lg border border-red-900/60 bg-red-950/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Execution Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>Architecture: Senior Role · Specs · Qualities · Disclaimer · Invocation</span>
          </div>

          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isLoading || !rawIdea.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,255,255,0.12)] active:scale-98"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Architecting Senior Prompt...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Engineer Senior Prompt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
