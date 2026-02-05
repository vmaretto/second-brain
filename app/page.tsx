'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DocumentViewer from '@/components/DocumentViewer';
import Dashboard from '@/components/Dashboard';
import type { Document } from '@/lib/documents';

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading documents:', err);
        setLoading(false);
      });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // / to focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('input[placeholder*="Cerca"]') as HTMLInputElement;
        if (searchInput && document.activeElement !== searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }
      // Escape to clear search or go home
      if (e.key === 'Escape') {
        if (searchQuery) {
          setSearchQuery('');
        } else if (selectedSlug) {
          setSelectedSlug(null);
        }
        (document.activeElement as HTMLElement)?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, selectedSlug]);

  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    
    const query = searchQuery.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        doc.category.toLowerCase().includes(query)
    );
  }, [documents, searchQuery]);

  const selectedDocument = useMemo(() => {
    return documents.find((doc) => doc.slug === selectedSlug) || null;
  }, [documents, selectedSlug]);

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setSidebarOpen(false);
  }, []);

  const handleHome = useCallback(() => {
    setSelectedSlug(null);
    setSidebarOpen(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center animate-pulse">
            <span className="text-xl">🧠</span>
          </div>
          <div className="text-sm text-zinc-600">Caricamento...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-800/90 backdrop-blur-sm rounded-lg text-zinc-300 border border-zinc-700/50 shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar
          documents={filteredDocuments}
          selectedSlug={selectedSlug}
          onSelect={handleSelect}
          onHome={handleHome}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTag={activeTag}
          onTagFilter={setActiveTag}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 w-full">
        {selectedDocument ? (
          <DocumentViewer
            document={selectedDocument}
            documents={documents}
            onSelect={handleSelect}
            onBack={handleHome}
          />
        ) : (
          <Dashboard
            documents={documents}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}
