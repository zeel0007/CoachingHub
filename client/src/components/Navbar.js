import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Notes', path: '/notes' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'PYQs', path: '/pyqs' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Lectures', path: '/lectures' },
  ];

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-400 font-semibold' : 'text-gray-300 hover:text-primary-400';
  };

  return (
    <nav className="bg-[#0f172a]/80 backdrop-blur-lg shadow-sm border-b border-[var(--glass-border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={process.env.PUBLIC_URL + '/channels4_profile.jpg'} alt="Logo" className="w-8 h-8 rounded-full object-cover border border-primary-500/30" />
              <span className="font-display font-bold text-xl text-white tracking-tight">
                RK <span className="text-accent">AgriCoaching</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-200 ${isActive(link.path)}`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 border-l pl-6 border-white/10">
                <span className="text-sm font-medium text-gray-200">Hi, {user.name.split(' ')[0]}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-white bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-md hover:bg-red-500/40">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-400 hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-4 shadow-sm text-sm">
                Login / Signup
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary-400 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-[var(--glass-border)] px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-slide-up">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base ${isActive(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-[var(--glass-border)] mt-4 pt-4 pb-2">
            {user ? (
              <div className="px-3 flex justify-between items-center">
                <span className="text-base font-medium text-gray-200">{user.name}</span>
                <div className="flex gap-4">
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-red-400 font-medium bg-red-500/10 border border-red-500/20 px-2 py-1 rounded">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-gray-400 hover:text-white font-medium">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center btn-primary w-full py-2 shadow-none"
              >
                Login to Account
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
