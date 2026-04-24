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
      <div className="lg:col-span-1 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
          {isEditing ? 'Edit Paper' : 'Upload Previous Paper'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Paper Title</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border p-2 rounded" placeholder="e.g. Gram Sevak 2018" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input type="text" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full border p-2 rounded" placeholder="2018" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full border p-2 rounded" placeholder="Agriculture" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Total Questions</label>
            <input type="number" value={form.totalQuestions} onChange={e => setForm({...form, totalQuestions: e.target.value})} className="w-full border p-2 rounded" placeholder="100" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Secure Download Link (External URL)</label>
            <input type="text" value={form.downloadLink} onChange={e => setForm({...form, downloadLink: e.target.value})} className="w-full border p-2 rounded" placeholder="https://" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update PYQ' : 'Publish PYQ'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', title: '', year: '', subject: '', totalQuestions: '', downloadLink: '' }); }} className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-white rounded-lg border overflow-hidden">
        {loading ? <div className="p-8 text-center">Loading Papers...</div> : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pyqs.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.year}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 className="w-4 h-4" /></button>
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
