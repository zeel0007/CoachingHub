import React, { useEffect, useState } from 'react';
import { getJobs, createJob, deleteJob, updateJob } from '../../services/api';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const JobsTab = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', title: '', department: '', status: 'Active', description: '' });
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
      setForm({ id: '', title: '', department: '', status: 'Active', description: '' });
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
      <div className="lg:col-span-1 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
          {isEditing ? 'Edit Job' : 'Broadcast New Job'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input required type="text" value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border p-2 rounded">
              <option value="Active">Active</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border p-2 rounded" rows="3"></textarea>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update Job' : 'Publish'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', title: '', department: '', status: 'Active', description: '' }); }} className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-white rounded-lg border overflow-hidden">
        {loading ? <div className="p-8 text-center">Loading jobs...</div> : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{job.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(job)} className="text-blue-600 hover:text-blue-800 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 className="w-4 h-4" /></button>
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
