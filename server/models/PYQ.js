const mongoose = require('mongoose');

const PYQSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: String,
  subject: String,
  totalQuestions: Number,
  duration: String,
  fileSize: String,
  downloadLink: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('PYQ', PYQSchema);
