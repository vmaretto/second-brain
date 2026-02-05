'use client';

import { Brain, FileText, Calendar, FolderKanban, Lightbulb, ArrowRight, Tag, Clock, TrendingUp } from 'lucide-react';
import type { Document } from '@/lib/documents';

interface DashboardProps {
  documents: Document[];
  onSelect: (slug: string) => void;
}

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  journal: { icon: <Calendar className="w-5 h-5" />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', label: 'Journal' },
  notes: { icon: <FileText className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Note' },
  projects: { icon: <FolderKanban className="w-5 h-5" />, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', label: 'Progetti' },
  ideas: { icon: <Lightbulb className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Idee' },
};

export default function Dashboard({ documents, onSelect }: DashboardProps) {
  // Stats
  const categories = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Recent docs (top 6)
  const recentDocs = [...documents]
    .sort((a, b) => b.modified.localeCompare(a.modified))
    .slice(0, 6);

  // All tags with counts
  const tagCounts = documents.reduce((acc, doc) => {
    doc.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  // Projects (category === 'projects')
  const projectDocs = documents.filter(d => d.category === 'projects');

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16 pt-16 md:pt-16">

        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Brain className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Second Brain</h1>
              <p className="text-sm text-zinc-500">Il knowledge hub di Virgilio</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <StatCard
            label="Documenti"
            count={documents.length}
            icon={<FileText className="w-5 h-5" />}
            color="text-zinc-300"
            bg="bg-zinc-800/50 border-zinc-700/50"
          />
          {Object.entries(categoryConfig).map(([key, cfg]) => (
            categories[key] ? (
              <StatCard
                key={key}
                label={cfg.label}
                count={categories[key]}
                icon={cfg.icon}
                color={cfg.color}
                bg={cfg.bg}
              />
            ) : null
          ))}
        </div>

        {/* Two columns: Recent Activity + Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          {/* Recent Activity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-zinc-500" />
              <h2 className="text-lg font-semibold text-zinc-200">Attività Recente</h2>
            </div>
            <div className="space-y-1">
              {recentDocs.map((doc) => {
                const cfg = categoryConfig[doc.category];
                return (
                  <button
                    key={doc.slug}
                    onClick={() => onSelect(doc.slug)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/70 transition-all group text-left"
                  >
                    <div className={`flex-shrink-0 ${cfg?.color || 'text-zinc-500'}`}>
                      {cfg?.icon || <FileText className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-zinc-300 truncate group-hover:text-zinc-100 transition-colors">
                        {doc.title}
                      </div>
                      <div className="text-xs text-zinc-600">{doc.modified}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Projects */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-zinc-500" />
              <h2 className="text-lg font-semibold text-zinc-200">Progetti Attivi</h2>
            </div>
            <div className="space-y-2">
              {projectDocs.map((doc) => (
                <button
                  key={doc.slug}
                  onClick={() => onSelect(doc.slug)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/30 hover:bg-zinc-800/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-zinc-200 group-hover:text-violet-300 transition-colors">
                      {doc.title}
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-violet-400 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    {doc.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
              {projectDocs.length === 0 && (
                <div className="text-sm text-zinc-600 py-4 text-center">Nessun progetto</div>
              )}
            </div>
          </div>
        </div>

        {/* Tags Cloud */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-200">Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortedTags.map(([tag, count]) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-300 transition-colors cursor-default"
              >
                <span>{tag}</span>
                <span className="text-zinc-600">{count}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-xs text-zinc-700">
            🧠 Costruito da Chat — aggiornato automaticamente ogni notte
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, count, icon, color, bg }: {
  label: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-xl border p-4 ${bg} transition-all hover:scale-[1.02]`}>
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-2xl font-bold text-zinc-100">{count}</div>
      <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
    </div>
  );
}
