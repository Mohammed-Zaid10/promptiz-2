import React, { useState } from 'react';
import { PromptizLogo } from './PromptizLogo';
import {
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Command,
  CheckCircle2,
  Upload,
} from 'lucide-react';

interface LaunchScreenProps {
  onEnter: () => void;
  onOpenBrandingModal: () => void;
}

export const LaunchScreen: React.FC<LaunchScreenProps> = ({
  onEnter,
  onOpenBrandingModal,
}) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Subtle monochrome ambient light - strictly black/charcoal/platinum, zero neon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-zinc-800/25 via-zinc-900/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-900/20 blur-[100px] pointer-events-none" />

      {/* Top Bar on Launch Screen */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900">
        <PromptizLogo size="md" />

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBrandingModal}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-md transition-colors bg-zinc-950/60"
            title="Custom Logo & Brand Identity"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Brand Identity & Logo</span>
          </button>

          <button
            onClick={onEnter}
            className="group flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-md transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero & Responsive Showcase */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Editorial Subtitle */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/80 mb-6 text-xs text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
          <span className="tracking-[0.2em] uppercase font-mono text-[11px]">
            Senior Prompt Engineering Suite
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">Monochrome Edition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-6 font-sans">
          Engineered Prompts for the Top 1% of AI Workflows.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mb-8">
          PROMPTIZ replaces vague amateur prompts with architectural senior-level directives.
          Configured with authoritative personas, granular physical specifications, negative boundaries,
          and executable disclaimers.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.12)] active:scale-95"
          >
            <Command className="w-4 h-4" />
            <span>Enter Prompt Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBrandingModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-300 hover:text-white text-sm font-medium transition-all"
          >
            Manage Brand Assets & Logo
          </button>
        </div>

        {/* Device Showcase Switcher */}
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg mb-8">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                devicePreview === 'desktop'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Interface</span>
            </button>
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                devicePreview === 'tablet'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet Viewport</span>
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                devicePreview === 'mobile'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Device Interface</span>
            </button>
          </div>

          {/* Interactive Hardware Frame Mockup */}
          <div
            className={`transition-all duration-500 ease-out mx-auto ${
              devicePreview === 'mobile'
                ? 'max-w-[340px] w-full'
                : devicePreview === 'tablet'
                ? 'max-w-[620px] w-full'
                : 'max-w-4xl w-full'
            }`}
          >
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl p-4 sm:p-6 text-left overflow-hidden">
              {/* Device Header Bar */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                </div>
                <div className="flex items-center gap-2">
                  <PromptizLogo size="sm" showWordmark={devicePreview !== 'mobile'} />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {devicePreview === 'mobile' ? 'iOS / Android' : 'Production v1.0'}
                </span>
              </div>

              {/* Sample Prompt Preview inside mockup */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-mono text-zinc-300">01. SENIOR ROLE MATRIX</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-400">
                      Midjourney v6.1 / Flux
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 font-mono leading-relaxed">
                    &quot;Imagine you are a world-class senior principal cinematographer and master lighting
                    director with 20+ years of editorial experience shooting cover stories for Vogue Italia...&quot;
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-zinc-900 bg-zinc-950">
                    <span className="text-zinc-500 block mb-1 text-[11px] font-mono">SPECIFICATIONS</span>
                    <p className="text-zinc-300 font-sans">
                      Hasselblad H6D-100c · 100mm f/2.2 prime · Profoto key light 45° · Desaturated monochrome palette
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-zinc-900 bg-zinc-950">
                    <span className="text-zinc-500 block mb-1 text-[11px] font-mono">DISCLAIMER &amp; QUALITIES</span>
                    <p className="text-zinc-300 font-sans">
                      Authentic micro-textures, 16-bit tonal gradations. Zero wax smoothing. Adheres to optical camera physics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mockup Footer Trigger */}
              <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
                <span className="font-mono text-[11px]">8K LATENT RESOLUTION READY</span>
                <button
                  onClick={onEnter}
                  className="text-white hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open Interactive Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pillars / Value props */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              01. Senior Authority Persona
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Injects domain expertise, deep career authority, and high-standard benchmark expectations directly into the model&apos;s latent attention.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              02. Parametric Specifications
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Replaces ambiguity with optical lenses, lighting architectures, memory buffers, algorithmic complexities, and negative boundaries.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              03. Deployed AI Reliability
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Backed by full-stack server-side Google Gemini integration that continues to perform reliably post-deployment with zero client-side key exposure.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Monochrome Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-300">PROMPTIZ</span>
          <span>·</span>
          <span>Sophisticated Prompt Engineering Architecture</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onOpenBrandingModal} className="hover:text-zinc-300 transition-colors">
            Custom Logo
          </button>
          <span>·</span>
          <button onClick={onEnter} className="hover:text-zinc-300 transition-colors">
            Enter Workspace
          </button>
        </div>
      </footer>
    </div>
  );
};
