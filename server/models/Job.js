const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: String,
  postDate: String,
  lastDate: String,
  totalPosts: String,
  status: { type: String, enum: ['Active', 'Closed', 'Coming Soon'] },
  link: String,
  description: String,
  highlights: [String]
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
