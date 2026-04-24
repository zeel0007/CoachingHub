// ============================================================
// src/services/api.js — Centralized API Service
// ============================================================
// All HTTP calls go through this file using axios.
// The "proxy" in package.json forwards /api/* to http://localhost:5000
// Uses local JSON fallback if the server is not running.

import axios from 'axios';
import notesData from '../data/notes.json';
import quizData  from '../data/quiz.json';
import jobsData  from '../data/jobs.json';
import pyqsData  from '../data/pyqs.json';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// ── Axios Instance ─────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Admin Axios Instance ───────────────────────────────────
const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  timeout: 8000,
  headers: { 
    'Content-Type': 'application/json',
    'x-admin-key': 'RK_ADMIN_SECRET_KEY' // Hardcoded secret for demo
  },
});

// Helper: Try API call, fall back to local JSON on error
const withFallback = async (apiFn, fallbackData) => {
  try {
    const res = await apiFn();
    return res.data.data;
  } catch (err) {
    console.warn('⚠️ API unavailable. Using local JSON data.');
    return fallbackData;
  }
};

// ─── Notes API ─────────────────────────────────────────────
export const getNotes = () => withFallback(
  () => api.get('/notes'),
  notesData
);

export const getNoteCategory = (categoryId) => withFallback(
  () => api.get(`/notes/${categoryId}`),
  notesData.find(c => c.id === categoryId)
);

// ─── Quiz API ──────────────────────────────────────────────
export const getQuizList = () => withFallback(
  () => api.get('/quiz'),
  quizData.map(q => ({ id: q.id, category: q.category, totalQuestions: q.questions.length }))
);

export const getQuiz = (quizId) => withFallback(
  () => api.get(`/quiz/${quizId}`),
  quizData.find(q => q.id === quizId)
);

// ─── Jobs API ──────────────────────────────────────────────
export const getJobs = () => withFallback(
  () => api.get('/jobs'),
  jobsData
);

// ─── PYQs API ─────────────────────────────────────────────
export const getPYQs = () => withFallback(
  () => api.get('/pyqs'),
  pyqsData
);

// ─── Auth API ─────────────────────────────────────────────
export const signupUser = async (data) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

// ─── Scores API ───────────────────────────────────────────
export const saveScore = async (scoreData) => {
  try {
    const res = await api.post('/scores', scoreData);
    return res.data;
  } catch {
    // Fallback: save to localStorage
    const key = `gsPrep_scores_${scoreData.userId}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ ...scoreData, id: Date.now(), takenAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
    return { success: true, data: existing[0] };
  }
};

export const getUserScores = async (userId) => {
  try {
    const res = await api.get(`/scores/${userId}`);
    return res.data.data;
  } catch {
    const key = `gsPrep_scores_${userId}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
};

// ─── Admin Content API ──────────────────────────────────────
export const createQuiz = async (data) => {
  const res = await adminApi.post('/quiz', data);
  return res.data;
};

export const deleteQuiz = async (id) => {
  const res = await adminApi.delete(`/quiz/${id}`);
  return res.data;
};

export const createJob = async (data) => {
  const res = await adminApi.post('/jobs', data);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await adminApi.delete(`/jobs/${id}`);
  return res.data;
};

export const createNote = async (data) => {
  const res = await adminApi.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await adminApi.delete(`/notes/${id}`);
  return res.data;
};

// Users Admin API
export const getUsers = async () => {
  const res = await adminApi.get('/users');
  return res.data;
};

// PUT Update APIs
export const updateQuiz = async (id, data) => {
  const res = await adminApi.put(`/quiz/${id}`, data);
  return res.data;
};
export const updateJob = async (id, data) => {
  const res = await adminApi.put(`/jobs/${id}`, data);
  return res.data;
};
export const updateNote = async (id, data) => {
  const res = await adminApi.put(`/notes/${id}`, data);
  return res.data;
};
export const updatePYQ = async (id, data) => {
  const res = await adminApi.put(`/pyqs/${id}`, data);
  return res.data;
};

// PYQ Admin Post & Delete
export const createPYQ = async (data) => {
  const res = await adminApi.post('/pyqs', data);
  return res.data;
};
export const deletePYQ = async (id) => {
  const res = await adminApi.delete(`/pyqs/${id}`);
  return res.data;
};
