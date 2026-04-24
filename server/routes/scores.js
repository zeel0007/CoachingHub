// ============================================================
// server/routes/scores.js — Quiz Score Routes
// ============================================================
// Saves and retrieves user quiz scores using MongoDB or localStorage fallback

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Score Schema: stores quiz results per user
const scoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  quizId: { type: String, required: true },
  category: { type: String },
  score: { type: Number, required: true },
  totalQuestions: { type: Number },
  percentage: { type: Number },
  takenAt: { type: Date, default: Date.now }
});

const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);
let inMemoryScores = [];

// GET /api/scores/:userId — get all scores for a user
router.get('/:userId', async (req, res) => {
  try {
    let scores;
    if (mongoose.connection.readyState === 1) {
      scores = await Score.find({ userId: req.params.userId }).sort({ takenAt: -1 });
    } else {
      scores = inMemoryScores.filter(s => s.userId === req.params.userId);
    }
    res.json({ success: true, data: scores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/scores — save a new quiz score
router.post('/', async (req, res) => {
  const { userId, userName, quizId, category, score, totalQuestions } = req.body;
  const percentage = Math.round((score / totalQuestions) * 100);

  try {
    let saved;
    if (mongoose.connection.readyState === 1) {
      saved = await Score.create({ userId, userName, quizId, category, score, totalQuestions, percentage });
    } else {
      saved = { id: Date.now(), userId, userName, quizId, category, score, totalQuestions, percentage, takenAt: new Date() };
      inMemoryScores.push(saved);
    }
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
