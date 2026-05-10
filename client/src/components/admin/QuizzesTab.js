import React, { useEffect, useState } from 'react';
import { getQuizList, getQuiz, createQuiz, deleteQuiz, updateQuiz } from '../../services/api';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const QuizzesTab = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', category: '', questionsJson: '[]' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getQuizList();
      setQuizzes(data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let questions = [];
      try {
        questions = JSON.parse(form.questionsJson);
      } catch (e) {
        alert("Invalid JSON format for questions.");
        return;
      }
      
      const payload = {
        id: form.id || Date.now().toString(),
        category: form.category,
        totalQuestions: questions.length,
        questions: questions
      };

      if (isEditing) {
        await updateQuiz(form.id, payload);
      } else {
        await createQuiz(payload);
      }
      setForm({ id: '', category: '', questionsJson: '[]' });
      setIsEditing(false);
      fetchQuizzes();
    } catch (err) {
      alert('Error saving quiz');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you certain you want to delete this quiz?')) {
      try {
        await deleteQuiz(id);
        fetchQuizzes();
      } catch (err) {
        alert('Error deleting quiz');
      }
    }
  };

  const handleEdit = async (quizSummary) => {
    try {
      const fullQuiz = await getQuiz(quizSummary.id);
      setForm({
        id: fullQuiz.id,
        category: fullQuiz.category,
        questionsJson: JSON.stringify(fullQuiz.questions, null, 2)
      });
      setIsEditing(true);
    } catch {
      alert("Failed to load full quiz details");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1 bg-[#1e293b]/50 p-6 rounded-lg border border-[var(--glass-border)]">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-primary-400" />}
          {isEditing ? 'Edit Quiz' : 'Create Mock Test'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Category Title</label>
            <input required type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded focus:border-primary-500 focus:outline-none" placeholder="e.g. History Test 1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Questions Array (JSON Format)</label>
            <textarea required value={form.questionsJson} onChange={e => setForm({...form, questionsJson: e.target.value})} className="w-full bg-[#0f172a] border border-[var(--glass-border)] text-white p-2 rounded font-mono text-xs focus:border-primary-500 focus:outline-none" rows="8" placeholder='[{"question":"...","options":["..."],"answer":0,"explanation":"..."}]'></textarea>
            <p className="text-xs text-gray-400 mt-1">Due to the complexity of nested options, questions must be provided as a strict JSON array.</p>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded hover:bg-primary-700">
              {isEditing ? 'Update Quiz' : 'Upload Test'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', category: '', questionsJson: '[]' }); }} className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2 bg-[#1e293b]/50 rounded-lg border border-[var(--glass-border)] overflow-x-auto">
        {loading ? <div className="p-8 text-center text-gray-400">Loading quizzes...</div> : (
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#0f172a] border-b border-[var(--glass-border)] text-gray-400">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Total Qs</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map(q => (
                <tr key={q.id} className="border-b border-[var(--glass-border)] hover:bg-[#334155]/50">
                  <td className="px-4 py-3 font-medium text-white">{q.category}</td>
                  <td className="px-4 py-3">{q.totalQuestions}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => handleEdit(q)} className="text-blue-400 hover:text-blue-300 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(q.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {quizzes.length === 0 && <tr><td colSpan="3" className="text-center py-6 text-gray-500">No quizzes exist.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QuizzesTab;
