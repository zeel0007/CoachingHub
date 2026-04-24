const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Note = require('../models/Note');
const Quiz = require('../models/Quiz');
const Job = require('../models/Job');
const PYQ = require('../models/PYQ');
const User = require('../models/User');

// ─── Simple Admin Middleware ─────────────────────────────────
// Since we are not using JWT for this simplified architecture, 
// we will verify an admin key sent in headers.
const requireAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  // In production, compare with a secure environment variable
  if (adminKey !== 'RK_ADMIN_SECRET_KEY') {
    return res.status(403).json({ success: false, message: 'Forbidden. Admin access required.' });
  }
  next();
};

// ─── User Management ───────────────────────────────────────────
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── API Routes ──────────────────────────────────────────────

// Add a new Mock Test
router.post('/quiz', requireAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, message: 'Mock Test created successfully!', data: quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a Mock Test
router.put('/quiz/:id', requireAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json({ success: true, message: 'Mock Test updated successfully!', data: quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a Mock Test
router.delete('/quiz/:id', requireAdmin, async (req, res) => {
  try {
    await Quiz.deleteOne({ id: req.params.id });
    res.json({ success: true, message: 'Mock Test deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new Job Posting
router.post('/jobs', requireAdmin, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, message: 'Job Posting created successfully!', data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a Job Posting
router.put('/jobs/:id', requireAdmin, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json({ success: true, message: 'Job Posting updated successfully!', data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a Job Posting
router.delete('/jobs/:id', requireAdmin, async (req, res) => {
  try {
    await Job.deleteOne({ id: req.params.id });
    res.json({ success: true, message: 'Job Posting deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add new Study Notes category
router.post('/notes', requireAdmin, async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ success: true, message: 'Study Note category created successfully!', data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Study Notes
router.put('/notes/:id', requireAdmin, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json({ success: true, message: 'Study Note updated successfully!', data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Study Notes category
router.delete('/notes/:id', requireAdmin, async (req, res) => {
  try {
    await Note.deleteOne({ id: req.params.id });
    res.json({ success: true, message: 'Study Note deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new PYQ
router.post('/pyqs', requireAdmin, async (req, res) => {
  try {
    const pyq = await PYQ.create(req.body);
    res.status(201).json({ success: true, message: 'PYQ created successfully!', data: pyq });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update a PYQ
router.put('/pyqs/:id', requireAdmin, async (req, res) => {
  try {
    const pyq = await PYQ.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json({ success: true, message: 'PYQ updated successfully!', data: pyq });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a PYQ
router.delete('/pyqs/:id', requireAdmin, async (req, res) => {
  try {
    await PYQ.deleteOne({ id: req.params.id });
    res.json({ success: true, message: 'PYQ deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
