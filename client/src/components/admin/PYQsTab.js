import React, { useEffect, useState } from 'react';
import { getPYQs, createPYQ, deletePYQ, updatePYQ } from '../../services/api';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const PYQsTab = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', title: '', year: '', subject: '', totalQuestions: '', downloadLink: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPYQs();
  }, []);

  const fetchPYQs = async () => {
    setLoading(true);
    try {
      const data = await getPYQs();
      setPyqs(data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, id: form.id || Date.now().toString() };
      if (isEditing) {
        await updatePYQ(form.id, payload);
      } else {
        await createPYQ(payload);
      }
      setForm({ id: '', title: '', year: '', subject: '', totalQuestions: '', downloadLink: '' });
      setIsEditing(false);
      fetchPYQs();
    } catch (err) {
      alert('Error saving PYQ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you certain you want to delete this Paper?')) {
      try {
        await deletePYQ(id);
        fetchPYQs();
      } catch (err) {
        alert('Error deleting PYQ');
      }
    }
  };

  const handleEdit = (pyq) => {
    setForm(pyq);
    setIsEditing(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1 bg-[#1e293b]/50 p-6 rounded-lg border border-[var(--glass-border)]">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-primary-400" />}
          {isEditing ? 'Edit Paper' : 'Upload Previous Paper'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Paper Title</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="e.g. Gram Sevak 2018" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Year</label>
              <input type="text" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="2018" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="Agriculture" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Total Questions</label>
            <input type="number" value={form.totalQuestions} onChange={e => setForm({...form, totalQuestions: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="100" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Secure Download Link (External URL)</label>
            <input type="text" value={form.downloadLink} onChange={e => setForm({...form, downloadLink: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="https://" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update PYQ' : 'Publish PYQ'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', title: '', year: '', subject: '', totalQuestions: '', downloadLink: '' }); }} className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-[#1e293b]/50 rounded-lg border border-[var(--glass-border)] overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-400">Loading Papers...</div> : (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#0f172a] border-b border-[var(--glass-border)] text-gray-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pyqs.map(p => (
                <tr key={p.id} className="border-b border-[var(--glass-border)] hover:bg-[#334155]/50">
                  <td className="px-4 py-3 font-medium text-white">{p.title}</td>
                  <td className="px-4 py-3">{p.year}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-400 hover:text-blue-300 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {pyqs.length === 0 && <tr><td colSpan="3" className="text-center py-6 text-gray-500">No previous papers exist.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PYQsTab;
