// ============================================================
// src/context/AuthContext.js — Global Authentication State
// ============================================================
// Provides user login state to the entire app using React Context API.
// No JWT or sessions — stores user info in localStorage for persistence.

import React, { createContext, useContext, useState } from 'react';

// Create context object
const AuthContext = createContext(null);

// ─── AuthProvider ─────────────────────────────────────────
// Wrap your entire app with this to provide auth state everywhere
export function AuthProvider({ children }) {
  // Initialize state from localStorage so login persists on page refresh
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gsPrep_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Login — stores user data in state + localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('gsPrep_user', JSON.stringify(userData));
  };

  // Logout — clears state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('gsPrep_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access to auth state
// Usage: const { user, login, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
