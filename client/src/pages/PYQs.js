import React, { useState, useEffect } from 'react';
import { getPYQs } from '../services/api';
import { FileText, Timer, Download } from 'lucide-react';

function PYQs() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState('All');

  useEffect(() => {
    const fetchPapers = async () => {
      const data = await getPYQs();
      setPapers(data);
      setLoading(false);
    };
    fetchPapers();
  }, []);

  const years = ['All', ...new Set(papers.map(p => p.year))].sort((a, b) => b - a);

  const filteredPapers = filterYear === 'All' 
    ? papers 
    : papers.filter(p => p.year === parseInt(filterYear));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="section-container py-12 page-enter">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Previous Year Papers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Download original GPSSB question papers for better understanding of exam pattern, difficulty level, and important topics.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        <span className="text-gray-600 font-medium">Filter by Year:</span>
        <div className="flex gap-2">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setFilterYear(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterYear === year 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* PYQ List */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {filteredPapers.map((paper, idx) => (
          <div 
            key={paper.id} 
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-slide-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">
                  {paper.year}
                </span>
                <span className="text-sm font-medium text-gray-500">{paper.conducted_by}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{paper.title}</h3>
              <p className="text-gray-600 text-sm mb-3">Sections: {paper.subject}</p>
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> {paper.totalQuestions} MCQ</span>
                <span className="flex items-center gap-1"><Timer className="w-3 h-3"/> {paper.duration}</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3"/> {paper.fileSize}</span>
              </div>
              <p className="text-gray-600 text-xs mt-3 italic">{paper.description}</p>
            </div>
            
            <a 
              href={paper.fileUrl} 
              onClick={(e) => {
                e.preventDefault();
                alert('This is a mock download link. In real application, it would trigger a PDF download.');
              }}
              className="btn-outline shrink-0 w-full sm:w-auto justify-center"
            >
               <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PYQs;
