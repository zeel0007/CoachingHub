const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const fs = require('fs');
const path = require('path');

const getFallbackLectures = () => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../client/src/data/lectures.json'), 'utf-8'));
  } catch(e) {
    return [];
  }
};

router.get('/', async (req, res) => {
  try {
    const lectures = await Lecture.find({});
    if (lectures.length === 0) throw new Error('Empty');
    res.json({ success: true, data: lectures });
  } catch (error) {
    res.json({ success: true, data: getFallbackLectures() });
  }
});

module.exports = router;
