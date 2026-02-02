'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, Tag, FileText } from 'lucide-react';
import type { Document } from '@/lib/documents';

interface DocumentViewerProps {
  document: Document | null;
}

const categoryColors: Record<string, string> = {
  journal: 'tag-journal',
  notes: 'tag-notes',
  projects: 'tag-projects',
  ideas: 'tag-ideas',
};

export default function DocumentViewer({ document }: DocumentViewerProps) {
  if (!document) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <FileText className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-zinc-500 mb-2">
            Seleziona un documento
          </h2>
          <p className="text-sm text-zinc-600">
            Scegli un documento dalla sidebar per visualizzarlo
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-12 pt-16 md:pt-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`tag ${categoryColors[document.category] || 'bg-zinc-800 text-zinc-400'}`}>
              {document.category}
            </span>
            {document.tags.map((tag) => (
              <span key={tag} className="tag bg-zinc-800 text-zinc-400">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
            {document.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Creato: {document.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Modificato: {document.modified}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {document.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
