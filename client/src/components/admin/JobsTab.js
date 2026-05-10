import React, { useEffect, useState } from 'react';
import { getJobs, createJob, deleteJob, updateJob } from '../../services/api';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const JobsTab = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', title: '', department: '', status: 'Active', description: '', applyLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateJob(form.id, form);
      } else {
        await createJob({ ...form, id: Date.now().toString() });
      }
      setForm({ id: '', title: '', department: '', status: 'Active', description: '', applyLink: '' });
      setIsEditing(false);
      fetchJobs();
    } catch (err) {
      alert('Error saving job');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you certain you want to delete this job?')) {
      try {
        await deleteJob(id);
        fetchJobs();
      } catch (err) {
        alert('Error deleting job');
      }
    }
  };

  const handleEdit = (job) => {
    setForm(job);
    setIsEditing(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1 bg-[#1e293b]/50 p-6 rounded-lg border border-[var(--glass-border)]">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-primary-400" />}
          {isEditing ? 'Edit Job' : 'Broadcast New Job'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Department</label>
            <input required type="text" value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none">
              <option value="Active">Active</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Apply Link (URL)</label>
            <input required type="url" value={form.applyLink || ''} onChange={e => setForm({...form, applyLink: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" rows="3"></textarea>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update Job' : 'Publish'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', title: '', department: '', status: 'Active', description: '', applyLink: '' }); }} className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-[#1e293b]/50 rounded-lg border border-[var(--glass-border)] overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-400">Loading jobs...</div> : (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#0f172a] border-b border-[var(--glass-border)] text-gray-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-[var(--glass-border)] hover:bg-[#334155]/50">
                  <td className="px-4 py-3 font-medium text-white">{job.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full border ${job.status === 'Active' ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-gray-800 text-gray-400 border-gray-600'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(job)} className="text-blue-400 hover:text-blue-300 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(job.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && <tr><td colSpan="3" className="text-center py-6 text-gray-500">No jobs exist.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobsTab;
