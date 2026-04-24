import React, { useEffect, useState } from 'react';
import { getNotes, getNoteCategory, createNote, deleteNote, updateNote } from '../../services/api';
import { FileText, Plus, Trash2, Edit2 } from 'lucide-react';

const NotesTab = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', category: '', subject: '', topicsJson: '[]' });
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
      let topics = [];
      try {
        topics = JSON.parse(form.topicsJson);
      } catch (e) {
        alert("Invalid JSON format for topics.");
        return;
      }
      
      const payload = {
        id: form.id || Date.now().toString(),
        category: form.category,
        subject: form.subject,
        topics: topics,
        color: 'bg-green-50 text-green-600',
        icon: 'Leaf'
      };

      if (isEditing) {
        await updateNote(form.id, payload);
      } else {
        await createNote(payload);
      }
      setForm({ id: '', category: '', subject: '', topicsJson: '[]' });
      setIsEditing(false);
      fetchNotes();
    } catch (err) {
      alert('Error saving Note');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you certain you want to delete this Note Catalog?')) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (err) {
        alert('Error deleting Note');
      }
    }
  };

  const handleEdit = async (noteSummary) => {
    try {
      const fullNote = await getNoteCategory(noteSummary.id);
      setForm({
        id: fullNote.id,
        category: fullNote.category,
        subject: fullNote.subject || '',
        topicsJson: JSON.stringify(fullNote.topics, null, 2)
      });
      setIsEditing(true);
    } catch {
      alert("Failed to load full note details");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1 bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-green-600" />}
          {isEditing ? 'Edit Category' : 'Create Category'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category Title</label>
            <input required type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border p-2 rounded" placeholder="e.g. Agriculture Notes" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject Subtitle</label>
            <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full border p-2 rounded" placeholder="e.g. Agronomy Basics" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Topics Array (JSON Format)</label>
            <textarea required value={form.topicsJson} onChange={e => setForm({...form, topicsJson: e.target.value})} className="w-full border p-2 rounded font-mono text-xs" rows="8" placeholder='[{"id":"t1","title":"...","content":"...","keyPoints":["..."]}]'></textarea>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update Notes' : 'Upload Notes'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', category: '', subject: '', topicsJson: '[]' }); }} className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-white rounded-lg border overflow-hidden">
        {loading ? <div className="p-8 text-center">Loading Content...</div> : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(n => (
                <tr key={n.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{n.category}</td>
                  <td className="px-4 py-3">{n.subject}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(n)} className="text-blue-600 hover:text-blue-800 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 className="w-4 h-4" /></button>
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
