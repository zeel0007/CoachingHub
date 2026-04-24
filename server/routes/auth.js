// ============================================================
// server/routes/auth.js — Simple Login/Signup Routes
// ============================================================
// Simple authentication using localStorage-style approach
// No JWT/session — just basic user management for beginners
// NOTE: For production, always hash passwords and use JWT tokens

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
// In-memory fallback (when MongoDB is not available)
let inMemoryUsers = [];

// POST /api/auth/signup — Create a new user account
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      // MongoDB is connected — use database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
      }
      const role = email === 'admin@rk.com' ? 'admin' : 'user';
      const user = await User.create({ name, email, password, role });
      res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    } else {
      // Fallback: Use in-memory array
      const existingUser = inMemoryUsers.find(u => u.email === email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
      }
      const user = { id: Date.now().toString(), name, email, password };
      inMemoryUsers.push(user);
      res.status(201).json({
        success: true,
        message: 'Account created! (Demo mode — data is not persisted)',
        user: { id: user.id, name, email, role: 'user' }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// POST /api/auth/login — Login an existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  try {
    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email, password });
    } else {
      user = inMemoryUsers.find(u => u.email === email && u.password === password);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      user: { id: user._id || user.id, name: user.name, email: user.email, role: user.role || 'user' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

module.exports = router;
