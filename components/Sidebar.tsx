'use client';

import { useState } from 'react';
import { Brain, Search, FileText, Calendar, Lightbulb, FolderKanban, ChevronDown, ChevronRight } from 'lucide-react';
import type { Document } from '@/lib/documents';

interface SidebarProps {
  documents: Document[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  journal: <Calendar className="w-4 h-4" />,
  notes: <FileText className="w-4 h-4" />,
  projects: <FolderKanban className="w-4 h-4" />,
  ideas: <Lightbulb className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  journal: 'text-blue-400',
  notes: 'text-green-400',
  projects: 'text-violet-400',
  ideas: 'text-amber-400',
};

export default function Sidebar({
  documents,
  selectedSlug,
  onSelect,
  searchQuery,
  onSearchChange,
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

  // Group documents by category
  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  const categories = Object.keys(groupedDocs).sort();

  return (
    <aside className="w-72 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-violet-400" />
          <h1 className="text-lg font-semibold text-zinc-100">Second Brain</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Cerca documenti..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
          />
        </div>
      </div>

      {/* Document list */}
      <nav className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => (
          <div key={category} className="mb-2">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors"
            >
              {expandedCategories.has(category) ? (
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              )}
              <span className={categoryColors[category] || 'text-zinc-400'}>
                {categoryIcons[category] || <FileText className="w-4 h-4" />}
              </span>
              <span className="text-sm font-medium text-zinc-300 capitalize">
                {category}
              </span>
              <span className="ml-auto text-xs text-zinc-600">
                {groupedDocs[category].length}
              </span>
            </button>

            {/* Documents in category */}
            {expandedCategories.has(category) && (
              <div className="ml-4 mt-1 space-y-0.5">
                {groupedDocs[category].map((doc) => (
                  <button
                    key={doc.slug}
                    onClick={() => onSelect(doc.slug)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-left transition-colors ${
                      selectedSlug === doc.slug
                        ? 'bg-violet-500/20 text-violet-300'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-sm truncate">{doc.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center text-zinc-500 text-sm py-8">
            Nessun documento trovato
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <div className="text-xs text-zinc-600">
          {documents.length} documenti
        </div>
      </div>
    </aside>
  );
}
