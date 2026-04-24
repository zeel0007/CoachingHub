// ============================================================
// src/App.js — Main App Component with Routing
// ============================================================
// Sets up React Router v6 routes for all pages.
// Wraps everything in AuthProvider for global auth state.

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// ── Layout Components ───────────────────────────────────
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ── Pages ───────────────────────────────────────────────
import Home from './pages/Home';
import Notes from './pages/Notes';
import Quiz from './pages/Quiz';
import PYQs from './pages/PYQs';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    // Provide auth state to all components
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Navigation Bar — shown on all pages */}
          <Navbar />

          {/* Main content area — grows to fill available space */}
          <main className="flex-grow">
            <Routes>
              {/* Define a route for each page */}
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/pyqs" element={<PYQs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Footer — shown on all pages */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
