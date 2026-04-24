const express = require('express');
const router = express.Router();
const PYQ = require('../models/PYQ');
const fs = require('fs');
const path = require('path');

const getFallbackPYQs = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/pyqs.json'), 'utf-8'));

router.get('/', async (req, res) => {
  try {
    const pyqs = await PYQ.find({});
    if (pyqs.length === 0) throw new Error('Empty');
    res.json({ success: true, data: pyqs });
  } catch (error) {
    res.json({ success: true, data: getFallbackPYQs() });
  }
});

module.exports = router;
