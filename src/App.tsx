import React, { useState, useEffect, useRef } from 'react';
import { PromptizLogo } from './components/PromptizLogo';
import {
  Wand2,
  Copy,
  Check,
  ArrowRight,
  AlertCircle,
  Palette,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';

export type ThemeId =
  | 'light'
  | 'alabaster'
  | 'nordic'
  | 'sand'
  | 'platinum'
  | 'clay'
  | 'obsidian'
  | 'graphite'
  | 'titanium'
  | 'midnight'
  | 'silver';

interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: 'light' | 'dark';
  bg: string;
  card: string;
  inputBg: string;
  headerBg: string;
  border: string;
  text: string;
  textMuted: string;
  primaryBtn: string;
  secondaryBtn: string;
  codeBg: string;
  previewColor: string;
}

const THEMES: Record<ThemeId, ThemeConfig> = {
  // --- LIGHT THEMES ---
  light: {
    id: 'light',
    name: 'Chalk Minimal',
    category: 'light',
    bg: 'bg-[#fafafa]',
    card: 'bg-white',
    inputBg: 'bg-[#f4f4f5]',
    headerBg: 'bg-[#fafafa]/95',
    border: 'border-[#e4e4e7]',
    text: 'text-zinc-900',
    textMuted: 'text-zinc-500',
    primaryBtn: 'bg-zinc-900 hover:bg-black text-white shadow-sm',
    secondaryBtn: 'border-zinc-300 text-zinc-600 hover:text-black hover:bg-zinc-100',
    codeBg: 'bg-white border-[#e4e4e7] text-zinc-900',
    previewColor: '#fafafa',
  },
  alabaster: {
    id: 'alabaster',
    name: 'Warm Alabaster',
    category: 'light',
    bg: 'bg-[#fcfbf9]',
    card: 'bg-white',
    inputBg: 'bg-[#f7f5f0]',
    headerBg: 'bg-[#fcfbf9]/95',
    border: 'border-[#e7e5e4]',
    text: 'text-stone-900',
    textMuted: 'text-stone-500',
    primaryBtn: 'bg-stone-900 hover:bg-black text-stone-100 shadow-sm',
    secondaryBtn: 'border-stone-300 text-stone-600 hover:text-stone-950 hover:bg-stone-100',
    codeBg: 'bg-[#faf8f5] border-[#e7e5e4] text-stone-900',
    previewColor: '#f7f5f0',
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Frost',
    category: 'light',
    bg: 'bg-[#f1f5f9]',
    card: 'bg-white',
    inputBg: 'bg-[#f8fafc]',
    headerBg: 'bg-[#f1f5f9]/95',
    border: 'border-[#cbd5e1]',
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
    primaryBtn: 'bg-slate-900 hover:bg-black text-white shadow-sm',
    secondaryBtn: 'border-slate-300 text-slate-600 hover:text-slate-950 hover:bg-slate-100',
    codeBg: 'bg-[#f8fafc] border-[#cbd5e1] text-slate-900',
    previewColor: '#e2e8f0',
  },
  sand: {
    id: 'sand',
    name: 'Desert Dune',
    category: 'light',
    bg: 'bg-[#f5f5f4]',
    card: 'bg-[#fafaf9]',
    inputBg: 'bg-[#eae8e6]',
    headerBg: 'bg-[#f5f5f4]/95',
    border: 'border-[#d6d3d1]',
    text: 'text-[#292524]',
    textMuted: 'text-[#78716c]',
    primaryBtn: 'bg-[#292524] hover:bg-black text-[#fafaf9] shadow-sm',
    secondaryBtn: 'border-[#d6d3d1] text-[#57534e] hover:text-black hover:bg-[#eae8e6]',
    codeBg: 'bg-[#fafaf9] border-[#d6d3d1] text-[#292524]',
    previewColor: '#d6d3d1',
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum Silver',
    category: 'light',
    bg: 'bg-[#eceff1]',
    card: 'bg-white',
    inputBg: 'bg-[#f4f6f7]',
    headerBg: 'bg-[#eceff1]/95',
    border: 'border-[#cfd8dc]',
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
    primaryBtn: 'bg-slate-900 hover:bg-black text-white shadow-sm',
    secondaryBtn: 'border-[#b0bec5] text-slate-600 hover:text-black hover:bg-[#e0e0e0]',
    codeBg: 'bg-white border-[#cfd8dc] text-slate-900',
    previewColor: '#cfd8dc',
  },
  clay: {
    id: 'clay',
    name: 'Mineral Porcelain',
    category: 'light',
    bg: 'bg-[#f2f4f3]',
    card: 'bg-white',
    inputBg: 'bg-[#e9ecea]',
    headerBg: 'bg-[#f2f4f3]/95',
    border: 'border-[#dce1de]',
    text: 'text-[#191c1a]',
    textMuted: 'text-[#5c6460]',
    primaryBtn: 'bg-[#191c1a] hover:bg-black text-white shadow-sm',
    secondaryBtn: 'border-[#c8d1cc] text-[#3f4743] hover:text-black hover:bg-[#e9ecea]',
    codeBg: 'bg-white border-[#dce1de] text-[#191c1a]',
    previewColor: '#dce1de',
  },

  // --- DARK THEMES ---
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Black',
    category: 'dark',
    bg: 'bg-black',
    card: 'bg-[#09090b]',
    inputBg: 'bg-black',
    headerBg: 'bg-black/95',
    border: 'border-[#27272a]',
    text: 'text-zinc-100',
    textMuted: 'text-zinc-400',
    primaryBtn: 'bg-white hover:bg-zinc-200 text-black',
    secondaryBtn: 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900',
    codeBg: 'bg-black border-[#27272a] text-zinc-200',
    previewColor: '#000000',
  },
  graphite: {
    id: 'graphite',
    name: 'Graphite Slate',
    category: 'dark',
    bg: 'bg-[#111317]',
    card: 'bg-[#181b22]',
    inputBg: 'bg-[#0e1014]',
    headerBg: 'bg-[#111317]/95',
    border: 'border-slate-800',
    text: 'text-slate-100',
    textMuted: 'text-slate-400',
    primaryBtn: 'bg-slate-100 hover:bg-white text-slate-900',
    secondaryBtn: 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900',
    codeBg: 'bg-[#0d0f13] border-slate-800 text-slate-200',
    previewColor: '#181b22',
  },
  titanium: {
    id: 'titanium',
    name: 'Warm Titanium',
    category: 'dark',
    bg: 'bg-[#121110]',
    card: 'bg-[#1c1917]',
    inputBg: 'bg-[#141210]',
    headerBg: 'bg-[#121110]/95',
    border: 'border-stone-800',
    text: 'text-stone-100',
    textMuted: 'text-stone-400',
    primaryBtn: 'bg-[#e7e5e4] hover:bg-white text-stone-900',
    secondaryBtn: 'border-stone-800 text-stone-400 hover:text-white hover:bg-stone-900',
    codeBg: 'bg-[#0f0e0d] border-stone-800 text-stone-200',
    previewColor: '#1c1917',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Horizon',
    category: 'dark',
    bg: 'bg-[#07090e]',
    card: 'bg-[#0d111a]',
    inputBg: 'bg-[#080b12]',
    headerBg: 'bg-[#07090e]/95',
    border: 'border-slate-800/80',
    text: 'text-zinc-100',
    textMuted: 'text-slate-400',
    primaryBtn: 'bg-white hover:bg-slate-200 text-slate-950',
    secondaryBtn: 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900',
    codeBg: 'bg-[#05070b] border-slate-800 text-slate-200',
    previewColor: '#0d111a',
  },
  silver: {
    id: 'silver',
    name: 'Silver Steel',
    category: 'dark',
    bg: 'bg-[#18181b]',
    card: 'bg-[#27272a]',
    inputBg: 'bg-[#1c1c1f]',
    headerBg: 'bg-[#18181b]/95',
    border: 'border-zinc-700/80',
    text: 'text-zinc-100',
    textMuted: 'text-zinc-400',
    primaryBtn: 'bg-white hover:bg-zinc-200 text-zinc-900',
    secondaryBtn: 'border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800',
    codeBg: 'bg-[#141416] border-zinc-700 text-zinc-200',
    previewColor: '#27272a',
  },
};

const LIGHT_THEMES: ThemeId[] = ['light', 'alabaster', 'nordic', 'sand', 'platinum', 'clay'];
const DARK_THEMES: ThemeId[] = ['obsidian', 'graphite', 'titanium', 'midnight', 'silver'];
const ALL_THEMES: ThemeId[] = [...LIGHT_THEMES, ...DARK_THEMES];

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [roleTitle, setRoleTitle] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [logoFontStyle, setLogoFontStyle] = useState<'signature' | 'handwriting' | 'script' | 'editorial'>(
    'editorial'
  );
  const [isTyping, setIsTyping] = useState(false);

  // Theme State (Default: Warm Alabaster)
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('promptiz_theme') as ThemeId;
    if (saved && saved !== 'obsidian' && THEMES[saved]) {
      return saved;
    }
    return 'alabaster';
  });
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [themeFilterCategory, setThemeFilterCategory] = useState<'all' | 'light' | 'dark'>('all');
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const theme = THEMES[currentThemeId];

  const getHandwritingFontClass = () => {
    switch (logoFontStyle) {
      case 'signature':
        return 'font-signature font-normal tracking-wide';
      case 'handwriting':
        return 'font-handwriting font-bold tracking-normal';
      case 'script':
        return 'font-script font-bold tracking-normal';
      case 'editorial':
        return 'font-editorial italic font-medium tracking-wide';
      default:
        return 'font-signature';
    }
  };

  useEffect(() => {
    localStorage.setItem('promptiz_theme', currentThemeId);
  }, [currentThemeId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) {
      setErrorMessage('Please type what you want in the text box.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawIdea: userInput.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setGeneratedPrompt(data.fullPrompt || '');
      setRoleTitle(data.rolePersona || 'Senior Prompt Architect');
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err?.message || 'Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setUserInput('');
    setGeneratedPrompt(null);
    setRoleTitle(null);
    setErrorMessage(null);
  };

  const cycleNextTheme = () => {
    const currentIndex = ALL_THEMES.indexOf(currentThemeId);
    const nextIndex = (currentIndex + 1) % ALL_THEMES.length;
    setCurrentThemeId(ALL_THEMES[nextIndex]);
  };

  const displayedThemes =
    themeFilterCategory === 'light'
      ? LIGHT_THEMES
      : themeFilterCategory === 'dark'
      ? DARK_THEMES
      : ALL_THEMES;

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col font-sans transition-colors duration-300 antialiased`}
    >
      {/* Header with PROMPTIZ brand and Theme Switcher */}
      <header
        className={`w-full border-b ${theme.border} ${theme.headerBg} backdrop-blur-md sticky top-0 z-40 transition-colors duration-300`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <PromptizLogo size="md" />

          {/* Theme Dropdown Button */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border ${theme.border} ${theme.card} hover:opacity-90 transition-all font-mono shadow-sm`}
              title="Change theme"
            >
              {theme.category === 'light' ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-zinc-400" />
              )}
              <span>{theme.name}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isThemeMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Comprehensive Theme Menu with Light & Dark filters */}
            {isThemeMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-xl border ${theme.border} ${theme.card} shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150`}
              >
                {/* Filter Tabs */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-current/10 mb-2 text-[11px] font-mono">
                  <button
                    onClick={() => setThemeFilterCategory('all')}
                    className={`flex-1 py-1 rounded text-center transition-all ${
                      themeFilterCategory === 'all'
                        ? `${theme.primaryBtn} font-semibold`
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    All ({ALL_THEMES.length})
                  </button>
                  <button
                    onClick={() => setThemeFilterCategory('light')}
                    className={`flex-1 py-1 rounded text-center transition-all flex items-center justify-center gap-1 ${
                      themeFilterCategory === 'light'
                        ? `${theme.primaryBtn} font-semibold`
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Sun className="w-2.5 h-2.5" />
                    <span>Light ({LIGHT_THEMES.length})</span>
                  </button>
                  <button
                    onClick={() => setThemeFilterCategory('dark')}
                    className={`flex-1 py-1 rounded text-center transition-all flex items-center justify-center gap-1 ${
                      themeFilterCategory === 'dark'
                        ? `${theme.primaryBtn} font-semibold`
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Moon className="w-2.5 h-2.5" />
                    <span>Dark ({DARK_THEMES.length})</span>
                  </button>
                </div>

                {/* Theme List */}
                <div className="max-h-72 overflow-y-auto space-y-1 pr-0.5">
                  {displayedThemes.map((tId) => {
                    const t = THEMES[tId];
                    const isSelected = currentThemeId === tId;
                    return (
                      <button
                        key={tId}
                        onClick={() => {
                          setCurrentThemeId(tId);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left ${
                          isSelected
                            ? `${theme.primaryBtn} font-semibold shadow-sm`
                            : `hover:bg-black/5 dark:hover:bg-white/5 ${theme.text}`
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 inline-block shrink-0 shadow-xs"
                            style={{ backgroundColor: t.previewColor }}
                          />
                          <span>{t.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] opacity-50 uppercase">
                            {t.category}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Screen: Text Area Only */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* Artistic Middle Brand Hero */}
        <div className="text-center mb-7 space-y-3 flex flex-col items-center">
          {/* Animated emblem badge above title */}
          <div className="relative inline-flex items-center justify-center mb-1 group">
            {/* Concentric rotating orbital rings near logo */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-current/25 animate-logo-spin pointer-events-none" />
            <div className="absolute -inset-6 rounded-full border border-dotted border-current/15 animate-logo-reverse pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl border border-current/20 bg-current/5 flex items-center justify-center p-2 shadow-sm animate-logo-breath backdrop-blur-xs">
              <PromptizLogo size="sm" showWordmark={false} />
            </div>
          </div>

          {/* Artistic Handwriting PROMPTIZ Title */}
          <div className="relative inline-flex flex-col items-center">
            <h1
              className={`text-6xl sm:text-7xl md:text-8xl tracking-tight select-none ${getHandwritingFontClass()} shimmer-text transition-all duration-300 py-1 drop-shadow-sm`}
            >
              Promptiz
            </h1>

            {/* Subtle calligraphic underline flourish */}
            <div className="w-28 sm:w-36 h-0.5 mx-auto bg-gradient-to-r from-transparent via-current to-transparent opacity-40 -mt-1 mb-2 animate-pulse" />

            {/* Font Style Switcher Pill */}
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-current/5 border border-current/10 text-[10px] font-mono mt-1">
              {(
                [
                  { id: 'signature', label: 'Signature' },
                  { id: 'handwriting', label: 'Handwritten' },
                  { id: 'script', label: 'Cursive' },
                  { id: 'editorial', label: 'Editorial' },
                ] as const
              ).map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setLogoFontStyle(style.id)}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    logoFontStyle === style.id
                      ? `${theme.primaryBtn} font-semibold shadow-xs`
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <p className={`text-xs sm:text-sm ${theme.textMuted} max-w-lg mx-auto font-normal pt-1`}>
            Type any request. AI will automatically construct a senior-grade prompt with authoritative role, specifications, qualities, and disclaimers.
          </p>
        </div>

        {/* Animated Text Area Card with Roaming Lines */}
        <div className="relative group">
          {/* 1. Rotating Conic Border Beam (Roaming Lines effect 1) */}
          <div className="absolute -inset-[1.5px] rounded-2xl overflow-hidden pointer-events-none z-0">
            <div
              className={`absolute -inset-[100%] w-[300%] h-[300%] m-auto bg-roam-conic opacity-60 ${
                isTyping ? 'animate-roam-spin-fast opacity-90' : 'animate-roam-spin'
              }`}
            />
          </div>

          {/* 2. Animated Ambient Outer Halo Glow */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-current/5 via-current/15 to-current/5 blur-md transition-opacity duration-500 pointer-events-none ${
              isTyping ? 'opacity-100 animate-typebox-focus' : 'opacity-60 group-hover:opacity-90'
            }`}
          />

          {/* 3. High-Precision SVG Perimeter Laser Tracers (Roaming Lines effect 2) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible z-20">
            {/* Diffused soft glow roaming beam */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="140 500"
              className={`opacity-40 blur-[2px] ${
                isTyping ? 'animate-dash-roam-fast opacity-75' : 'animate-dash-roam'
              }`}
            />
            {/* Sharp traveling laser beam */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="120 520"
              className={`opacity-85 ${
                isTyping ? 'animate-dash-roam-fast opacity-100' : 'animate-dash-roam'
              }`}
            />
            {/* Counter-roaming secondary laser tracer */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="70 600"
              className="opacity-50 animate-dash-roam-reverse"
            />
          </svg>

          {/* Inner Card Container */}
          <div
            className={`relative p-5 sm:p-7 rounded-2xl border ${theme.border} ${theme.card} shadow-2xl transition-all duration-300 z-10`}
          >
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="relative">
                {/* Inner roaming outline around text area */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl overflow-visible z-10">
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="80 360"
                    className={`transition-opacity ${
                      isTyping
                        ? 'opacity-70 animate-dash-roam-fast'
                        : 'opacity-30 animate-dash-roam'
                    }`}
                  />
                </svg>

                {/* Live Activity Beacon inside text box */}
                <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 pointer-events-none select-none">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isTyping ? 'bg-emerald-500 animate-ping' : 'bg-current opacity-40'
                    }`}
                  />
                  <span className="text-[10px] font-mono tracking-wider opacity-50 uppercase">
                    {isTyping ? 'Typing...' : 'AI Ready'}
                  </span>
                </div>

                <textarea
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    setIsTyping(true);
                  }}
                  onBlur={() => setIsTyping(false)}
                  placeholder="Type what you want to create (e.g. I want an image of a majestic lion in a snowstorm, or I want python code to scrape prices, or a high-converting sales email...)"
                  rows={6}
                  className={`w-full ${theme.inputBg} border ${theme.border} rounded-xl px-4 py-3.5 pr-24 text-sm sm:text-base ${theme.text} placeholder:${theme.textMuted} focus:outline-none focus:ring-1 focus:ring-current transition-all font-sans leading-relaxed resize-y`}
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={cycleNextTheme}
                  className={`text-[11px] font-mono ${theme.textMuted} hover:underline flex items-center gap-1.5`}
                  title="Quick cycle next theme"
                >
                  <Palette className="w-3 h-3" />
                  <span>Switch Theme ({theme.name})</span>
                </button>

                <div className="flex items-center gap-2">
                  {userInput && (
                    <button
                      type="button"
                      onClick={() => {
                        handleClear();
                        setIsTyping(false);
                      }}
                      className={`px-3 py-2 rounded-lg border ${theme.secondaryBtn} text-xs transition-colors`}
                    >
                      Clear
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className={`px-6 py-2.5 rounded-xl ${theme.primaryBtn} font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md active:scale-95`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Creating Prompt...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        <span>Create Prompt</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Generated Output */}
        {generatedPrompt && (
          <div
            className={`mt-8 p-5 sm:p-7 rounded-2xl border ${theme.border} ${theme.card} shadow-xl space-y-4 animate-in fade-in duration-200 transition-colors duration-300`}
          >
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${theme.border} pb-4`}>
              <div>
                <span className={`text-[11px] font-mono uppercase tracking-widest ${theme.textMuted} block`}>
                  PROMPTIZ SENIOR PROMPT
                </span>
                {roleTitle && (
                  <span className="text-xs font-mono font-medium">
                    Role Assigned: {roleTitle}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg ${theme.primaryBtn} font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 self-start sm:self-auto`}
              >
                {copied ? (
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
            </div>

            {/* Formatted Code Block */}
            <div className="relative group">
              <pre
                className={`w-full p-4 sm:p-5 rounded-xl border ${theme.codeBg} font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap select-text`}
              >
                {generatedPrompt}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`w-full border-t ${theme.border} py-6 text-center text-xs ${theme.textMuted} font-mono transition-colors duration-300`}>
        <p>PROMPTIZ · Senior AI Prompt Architecture</p>
      </footer>
    </div>
  );
}
