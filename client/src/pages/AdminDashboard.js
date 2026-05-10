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
import LecturesTab from '../components/admin/LecturesTab';
import { Video } from 'lucide-react';

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
    { id: 'pyqs', label: 'Manage PYQs', icon: PenTool },
    { id: 'lectures', label: 'Manage Lectures', icon: Video }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 shrink-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">RK Admin Center</h1>
              <p className="text-gray-400">Secure Content Management System</p>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 no-scrollbar">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-primary-400' : 'bg-[#1e293b]/50 text-gray-400 border border-[var(--glass-border)] hover:bg-[#334155]'}`}>
                <tab.icon className="w-5 h-5" /> 
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Rendering */}
        <div className="card p-6 lg:p-8 flex-grow overflow-hidden">
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'jobs' && <JobsTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'notes' && <NotesTab />}
          {activeTab === 'pyqs' && <PYQsTab />}
          {activeTab === 'lectures' && <LecturesTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
