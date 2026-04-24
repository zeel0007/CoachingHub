import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Shield, Briefcase, FileText, Users, PenTool, BookOpen } from 'lucide-react';

// Import newly created tab components
import UsersTab from '../components/admin/UsersTab';
import JobsTab from '../components/admin/JobsTab';
import QuizzesTab from '../components/admin/QuizzesTab';
import NotesTab from '../components/admin/NotesTab';
import PYQsTab from '../components/admin/PYQsTab';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Security Gate
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const tabs = [
    { id: 'users', label: 'Users Base', icon: Users },
    { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
    { id: 'quizzes', label: 'Manage Quizzes', icon: BookOpen },
    { id: 'notes', label: 'Manage Notes', icon: FileText },
    { id: 'pyqs', label: 'Manage PYQs', icon: PenTool }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RK Admin Center</h1>
            <p className="text-gray-500">Secure Content Management System</p>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>
              <tab.icon className="w-5 h-5" /> 
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Rendering */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 lg:p-8">
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'jobs' && <JobsTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'notes' && <NotesTab />}
          {activeTab === 'pyqs' && <PYQsTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
