'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Calendar, Clock, Tag, FileText, BookOpen, ArrowLeft } from 'lucide-react';
import TableOfContents from './TableOfContents';
import type { Document } from '@/lib/documents';

interface DocumentViewerProps {
  document: Document | null;
  documents?: Document[];
  onSelect?: (slug: string) => void;
  onBack?: () => void;
}

const categoryColors: Record<string, string> = {
  journal: 'tag-journal',
  notes: 'tag-notes',
  projects: 'tag-projects',
  ideas: 'tag-ideas',
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function findBacklinks(currentSlug: string, allDocs: Document[]): Document[] {
  if (!allDocs.length) return [];
  const currentTitle = allDocs.find(d => d.slug === currentSlug)?.title || '';
  return allDocs.filter(doc =>
    doc.slug !== currentSlug &&
    (doc.content.toLowerCase().includes(currentTitle.toLowerCase()) ||
     doc.tags.some(tag =>
       allDocs.find(d => d.slug === currentSlug)?.tags.includes(tag)
     ))
  ).slice(0, 5);
}

export default function DocumentViewer({ document, documents = [], onSelect, onBack }: DocumentViewerProps) {
  if (!document) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <FileText className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
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

  const readingTime = estimateReadingTime(document.content);
  const backlinks = findBacklinks(document.slug, documents);

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <article className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-12 pt-16 md:pt-12">

        {/* Back button (mobile) */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Indietro</span>
          </button>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`tag ${categoryColors[document.category] || 'bg-zinc-800 text-zinc-400'}`}>
              {document.category}
            </span>
            {document.tags.filter(t => t !== document.category).map((tag) => (
              <span key={tag} className="tag bg-zinc-800/80 text-zinc-500">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
            {document.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{document.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Mod. {document.modified}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{readingTime} min lettura</span>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <TableOfContents content={document.content} />

        {/* Content */}
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
            {document.content}
          </ReactMarkdown>
        </div>

        {/* Backlinks / Related */}
        {backlinks.length > 0 && (
          <div className="mt-12 pt-8 border-t border-zinc-800/50">
            <h3 className="text-sm font-medium text-zinc-500 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Documenti correlati
            </h3>
            <div className="space-y-1">
              {backlinks.map(doc => {
                const cfg = categoryColors[doc.category];
                return (
                  <button
                    key={doc.slug}
                    onClick={() => onSelect?.(doc.slug)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-zinc-800/50 transition-colors group"
                  >
                    <FileText className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors truncate block">
                        {doc.title}
                      </span>
                    </div>
                    <span className={`tag text-xs ${cfg || 'bg-zinc-800 text-zinc-500'}`}>
                      {doc.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
