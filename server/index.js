// ============================================================
// server/index.js — Main Entry Point for Express Server
// ============================================================
// This file sets up the Express server, connects to MongoDB,
// and registers all API routes.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// ─── Middleware ────────────────────────────────────────────
// cors: Allows the frontend (React) to communicate with this server
app.use(cors());
// express.json: Parses incoming JSON request bodies
app.use(express.json());

// ─── MongoDB Connection ────────────────────────────────────
// Connect to MongoDB using the URI from .env
// If MongoDB is not running, the server will still work using JSON fallback
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed. Using JSON fallback data.');
    console.warn('   Error:', error.message);
    // Don't crash the server — we'll use JSON files as fallback
  }
};

connectDB();

// ─── API Routes ────────────────────────────────────────────
// Import and register all route modules
const notesRouter = require('./routes/notes');
const quizRouter = require('./routes/quiz');
const jobsRouter = require('./routes/jobs');
const pyqsRouter = require('./routes/pyqs');
const authRouter = require('./routes/auth');
const scoresRouter = require('./routes/scores');
const adminRouter = require('./routes/admin');

app.use('/api/notes', notesRouter);     // GET /api/notes
app.use('/api/quiz', quizRouter);       // GET /api/quiz
app.use('/api/jobs', jobsRouter);       // GET /api/jobs
app.use('/api/pyqs', pyqsRouter);       // GET /api/pyqs
app.use('/api/auth', authRouter);       // POST /api/auth/login, /api/auth/signup
app.use('/api/scores', scoresRouter);   // GET/POST /api/scores
app.use('/api/admin', adminRouter);     // GET/POST/PUT/DELETE /api/admin/*

// ─── Health Check Route ─────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Gram Sevak Prep API is running 🌾',
    timestamp: new Date().toISOString()
  });
});

// ─── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
});
