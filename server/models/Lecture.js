const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Lecture', LectureSchema);
