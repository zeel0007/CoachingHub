import React, { useEffect, useState } from 'react';
import { getNotes, createNote, deleteNote, updateNote } from '../../services/api';
import { Plus, Trash2, Edit2, FileText } from 'lucide-react';

const NotesTab = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', title: '', subject: '', driveUrl: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotes();
      setNotes(data || []);
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
        await updateNote(form.id, payload);
      } else {
        await createNote(payload);
      }
      setForm({ id: '', title: '', subject: '', driveUrl: '', description: '' });
      setIsEditing(false);
      fetchNotes();
    } catch (err) {
      alert('Error saving Note');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you certain you want to delete this Note?')) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (err) {
        alert('Error deleting Note');
      }
    }
  };

  const handleEdit = (note) => {
    setForm(note);
    setIsEditing(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1 bg-[#1e293b]/50 p-6 rounded-lg border border-[var(--glass-border)]">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-primary-400" />}
          {isEditing ? 'Edit Note' : 'Upload PDF Note'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Note Title</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="e.g. Agriculture Basics PDF" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Subject</label>
            <input required type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="e.g. Agriculture" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Google Drive PDF URL</label>
            <input required type="url" value={form.driveUrl} onChange={e => setForm({...form, driveUrl: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="https://drive.google.com/file/d/..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" rows="3"></textarea>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update Note' : 'Publish Note'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', title: '', subject: '', driveUrl: '', description: '' }); }} className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-[#1e293b]/50 rounded-lg border border-[var(--glass-border)] overflow-x-auto">
        {loading ? <div className="p-8 text-center text-gray-400">Loading Notes...</div> : (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#0f172a] border-b border-[var(--glass-border)] text-gray-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(n => (
                <tr key={n.id} className="border-b border-[var(--glass-border)] hover:bg-[#334155]/50">
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    {n.title}
                  </td>
                  <td className="px-4 py-3">{n.subject}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(n)} className="text-blue-400 hover:text-blue-300 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(n.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {notes.length === 0 && <tr><td colSpan="3" className="text-center py-6 text-gray-500">No notes exist.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default NotesTab;
