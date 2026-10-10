import React, { useState } from 'react';
import { RefinedPromptResult } from '../types';
import {
  Wand2,
  ArrowRight,
  Check,
  Copy,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Shield,
  RotateCcw,
} from 'lucide-react';

export const PromptRefiner: React.FC = () => {
  const [amateurPrompt, setAmateurPrompt] = useState('');
  const [targetAi, setTargetAi] = useState('Universal AI');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RefinedPromptResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleAmateurPrompts = [
    'make a realistic picture of an old man in rain',
    'write python code to scrape amazon prices',
    'write cold email to sell my b2b software to tech leads',
    'generate video of drone flying over mountains',
  ];

  const handleRefine = async () => {
    if (!amateurPrompt.trim()) {
      setError('Please enter a prompt to audit and refine.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/refine-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amateurPrompt: amateurPrompt.trim(),
          targetAi,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Optimization request failed.');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to refine prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyRefined = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.refinedFullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl">
        <div className="space-y-1 mb-6 border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
            <span>Optimization Engine</span>
            <span>·</span>
            <span className="text-zinc-300">Amateur to Senior Re-Architect</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
            Prompt Refiner &amp; Audit Diagnostic
          </h2>
          <p className="text-xs text-zinc-400">
            Paste any basic or mediocre prompt. PROMPTIZ diagnoses missing architectural layers and
            re-engineers it into an elite executive directive.
          </p>
        </div>

        {/* Input box */}
        <div className="space-y-3">
          <label
            htmlFor="amateur-prompt-input"
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 block"
          >
            Paste Raw / Basic Prompt:
          </label>
          <textarea
            id="amateur-prompt-input"
            value={amateurPrompt}
            onChange={(e) => setAmateurPrompt(e.target.value)}
            placeholder="e.g. Draw a futuristic sports car on highway at night, highly detailed, 4k..."
            rows={3}
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-400 transition-all font-sans"
          />

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-zinc-500 mr-1">TRY SAMPLES:</span>
            {sampleAmateurPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAmateurPrompt(p)}
                className="text-xs px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              >
                &ldquo;{p}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="target-ai-select"
              className="text-xs font-mono text-zinc-500 uppercase"
            >
              TARGET AI:
            </label>
            <select
              id="target-ai-select"
              value={targetAi}
              onChange={(e) => setTargetAi(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
            >
              <option value="Universal AI">Universal AI</option>
              <option value="Midjourney / Flux">Midjourney / Flux</option>
              <option value="Claude 3.7 / Sonnet">Claude 3.7 / Sonnet</option>
              <option value="ChatGPT-4o">ChatGPT-4o</option>
              <option value="Cursor / Copilot">Cursor / Copilot</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleRefine}
            disabled={isLoading || !amateurPrompt.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Auditing &amp; Upgrading...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Re-Engineer to Senior Grade</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg border border-red-900/70 bg-red-950/40 text-red-300 text-xs">
            {error}
          </div>
        )}
      </div>

      {/* Audit & Refinement Results */}
      {result && (
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl space-y-6">
          {/* Score Diagnostic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-zinc-500">ORIGINAL SCORE</span>
                <span className="text-lg font-mono font-bold text-zinc-400">
                  {result.originalScore}/100
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-3">
                <div
                  className="h-full bg-zinc-500 rounded-full"
                  style={{ width: `${result.originalScore}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 block mb-1">
                DEFICITS IDENTIFIED:
              </span>
              <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside">
                {result.diagnostics.map((diag, i) => (
                  <li key={i}>{diag}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-white font-semibold">
                  PROMPTIZ SENIOR SCORE
                </span>
                <span className="text-lg font-mono font-bold text-white">
                  {result.refinedScore}/100
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-3">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${result.refinedScore}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-zinc-300 block mb-1">
                ARCHITECTURAL UPGRADES:
              </span>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                {result.keyImprovements.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Refined Output */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  RE-ENGINEERED PROMPT:
                </span>
                <div className="text-xs text-zinc-200 font-mono">
                  Role: {result.rolePersona}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyRefined}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Refined Prompt</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 sm:p-5 rounded-xl border border-zinc-800 bg-black font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap select-text">
              {result.refinedFullPrompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
