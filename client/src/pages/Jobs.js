import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/api';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    return status.toLowerCase() === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

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
        <h1 className="section-title mb-4">Latest Govt Job Updates</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest recruitment notifications from GPSSB, GPSC, and other Gujarat government departments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <div 
            key={job.id} 
            className="card bg-white overflow-hidden flex flex-col h-full animate-slide-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Top decorative bar */}
            <div className={`h-2 w-full ${job.status.toLowerCase() === 'active' ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {job.category}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${getStatusColor(job.status)}`}>
                  {job.status.toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{job.title}</h3>
              <p className="text-primary-700 font-medium text-sm mb-4">{job.department}</p>
              
              <div className="space-y-2 mt-auto mb-6 bg-gray-50 p-4 rounded-xl text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Posts:</span>
                  <span className="font-semibold text-gray-900">{job.posts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Date:</span>
                  <span className={`font-semibold ${job.status.toLowerCase() === 'active' ? 'text-red-600' : 'text-gray-900'}`}>
                    {new Date(job.lastDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
                <div className="flex flex-col mt-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-500 mb-1">Eligibility:</span>
                  <span className="font-medium text-gray-900">{job.eligibility}</span>
                </div>
              </div>

              <a 
                href={job.applyLink}
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-xl font-semibold text-center transition-all ${
                  job.status.toLowerCase() === 'active' 
                    ? 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white border border-primary-200 hover:border-transparent' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if(job.status.toLowerCase() !== 'active') {
                    e.preventDefault();
                  }
                }}
              >
                {job.status.toLowerCase() === 'active' ? 'Apply Now' : 'Application Closed'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
