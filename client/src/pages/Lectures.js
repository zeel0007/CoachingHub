import React, { useState, useEffect } from 'react';
import { getLectures } from '../services/api';
import { Video, PlayCircle } from 'lucide-react';

function Lectures() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      const data = await getLectures();
      setLectures(data || []);
      setLoading(false);
    };
    fetchLectures();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Convert standard YT urls to embed format safely
  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch') || url.includes('m.youtube.com/watch')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v');
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        return url;
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) {
      return url;
    }
  };

  return (
    <div className="section-container py-12 page-enter">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Video Lectures</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Watch expert lectures carefully curated according to the latest Gram Sevak exam syllabus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lectures.map((lecture, index) => (
          <div 
            key={lecture.id} 
            className="card overflow-hidden flex flex-col h-full animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Video Player Container */}
            <div className="relative w-full pt-[56.25%] bg-[#0b1120]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getEmbedUrl(lecture.youtubeUrl)}
                title={lecture.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Content Container */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-900/40 text-red-300 border border-red-500/30 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <PlayCircle className="w-3 h-3" /> Video
                </span>
                <span className="text-sm font-medium text-gray-500 bg-[#1e293b] px-2 py-1 rounded border border-[var(--glass-border)]">
                  {lecture.subject}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{lecture.title}</h3>
              <p className="text-gray-400 text-sm mt-auto italic">{lecture.description}</p>
            </div>
          </div>
        ))}
        {lectures.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500">
            <Video className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-xl">No lectures available yet. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lectures;
