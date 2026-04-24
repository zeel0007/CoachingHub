const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const fs = require('fs');
const path = require('path');

const getFallbackQuiz = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/quiz.json'), 'utf-8'));

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    if (quizzes.length === 0) throw new Error('Empty');
    const summaries = quizzes.map(q => ({ id: q.id, category: q.category, totalQuestions: q.questions.length }));
    res.json({ success: true, data: summaries });
  } catch (error) {
    const qs = getFallbackQuiz();
    const summaries = qs.map(q => ({ id: q.id, category: q.category, totalQuestions: q.questions.length }));
    res.json({ success: true, data: summaries });
  }
});

router.get('/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ id: req.params.quizId });
    if (!quiz) throw new Error('Not found');
    res.json({ success: true, data: quiz });
  } catch (error) {
    const qs = getFallbackQuiz();
    res.json({ success: true, data: qs.find(q => q.id === req.params.quizId) });
  }
});

module.exports = router;
