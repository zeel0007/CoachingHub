const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const fs = require('fs');
const path = require('path');

const getFallbackJobs = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/jobs.json'), 'utf-8'));

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({});
    if (jobs.length === 0) throw new Error('Empty');
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.json({ success: true, data: getFallbackJobs() });
  }
});

module.exports = router;
