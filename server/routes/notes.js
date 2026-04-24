const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fs = require('fs');
const path = require('path');

// Fallback logic
const getFallbackNotes = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/notes.json'), 'utf-8'));

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({});
    if (notes.length === 0) throw new Error('Empty');
    res.json({ success: true, data: notes });
  } catch (error) {
    res.json({ success: true, data: getFallbackNotes() });
  }
});

router.get('/:categoryId', async (req, res) => {
  try {
    const note = await Note.findOne({ id: req.params.categoryId });
    if (!note) throw new Error('Not found');
    res.json({ success: true, data: note });
  } catch (error) {
    const fn = getFallbackNotes();
    res.json({ success: true, data: fn.find(c => c.id === req.params.categoryId) });
  }
});

module.exports = router;
