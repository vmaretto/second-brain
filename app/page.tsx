'use client';

import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DocumentViewer from '@/components/DocumentViewer';
import type { Document } from '@/lib/documents';

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        setLoading(false);
        // Auto-select first document
        if (data.length > 0 && !selectedSlug) {
          setSelectedSlug(data[0].slug);
        }
      })
      .catch((err) => {
        console.error('Error loading documents:', err);
        setLoading(false);
      });
  }, []);

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

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="animate-pulse text-zinc-500">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-lg text-zinc-300"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar - hidden on mobile unless open */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar
          documents={filteredDocuments}
          selectedSlug={selectedSlug}
          onSelect={handleSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Document viewer - full width on mobile */}
      <div className="flex-1 w-full">
        <DocumentViewer document={selectedDocument} />
      </div>
    </div>
  );
}
