'use client';

import { useState, useMemo } from 'react';
import { Brain, Search, FileText, Calendar, Lightbulb, FolderKanban, ChevronDown, ChevronRight, Home, X } from 'lucide-react';
import type { Document } from '@/lib/documents';

interface SidebarProps {
  documents: Document[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  onHome: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTag: string | null;
  onTagFilter: (tag: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  journal: <Calendar className="w-4 h-4" />,
  notes: <FileText className="w-4 h-4" />,
  projects: <FolderKanban className="w-4 h-4" />,
  ideas: <Lightbulb className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  journal: 'text-blue-400',
  notes: 'text-emerald-400',
  projects: 'text-violet-400',
  ideas: 'text-amber-400',
};

export default function Sidebar({
  documents,
  selectedSlug,
  onSelect,
  onHome,
  searchQuery,
  onSearchChange,
  activeTag,
  onTagFilter,
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['journal', 'notes', 'projects', 'ideas'])
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Top tags for filter
  const topTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    documents.forEach(doc => {
      doc.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [documents]);

  // Filtered documents
  const filteredDocs = useMemo(() => {
    let docs = documents;
    if (activeTag) {
      docs = docs.filter(d => d.tags.includes(activeTag));
    }
    return docs;
  }, [documents, activeTag]);

  // Group documents by category
  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  const categoryOrder = ['journal', 'projects', 'notes', 'ideas'];
  const categories = categoryOrder.filter(c => groupedDocs[c]);

  return (
    <aside className="w-72 h-screen bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-800/80 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80">
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 mb-4 group w-full"
        >
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
            <Brain className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-left">
            <h1 className="text-base font-semibold text-zinc-100 leading-tight">Second Brain</h1>
            <p className="text-[10px] text-zinc-600">v2 · {documents.length} documenti</p>
          </div>
        </button>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Cerca… (/ per focus)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-zinc-800/70 border border-zinc-700/50 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all"
          />
        </div>

        {/* Tag filter pills */}
        <div className="flex flex-wrap gap-1 mt-3">
          {topTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagFilter(activeTag === tag ? null : tag)}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                activeTag === tag
                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                  : 'bg-zinc-800/50 border-zinc-700/30 text-zinc-500 hover:text-zinc-400 hover:border-zinc-600'
              }`}
            >
              {tag}
            </button>
          ))}
          {activeTag && (
            <button
              onClick={() => onTagFilter(null)}
              className="text-[10px] px-1.5 py-0.5 rounded-full text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 py-2">
        <button
          onClick={onHome}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
            !selectedSlug
              ? 'bg-zinc-800/70 text-zinc-200'
              : 'text-zinc-500 hover:bg-zinc-800/40 hover:text-zinc-300'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
      </div>

      {/* Document list */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        {categories.map((category) => (
          <div key={category} className="mb-1">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800/40 transition-colors"
            >
              {expandedCategories.has(category) ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              )}
              <span className={categoryColors[category] || 'text-zinc-400'}>
                {categoryIcons[category] || <FileText className="w-4 h-4" />}
              </span>
              <span className="text-sm font-medium text-zinc-400 capitalize">
                {category}
              </span>
              <span className="ml-auto text-[10px] text-zinc-700 tabular-nums">
                {groupedDocs[category].length}
              </span>
            </button>

            {/* Documents in category */}
            {expandedCategories.has(category) && (
              <div className="ml-3 mt-0.5 space-y-px border-l border-zinc-800/50 pl-2">
                {groupedDocs[category].map((doc) => (
                  <button
                    key={doc.slug}
                    onClick={() => onSelect(doc.slug)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-all ${
                      selectedSlug === doc.slug
                        ? 'bg-violet-500/15 text-violet-300 border-l-2 border-violet-400 -ml-[1px]'
                        : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300'
                    }`}
                  >
                    <span className="text-[13px] truncate">{doc.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center text-zinc-600 text-sm py-8">
            Nessun documento trovato
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-800/50">
        <div className="text-[10px] text-zinc-700 flex items-center justify-between">
          <span>🧠 by Chat</span>
          <span>{filteredDocs.length} doc{filteredDocs.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </aside>
  );
}
