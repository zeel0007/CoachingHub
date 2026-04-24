require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Note = require('../models/Note');
const Quiz = require('../models/Quiz');
const Job = require('../models/Job');
const PYQ = require('../models/PYQ');

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    // Clear existing collections
    await Note.deleteMany({});
    await Quiz.deleteMany({});
    await Job.deleteMany({});
    await PYQ.deleteMany({});
    console.log('Cleared existing collections...');

    // Read and parse JSON files
    const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/notes.json'), 'utf-8'));
    const quizData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/quiz.json'), 'utf-8'));
    const jobsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/jobs.json'), 'utf-8'));
    const pyqsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/pyqs.json'), 'utf-8'));

    // Insert data
    await Note.insertMany(notesData);
    await Quiz.insertMany(quizData);
    await Job.insertMany(jobsData);
    await PYQ.insertMany(pyqsData);
    console.log('Successfully seeded all data to MongoDB Atlas!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
