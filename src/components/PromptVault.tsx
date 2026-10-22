import React, { useState } from 'react';
import { GeneratedPrompt, PromptCategory } from '../types';
import { GOLDEN_TEMPLATES } from '../data/defaultTemplates';
import {
  Search,
  Bookmark,
  Sparkles,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Tag,
  Filter,
} from 'lucide-react';

interface PromptVaultProps {
  savedPrompts: GeneratedPrompt[];
  onSelectPrompt: (prompt: GeneratedPrompt) => void;
  onDeleteSavedPrompt?: (id: string) => void;
}

export const PromptVault: React.FC<PromptVaultProps> = ({
  savedPrompts,
  onSelectPrompt,
  onDeleteSavedPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'golden' | 'saved'>('golden');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentList = activeTab === 'golden' ? GOLDEN_TEMPLATES : savedPrompts;

  const filteredList = currentList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rolePersona.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullPrompt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleCopy = (e: React.MouseEvent, prompt: GeneratedPrompt) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl">
        {/* Header & Sub-nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
              <span>Prompt Vault</span>
              <span>·</span>
              <span className="text-zinc-300">Curated &amp; Custom Library</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
              Senior Prompt Repository
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
            <button
              onClick={() => setActiveTab('golden')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'golden'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Golden Blueprints ({GOLDEN_TEMPLATES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>My Saved ({savedPrompts.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts by persona, subject, or keyword..."
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none"
            >
              <option value="all">All Domains</option>
              <option value="image">Image &amp; Diffusion</option>
              <option value="code">Code &amp; Systems</option>
              <option value="writing">Copy &amp; Editorial</option>
              <option value="business">Business &amp; Advisory</option>
              <option value="video">Cinematic Video</option>
            </select>
          </div>
        </div>

        {/* List of Prompts */}
        {filteredList.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl space-y-2">
            <p className="text-sm text-zinc-400">
              {activeTab === 'saved'
                ? 'No saved prompts yet. Engineer a prompt and click "Save" to build your vault.'
                : 'No blueprints matching your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectPrompt(item)}
                className="group p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 sm:max-w-xl">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                    <span className="uppercase text-zinc-300 font-semibold">{item.category}</span>
                    <span>·</span>
                    <span>{item.targetAi || 'Universal AI'}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-zinc-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 font-mono">
                    {item.rolePersona}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleCopy(e, item)}
                    className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
                    title="Quick copy full prompt"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {activeTab === 'saved' && onDeleteSavedPrompt && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSavedPrompt(item.id);
                      }}
                      className="p-1.5 rounded-lg border border-zinc-800 hover:border-red-900/80 text-zinc-500 hover:text-red-400 bg-zinc-950 transition-colors"
                      title="Delete from saved vault"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
