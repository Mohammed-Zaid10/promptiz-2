import React, { useState, useRef } from 'react';
import { PromptizLogo } from './PromptizLogo';
import {
  Upload,
  X,
  Trash2,
  Check,
  Smartphone,
  Monitor,
  Copy,
  Download,
  Info,
} from 'lucide-react';

interface BrandingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandingModal: React.FC<BrandingModalProps> = ({ isOpen, onClose }) => {
  const [currentLogo, setCurrentLogo] = useState<string | null>(
    localStorage.getItem('promptiz_custom_logo')
  );
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, SVG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        localStorage.setItem('promptiz_custom_logo', base64);
        setCurrentLogo(base64);
        window.dispatchEvent(new Event('promptiz_logo_updated'));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustomLogo = () => {
    localStorage.removeItem('promptiz_custom_logo');
    setCurrentLogo(null);
    window.dispatchEvent(new Event('promptiz_logo_updated'));
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const palette = [
    { name: 'Obsidian Black', hex: '#000000', role: 'Pure Canvas Background' },
    { name: 'Carbon Jet', hex: '#09090B', role: 'Elevated Surface Layers' },
    { name: 'Graphite Zinc', hex: '#27272A', role: 'Hairline Structural Borders' },
    { name: 'Muted Slate', hex: '#71717A', role: 'Secondary Metadata Text' },
    { name: 'Platinum Silver', hex: '#E4E4E7', role: 'Primary Typography' },
    { name: 'Pure White', hex: '#FFFFFF', role: 'Action Triggers & Focal Points' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-5 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Brand Identity Spec
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-mono text-zinc-500 uppercase">Monochrome</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
              PROMPTIZ Branding &amp; Custom Logo
            </h2>
            <p className="text-xs text-zinc-400">
              Manage your custom logo image and view the sophisticated monochrome design system.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Logo Upload Section */}
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono mb-3">
            01. Logo Asset Configuration
          </h3>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-zinc-800 bg-black flex items-center justify-center p-2 shadow-inner">
                {currentLogo ? (
                  <img
                    src={currentLogo}
                    alt="Custom PROMPTIZ"
                    className="w-full h-full object-contain filter grayscale"
                  />
                ) : (
                  <PromptizLogo size="md" showWordmark={false} />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {currentLogo ? 'Custom User Logo Loaded' : 'Default Architectural Monogram'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 text-zinc-400 bg-zinc-950">
                    {currentLogo ? 'CUSTOM' : 'SYSTEM SVG'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {currentLogo
                    ? 'Your uploaded logo is cached and active throughout the application.'
                    : 'Precision laser-cut architectural vector emblem.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Logo</span>
              </button>

              {currentLogo && (
                <button
                  onClick={handleRemoveCustomLogo}
                  className="px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-xs flex items-center gap-1.5"
                  title="Reset to default logo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Live Presentation Across Mobile & Desktop */}
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono mb-3">
            02. Brand Surface Testing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Desktop Mock Card */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-black flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3">
                <PromptizLogo size="sm" />
                <span className="text-[10px] font-mono text-zinc-500">DESKTOP NAVBAR</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-3">
                The PROMPTIZ monogram anchors the executive interface with calm authority.
              </p>
              <div className="text-[10px] font-mono text-zinc-600 flex items-center justify-between">
                <span>RATIO 1:1 APERTURE</span>
                <span>HAIRLINE FINISH</span>
              </div>
            </div>

            {/* Mobile Mock Card */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-3">
                <PromptizLogo size="sm" showWordmark={false} />
                <span className="text-[10px] font-mono text-zinc-500">MOBILE APP ICON</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-3">
                Compact 32px badge optimized for high-DPI smartphone screens and app drawers.
              </p>
              <div className="text-[10px] font-mono text-zinc-600 flex items-center justify-between">
                <span>OLED OPTIMIZED</span>
                <span>ZERO NEON</span>
              </div>
            </div>
          </div>
        </section>

        {/* Monochrome Palette Specs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              03. Strict Monochrome Palette
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">CLICK TO COPY HEX</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {palette.map((item) => (
              <button
                key={item.hex}
                onClick={() => copyColor(item.hex)}
                className="group p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 text-left transition-all relative"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded border border-zinc-700"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{item.hex}</span>
                  {copiedColor === item.hex ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 block mt-1 line-clamp-1">
                  {item.role}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Modal Close CTA */}
        <div className="mt-8 pt-5 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors"
          >
            Apply &amp; Return to Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
