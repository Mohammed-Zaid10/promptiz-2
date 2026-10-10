import React from 'react';
import { PromptizLogo } from './PromptizLogo';
import {
  Wand2,
  FileCode2,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  Smartphone,
  Upload,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'architect' | 'inspector' | 'refiner' | 'vault';
  onTabChange: (tab: 'architect' | 'inspector' | 'refiner' | 'vault') => void;
  hasActivePrompt: boolean;
  onOpenLaunchScreen: () => void;
  onOpenBrandingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  hasActivePrompt,
  onOpenLaunchScreen,
  onOpenBrandingModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/90 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onTabChange('architect')}
            className="text-left focus:outline-none"
          >
            <PromptizLogo size="md" />
          </button>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg">
          <button
            onClick={() => onTabChange('architect')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'architect'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Studio Architect</span>
          </button>

          {hasActivePrompt && (
            <button
              onClick={() => onTabChange('inspector')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'inspector'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Prompt Inspector</span>
            </button>
          )}

          <button
            onClick={() => onTabChange('refiner')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'refiner'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refiner &amp; Audit</span>
          </button>

          <button
            onClick={() => onTabChange('vault')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'vault'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Prompt Vault</span>
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Launch Screen Presentation Preview */}
          <button
            onClick={onOpenLaunchScreen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950 rounded-md transition-colors"
            title="Launch Screen Branding View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch View</span>
          </button>

          {/* Branding & Logo Uploader */}
          <button
            onClick={onOpenBrandingModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950 rounded-md transition-colors"
            title="Manage Logo and Monochrome Identity"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logo &amp; Brand</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-zinc-900 bg-zinc-950 px-2 py-1.5 text-xs">
        <button
          onClick={() => onTabChange('architect')}
          className={`px-2.5 py-1 rounded ${
            currentTab === 'architect' ? 'text-white font-semibold' : 'text-zinc-500'
          }`}
        >
          Studio
        </button>
        {hasActivePrompt && (
          <button
            onClick={() => onTabChange('inspector')}
            className={`px-2.5 py-1 rounded ${
              currentTab === 'inspector' ? 'text-white font-semibold' : 'text-zinc-500'
            }`}
          >
            Inspect
          </button>
        )}
        <button
          onClick={() => onTabChange('refiner')}
          className={`px-2.5 py-1 rounded ${
            currentTab === 'refiner' ? 'text-white font-semibold' : 'text-zinc-500'
          }`}
        >
          Refiner
        </button>
        <button
          onClick={() => onTabChange('vault')}
          className={`px-2.5 py-1 rounded ${
            currentTab === 'vault' ? 'text-white font-semibold' : 'text-zinc-500'
          }`}
        >
          Vault
        </button>
      </div>
    </header>
  );
};
