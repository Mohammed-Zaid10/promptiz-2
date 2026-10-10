import React, { useState } from 'react';
import { GeneratedPrompt, TestExecutionResult } from '../types';
import {
  Copy,
  Check,
  Download,
  Bookmark,
  BookmarkCheck,
  Play,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  Sliders,
  CheckCircle2,
  FileCode,
  Terminal,
  ExternalLink,
  Info,
} from 'lucide-react';

interface PromptInspectorProps {
  prompt: GeneratedPrompt;
  onSavePrompt?: (prompt: GeneratedPrompt) => void;
  isSaved?: boolean;
}

export const PromptInspector: React.FC<PromptInspectorProps> = ({
  prompt,
  onSavePrompt,
  isSaved = false,
}) => {
  const [copiedType, setCopiedType] = useState<'all' | 'md' | null>(null);
  const [activeTab, setActiveTab] = useState<'full' | 'breakdown' | 'sandbox'>('full');

  // Dynamic variable replacement
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    prompt.variables?.forEach((v) => {
      initial[v.name] = v.defaultValue;
    });
    return initial;
  });

  // Sandbox simulation state
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestExecutionResult | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  // Compute final prompt with variable substitutions
  const getRenderedPrompt = () => {
    let result = prompt.fullPrompt;
    Object.entries(variableValues).forEach(([key, val]) => {
      const regex = new RegExp(`{{${key}}}|\\[${key}\\]`, 'gi');
      result = result.replace(regex, val);
    });
    return result;
  };

  const handleCopy = (type: 'all' | 'md' = 'all') => {
    const textToCopy =
      type === 'md'
        ? `### ${prompt.title}\n**Role:** ${prompt.rolePersona}\n\n\`\`\`\n${getRenderedPrompt()}\n\`\`\`\n\n**Parameters:** ${prompt.recommendedSettings}`
        : getRenderedPrompt();

    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleExportTxt = () => {
    const blob = new Blob([getRenderedPrompt()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-prompt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(prompt, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-promptiz.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTestInSandbox = async () => {
    setIsTesting(true);
    setTestError(null);
    setTestResult(null);

    try {
      const res = await fetch('/api/test-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText: getRenderedPrompt(),
          modelRole: prompt.rolePersona,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to simulate prompt execution.');
      }

      const data = await res.json();
      setTestResult(data);
      setActiveTab('sandbox');
    } catch (err: any) {
      setTestError(err.message || 'Execution error.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="uppercase text-zinc-300 font-semibold">{prompt.category}</span>
              <span>·</span>
              <span>{prompt.targetAi || 'Universal AI'}</span>
              <span>·</span>
              <span className="text-zinc-400">SENIOR MATRIX</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
              {prompt.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono pt-1">
              <span className="text-zinc-500">ROLE:</span>
              <span className="text-zinc-200">{prompt.rolePersona}</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {onSavePrompt && (
              <button
                type="button"
                onClick={() => onSavePrompt(prompt)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSaved
                    ? 'border-zinc-700 bg-zinc-900 text-white'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700'
                }`}
                title={isSaved ? 'Saved in library' : 'Save to prompt vault'}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-zinc-200" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleCopy('all')}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs tracking-wide uppercase hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              {copiedType === 'all' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleExportTxt}
              className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white text-xs transition-colors"
              title="Download TXT"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 mt-4 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('full')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'full'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Engineered Full Prompt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'breakdown'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Architectural Layers
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('sandbox');
              if (!testResult && !isTesting) handleTestInSandbox();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'sandbox'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Play className="w-3 h-3 text-zinc-300" />
            <span>Test in Live Sandbox</span>
          </button>
        </div>

        {/* Dynamic Variables Bar (if prompt has placeholders) */}
        {prompt.variables && prompt.variables.length > 0 && (
          <div className="mt-4 p-3.5 rounded-xl border border-zinc-800/90 bg-zinc-900/40">
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                Customizable Template Parameters
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {prompt.variables.map((v) => (
                <div key={v.name} className="space-y-1">
                  <label
                    htmlFor={`var-${v.name}`}
                    className="text-[10px] font-mono text-zinc-500 uppercase block"
                  >
                    {v.name} {v.description ? `(${v.description})` : ''}
                  </label>
                  <input
                    id={`var-${v.name}`}
                    type="text"
                    value={variableValues[v.name] ?? v.defaultValue}
                    onChange={(e) =>
                      setVariableValues({ ...variableValues, [v.name]: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-zinc-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: Complete Prompt Text */}
        {activeTab === 'full' && (
          <div className="mt-5 space-y-4">
            <div className="relative group">
              <pre className="w-full p-4 sm:p-5 rounded-xl border border-zinc-800 bg-black font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text">
                {getRenderedPrompt()}
              </pre>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleCopy('all')}
                  className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Recommended Model Settings & Flags */}
            {prompt.recommendedSettings && (
              <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <span className="font-mono text-zinc-500 uppercase text-[11px]">
                  RECOMMENDED PARAMETERS / CLI FLAGS:
                </span>
                <span className="font-mono text-zinc-200 bg-black px-2.5 py-1 rounded border border-zinc-800">
                  {prompt.recommendedSettings}
                </span>
              </div>
            )}

            {prompt.engineeringNotes && (
              <p className="text-xs text-zinc-500 italic font-sans">
                Architecture Note: {prompt.engineeringNotes}
              </p>
            )}
          </div>
        )}

        {/* TAB 2: Architectural Breakdown */}
        {activeTab === 'breakdown' && (
          <div className="mt-5 space-y-4">
            {/* 1. Persona */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <Shield className="w-3.5 h-3.5 text-zinc-300" />
                <span>Layer 1: Senior Role &amp; Expert Persona</span>
              </div>
              <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                {prompt.breakdown.role}
              </p>
            </div>

            {/* 2. Directives */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <Terminal className="w-3.5 h-3.5 text-zinc-300" />
                <span>Layer 2: Primary Mission Directive</span>
              </div>
              <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                {prompt.breakdown.directives}
              </p>
            </div>

            {/* 3. Specifications */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <Sliders className="w-3.5 h-3.5 text-zinc-300" />
                <span>Layer 3: Granular Technical / Optical Specifications</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300 font-mono list-disc list-inside">
                {prompt.breakdown.specifications.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* 4. Qualities */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300" />
                <span>Layer 4: Non-Negotiable Benchmark Qualities</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300 font-mono list-disc list-inside">
                {prompt.breakdown.qualities.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* 5. Negative Boundaries */}
            {prompt.breakdown.negativeConstraints &&
              prompt.breakdown.negativeConstraints.length > 0 && (
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase block">
                    Layer 5: Negative Boundaries / Exclusions
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-400 font-mono list-disc list-inside">
                    {prompt.breakdown.negativeConstraints.map((neg, i) => (
                      <li key={i}>{neg}</li>
                    ))}
                  </ul>
                </div>
              )}

            {/* 6. Disclaimer & Invocation */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase block">
                Layer 6: Authoritative Disclaimer &amp; Final Invocation Hook
              </span>
              <p className="text-xs text-zinc-400 font-sans italic">
                {prompt.breakdown.disclaimer}
              </p>
              <div className="pt-2 border-t border-zinc-800 text-xs font-mono text-zinc-100">
                {prompt.breakdown.invocation}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Live Sandbox Execution Simulator */}
        {activeTab === 'sandbox' && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Simulated Output Tester
                </span>
                <span className="text-[11px] text-zinc-400">
                  Tests how Gemini responds to this engineered prompt in real-time.
                </span>
              </div>
              <button
                type="button"
                onClick={handleTestInSandbox}
                disabled={isTesting}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors flex items-center gap-1.5 disabled:opacity-40"
              >
                {isTesting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Re-Run Test</span>
                  </>
                )}
              </button>
            </div>

            {testError && (
              <div className="p-3 rounded-lg border border-red-900/70 bg-red-950/40 text-red-300 text-xs">
                {testError}
              </div>
            )}

            {testResult && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>MODEL: {testResult.modelUsed}</span>
                  <span>LATENCY: {testResult.executionTimeMs}ms</span>
                </div>
                <div className="p-4 rounded-xl border border-zinc-800 bg-black font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {testResult.output}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
