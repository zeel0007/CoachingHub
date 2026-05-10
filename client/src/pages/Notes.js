import React, { useState, useEffect } from 'react';
import { getNotes } from '../services/api';
import { FileText, Download, ExternalLink } from 'lucide-react';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="section-container py-12 page-enter">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">PDF Study Materials</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Download and read highly curated PDF notes tailored for the Gram Sevak examination.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note, index) => (
          <div 
            key={note.id} 
            className="card p-6 flex flex-col h-full animate-slide-up hover:border-primary-500/50 transition-colors group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold bg-[#1e293b] text-gray-400 px-3 py-1 rounded-full border border-[var(--glass-border)]">
                {note.subject}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{note.title}</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">{note.description}</p>
            
            <a 
              href={note.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-primary-600/20 text-primary-300 hover:bg-primary-600 hover:text-white border border-primary-500/30 hover:border-transparent transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Open PDF
            </a>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-xl">No PDF notes available yet. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
