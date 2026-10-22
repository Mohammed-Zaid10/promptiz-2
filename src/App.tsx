import React, { useState, useEffect, useRef } from 'react';
import { PromptizLogo } from './components/PromptizLogo';
import {
  Check,
  Palette,
  ChevronDown,
  Sun,
  Moon,
  RotateCcw,
  Copy,
  AlertTriangle,
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
  const [logoFontStyle, setLogoFontStyle] = useState<'signature' | 'handwriting' | 'script' | 'editorial'>(
    'editorial'
  );

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

  const [isResetting, setIsResetting] = useState(false);

  const clearBotpressStorage = () => {
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('bp') || key.includes('botpress') || key.includes('webchat'))) {
          localStorage.removeItem(key);
        }
      }
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const key = sessionStorage.key(i);
        if (key && (key.startsWith('bp') || key.includes('botpress') || key.includes('webchat'))) {
          sessionStorage.removeItem(key);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleResetHistory = () => {
    clearBotpressStorage();
    localStorage.setItem('promptiz_last_active_time', Date.now().toString());
    const bp = (window as any).botpress;
    if (bp && typeof bp.restartConversation === 'function') {
      try {
        bp.restartConversation();
      } catch {
        // ignore
      }
    }
    setIsResetting(true);
    setTimeout(() => setIsResetting(false), 1200);
  };

  const [latestPrompt, setLatestPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Listen for bot responses from Botpress
  useEffect(() => {
    const attachMessageListener = () => {
      const bp = (window as any).botpress;
      if (bp && typeof bp.on === 'function') {
        try {
          bp.on('message', (msg: any) => {
            const text =
              msg?.payload?.text ||
              msg?.text ||
              msg?.payload?.value ||
              msg?.value ||
              '';
            if (text && typeof text === 'string' && text.trim().length > 0) {
              setLatestPrompt(text.trim());
            }
          });
        } catch {
          // ignore
        }
      }
    };

    const handleWindowMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data) {
          const text =
            data.payload?.text ||
            data.text ||
            data.message?.text ||
            data.payload?.value ||
            '';
          if (text && typeof text === 'string' && text.trim().length > 0) {
            setLatestPrompt(text.trim());
          }
        }
      } catch {
        // ignore non-json
      }
    };

    window.addEventListener('message', handleWindowMessage);
    attachMessageListener();
    const interval = setInterval(attachMessageListener, 1500);

    return () => {
      window.removeEventListener('message', handleWindowMessage);
      clearInterval(interval);
    };
  }, []);

  const handleCopyPrompt = () => {
    const selected = window.getSelection()?.toString()?.trim();
    const textToCopy = selected || latestPrompt;

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
    } else {
      navigator.clipboard.writeText(
        'Promptiz AI Prompt: Please make sure to save your directives before the session resets.'
      );
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Ensure Botpress chatbot mounts directly inside the middle card container
  useEffect(() => {
    const attachBotpress = () => {
      const bp = (window as any).botpress;
      if (bp && typeof bp.config === 'function') {
        try {
          bp.config({
            configuration: {
              embeddedChatId: 'promptiz-embedded-botpress',
              conversationHistory: false,
            },
          });
        } catch {
          // ignore
        }
      }
    };

    attachBotpress();
    const interval = setInterval(attachBotpress, 800);
    const timeout = setTimeout(() => clearInterval(interval), 8000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // 10-Minute Inactivity Auto-Reset: resets history if inactive for 10 minutes
  useEffect(() => {
    const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

    const checkInactivity = () => {
      const lastActive = localStorage.getItem('promptiz_last_active_time');
      const now = Date.now();
      if (!lastActive || now - Number(lastActive) >= INACTIVITY_LIMIT_MS) {
        handleResetHistory();
      }
    };

    const recordActivity = () => {
      localStorage.setItem('promptiz_last_active_time', Date.now().toString());
    };

    window.addEventListener('pointerdown', recordActivity);
    window.addEventListener('keydown', recordActivity);
    window.addEventListener('focus', checkInactivity);

    const interval = setInterval(checkInactivity, 20000); // Check every 20s

    return () => {
      window.removeEventListener('pointerdown', recordActivity);
      window.removeEventListener('keydown', recordActivity);
      window.removeEventListener('focus', checkInactivity);
      clearInterval(interval);
    };
  }, []);

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
            Chat directly with Promptiz AI to turn your ideas into clear, professional, task-specific prompts.
          </p>
        </div>

        {/* Animated Card with Embedded Botpress Chatbot & Roaming Lines */}
        <div className="relative group">
          {/* 1. Rotating Conic Border Beam (Roaming Lines effect 1) */}
          <div className="absolute -inset-[1.5px] rounded-2xl overflow-hidden pointer-events-none z-0">
            <div className="absolute -inset-[100%] w-[300%] h-[300%] m-auto bg-roam-conic opacity-60 animate-roam-spin" />
          </div>

          {/* 2. Animated Ambient Outer Halo Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-current/5 via-current/15 to-current/5 blur-md opacity-70 pointer-events-none" />

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
              className="opacity-40 blur-[2px] animate-dash-roam"
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
              className="opacity-85 animate-dash-roam"
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

          {/* Inner Card Container housing the Botpress Chatbot */}
          <div
            className={`relative rounded-2xl border ${theme.border} ${theme.card} shadow-2xl transition-all duration-300 z-10 overflow-hidden flex flex-col`}
          >
            {/* Top Bar inside Card */}
            <div className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b ${theme.border} bg-current/5 select-none`}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-medium tracking-wide uppercase">
                  Promptiz AI Chatbot
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-current/20 opacity-60 hidden sm:inline-block" title="Chat conversation is not saved permanently and resets after 10 minutes of inactivity">
                  Auto-resets in 10m
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetHistory}
                  disabled={isResetting}
                  className={`text-[11px] font-mono ${theme.textMuted} hover:opacity-100 flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-current/15 hover:bg-current/5 transition-all`}
                  title="Reset conversation and start clean session"
                >
                  <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin text-emerald-500' : ''}`} />
                  <span>{isResetting ? 'Resetting...' : 'New Chat'}</span>
                </button>

                <button
                  type="button"
                  onClick={cycleNextTheme}
                  className={`text-[11px] font-mono ${theme.textMuted} hover:underline flex items-center gap-1.5`}
                  title="Quick cycle next theme"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Theme ({theme.name})</span>
                </button>
              </div>
            </div>

            {/* Embedded Chat Container - Smooth Single Scroll Without Sticking */}
            <div className="relative w-full h-[580px] min-h-[520px] bg-transparent overflow-hidden overscroll-contain">
              <div
                id="promptiz-embedded-botpress"
                className="w-full h-full overflow-hidden overscroll-contain"
              />
            </div>

            {/* Prompt Warning & 1-Click Copy Action Bar */}
            <div className={`p-4 sm:px-6 sm:py-3.5 border-t border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors duration-300 select-none`}>
              <div className="flex items-start sm:items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
                <p className="text-xs text-amber-900 dark:text-amber-200 font-sans leading-relaxed">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">Notice:</span> Your prompt data will be gone in a few minutes (10m inactivity reset). Please copy or save your prompt!
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className={`px-4 py-2 rounded-xl ${theme.primaryBtn} font-semibold text-xs tracking-wide uppercase transition-all flex items-center gap-2 shadow-md active:scale-95`}
                  title="Copy generated prompt to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
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
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`w-full border-t ${theme.border} py-6 text-center text-xs ${theme.textMuted} font-mono transition-colors duration-300`}>
        <p>PROMPTIZ · Senior AI Prompt Architecture</p>
      </footer>
    </div>
  );
}
