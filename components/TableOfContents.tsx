'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(markdown: string): TOCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  if (headings.length < 3) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <List className="w-4 h-4" />
        <span>Indice ({headings.length} sezioni)</span>
        <span className="text-xs">{isOpen ? '▾' : '▸'}</span>
      </button>

      {isOpen && (
        <nav className="mt-3 pl-2 border-l-2 border-zinc-800 space-y-1">
          {headings.map((heading, i) => (
            <a
              key={i}
              href={`#${heading.id}`}
              className={`block text-sm hover:text-violet-400 transition-colors ${
                heading.level === 2
                  ? 'text-zinc-400 font-medium'
                  : heading.level === 3
                  ? 'text-zinc-500 pl-3'
                  : 'text-zinc-600 pl-6'
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
