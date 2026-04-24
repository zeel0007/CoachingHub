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
  ];

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-500';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={process.env.PUBLIC_URL + '/channels4_profile.jpg'} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-display font-bold text-xl text-primary-800 tracking-tight">
                RK <span className="text-accent-dark">AgriCoaching</span>
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
              <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
                <span className="text-sm font-medium text-gray-700">Hi, {user.name.split(' ')[0]}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-medium text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-500 hover:text-red-800"
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
              className="text-gray-500 hover:text-primary-600 focus:outline-none"
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
        <div className="md:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-slide-up">
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
          <div className="border-t border-gray-200 mt-4 pt-4 pb-2">
            {user ? (
              <div className="px-3 flex justify-between items-center">
                <span className="text-base font-medium text-gray-800">{user.name}</span>
                <div className="flex gap-4">
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-gray-500 font-medium">
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
