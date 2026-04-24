const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  keyPoints: [String]
});

const NoteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subject: String,
  color: String,
  topics: [TopicSchema]
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
