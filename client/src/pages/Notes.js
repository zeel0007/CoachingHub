import React, { useState, useEffect } from 'react';
import { getNotes } from '../services/api';
import { Sprout, Landmark, Pencil, Type } from 'lucide-react';

function Notes() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategoryIcon = (id, className) => {
    switch (id) {
      case 'agriculture': return <Sprout className={className} />;
      case 'gk-gujarat': return <Landmark className={className} />;
      case 'gujarati': return <Pencil className={className} />;
      case 'english': return <Type className={className} />;
      default: return <Sprout className={className} />;
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setCategories(data);
      if (data && data.length > 0) {
        setActiveCategory(data[0].id);
      }
      setLoading(false);
    };
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentCategoryData = categories.find(c => c.id === activeCategory);

  return (
    <div className="section-container py-12 page-enter">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Study Notes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive, topic-wise study material carefully curated according to the latest Gram Sevak exam syllabus.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 px-3">Subject Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                    activeCategory === category.id
                      ? 'bg-primary-50 text-primary-700 font-semibold border-l-4 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                  }`}
                >
                  <span className="shrink-0">{getCategoryIcon(category.id, 'w-5 h-5')}</span>
                  {category.category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4">
          {currentCategoryData && (
            <div className="space-y-6">
              <div 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 border-t-4"
                style={{ borderTopColor: currentCategoryData.color }}
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="p-2 border border-gray-100 rounded-lg bg-gray-50 text-primary-600">{getCategoryIcon(currentCategoryData.id, 'w-8 h-8')}</span>
                  {currentCategoryData.category}
                </h2>
              </div>

              {currentCategoryData.topics.map((topic, index) => (
                <div 
                  key={topic.id} 
                  className="card p-6 md:p-8 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-800 text-sm py-1 px-3 rounded-full shrink-0 mt-1">
                      Topic {index + 1}
                    </span>
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                    {topic.content}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Key Points to Remember:</h4>
                    <ul className="space-y-3">
                      {topic.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="text-primary-500 mt-1 flex-shrink-0">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notes;
